import { NextRequest, NextResponse } from 'next/server';

// 模拟课程数据
let courses = [
  {
    id: 'C001',
    title: 'Python 从入门到精通',
    cover: 'https://picsum.photos/seed/python/400/300',
    type: 'video',
    category: '编程',
    price: 29900,
    sales: 1256,
    students: 1200,
    status: 'approved',
    validDays: 365,
    allowDownload: true,
    description: 'Python入门到精通完整课程',
    chapters: [
      { id: 'CH001', title: '第一章：环境搭建', lessons: 5 },
      { id: 'CH002', title: '第二章：基础语法', lessons: 10 },
      { id: 'CH003', title: '第三章：函数与模块', lessons: 8 }
    ],
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'C002',
    title: 'React 实战课程',
    cover: 'https://picsum.photos/seed/react/400/300',
    type: 'video',
    category: '前端',
    price: 39900,
    sales: 856,
    students: 800,
    status: 'approved',
    validDays: 180,
    allowDownload: false,
    description: 'React从入门到实战',
    chapters: [],
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-05T08:00:00Z'
  },
  {
    id: 'C003',
    title: 'TypeScript 深入浅出',
    cover: 'https://picsum.photos/seed/ts/400/300',
    type: 'video',
    category: '前端',
    price: 29900,
    sales: 520,
    students: 500,
    status: 'pending',
    validDays: 365,
    allowDownload: true,
    description: 'TypeScript系统学习',
    chapters: [],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z'
  },
  {
    id: 'C004',
    title: 'Node.js 全栈开发',
    cover: 'https://picsum.photos/seed/nodejs/400/300',
    type: 'video',
    category: '后端',
    price: 49900,
    sales: 320,
    students: 300,
    status: 'approved',
    validDays: 365,
    allowDownload: true,
    description: 'Node.js全栈开发实战',
    chapters: [],
    createdAt: '2024-01-08T08:00:00Z',
    updatedAt: '2024-01-08T08:00:00Z'
  },
  {
    id: 'C005',
    title: 'Vue3 实战课程',
    cover: 'https://picsum.photos/seed/vue/400/300',
    type: 'video',
    category: '前端',
    price: 29900,
    sales: 680,
    students: 650,
    status: 'draft',
    validDays: 180,
    allowDownload: false,
    description: 'Vue3从入门到实战',
    chapters: [],
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-12T08:00:00Z'
  }
];

// GET: 获取课程列表
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const keyword = searchParams.get('keyword');

  // 过滤
  let filtered = [...courses];
  if (type) filtered = filtered.filter(c => c.type === type);
  if (status) filtered = filtered.filter(c => c.status === status);
  if (keyword) {
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // 分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filtered.slice(start, end);

  return NextResponse.json({
    code: 200,
    message: 'success',
    data: {
      list,
      pagination: {
        page,
        pageSize,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize)
      }
    }
  });
}

// POST: 创建课程
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, type, category, cover, price, validDays, description } = body;

    // 验证必填项
    if (!title || !type || !category || !price) {
      return NextResponse.json(
        { code: 400, message: '请填写完整信息', data: null },
        { status: 400 }
      );
    }

    // 创建课程
    const newCourse = {
      id: `C${Date.now()}`,
      title,
      cover: cover || `https://picsum.photos/seed/${Date.now()}/400/300`,
      type,
      category,
      price,
      sales: 0,
      students: 0,
      status: 'draft',
      validDays: validDays || 365,
      allowDownload: false,
      description: description || '',
      chapters: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    courses.unshift(newCourse);

    return NextResponse.json({
      code: 200,
      message: '创建成功',
      data: newCourse
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
