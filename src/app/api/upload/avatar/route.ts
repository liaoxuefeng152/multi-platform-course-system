import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, getFileUrl } from '@/lib/storage';

// 头像大小限制 (2MB)
const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

// 允许的头像类型
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// POST: 上传头像
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { code: 400, message: '请选择要上传的头像', data: null },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { code: 400, message: '头像仅支持 JPG、PNG、GIF、WebP 格式', data: null },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_AVATAR_SIZE) {
      return NextResponse.json(
        { code: 400, message: '头像大小不能超过 2MB', data: null },
        { status: 400 }
      );
    }

    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 生成文件名
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `avatar_${timestamp}.${fileExt}`;

    // 上传文件
    const key = await uploadFile(buffer, fileName, file.type, 'avatars');

    // 生成访问 URL (30天有效期)
    const url = await getFileUrl(key, 30 * 24 * 60 * 60);

    return NextResponse.json({
      code: 200,
      message: '上传成功',
      data: {
        key,
        url,
        fileName: file.name,
        fileSize: file.size,
      }
    });
  } catch (error) {
    console.error('头像上传失败:', error);
    return NextResponse.json(
      { code: 500, message: '头像上传失败', data: null },
      { status: 500 }
    );
  }
}
