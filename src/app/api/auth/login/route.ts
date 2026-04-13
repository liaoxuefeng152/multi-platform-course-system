import { NextRequest, NextResponse } from 'next/server';

// 模拟用户数据
const mockUser = {
  id: 'U001',
  phone: '13800138000',
  nickname: '张老师',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher',
  role: 'instructor',
  authStatus: 'approved', // pending/approved/rejected
  createdAt: '2024-01-01T00:00:00Z'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password, captcha } = body;

    // 验证参数
    if (!phone || !password) {
      return NextResponse.json(
        { code: 400, message: '手机号和密码不能为空', data: null },
        { status: 400 }
      );
    }

    // 模拟验证（实际应该查询数据库）
    if (phone === '13800138000' && password === '123456') {
      const token = Buffer.from(JSON.stringify({
        userId: mockUser.id,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000
      })).toString('base64');

      return NextResponse.json({
        code: 200,
        message: '登录成功',
        data: {
          token,
          userInfo: mockUser
        }
      });
    }

    // 验证码错误
    if (phone === '13800138000' && password !== '123456') {
      return NextResponse.json(
        { code: 401, message: '手机号或密码错误', data: null },
        { status: 200 } // 返回200，但code为401
      );
    }

    // 新用户登录（自动注册）
    const newUser = {
      id: `U${Date.now()}`,
      phone,
      nickname: `用户${phone.slice(-4)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
      role: 'instructor',
      authStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    const token = Buffer.from(JSON.stringify({
      userId: newUser.id,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    })).toString('base64');

    return NextResponse.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        userInfo: newUser
      }
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
