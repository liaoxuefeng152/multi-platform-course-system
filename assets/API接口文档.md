# 卖课小程序 API 接口文档

## 一、接口说明

- **Base URL**: `/api`
- **认证方式**: JWT Token（登录后获取）
- **请求格式**: `Content-Type: application/json`
- **响应格式**: 
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

---

## 二、通用接口

### 2.1 登录注册

#### 发送验证码
```
POST /api/auth/send-code
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| type | string | 是 | login/register/forget |

**响应示例**:
```json
{
  "code": 200,
  "message": "验证码已发送",
  "data": { "expiresIn": 60 }
}
```

#### 账号密码登录
```
POST /api/auth/login
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| password | string | 是 | 密码 |
| captcha | string | 是 | 图形验证码 |

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": "U001",
      "phone": "13800138000",
      "nickname": "张老师",
      "avatar": "https://xxx.com/avatar.jpg",
      "role": "instructor",
      "authStatus": "pending"
    }
  }
}
```

#### 微信授权登录
```
POST /api/auth/wechat-login
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 微信授权code |

#### 注册
```
POST /api/auth/register
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| code | string | 是 | 验证码 |
| password | string | 是 | 密码 |

#### 忘记密码
```
POST /api/auth/reset-password
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | 是 | 手机号 |
| code | string | 是 | 验证码 |
| password | string | 是 | 新密码 |

---

## 三、讲师认证

### 3.1 提交认证
```
POST /api/instructor/auth
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | personal/agency |
| name | string | 是 | 姓名/机构名 |
| phone | string | 是 | 联系电话 |
| idCard | string | 否 | 身份证号(个人) |
| idCardFront | string | 否 | 身份证正面照(个人) |
| idCardBack | string | 否 | 身份证反面照(个人) |
| businessLicense | string | 否 | 营业执照(机构) |
| licenseNo | string | 否 | 统一社会信用代码(机构) |

**响应示例**:
```json
{
  "code": 200,
  "message": "提交成功，审核中",
  "data": { "authId": "A001" }
}
```

### 3.2 获取认证状态
```
GET /api/instructor/auth/status
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "status": "pending", // pending/approved/rejected
    "rejectReason": "",
    "submittedAt": "2024-01-15T10:00:00Z"
  }
}
```

### 3.3 人脸识别验证
```
POST /api/instructor/auth/face-verify
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| verifyToken | string | 是 | 人脸识别token |

---

## 四、课程管理

### 4.1 课程列表
```
GET /api/instructor/courses
```
**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页条数，默认10 |
| type | string | 否 | video/audio/article/live |
| status | string | 否 | draft/pending/approved/rejected |
| keyword | string | 否 | 搜索关键词 |

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "id": "C001",
        "title": "Python 从入门到精通",
        "cover": "https://xxx.com/cover.jpg",
        "type": "video",
        "price": 299,
        "sales": 1256,
        "students": 1200,
        "status": "approved",
        "createdAt": "2024-01-10T08:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 50
    }
  }
}
```

### 4.2 创建课程
```
POST /api/instructor/courses
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 课程标题 |
| type | string | 是 | video/audio/article |
| category | string | 是 | 分类ID |
| cover | string | 是 | 封面图 |
| price | number | 是 | 价格(分) |
| validDays | number | 是 | 有效期(天) |
| description | string | 否 | 课程简介 |
| chapters | array | 否 | 章节列表 |
| allowDownload | boolean | 否 | 允许下载 |

### 4.3 更新课程
```
PUT /api/instructor/courses/:id
```

### 4.4 删除课程
```
DELETE /api/instructor/courses/:id
```

### 4.5 课程详情
```
GET /api/instructor/courses/:id
```

### 4.6 提交审核
```
POST /api/instructor/courses/:id/submit
```

### 4.7 上下架
```
PUT /api/instructor/courses/:id/status
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| action | string | 是 | online/offline |

---

## 五、公域直播

### 5.1 直播计划列表
```
GET /api/instructor/public-lives
```
**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 否 | today/upcoming/ended |
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页条数 |

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "id": "LP001",
        "title": "Python 入门第一课",
        "courseId": "C001",
        "courseName": "Python 从入门到精通",
        "platform": "douyin", // douyin/video/kuaishou/xiaohongshu
        "scheduledAt": "2024-01-20T11:00:00Z",
        "status": "today",
        "links": []
      }
    ],
    "pagination": { "page": 1, "pageSize": 10, "total": 20 }
  }
}
```

