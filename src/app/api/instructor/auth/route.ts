import { NextRequest, NextResponse } from 'next/server';

// 模拟认证记录
let authRecord = {
  id: 'A001',
  type: 'personal',
  name: '张老师',
  phone: '13800138000',
  status: 'pending',
  submittedAt: '2024-01-15T10:00:00Z',
  reviewedAt: null as string | null,
  rejectReason: ''
};

// GET: 获取认证状态
export async function GET() {
  return NextResponse.json({
    code: 200,
    message: 'success',
    data: authRecord.status === 'pending' ? {
      status: 'pending',
      rejectReason: '',
      submittedAt: authRecord.submittedAt
    } : {
      status: authRecord.status,
      rejectReason: authRecord.rejectReason,
      submittedAt: authRecord.submittedAt,
      reviewedAt: authRecord.reviewedAt
    }
  });
}

// POST: 提交认证
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, phone, idCard, idCardFront, idCardBack } = body;

    // 验证参数
    if (!type || !name || !phone) {
      return NextResponse.json(
        { code: 400, message: '请填写完整信息', data: null },
        { status: 400 }
      );
    }

    // 个人认证需要身份证
    if (type === 'personal' && !idCard) {
      return NextResponse.json(
        { code: 400, message: '个人认证需要填写身份证号', data: null },
        { status: 400 }
      );
    }

    // 更新认证记录
    authRecord = {
      id: `A${Date.now()}`,
      type,
      name,
      phone,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      rejectReason: ''
    };

    return NextResponse.json({
      code: 200,
      message: '提交成功，审核中',
      data: { authId: authRecord.id }
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// PUT: 更新认证状态（模拟管理员操作）
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { status, rejectReason } = body;

    // 模拟审核通过
    if (status === 'approved') {
      authRecord.status = 'approved';
      authRecord.reviewedAt = new Date().toISOString();
    } else if (status === 'rejected') {
      authRecord.status = 'rejected';
      authRecord.reviewedAt = new Date().toISOString();
      authRecord.rejectReason = rejectReason || '信息不符';
    }

    return NextResponse.json({
      code: 200,
      message: '更新成功',
      data: authRecord
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
