import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

interface PrivateClassroom {
  id: string;
  user_id: string;
  course_id: string | null;
  title: string;
  description: string | null;
  cover_image: string | null;
  teacher_name: string | null;
  scheduled_at: string | null;
  duration: number;
  status: string;
  students_count: number;
  viewer_count: number;
  replay_url: string | null;
  created_at: string;
  updated_at: string | null;
}

// GET: 获取私域直播列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const client = getSupabaseClient();

    // 构建查询
    let query = client.from('private_classrooms').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order('scheduled_at', { ascending: false });
    query = query.range((page - 1) * pageSize, page * pageSize - 1);

    const { data: classrooms, error, count } = await query;

    if (error) throw new Error(`查询私域课堂失败: ${error.message}`);

    // 获取统计数据
    const { count: totalCount } = await client
      .from('private_classrooms')
      .select('*', { count: 'exact', head: true });

    const { count: liveCount } = await client
      .from('private_classrooms')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'live');

    const { count: upcomingCount } = await client
      .from('private_classrooms')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'scheduled');

    const { count: endedCount } = await client
      .from('private_classrooms')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ended');

    const { data: studentData } = await client
      .from('private_classrooms')
      .select('students_count');

    const totalStudents = (studentData || []).reduce(
      (sum, c) => sum + ((c as any)?.students_count || 0),
      0
    );

    // 格式化返回数据
    const list = (classrooms || []).map((c: PrivateClassroom) => ({
      id: c.id,
      title: c.title,
      courseId: c.course_id,
      status: c.status,
      scheduledAt: c.scheduled_at,
      duration: c.duration,
      students: c.students_count,
      viewerCount: c.viewer_count,
      replayUrl: c.replay_url,
      createdAt: c.created_at
    }));

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: {
        list,
        stats: {
          total: totalCount || 0,
          live: liveCount || 0,
          upcoming: upcomingCount || 0,
          ended: endedCount || 0,
          totalStudents
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
    console.error('获取私域课堂失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// POST: 创建私域直播课
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, courseId, scheduledAt, duration, description } = body;

    // 验证必填项
    if (!title || !scheduledAt) {
      return NextResponse.json(
        { code: 400, message: '请填写完整信息', data: null },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();

    // 创建直播课
    const { data: newClass, error } = await client
      .from('private_classrooms')
      .insert({
        title,
        course_id: courseId,
        scheduled_at: scheduledAt,
        duration: duration || 120,
        description,
        status: 'scheduled'
      })
      .select()
      .single();

    if (error) throw new Error(`创建私域课堂失败: ${error.message}`);

    return NextResponse.json({
      code: 200,
      message: '创建成功',
      data: {
        id: newClass.id,
        title: newClass.title,
        status: newClass.status,
        scheduledAt: newClass.scheduled_at,
        duration: newClass.duration,
        createdAt: newClass.created_at
      }
    });
  } catch (error) {
    console.error('创建私域课堂失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
