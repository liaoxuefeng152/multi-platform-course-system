import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, getFileUrl } from '@/lib/storage';

// 文件大小限制 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 允许的文件类型
const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// POST: 上传文件
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = formData.get('type') as string || 'image'; // image | video | audio | document
    const prefix = formData.get('prefix') as string | undefined;

    if (!file) {
      return NextResponse.json(
        { code: 400, message: '请选择要上传的文件', data: null },
        { status: 400 }
      );
    }

    // 验证文件类型
    const allowedMimeTypes = ALLOWED_TYPES[type as keyof typeof ALLOWED_TYPES] || ALLOWED_TYPES.image;
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { code: 400, message: `不支持的文件类型，仅支持: ${allowedMimeTypes.join(', ')}`, data: null },
        { status: 400 }
      );
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { code: 400, message: `文件大小不能超过 ${MAX_FILE_SIZE / 1024 / 1024}MB`, data: null },
        { status: 400 }
      );
    }

    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 生成文件名：类型_时间戳_原文件名
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${type}_${timestamp}_${originalName}`;

    // 上传文件
    const key = await uploadFile(buffer, fileName, file.type, prefix);

    // 生成访问 URL (7天有效期)
    const url = await getFileUrl(key, 7 * 24 * 60 * 60);

    return NextResponse.json({
      code: 200,
      message: '上传成功',
      data: {
        key,
        url,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      }
    });
  } catch (error) {
    console.error('文件上传失败:', error);
    return NextResponse.json(
      { code: 500, message: '文件上传失败', data: null },
      { status: 500 }
    );
  }
}

// GET: 获取文件访问URL
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { code: 400, message: '缺少文件 key', data: null },
        { status: 400 }
      );
    }

    const expireTime = parseInt(searchParams.get('expireTime') || '86400');
    const url = await getFileUrl(key, expireTime);

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: { url }
    });
  } catch (error) {
    console.error('获取文件URL失败:', error);
    return NextResponse.json(
      { code: 500, message: '获取文件URL失败', data: null },
      { status: 500 }
    );
  }
}
