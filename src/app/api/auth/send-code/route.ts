import { NextRequest, NextResponse } from 'next/server';

// 模拟验证码存储（实际应该用Redis）
const codeStore: Record<string, { code: string; expiresAt: number }> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, type } = body;

    // 验证参数
    if (!phone || !type) {
      return NextResponse.json(
        { code: 400, message: '手机号和类型不能为空', data: null },
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

    // 验证类型
    const validTypes = ['login', 'register', 'forget'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { code: 400, message: '验证码类型不正确', data: null },
        { status: 400 }
      );
    }

    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 60 * 1000; // 60秒后过期

    // 存储验证码
    codeStore[phone] = { code, expiresAt };

    // 模拟发送验证码（实际应该调用短信服务）
    console.log(`[验证码] ${phone} - ${code} (${type})`);

    return NextResponse.json({
      code: 200,
      message: '验证码已发送',
      data: {
        expiresIn: 60,
        // 测试环境下直接返回验证码
        testCode: process.env.NODE_ENV === 'development' ? code : undefined
      }
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// 导出验证码存储供其他接口使用
export { codeStore };
