import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

interface PublicLivePlan {
  id: string;
  user_id: string;
  course_id: string | null;
  platform: string;
  platform_account_id: string | null;
  title: string;
  description: string | null;
  cover_image: string | null;
  scheduled_at: string;
  status: string;
  viewer_count: number;
  sales_count: number;
  sales_amount: number;
  created_at: string;
  updated_at: string | null;
}

// GET: 获取直播计划列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const client = getSupabaseClient();

    // 构建查询
    let query = client.from('public_live_plans').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order('scheduled_at', { ascending: false });
    query = query.range((page - 1) * pageSize, page * pageSize - 1);

    const { data: plans, error, count } = await query;

    if (error) throw new Error(`查询直播计划失败: ${error.message}`);

    // 获取统计数据
    const { count: totalCount } = await client
      .from('public_live_plans')
      .select('*', { count: 'exact', head: true });

    const today = new Date().toISOString().split('T')[0];
    const { count: todayCount } = await client
      .from('public_live_plans')
      .select('*', { count: 'exact', head: true })
      .gte('scheduled_at', `${today}T00:00:00`)
      .lte('scheduled_at', `${today}T23:59:59`);

    const { count: upcomingCount } = await client
      .from('public_live_plans')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'upcoming');

    const { count: endedCount } = await client
      .from('public_live_plans')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ended');

    // 格式化返回数据
    const list = (plans || []).map((plan: PublicLivePlan) => ({
      id: plan.id,
      title: plan.title,
      courseId: plan.course_id,
      platform: plan.platform,
      scheduledAt: plan.scheduled_at,
      status: plan.status,
      viewerCount: plan.viewer_count,
      salesCount: plan.sales_count,
      salesAmount: plan.sales_amount,
      createdAt: plan.created_at
    }));

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: {
        list,
        stats: {
          total: totalCount || 0,
          today: todayCount || 0,
          upcoming: upcomingCount || 0,
          ended: endedCount || 0
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
    console.error('获取直播计划失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// POST: 创建直播计划
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, courseId, platform, scheduledAt, description } = body;

    // 验证必填项
    if (!title || !platform || !scheduledAt) {
      return NextResponse.json(
        { code: 400, message: '请填写完整信息', data: null },
        { status: 400 }
      );
    }

    // 验证平台
    const validPlatforms = ['douyin', 'video', 'kuaishou', 'xiaohongshu'];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        { code: 400, message: '不支持的直播平台', data: null },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();

    // 创建计划
    const { data: newPlan, error } = await client
      .from('public_live_plans')
      .insert({
        title,
        course_id: courseId,
        platform,
        scheduled_at: scheduledAt,
        description,
        status: 'upcoming'
      })
      .select()
      .single();

    if (error) throw new Error(`创建直播计划失败: ${error.message}`);

    return NextResponse.json({
      code: 200,
      message: '创建成功',
      data: {
        id: newPlan.id,
        title: newPlan.title,
        platform: newPlan.platform,
        scheduledAt: newPlan.scheduled_at,
        status: newPlan.status,
        createdAt: newPlan.created_at
      }
    });
  } catch (error) {
    console.error('创建直播计划失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// DELETE: 删除直播计划
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { code: 400, message: '缺少计划ID', data: null },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();

    const { error } = await client
      .from('public_live_plans')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`删除直播计划失败: ${error.message}`);

    return NextResponse.json({
      code: 200,
      message: '删除成功',
      data: null
    });
  } catch (error) {
    console.error('删除直播计划失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
