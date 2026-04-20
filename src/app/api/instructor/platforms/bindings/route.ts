import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

interface PlatformBinding {
  id: string;
  user_id: string;
  platform: string;
  platform_account_id: string | null;
  platform_account_name: string | null;
  platform_avatar: string | null;
  followers_count: number;
  status: string;
  bound_at: string;
  created_at: string;
}

interface QrcodeRecord {
  id: string;
  qrcode_id: string;
  user_id: string | null;
  platform: string;
  status: string;
  expires_at: string;
  created_at: string;
}

// 模拟二维码记录
const qrcodeStore: Record<string, {
  platform: string;
  status: 'pending' | 'scanned' | 'authorized' | 'expired';
  createdAt: number;
  expiresAt: number;
}> = {};

// GET: 获取已绑定账号
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const platform = searchParams.get('platform');

    const client = getSupabaseClient();

    if (platform) {
      const validPlatforms = ['douyin', 'video', 'kuaishou', 'xiaohongshu'];
      if (!validPlatforms.includes(platform)) {
        return NextResponse.json(
          { code: 400, message: '不支持的平台', data: null },
          { status: 400 }
        );
      }

      const { data: bindings, error } = await client
        .from('platform_bindings')
        .select('*')
        .eq('platform', platform)
        .eq('status', 'active');

      if (error) throw new Error(`查询绑定失败: ${error.message}`);

      const list = (bindings || []).map((b: PlatformBinding) => ({
        id: b.id,
        name: b.platform_account_name,
        avatar: b.platform_avatar,
        followers: b.followers_count,
        boundAt: b.bound_at,
        status: b.status
      }));

      return NextResponse.json({
        code: 200,
        message: 'success',
        data: list
      });
    }

    // 获取所有绑定
    const { data: allBindings, error } = await client
      .from('platform_bindings')
      .select('*')
      .eq('status', 'active');

    if (error) throw new Error(`查询绑定失败: ${error.message}`);

    const bindings: Record<string, any[]> = {
      douyin: [],
      video: [],
      kuaishou: [],
      xiaohongshu: []
    };

    (allBindings || []).forEach((b: PlatformBinding) => {
      if (bindings[b.platform]) {
        bindings[b.platform].push({
          id: b.id,
          name: b.platform_account_name,
          avatar: b.platform_avatar,
          followers: b.followers_count,
          boundAt: b.bound_at,
          status: b.status
        });
      }
    });

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: bindings
    });
  } catch (error) {
    console.error('获取平台绑定失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// POST: 创建授权二维码 / 模拟授权
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, platform } = body;

    const client = getSupabaseClient();

    if (action === 'createQrcode') {
      // 生成授权二维码
      const validPlatforms = ['douyin', 'video', 'kuaishou', 'xiaohongshu'];
      if (!platform || !validPlatforms.includes(platform)) {
        return NextResponse.json(
          { code: 400, message: '不支持的平台', data: null },
          { status: 400 }
        );
      }

      const qrcodeId = `${platform}_${Date.now()}`;
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5分钟过期

      qrcodeStore[qrcodeId] = {
        platform,
        status: 'pending',
        createdAt: Date.now(),
        expiresAt
      };

      // 存储到数据库
      await client.from('qrcode_records').insert({
        qrcode_id: qrcodeId,
        platform,
        status: 'pending',
        expires_at: new Date(expiresAt).toISOString()
      });

      return NextResponse.json({
        code: 200,
        message: '二维码已生成',
        data: {
          qrcodeId,
          expiresIn: 300,
          // 实际应该返回真实二维码URL
          qrcodeUrl: `https://example.com/qrcode/${qrcodeId}`
        }
      });
    }

    if (action === 'authorize') {
      // 模拟授权成功
      const { qrcodeId } = body;

      if (qrcodeStore[qrcodeId]) {
        qrcodeStore[qrcodeId].status = 'authorized';

        const platform = qrcodeStore[qrcodeId].platform;

        // 添加新账号到数据库
        const newAccount = {
          platform,
          platform_account_id: `${platform.toUpperCase().slice(0, 2)}${Date.now()}`,
          platform_account_name: '新绑定的账号',
          platform_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
          followers_count: Math.floor(Math.random() * 100000),
          status: 'active'
        };

        const { data: account, error } = await client
          .from('platform_bindings')
          .insert(newAccount)
          .select()
          .single();

        if (error) throw new Error(`绑定账号失败: ${error.message}`);

        return NextResponse.json({
          code: 200,
          message: '授权成功',
          data: {
            id: account.id,
            name: account.platform_account_name,
            avatar: account.platform_avatar,
            followers: account.followers_count
          }
        });
      }

      return NextResponse.json(
        { code: 400, message: '二维码不存在或已过期', data: null },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { code: 400, message: '参数错误', data: null },
      { status: 400 }
    );
  } catch (error) {
    console.error('平台绑定失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// DELETE: 解绑账号
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const platform = searchParams.get('platform');

    if (!id) {
      return NextResponse.json(
        { code: 400, message: '缺少账号ID', data: null },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();

    const { error } = await client
      .from('platform_bindings')
      .update({ status: 'disabled' })
      .eq('id', id);

    if (error) throw new Error(`解绑失败: ${error.message}`);

    return NextResponse.json({
      code: 200,
      message: '解绑成功',
      data: null
    });
  } catch (error) {
    console.error('解绑失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