### 5.2 创建直播计划
```
POST /api/instructor/public-lives
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 直播主题 |
| courseId | string | 是 | 关联课程ID |
| platform | string | 是 | 直播平台 |
| scheduledAt | string | 是 | 直播时间 |

### 5.3 删除直播计划
```
DELETE /api/instructor/public-lives/:id
```

---

## 六、私域课堂

### 6.1 直播课程列表
```
GET /api/instructor/classroom/lives
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "id": "LC001",
        "title": "Python 入门第一课",
        "courseId": "C001",
        "courseName": "Python 从入门到精通",
        "status": "live", // upcoming/live/ended
        "scheduledAt": "2024-01-20T11:00:00Z",
        "duration": 120,
        "students": 256,
        "maxStudents": 300,
        "replayAvailable": true
      }
    ],
    "stats": {
      "total": 20,
      "live": 1,
      "upcoming": 5,
      "ended": 14,
      "totalStudents": 2560
    }
  }
}
```

### 6.2 创建私域直播课
```
POST /api/instructor/classroom/lives
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 课程名称 |
| courseId | string | 是 | 关联课程ID |
| scheduledAt | string | 是 | 开课时间 |
| duration | number | 是 | 课程时长(分钟) |
| maxStudents | number | 是 | 最大人数 |

### 6.3 开始直播
```
POST /api/instructor/classroom/lives/:id/start
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "streamUrl": "rtmp://xxx.com/live/xxx",
    "streamKey": "xxx",
    "roomId": "R001"
  }
}
```

### 6.4 结束直播
```
POST /api/instructor/classroom/lives/:id/end
```

### 6.5 获取直播状态
```
GET /api/instructor/classroom/lives/:id/status
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "status": "live",
    "duration": 3600,
    "onlineStudents": 187,
    "views": 245,
    "messages": [
      {
        "id": "M001",
        "sender": "张小明",
        "content": "老师好",
        "time": "19:01"
      }
    ],
    "raisedHands": [
      { "id": "S001", "name": "李华", "raisedAt": "19:30" }
    ]
  }
}
```

### 6.6 发送聊天消息
```
POST /api/instructor/classroom/lives/:id/messages
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | 是 | 消息内容 |

### 6.7 处理举手
```
POST /api/instructor/classroom/lives/:id/hand-action
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| studentId | string | 是 | 学员ID |
| action | string | 是 | accept/reject |

---

## 七、回放管理

### 7.1 回放列表
```
GET /api/instructor/classroom/replays
```

### 7.2 更新回放
```
PUT /api/instructor/classroom/replays/:id
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 否 | 回放标题 |
| allowPurchase | boolean | 否 | 允许付费观看 |
| price | number | 否 | 付费价格(分) |

### 7.3 删除回放
```
DELETE /api/instructor/classroom/replays/:id
```

---

## 八、多平台对接

### 8.1 获取已绑定账号
```
GET /api/instructor/platforms/bindings
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "douyin": [
      { "id": "DY001", "name": "张老师课堂", "avatar": "xxx", "followers": 125000, "boundAt": "2024-01-10" }
    ],
    "video": [
      { "id": "VH001", "name": "张老师知识分享", "avatar": "xxx", "followers": 45600, "boundAt": "2024-01-12" }
    ],
    "kuaishou": [],
    "xiaohongshu": []
  }
}
```

### 8.2 获取授权二维码
```
GET /api/instructor/platforms/qrcode
```
**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| platform | string | 是 | 平台标识 |

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "qrcodeId": "Q001",
    "qrcodeUrl": "data:image/png;base64,xxx",
    "expireAt": "2024-01-15T12:00:00Z"
  }
}
```

### 8.3 查询扫码状态
```
GET /api/instructor/platforms/qrcode/:id/status
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "status": "scanned" // pending/scanned/authorized/expired
  }
}
```

### 8.4 解绑账号
```
DELETE /api/instructor/platforms/bindings/:id
```

### 8.5 生成挂载链接
```
POST /api/instructor/platforms/mount-links
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| platform | string | 是 | 平台 |
| courseId | string | 是 | 课程ID |
| liveId | string | 否 | 直播ID |

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "link": "https://v.douyin.com/xxx",
    "expiresAt": "2024-12-31T23:59:59Z"
  }
}
```

