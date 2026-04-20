import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

interface Student {
  id: string;
  user_id: string;
  nickname: string | null;
  phone: string | null;
  avatar: string | null;
  source: string | null;
  total_courses: number;
  total_amount: number;
  last_active_at: string | null;
  created_at: string;
}

// GET: 获取学员列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const client = getSupabaseClient();

    // 构建查询
    let query = client.from('students').select('*', { count: 'exact' });

    if (keyword) {
      query = query.or(`nickname.ilike.%${keyword}%,phone.ilike.%${keyword}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range((page - 1) * pageSize, page * pageSize - 1);

    const { data: students, error, count } = await query;

    if (error) throw new Error(`查询学员失败: ${error.message}`);

    // 获取统计数据
    const { count: totalCount } = await client
      .from('students')
      .select('*', { count: 'exact', head: true });

    const { data: courseData } = await client.from('students').select('total_courses');

    const totalCourses = (courseData || []).reduce(
      (sum, s) => sum + ((s as any)?.total_courses || 0),
      0
    );

    const today = new Date().toISOString().split('T')[0];
    const { count: activeTodayCount } = await client
      .from('students')
      .select('*', { count: 'exact', head: true })
      .gte('last_active_at', `${today}T00:00:00`);

    // 格式化返回数据
    const list = (students || []).map((s: Student) => ({
      id: s.id,
      nickname: s.nickname || '匿名用户',
      phone: s.phone,
      avatar: s.avatar,
      source: s.source,
      totalCourses: s.total_courses,
      totalAmount: s.total_amount,
      lastActiveAt: s.last_active_at,
      createdAt: s.created_at
    }));

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: {
        list,
        stats: {
          total: totalCount || 0,
          totalCourses,
          activeToday: activeTodayCount || 0
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
    console.error('获取学员列表失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
