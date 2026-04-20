import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { getFileUrl } from '@/lib/storage';

interface Course {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  cover_key: string | null;
  price: number;
  original_price: number | null;
  category: string | null;
  lessons_count: number;
  students_count: number;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string | null;
}

// GET: 获取课程列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const keyword = searchParams.get('keyword');

    const client = getSupabaseClient();

    // 构建查询
    let query = client.from('courses').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }
    if (keyword) {
      query = query.ilike('title', `%${keyword}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range((page - 1) * pageSize, page * pageSize - 1);

    const { data: courses, error, count } = await query;

    if (error) throw new Error(`查询课程失败: ${error.message}`);

    // 格式化返回数据
    const list = await Promise.all(
      (courses || []).map(async (course: Course) => {
        // 如果有 cover_key，生成访问 URL
        let cover = course.cover_image;
        if (course.cover_key && !cover) {
          try {
            cover = await getFileUrl(course.cover_key, 86400);
          } catch {
            // 生成 URL 失败，使用默认封面
          }
        }
        
        return {
          id: course.id,
          title: course.title,
          cover,
          coverKey: course.cover_key,
          type: 'video',
          category: course.category,
          price: course.price,
          students: course.students_count,
          status: course.status,
          description: course.description,
          createdAt: course.created_at,
          updatedAt: course.updated_at
        };
      })
    );

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: {
        list,
        pagination: {
          page,
          pageSize,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / pageSize)
        }
      }
    });
  } catch (error) {
    console.error('获取课程列表失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// POST: 创建课程
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, cover, coverKey, price, description } = body;

    // 验证必填项
    if (!title || !category || !price) {
      return NextResponse.json(
        { code: 400, message: '请填写完整信息', data: null },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();

    // 创建课程
    const { data: newCourse, error } = await client
      .from('courses')
      .insert({
        title,
        category,
        cover_image: cover,
        cover_key: coverKey,
        price,
        description,
        status: 'draft'
      })
      .select()
      .single();

    if (error) throw new Error(`创建课程失败: ${error.message}`);

    return NextResponse.json({
      code: 200,
      message: '创建成功',
      data: {
        id: newCourse.id,
        title: newCourse.title,
        category: newCourse.category,
        price: newCourse.price,
        status: newCourse.status,
        createdAt: newCourse.created_at
      }
    });
  } catch (error) {
    console.error('创建课程失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
