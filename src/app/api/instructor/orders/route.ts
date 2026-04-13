import { NextRequest, NextResponse } from 'next/server';

// 模拟订单数据
const orders = [
  {
    id: 'O001',
    orderNo: '202401151234567890',
    studentName: '张小明',
    studentId: 'S001',
    courseName: 'Python 从入门到精通',
    courseId: 'C001',
    amount: 29900,
    status: 'paid',
    createdAt: '2024-01-15T10:00:00Z',
    paidAt: '2024-01-15T10:01:00Z'
  },
  {
    id: 'O002',
    orderNo: '202401151234567891',
    studentName: '李华',
    studentId: 'S002',
    courseName: 'React 实战课程',
    courseId: 'C002',
    amount: 39900,
    status: 'paid',
    createdAt: '2024-01-15T10:30:00Z',
    paidAt: '2024-01-15T10:31:00Z'
  },
  {
    id: 'O003',
    orderNo: '202401151234567892',
    studentName: '王芳',
    studentId: 'S003',
    courseName: 'TypeScript 深入浅出',
    courseId: 'C003',
    amount: 29900,
    status: 'paid',
    createdAt: '2024-01-15T11:00:00Z',
    paidAt: '2024-01-15T11:05:00Z'
  },
  {
    id: 'O004',
    orderNo: '202401141234567893',
    studentName: '赵雷',
    studentId: 'S004',
    courseName: 'Node.js 全栈开发',
    courseId: 'C004',
    amount: 49900,
    status: 'paid',
    createdAt: '2024-01-14T09:00:00Z',
    paidAt: '2024-01-14T09:01:00Z'
  },
  {
    id: 'O005',
    orderNo: '202401131234567894',
    studentName: '陈静',
    studentId: 'S005',
    courseName: 'Python 从入门到精通',
    courseId: 'C001',
    amount: 29900,
    status: 'refunded',
    createdAt: '2024-01-13T14:00:00Z',
    paidAt: '2024-01-13T14:01:00Z',
    refundedAt: '2024-01-14T10:00:00Z'
  }
];

// GET: 获取订单列表
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const status = searchParams.get('status');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  // 过滤
  let filtered = [...orders];
  if (status) {
    filtered = filtered.filter(o => o.status === status);
  }

  // 统计
  const stats = {
    totalOrders: orders.length,
    totalAmount: orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0),
    todayOrders: orders.filter(o => o.createdAt.startsWith('2024-01-15')).length,
    todayAmount: orders.filter(o => 
      o.status === 'paid' && o.createdAt.startsWith('2024-01-15')
    ).reduce((sum, o) => sum + o.amount, 0),
    refundedAmount: orders.filter(o => o.status === 'refunded').reduce((sum, o) => sum + o.amount, 0)
  };

  // 分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filtered.slice(start, end);

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
