import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password } = body;

    // 验证参数
    if (!phone || !password) {
      return NextResponse.json(
        { code: 400, message: '手机号和密码不能为空', data: null },
        { status: 400 }
      );
    }

    // 使用服务端客户端（绕过 RLS）
    const client = getSupabaseClient();

    // 查询用户
    const { data: users, error: userError } = await client
      .from('users')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (userError) throw new Error(`查询用户失败: ${userError.message}`);

    // 用户存在，验证密码
    if (users) {
      if (users.password !== password) {
        return NextResponse.json(
          { code: 401, message: '手机号或密码错误', data: null },
          { status: 200 }
        );
      }

      // 生成 token
      const token = Buffer.from(JSON.stringify({
        userId: users.id,
        phone: users.phone,
        role: users.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000
      })).toString('base64');

      // 查询讲师认证状态
      const { data: profile } = await client
        .from('instructor_profiles')
        .select('status')
        .eq('user_id', users.id)
        .maybeSingle();

      return NextResponse.json({
        code: 200,
        message: '登录成功',
        data: {
          token,
          userInfo: {
            id: users.id,
            phone: users.phone,
            role: users.role,
            authStatus: profile?.status || 'pending',
            createdAt: users.created_at
          }
        }
      });
    }

    // 用户不存在，自动注册
    const { data: newUser, error: insertError } = await client
      .from('users')
      .insert({
        phone,
        password,
        role: 'instructor'
      })
      .select()
      .single();

    if (insertError) throw new Error(`注册失败: ${insertError.message}`);

    // 生成 token
    const token = Buffer.from(JSON.stringify({
      userId: newUser.id,
      phone: newUser.phone,
      role: newUser.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000
    })).toString('base64');

    return NextResponse.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        userInfo: {
          id: newUser.id,
          phone: newUser.phone,
          role: newUser.role,
          authStatus: 'pending',
          createdAt: newUser.created_at
        }
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
