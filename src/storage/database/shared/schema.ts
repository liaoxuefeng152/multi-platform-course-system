import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb, index } from "drizzle-orm/pg-core";

// ==================== 用户表 ====================
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).notNull().default("instructor"), // instructor | admin
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("users_phone_idx").on(table.phone),
    index("users_role_idx").on(table.role),
  ]
);

// ==================== 讲师认证表 ====================
export const instructorProfiles = pgTable(
  "instructor_profiles",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    real_name: varchar("real_name", { length: 50 }).notNull(),
    id_card: varchar("id_card", { length: 20 }),
    id_card_front: text("id_card_front"),
    id_card_back: text("id_card_back"),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | approved | rejected
    rejection_reason: text("rejection_reason"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("instructor_profiles_user_id_idx").on(table.user_id),
    index("instructor_profiles_status_idx").on(table.status),
  ]
);

// ==================== 课程表 ====================
export const courses = pgTable(
  "courses",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    cover_image: text("cover_image"),
    price: integer("price").notNull().default(0), // 价格（分）
    original_price: integer("original_price"), // 原价（分）
    category: varchar("category", { length: 50 }),
    lessons_count: integer("lessons_count").default(0),
    students_count: integer("students_count").default(0),
    rating: integer("rating").default(0), // 评分（1-5）
    status: varchar("status", { length: 20 }).notNull().default("draft"), // draft | published | offline
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("courses_user_id_idx").on(table.user_id),
    index("courses_status_idx").on(table.status),
    index("courses_category_idx").on(table.category),
    index("courses_created_at_idx").on(table.created_at),
  ]
);

// ==================== 公域直播计划表 ====================
export const publicLivePlans = pgTable(
  "public_live_plans",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    course_id: varchar("course_id", { length: 36 }).references(() => courses.id),
    platform: varchar("platform", { length: 20 }).notNull(), // douyin | video | kuaishou | xiaohongshu
    platform_account_id: varchar("platform_account_id", { length: 50 }),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    cover_image: text("cover_image"),
    scheduled_at: timestamp("scheduled_at", { withTimezone: true }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("upcoming"), // upcoming | live | ended | cancelled
    viewer_count: integer("viewer_count").default(0),
    sales_count: integer("sales_count").default(0),
    sales_amount: integer("sales_amount").default(0),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("public_live_plans_user_id_idx").on(table.user_id),
    index("public_live_plans_platform_idx").on(table.platform),
    index("public_live_plans_status_idx").on(table.status),
    index("public_live_plans_scheduled_at_idx").on(table.scheduled_at),
  ]
);

// ==================== 私域课堂表 ====================
export const privateClassrooms = pgTable(
  "private_classrooms",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    course_id: varchar("course_id", { length: 36 }).references(() => courses.id),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    cover_image: text("cover_image"),
    teacher_name: varchar("teacher_name", { length: 50 }),
    scheduled_at: timestamp("scheduled_at", { withTimezone: true }),
    duration: integer("duration").default(120), // 时长（分钟）
    status: varchar("status", { length: 20 }).notNull().default("scheduled"), // scheduled | live | ended | cancelled
    students_count: integer("students_count").default(0),
    viewer_count: integer("viewer_count").default(0),
    replay_url: text("replay_url"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("private_classrooms_user_id_idx").on(table.user_id),
    index("private_classrooms_status_idx").on(table.status),
    index("private_classrooms_scheduled_at_idx").on(table.scheduled_at),
  ]
);

// ==================== 平台绑定表 ====================
export const platformBindings = pgTable(
  "platform_bindings",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    platform: varchar("platform", { length: 20 }).notNull(), // douyin | video | kuaishou | xiaohongshu
    platform_account_id: varchar("platform_account_id", { length: 100 }),
    platform_account_name: varchar("platform_account_name", { length: 100 }),
    platform_avatar: text("platform_avatar"),
    followers_count: integer("followers_count").default(0),
    access_token: text("access_token"),
    refresh_token: text("refresh_token"),
    token_expires_at: timestamp("token_expires_at", { withTimezone: true }),
    status: varchar("status", { length: 20 }).notNull().default("active"), // active | expired | disabled
    bound_at: timestamp("bound_at", { withTimezone: true }).defaultNow().notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("platform_bindings_user_id_idx").on(table.user_id),
    index("platform_bindings_platform_idx").on(table.platform),
    index("platform_bindings_status_idx").on(table.status),
  ]
);

// ==================== 学员表 ====================
export const students = pgTable(
  "students",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    nickname: varchar("nickname", { length: 50 }),
    phone: varchar("phone", { length: 20 }),
    avatar: text("avatar"),
    source: varchar("source", { length: 50 }), // live | classroom | direct
    total_courses: integer("total_courses").default(0),
    total_amount: integer("total_amount").default(0), // 累计消费（分）
    last_active_at: timestamp("last_active_at", { withTimezone: true }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("students_user_id_idx").on(table.user_id),
    index("students_phone_idx").on(table.phone),
    index("students_created_at_idx").on(table.created_at),
  ]
);

// ==================== 订单表 ====================
export const orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    order_no: varchar("order_no", { length: 50 }).notNull().unique(),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    student_id: varchar("student_id", { length: 36 }).references(() => students.id),
    course_id: varchar("course_id", { length: 36 }).notNull().references(() => courses.id),
    amount: integer("amount").notNull(), // 订单金额（分）
    original_amount: integer("original_amount"), // 原价（分）
    discount_amount: integer("discount_amount").default(0), // 优惠金额（分）
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | paid | refunded | cancelled
    payment_method: varchar("payment_method", { length: 20 }), // wechat | alipay
    payment_time: timestamp("payment_time", { withTimezone: true }),
    source: varchar("source", { length: 50 }), // live | classroom
    source_id: varchar("source_id", { length: 36 }), // 直播ID或课堂ID
    refund_time: timestamp("refund_time", { withTimezone: true }),
    refund_reason: text("refund_reason"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("orders_user_id_idx").on(table.user_id),
    index("orders_student_id_idx").on(table.student_id),
    index("orders_course_id_idx").on(table.course_id),
    index("orders_status_idx").on(table.status),
    index("orders_created_at_idx").on(table.created_at),
    index("orders_order_no_idx").on(table.order_no),
  ]
);

// ==================== 学员课程关联表 ====================
export const studentCourses = pgTable(
  "student_courses",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    student_id: varchar("student_id", { length: 36 }).notNull().references(() => students.id),
    course_id: varchar("course_id", { length: 36 }).notNull().references(() => courses.id),
    order_id: varchar("order_id", { length: 36 }).references(() => orders.id),
    progress: integer("progress").default(0), // 学习进度（百分比）
    status: varchar("status", { length: 20 }).notNull().default("active"), // active | completed | cancelled
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("student_courses_student_id_idx").on(table.student_id),
    index("student_courses_course_id_idx").on(table.course_id),
  ]
);

// ==================== 二维码记录表（多平台授权） ====================
export const qrcodeRecords = pgTable(
  "qrcode_records",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    qrcode_id: varchar("qrcode_id", { length: 100 }).notNull().unique(),
    user_id: varchar("user_id", { length: 36 }).references(() => users.id),
    platform: varchar("platform", { length: 20 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | scanned | authorized | expired
    expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("qrcode_records_user_id_idx").on(table.user_id),
    index("qrcode_records_status_idx").on(table.status),
  ]
);
