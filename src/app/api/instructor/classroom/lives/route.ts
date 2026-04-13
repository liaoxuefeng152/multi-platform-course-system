import { NextRequest, NextResponse } from 'next/server';

// 模拟私域直播课程数据
let liveClasses = [
  {
    id: 'LC001',
    title: 'Python 入门第一课：环境搭建',
    courseId: 'C001',
    courseName: 'Python 从入门到精通',
    status: 'ended',
    scheduledAt: '2024-01-15T11:00:00Z',
    duration: 7200,
    students: 256,
    maxStudents: 300,
    replayAvailable: true,
    views: 156,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'LC002',
    title: 'Python 进阶：函数与模块',
    courseId: 'C001',
    courseName: 'Python 从入门到精通',
    status: 'ended',
    scheduledAt: '2024-01-18T11:00:00Z',
    duration: 5400,
    students: 198,
    maxStudents: 300,
    replayAvailable: true,
    views: 98,
    createdAt: '2024-01-12T10:00:00Z'
  },
  {
    id: 'LC003',
    title: 'React 核心概念详解',
    courseId: 'C002',
    courseName: 'React 实战课程',
    status: 'live',
    scheduledAt: '2024-01-20T11:00:00Z',
    duration: 0,
    students: 187,
    maxStudents: 200,
    replayAvailable: false,
    views: 245,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'LC004',
    title: 'TypeScript 进阶技巧',
    courseId: 'C003',
    courseName: 'TypeScript 深入浅出',
    status: 'upcoming',
    scheduledAt: '2024-01-25T12:00:00Z',
    duration: 5400,
    students: 0,
    maxStudents: 200,
    replayAvailable: false,
    views: 0,
    createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: 'LC005',
    title: 'Node.js 实战：搭建 RESTful API',
    courseId: 'C004',
    courseName: 'Node.js 全栈开发',
    status: 'upcoming',
    scheduledAt: '2024-01-28T11:30:00Z',
    duration: 7200,
    students: 0,
    maxStudents: 150,
    replayAvailable: false,
    views: 0,
    createdAt: '2024-01-20T10:00:00Z'
  }
];

// GET: 获取私域直播列表
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  // 过滤
  let filtered = [...liveClasses];
  if (status) {
    filtered = filtered.filter(c => c.status === status);
  }

  // 分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filtered.slice(start, end);

  // 统计
  const stats = {
    total: liveClasses.length,
    live: liveClasses.filter(c => c.status === 'live').length,
    upcoming: liveClasses.filter(c => c.status === 'upcoming').length,
    ended: liveClasses.filter(c => c.status === 'ended').length,
    totalStudents: liveClasses.reduce((sum, c) => sum + c.students, 0)
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

// POST: 创建私域直播课
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, courseId, courseName, scheduledAt, duration, maxStudents } = body;

    // 验证必填项
    if (!title || !courseId || !scheduledAt || !duration) {
      return NextResponse.json(
        { code: 400, message: '请填写完整信息', data: null },
        { status: 400 }
      );
    }

    // 创建直播课
    const newClass = {
      id: `LC${Date.now()}`,
      title,
      courseId,
      courseName: courseName || '',
      status: 'upcoming',
      scheduledAt,
      duration,
      students: 0,
      maxStudents: maxStudents || 200,
      replayAvailable: false,
      views: 0,
      createdAt: new Date().toISOString()
    };

    liveClasses.unshift(newClass);

    return NextResponse.json({
      code: 200,
      message: '创建成功',
      data: newClass
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
