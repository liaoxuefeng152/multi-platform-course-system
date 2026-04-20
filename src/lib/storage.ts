import { S3Storage } from 'coze-coding-dev-sdk';

// 初始化对象存储客户端
export const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME,
  region: 'cn-beijing',
});

/**
 * 上传文件到对象存储
 * @param fileContent 文件内容 (Buffer)
 * @param fileName 文件名
 * @param contentType MIME类型
 * @param prefix 存储路径前缀 (可选)
 * @returns 文件存储的 key
 */
export async function uploadFile(
  fileContent: Buffer,
  fileName: string,
  contentType: string,
  prefix?: string
): Promise<string> {
  const fullFileName = prefix ? `${prefix}/${fileName}` : fileName;
  
  const key = await storage.uploadFile({
    fileContent,
    fileName: fullFileName,
    contentType,
  });
  
  return key;
}

/**
 * 生成文件的签名访问 URL
 * @param key 文件存储的 key
 * @param expireTime 过期时间（秒），默认 1 天
 * @returns 签名访问 URL
 */
export async function getFileUrl(
  key: string,
  expireTime: number = 86400
): Promise<string> {
  return await storage.generatePresignedUrl({
    key,
    expireTime,
  });
}

/**
 * 删除文件
 * @param key 文件存储的 key
 * @returns 是否删除成功
 */
export async function deleteFile(key: string): Promise<boolean> {
  return await storage.deleteFile({
    fileKey: key,
  });
}

/**
 * 检查文件是否存在
 * @param key 文件存储的 key
 * @returns 文件是否存在
 */
export async function fileExists(key: string): Promise<boolean> {
  return await storage.fileExists({
    fileKey: key,
  });
}
