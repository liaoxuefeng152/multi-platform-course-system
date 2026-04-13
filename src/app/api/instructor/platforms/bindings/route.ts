import { NextRequest, NextResponse } from 'next/server';

// 模拟已绑定账号数据
let bindings = {
  douyin: [
    {
      id: 'DY001',
      name: '张老师课堂',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=douyin',
      followers: 125000,
      boundAt: '2024-01-10T10:00:00Z',
      status: 'active'
    }
  ],
  video: [
    {
      id: 'VH001',
      name: '张老师知识分享',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=video',
      followers: 45600,
      boundAt: '2024-01-12T10:00:00Z',
      status: 'active'
    }
  ],
  kuaishou: [],
  xiaohongshu: []
};

// 模拟二维码记录
const qrcodeStore: Record<string, {
  platform: string;
  status: 'pending' | 'scanned' | 'authorized' | 'expired';
  createdAt: number;
  expiresAt: number;
}> = {};

// GET: 获取已绑定账号
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get('platform');

  if (platform) {
    if (!bindings[platform as keyof typeof bindings]) {
      return NextResponse.json(
        { code: 400, message: '不支持的平台', data: null },
        { status: 400 }
      );
    }
    return NextResponse.json({
      code: 200,
      message: 'success',
      data: bindings[platform as keyof typeof bindings]
    });
  }

  return NextResponse.json({
    code: 200,
    message: 'success',
    data: bindings
  });
}

// POST: 模拟扫码授权（测试用）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qrcodeId, action } = body;

    if (action === 'authorize') {
      // 模拟授权成功
      if (qrcodeStore[qrcodeId]) {
        qrcodeStore[qrcodeId].status = 'authorized';
        
        // 添加新账号
        const platform = qrcodeStore[qrcodeId].platform;
        const newAccount = {
          id: `${platform.toUpperCase().slice(0, 2)}${Date.now()}`,
          name: `新绑定的账号`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
          followers: Math.floor(Math.random() * 100000),
          boundAt: new Date().toISOString(),
          status: 'active'
        };
        
        bindings[platform as keyof typeof bindings].push(newAccount);
        
        return NextResponse.json({
          code: 200,
          message: '授权成功',
          data: newAccount
        });
      }
    }

    return NextResponse.json(
      { code: 400, message: '参数错误', data: null },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// DELETE: 解绑账号
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const platform = searchParams.get('platform');

  if (!id || !platform) {
    return NextResponse.json(
      { code: 400, message: '缺少参数', data: null },
      { status: 400 }
    );
  }

  const platformBindings = bindings[platform as keyof typeof bindings];
  if (!platformBindings) {
    return NextResponse.json(
      { code: 400, message: '不支持的平台', data: null },
      { status: 400 }
    );
  }

  const index = platformBindings.findIndex((b: { id: string }) => b.id === id);
  if (index === -1) {
    return NextResponse.json(
      { code: 404, message: '账号不存在', data: null },
      { status: 404 }
    );
  }

  platformBindings.splice(index, 1);

  return NextResponse.json({
    code: 200,
    message: '解绑成功',
    data: null
  });
}
