import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

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

    // 使用服务端客户端
    const client = getSupabaseClient();

    // 检查手机号是否已存在
    const { data: existingUser } = await client
      .from('users')
      .select('id')
      .eq('phone', phone)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { code: 400, message: '该手机号已注册', data: null },
        { status: 400 }
      );
    }

    // 创建用户
    const { data: newUser, error: insertError } = await client
      .from('users')
      .insert({
        phone,
        password,
        role: 'instructor',
        nickname: `用户${phone.slice(-4)}`
      })
      .select()
      .single();

    if (insertError) throw new Error(`注册失败: ${insertError.message}`);

    // 生成Token
    const token = Buffer.from(JSON.stringify({
      userId: newUser.id,
      phone: newUser.phone,
      role: newUser.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    })).toString('base64');

    return NextResponse.json({
      code: 200,
      message: '注册成功',
      data: {
        token,
        userInfo: {
          id: newUser.id,
          phone: newUser.phone,
          nickname: newUser.nickname,
          role: newUser.role,
          authStatus: 'pending',
          createdAt: newUser.created_at
        }
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
