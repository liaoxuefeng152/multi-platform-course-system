import { NextRequest, NextResponse } from 'next/server';

// 模拟直播计划数据
let livePlans = [
  {
    id: 'LP001',
    title: 'Python 入门第一课',
    courseId: 'C001',
    courseName: 'Python 从入门到精通',
    platform: 'douyin',
    scheduledAt: '2024-01-20T11:00:00Z',
    status: 'today',
    links: [],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'LP002',
    title: 'React 核心概念详解',
    courseId: 'C002',
    courseName: 'React 实战课程',
    platform: 'video',
    scheduledAt: '2024-01-22T12:00:00Z',
    status: 'upcoming',
    links: [],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'LP003',
    title: 'TypeScript 进阶技巧',
    courseId: 'C003',
    courseName: 'TypeScript 深入浅出',
    platform: 'kuaishou',
    scheduledAt: '2024-01-25T11:30:00Z',
    status: 'upcoming',
    links: [],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'LP004',
    title: 'Node.js 实战指南',
    courseId: 'C004',
    courseName: 'Node.js 全栈开发',
    platform: 'xiaohongshu',
    scheduledAt: '2024-01-28T12:00:00Z',
    status: 'upcoming',
    links: [],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'LP005',
    title: 'Vue3 入门教程',
    courseId: 'C005',
    courseName: 'Vue3 实战课程',
    platform: 'douyin',
    scheduledAt: '2024-01-15T11:00:00Z',
    status: 'ended',
    links: ['https://v.douyin.com/xxx'],
    createdAt: '2024-01-10T10:00:00Z'
  }
];

// GET: 获取直播计划列表
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  // 过滤
  let filtered = [...livePlans];
  if (status) {
    filtered = filtered.filter(p => p.status === status);
  }

  // 分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filtered.slice(start, end);

  // 统计
  const stats = {
    total: livePlans.length,
    today: livePlans.filter(p => p.status === 'today').length,
    upcoming: livePlans.filter(p => p.status === 'upcoming').length,
    ended: livePlans.filter(p => p.status === 'ended').length
  };

  return NextResponse.json({
    code: 200,
    message: 'success',
    data: {
      list,
      stats,
      pagination: {
        page,
        pageSize,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize)
      }
    }
  });
}

// POST: 创建直播计划
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, courseId, courseName, platform, scheduledAt } = body;

    // 验证必填项
    if (!title || !courseId || !platform || !scheduledAt) {
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

    // 创建计划
    const newPlan = {
      id: `LP${Date.now()}`,
      title,
      courseId,
      courseName: courseName || '',
      platform,
      scheduledAt,
      status: 'upcoming',
      links: [],
      createdAt: new Date().toISOString()
    };

    livePlans.unshift(newPlan);

    return NextResponse.json({
      code: 200,
      message: '创建成功',
      data: newPlan
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// DELETE: 删除直播计划
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { code: 400, message: '缺少计划ID', data: null },
      { status: 400 }
    );
  }

  const index = livePlans.findIndex(p => p.id === id);
  if (index === -1) {
    return NextResponse.json(
      { code: 404, message: '计划不存在', data: null },
      { status: 404 }
    );
  }

  livePlans.splice(index, 1);

  return NextResponse.json({
    code: 200,
    message: '删除成功',
    data: null
  });
}
