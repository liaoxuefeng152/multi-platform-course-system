import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, getFileUrl } from '@/lib/storage';

// 封面大小限制 (5MB)
const MAX_COVER_SIZE = 5 * 1024 * 1024;

// 允许的封面类型
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// POST: 上传课程封面
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { code: 400, message: '请选择要上传的封面图片', data: null },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { code: 400, message: '封面图片仅支持 JPG、PNG、GIF、WebP 格式', data: null },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_COVER_SIZE) {
      return NextResponse.json(
        { code: 400, message: '封面图片大小不能超过 5MB', data: null },
        { status: 400 }
      );
    }

    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 生成文件名
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `cover_${timestamp}.${fileExt}`;

    // 上传文件
    const key = await uploadFile(buffer, fileName, file.type, 'covers');

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
    console.error('封面上传失败:', error);
    return NextResponse.json(
      { code: 500, message: '封面上传失败', data: null },
      { status: 500 }
    );
  }
}