### 8.6 已挂载课程列表
```
GET /api/instructor/platforms/mounted-courses
```

---

## 九、学员管理

### 9.1 学员列表
```
GET /api/instructor/students
```
**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页条数 |
| status | string | 否 | learning/completed |
| keyword | string | 否 | 搜索关键词 |

### 9.2 学员详情
```
GET /api/instructor/students/:id
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "id": "S001",
    "nickname": "张小明",
    "avatar": "https://xxx.com/avatar.jpg",
    "phone": "138****8000",
    "courses": [
      { "courseId": "C001", "courseName": "Python", "progress": 80, "joinedAt": "2024-01-01" }
    ],
    "orders": [],
    "statistics": {
      "totalCourses": 3,
      "totalHours": 50,
      "lastActivity": "2024-01-15"
    }
  }
}
```

### 9.3 发送消息
```
POST /api/instructor/students/messages
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| studentIds | array | 是 | 学员ID列表 |
| content | string | 是 | 消息内容 |
| type | string | 是 | text/image |

---

## 十、订单管理

### 10.1 订单列表
```
GET /api/instructor/orders
```
**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页条数 |
| status | string | 否 | paid/refunded |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "id": "O001",
        "orderNo": "202401151234567890",
        "studentName": "张小明",
        "courseName": "Python 从入门到精通",
        "amount": 29900,
        "status": "paid",
        "createdAt": "2024-01-15T10:00:00Z",
        "paidAt": "2024-01-15T10:01:00Z"
      }
    ],
    "stats": {
      "totalOrders": 1256,
      "totalAmount": 35678000,
      "todayOrders": 12,
      "todayAmount": 358800
    }
  }
}
```

---

## 十一、数据统计

### 11.1 销售统计
```
GET /api/instructor/stats/sales
```
**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| period | string | 是 | day/week/month/year |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "total": 35678000,
    "trend": [
      { "date": "2024-01-01", "amount": 1200000 },
      { "date": "2024-01-02", "amount": 1500000 }
    ]
  }
}
```

### 11.2 课程统计
```
GET /api/instructor/stats/courses
```

### 11.3 学员统计
```
GET /api/instructor/stats/students
```

### 11.4 直播统计
```
GET /api/instructor/stats/lives
```

---

## 十二、提现管理

### 12.1 提现信息
```
GET /api/instructor/withdrawal/info
```
**响应示例**:
```json
{
  "code": 200,
  "data": {
    "balance": 5000000,
    "pendingAmount": 1000000,
    "totalWithdrawn": 20000000,
    "bankAccount": {
      "bank": "中国银行",
      "account": "6222***********1234"
    }
  }
}
```

### 12.2 申请提现
```
POST /api/instructor/withdrawal
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | number | 是 | 提现金额(分) |
| type | string | 是 | bank/wechat |

### 12.3 提现记录
```
GET /api/instructor/withdrawal/records
```

---

## 十三、个人中心

### 13.1 获取个人信息
```
GET /api/instructor/profile
```

### 13.2 更新个人信息
```
PUT /api/instructor/profile
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| nickname | string | 否 | 昵称 |
| avatar | string | 否 | 头像 |

### 13.3 修改密码
```
PUT /api/instructor/profile/password
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| oldPassword | string | 是 | 原密码 |
| newPassword | string | 是 | 新密码 |

### 13.4 通知设置
```
PUT /api/instructor/profile/notification
```
**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| system | boolean | 否 | 系统通知 |
| student | boolean | 否 | 学员通知 |
| audit | boolean | 否 | 审核通知 |

---

## 十四、错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未登录或Token过期 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

## 十五、WebSocket 实时通信

### 私域直播实时消息
```
ws://domain.com/ws/live/:roomId?token=xxx
```

**消息类型**:
| type | 说明 |
|------|------|
| viewer_join | 学员进入 |
| viewer_leave | 学员离开 |
| message | 聊天消息 |
| hand_raise | 举手 |
| hand_lower | 放下手 |
| mic_on | 开启麦克风 |
| mic_off | 关闭麦克风 |
| live_start | 直播开始 |
| live_end | 直播结束 |
