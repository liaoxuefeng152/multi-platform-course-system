import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

interface Order {
  id: string;
  order_no: string;
  user_id: string;
  student_id: string | null;
  course_id: string;
  amount: number;
  original_amount: number | null;
  discount_amount: number;
  status: string;
  payment_method: string | null;
  payment_time: string | null;
  source: string | null;
  source_id: string | null;
  created_at: string;
}

// GET: 获取订单列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const client = getSupabaseClient();

    // 构建查询
    let query = client.from('orders').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range((page - 1) * pageSize, page * pageSize - 1);

    const { data: orders, error, count } = await query;

    if (error) throw new Error(`查询订单失败: ${error.message}`);

    // 获取统计数据
    const { count: totalCount } = await client
      .from('orders')
      .select('*', { count: 'exact', head: true });

    const { data: amountData } = await client
      .from('orders')
      .select('amount, status');

    const totalAmount = (amountData || []).reduce(
      (sum, o) => sum + ((o as any)?.amount || 0),
      0
    );

    const refundedAmount = (amountData || []).reduce(
      (sum, o) => sum + (((o as any)?.status === 'refunded' ? (o as any)?.amount : 0) || 0),
      0
    );

    const today = new Date().toISOString().split('T')[0];
    const { data: todayData } = await client
      .from('orders')
      .select('amount')
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`);

    const todayAmount = (todayData || []).reduce(
      (sum, o) => sum + ((o as any)?.amount || 0),
      0
    );

    const { count: todayCount } = await client
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`);

    // 格式化返回数据
    const list = (orders || []).map((o: Order) => ({
      id: o.id,
      orderNo: o.order_no,
      courseId: o.course_id,
      amount: o.amount,
      originalAmount: o.original_amount,
      discountAmount: o.discount_amount,
      status: o.status,
      paymentMethod: o.payment_method,
      paymentTime: o.payment_time,
      source: o.source,
      createdAt: o.created_at
    }));

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: {
        list,
        stats: {
          totalOrders: totalCount || 0,
          totalAmount,
          todayOrders: todayCount || 0,
          todayAmount,
          refundedAmount
        },
        pagination: {
          page,
          pageSize,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / pageSize)
        }
      }
    });
  } catch (error) {
    console.error('获取订单列表失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
