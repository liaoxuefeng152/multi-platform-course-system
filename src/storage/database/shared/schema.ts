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
    nickname: varchar("nickname", { length: 50 }),
    avatar: text("avatar"),
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
    cover_key: text("cover_key"),
    price: integer("price").notNull().default(0),
    original_price: integer("original_price"),
    category: varchar("category", { length: 50 }),
    type: varchar("type", { length: 20 }).notNull().default("video"), // video | audio | text | live
    lessons_count: integer("lessons_count").notNull().default(0),
    students_count: integer("students_count").notNull().default(0),
    rating: integer("rating").notNull().default(0),
    status: varchar("status", { length: 20 }).notNull().default("draft"), // draft | pending | approved | rejected | published | offline
    rejection_reason: text("rejection_reason"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("courses_user_id_idx").on(table.user_id),
    index("courses_status_idx").on(table.status),
    index("courses_category_idx").on(table.category),
  ]
);

// ==================== 公域直播方案表 ====================
export const publicLivePlans = pgTable(
  "public_live_plans",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    course_id: varchar("course_id", { length: 36 }).notNull().references(() => courses.id),
    platform: varchar("platform", { length: 20 }).notNull(), // douyin | wechat | kuaishou | xiaohongshu
    room_id: varchar("room_id", { length: 100 }),
    status: varchar("status", { length: 20 }).notNull().default("inactive"), // inactive | active | expired
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("public_live_plans_course_id_idx").on(table.course_id),
    index("public_live_plans_platform_idx").on(table.platform),
  ]
);

// ==================== 私域课堂表 ====================
export const privateClassrooms = pgTable(
  "private_classrooms",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    course_id: varchar("course_id", { length: 36 }).notNull().references(() => courses.id),
    name: varchar("name", { length: 100 }).notNull(),
    start_time: timestamp("start_time", { withTimezone: true }),
    end_time: timestamp("end_time", { withTimezone: true }),
    status: varchar("status", { length: 20 }).notNull().default("scheduled"), // scheduled | live | ended | cancelled
    max_students: integer("max_students"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("private_classrooms_course_id_idx").on(table.course_id),
    index("private_classrooms_status_idx").on(table.status),
  ]
);

// ==================== 平台绑定表 ====================
export const platformBindings = pgTable(
  "platform_bindings",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    platform: varchar("platform", { length: 20 }).notNull(), // douyin | wechat | kuaishou | xiaohongshu
    platform_user_id: varchar("platform_user_id", { length: 100 }),
    platform_user_name: varchar("platform_user_name", { length: 100 }),
    access_token: text("access_token"),
    refresh_token: text("refresh_token"),
    token_expires_at: timestamp("token_expires_at", { withTimezone: true }),
    status: varchar("status", { length: 20 }).notNull().default("active"), // active | inactive | expired
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("platform_bindings_user_id_idx").on(table.user_id),
    index("platform_bindings_platform_idx").on(table.platform),
  ]
);

// ==================== 学员表 ====================
export const students = pgTable(
  "students",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    nickname: varchar("nickname", { length: 50 }),
    avatar: text("avatar"),
    source: varchar("source", { length: 50 }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("students_phone_idx").on(table.phone),
  ]
);

// ==================== 订单表 ====================
export const orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    order_no: varchar("order_no", { length: 64 }).notNull().unique(),
    student_id: varchar("student_id", { length: 36 }).references(() => students.id),
    course_id: varchar("course_id", { length: 36 }).notNull().references(() => courses.id),
    instructor_id: varchar("instructor_id", { length: 36 }).notNull().references(() => users.id),
    amount: integer("amount").notNull(),
    pay_amount: integer("pay_amount").notNull(),
    platform_fee: integer("platform_fee").notNull().default(0),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | paid | refunded | cancelled
    payment_method: varchar("payment_method", { length: 20 }),
    payment_time: timestamp("payment_time", { withTimezone: true }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("orders_order_no_idx").on(table.order_no),
    index("orders_student_id_idx").on(table.student_id),
    index("orders_course_id_idx").on(table.course_id),
    index("orders_instructor_id_idx").on(table.instructor_id),
    index("orders_status_idx").on(table.status),
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
    progress: integer("progress").notNull().default(0),
    validity_days: integer("validity_days"),
    start_time: timestamp("start_time", { withTimezone: true }),
    end_time: timestamp("end_time", { withTimezone: true }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("student_courses_student_id_idx").on(table.student_id),
    index("student_courses_course_id_idx").on(table.course_id),
  ]
);

// ==================== 二维码记录表 ====================
export const qrcodeRecords = pgTable(
  "qrcode_records",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    course_id: varchar("course_id", { length: 36 }).references(() => courses.id),
    platform: varchar("platform", { length: 20 }).notNull(),
    qrcode_url: text("qrcode_url").notNull(),
    scene: varchar("scene", { length: 100 }),
    expire_time: timestamp("expire_time", { withTimezone: true }),
    scan_count: integer("scan_count").notNull().default(0),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("qrcode_records_user_id_idx").on(table.user_id),
    index("qrcode_records_course_id_idx").on(table.course_id),
    index("qrcode_records_platform_idx").on(table.platform),
  ]
);
