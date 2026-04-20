/**
 * 环境变量配置
 * 所有环境变量应通过此文件集中管理，避免硬编码
 */

// ==================== 项目配置 ====================
export const PROJECT_ENV = {
  /** 项目工作目录 */
  WORKSPACE_PATH: process.env.COZE_WORKSPACE_PATH || '/workspace/projects',
  /** 对外访问域名 */
  DOMAIN: process.env.COZE_PROJECT_DOMAIN_DEFAULT || 'http://localhost:5000',
  /** 开发/生产环境 */
  NODE_ENV: process.env.COZE_PROJECT_ENV || 'DEV',
  /** 服务监听端口 */
  PORT: parseInt(process.env.DEPLOY_RUN_PORT || '5000', 10),
  /** 是否为生产环境 */
  IS_PROD: process.env.COZE_PROJECT_ENV === 'PROD',
  /** 是否为开发环境 */
  IS_DEV: process.env.COZE_PROJECT_ENV !== 'PROD',
} as const;

// ==================== Supabase 数据库配置 ====================
export const SUPABASE_CONFIG = {
  /** 数据库连接 URL */
  URL: process.env.COZE_SUPABASE_URL || '',
  /** 匿名密钥（前端使用，受 RLS 约束） */
  ANON_KEY: process.env.COZE_SUPABASE_ANON_KEY || '',
  /** 服务端密钥（后端使用，绕过 RLS） */
  SERVICE_ROLE_KEY: process.env.COZE_SUPABASE_SERVICE_ROLE_KEY || '',
} as const;

// ==================== 对象存储配置 ====================
export const STORAGE_CONFIG = {
  /** 对象存储端点 */
  ENDPOINT_URL: process.env.COZE_BUCKET_ENDPOINT_URL || '',
  /** 存储桶名称 */
  BUCKET_NAME: process.env.COZE_BUCKET_NAME || '',
  /** 区域 */
  REGION: process.env.COZE_BUCKET_REGION || 'cn-beijing',
} as const;

// ==================== JWT 密钥配置 ====================
export const JWT_CONFIG = {
  /** JWT 签名密钥 */
  SECRET: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
  /** Token 过期时间（毫秒），默认 7 天 */
  EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN || String(7 * 24 * 60 * 60 * 1000), 10),
} as const;

// ==================== 短信服务配置 ====================
export const SMS_CONFIG = {
  /** 短信验证码过期时间（秒），默认 60 秒 */
  CODE_EXPIRES_IN: parseInt(process.env.SMS_CODE_EXPIRES_IN || '60', 10),
  /** 短信验证码长度 */
  CODE_LENGTH: parseInt(process.env.SMS_CODE_LENGTH || '6', 10),
} as const;

// ==================== 业务配置 ====================
export const APP_CONFIG = {
  /** 应用名称 */
  APP_NAME: process.env.APP_NAME || '卖课小程序',
  /** 默认分页大小 */
  DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE || '10', 10),
  /** 最大分页大小 */
  MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE || '100', 10),
  /** 文件上传大小限制（字节） */
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || String(5 * 1024 * 1024), 10),
  /** 支持的平台 */
  PLATFORMS: ['douyin', 'video', 'kuaishou', 'xiaohongshu'] as const,
} as const;

// ==================== 便捷访问函数 ====================

/**
 * 获取当前域名（带协议）
 */
export function getDomain(): string {
  return PROJECT_ENV.DOMAIN.startsWith('http') 
    ? PROJECT_ENV.DOMAIN 
    : `https://${PROJECT_ENV.DOMAIN}`;
}

/**
 * 检查环境变量是否配置完整
 */
export function checkEnvConfig(): {
  supabase: boolean;
  storage: boolean;
  jwt: boolean;
} {
  return {
    supabase: Boolean(SUPABASE_CONFIG.URL && SUPABASE_CONFIG.ANON_KEY),
    storage: Boolean(STORAGE_CONFIG.ENDPOINT_URL && STORAGE_CONFIG.BUCKET_NAME),
    jwt: Boolean(JWT_CONFIG.SECRET),
  };
}

/**
 * 获取配置摘要（用于日志）
 */
export function getConfigSummary(): Record<string, string | boolean | number> {
  return {
    env: PROJECT_ENV.NODE_ENV,
    port: PROJECT_ENV.PORT,
    domain: getDomain(),
    hasSupabase: Boolean(SUPABASE_CONFIG.URL),
    hasStorage: Boolean(STORAGE_CONFIG.ENDPOINT_URL),
    isProd: PROJECT_ENV.IS_PROD,
  };
}
