import { NextRequest, NextResponse } from 'next/server';

// 模拟学员数据
const students = [
  {
    id: 'S001',
    nickname: '张小明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    phone: '139****1234',
    courses: [
      { courseId: 'C001', courseName: 'Python 从入门到精通', progress: 80, joinedAt: '2024-01-01' }
    ],
    totalCourses: 1,
    totalHours: 50,
    lastActivity: '2024-01-15',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'S002',
    nickname: '李华',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    phone: '138****5678',
    courses: [
      { courseId: 'C001', courseName: 'Python 从入门到精通', progress: 50, joinedAt: '2024-01-05' },
      { courseId: 'C002', courseName: 'React 实战课程', progress: 30, joinedAt: '2024-01-10' }
    ],
    totalCourses: 2,
    totalHours: 80,
    lastActivity: '2024-01-14',
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'S003',
    nickname: '王芳',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    phone: '137****9012',
    courses: [
      { courseId: 'C002', courseName: 'React 实战课程', progress: 100, joinedAt: '2024-01-03' }
    ],
    totalCourses: 1,
    totalHours: 100,
    lastActivity: '2024-01-12',
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 'S004',
    nickname: '赵雷',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao',
    phone: '136****3456',
    courses: [
      { courseId: 'C001', courseName: 'Python 从入门到精通', progress: 20, joinedAt: '2024-01-10' },
      { courseId: 'C003', courseName: 'TypeScript 深入浅出', progress: 0, joinedAt: '2024-01-12' }
    ],
    totalCourses: 2,
    totalHours: 30,
    lastActivity: '2024-01-13',
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'S005',
    nickname: '陈静',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
    phone: '135****7890',
    courses: [
      { courseId: 'C004', courseName: 'Node.js 全栈开发', progress: 60, joinedAt: '2024-01-08' }
    ],
    totalCourses: 1,
    totalHours: 70,
    lastActivity: '2024-01-15',
    createdAt: '2024-01-08T00:00:00Z'
  }
];

// GET: 获取学员列表
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');

  // 过滤
  let filtered = [...students];
  if (keyword) {
    filtered = filtered.filter(s => 
      s.nickname.toLowerCase().includes(keyword.toLowerCase()) ||
      s.phone.includes(keyword)
    );
  }

  // 分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filtered.slice(start, end);

  // 统计
  const stats = {
    total: students.length,
    totalCourses: students.reduce((sum, s) => sum + s.totalCourses, 0),
    activeToday: students.filter(s => s.lastActivity === '2024-01-15').length
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
