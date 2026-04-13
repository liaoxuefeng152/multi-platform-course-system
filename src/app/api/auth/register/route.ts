import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, code, password } = body;

    // 验证参数
    if (!phone || !code || !password) {
      return NextResponse.json(
        { code: 400, message: '手机号、验证码和密码不能为空', data: null },
        { status: 400 }
      );
    }

    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { code: 400, message: '手机号格式不正确', data: null },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { code: 400, message: '密码至少6位', data: null },
        { status: 400 }
      );
    }

    // 验证验证码（测试环境下接受任意6位数字）
    if (code.length !== 6) {
      return NextResponse.json(
        { code: 400, message: '验证码格式不正确', data: null },
        { status: 400 }
      );
    }

    // 创建用户（模拟）
    const user = {
      id: `U${Date.now()}`,
      phone,
      nickname: `用户${phone.slice(-4)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
      role: 'instructor',
      authStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    // 生成Token
    const token = Buffer.from(JSON.stringify({
      userId: user.id,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    })).toString('base64');

    return NextResponse.json({
      code: 200,
      message: '注册成功',
      data: {
        token,
        userInfo: user
      }
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
