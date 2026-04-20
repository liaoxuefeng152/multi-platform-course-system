# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   ├── env.ts          # 环境变量配置
│   │   ├── storage.ts      # 对象存储封装
│   │   └── utils.ts        # 通用工具函数 (cn)
│   ├── storage/
│   │   └── database/       # 数据库相关
│   │       ├── supabase-client.ts  # Supabase 客户端
│   │       └── shared/
│   │           └── schema.ts        # 数据表定义
│   └── server.ts           # 自定义服务端入口
├── .env.example            # 环境变量配置示例
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

- **项目理解加速**：初始可以依赖项目下`package.json`文件理解项目类型，如果没有或无法理解退化成阅读其他文件。
- **Hydration 错误预防**：严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。


## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

## 集成服务

### 环境变量配置
- **配置文件**: `src/lib/env.ts` - 统一的环境变量访问接口
- **配置示例**: `.env.example` - 环境变量配置示例
- **使用方式**:
  ```typescript
  import { PROJECT_ENV, SUPABASE_CONFIG, STORAGE_CONFIG, APP_CONFIG } from '@/lib/env';
  
  // 获取项目信息
  const domain = PROJECT_ENV.DOMAIN;
  const isProd = PROJECT_ENV.IS_PROD;
  
  // 获取配置
  const supabaseUrl = SUPABASE_CONFIG.URL;
  const storageEndpoint = STORAGE_CONFIG.ENDPOINT_URL;
  ```

### 数据库 (Supabase PostgreSQL)
- **表结构**: `src/storage/database/shared/schema.ts`
- **客户端**: `src/storage/database/supabase-client.ts`
- **使用方式**:
  ```typescript
  import { getSupabaseClient } from '@/storage/database/supabase-client';
  const client = getSupabaseClient(); // 服务端操作
  ```

### 对象存储 (S3 Compatible)
- **客户端**: `src/lib/storage.ts`
- **上传 API**: `/api/upload` - 通用文件上传
- **头像 API**: `/api/upload/avatar` - 头像上传
- **封面 API**: `/api/upload/cover` - 课程封面上传
- **使用方式**:
  ```typescript
  import { uploadFile, getFileUrl, deleteFile } from '@/lib/storage';
  const key = await uploadFile(buffer, fileName, contentType, prefix);
  const url = await getFileUrl(key, 86400);
  ```


