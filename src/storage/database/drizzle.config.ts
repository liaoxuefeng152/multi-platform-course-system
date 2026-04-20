import type { Config } from "drizzle-kit";

export default {
  schema: "/workspace/projects/src/storage/database/shared/schema.ts",
  out: "/workspace/projects/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:4GR7Lfneo7B9l97Cnp@cp-snug-storm-93d69331.pg4.aidap-global.cn-beijing.volces.com:5432/postgres?sslmode=require&channel_binding=require",
  },
} satisfies Config;
