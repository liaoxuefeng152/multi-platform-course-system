/**
 * API 测试用例
 * 基于 /workspace/projects/assets/API接口文档.md
 */

const BASE_URL = 'http://localhost:5000/api';

// 颜色定义
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

let passed = 0;
let failed = 0;
const results: { name: string; status: 'PASS' | 'FAIL'; message?: string }[] = [];

// 打印结果
function printResult(name: string, isPassed: boolean, message?: string) {
  const status = isPassed ? 'PASS' : 'FAIL';
  const color = isPassed ? colors.green : colors.red;
  console.log(`${color}[${status}]${colors.reset} ${name}`);
  if (message) {
    console.log(`       └─ ${message}`);
  }
  results.push({ name, status: isPassed ? 'PASS' : 'FAIL', message });
  isPassed ? passed++ : failed++;
}

// 全局计数
const globals = { passed: 0, failed: 0 };

// HTTP 请求函数
async function httpRequest(method: string, url: string, body?: object) {
  try {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, data: null, error: String(error) };
  }
}

// 测试分组
interface TestGroup {
  name: string;
  tests: (() => Promise<void>)[];
}

// ============================================
// 一、登录注册模块
// ============================================

async function testAuthLoginSuccess() {
  const res = await httpRequest('POST', `${BASE_URL}/auth/login`, {
    phone: '13800138000',
    password: '123456'
  });
  printResult(
    '登录成功 - 正确账号密码',
    res.status === 200 && res.data?.code === 200 && res.data?.data?.token,
    `返回token: ${res.data?.data?.token ? 'YES' : 'NO'}`
  );
}

async function testAuthLoginWrongPassword() {
  const res = await httpRequest('POST', `${BASE_URL}/auth/login`, {
    phone: '13800138000',
    password: 'wrongpassword'
  });
  printResult(
    '登录失败 - 错误密码',
    res.status === 200 && res.data?.code === 401,
    `错误码: ${res.data?.code}`
  );
}

async function testAuthLoginMissingParams() {
  const res = await httpRequest('POST', `${BASE_URL}/auth/login`, {
    phone: '13800138000'
    // 缺少password
  });
  printResult(
    '登录失败 - 缺少参数',
    res.status === 400 && res.data?.code === 400,
    `错误码: ${res.data?.code}`
  );
}

async function testAuthSendCodeSuccess() {
  const res = await httpRequest('POST', `${BASE_URL}/auth/send-code`, {
    phone: '13912345678',
    type: 'login'
  });
  printResult(
    '发送验证码 - 成功',
    res.status === 200 && res.data?.code === 200,
    `message: ${res.data?.message}`
  );
}

async function testAuthSendCodeInvalidPhone() {
  const res = await httpRequest('POST', `${BASE_URL}/auth/send-code`, {
    phone: '12345',
    type: 'login'
  });
  printResult(
    '发送验证码 - 无效手机号',
    res.status === 400 && res.data?.code === 400,
    `错误码: ${res.data?.code}`
  );
}

async function testAuthRegisterSuccess() {
  const res = await httpRequest('POST', `${BASE_URL}/auth/register`, {
    phone: '13912345678',
    code: '123456',
    password: '123456'
  });
  printResult(
    '注册 - 成功',
    res.status === 200 && res.data?.code === 200 && res.data?.data?.token,
    `返回token: ${res.data?.data?.token ? 'YES' : 'NO'}`
  );
}

// ============================================
// 二、讲师认证模块
// ============================================

async function testInstructorAuthStatus() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/auth`);
  printResult(
    '获取认证状态',
    res.status === 200 && res.data?.data?.status,
    `status: ${res.data?.data?.status}`
  );
}

async function testInstructorAuthSubmitPersonal() {
  const res = await httpRequest('POST', `${BASE_URL}/instructor/auth`, {
    type: 'personal',
    name: '张老师',
    phone: '13800138000',
    idCard: '110101199001011234'
  });
  printResult(
    '提交个人认证',
    res.status === 200 && res.data?.code === 200,
    `message: ${res.data?.message}`
  );
}

async function testInstructorAuthSubmitMissingInfo() {
  const res = await httpRequest('POST', `${BASE_URL}/instructor/auth`, {
    type: 'personal',
    name: '张老师'
    // 缺少其他必填项
  });
  printResult(
    '提交认证 - 缺少信息',
    res.status === 400 && res.data?.code === 400,
    `错误码: ${res.data?.code}`
  );
}

// ============================================
// 三、课程管理模块
// ============================================

async function testCoursesList() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/courses`);
  printResult(
    '获取课程列表',
    res.status === 200 && Array.isArray(res.data?.data?.list),
    `课程数量: ${res.data?.data?.list?.length}`
  );
}

async function testCoursesListWithFilters() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/courses?status=approved&type=video`);
  printResult(
    '获取课程列表 - 带筛选',
    res.status === 200 && res.data?.data?.pagination,
    `筛选后数量: ${res.data?.data?.pagination?.total}`
  );
}

async function testCoursesListSearch() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/courses?keyword=Python`);
  printResult(
    '搜索课程',
    res.status === 200 && res.data?.data?.list?.length > 0,
    `搜索"Python"结果: ${res.data?.data?.list?.length}条`
  );
}

async function testCoursesCreateSuccess() {
  const res = await httpRequest('POST', `${BASE_URL}/instructor/courses`, {
    title: '测试课程-' + Date.now(),
    type: 'video',
    category: '测试分类',
    price: 19900,
    validDays: 30,
    description: '这是一个测试课程'
  });
  printResult(
    '创建课程 - 成功',
    res.status === 200 && res.data?.data?.id,
    `新课程ID: ${res.data?.data?.id}`
  );
}

async function testCoursesCreateMissingInfo() {
  const res = await httpRequest('POST', `${BASE_URL}/instructor/courses`, {
    title: '测试课程'
    // 缺少其他必填项
  });
  printResult(
    '创建课程 - 缺少信息',
    res.status === 400 && res.data?.code === 400,
    `错误码: ${res.data?.code}`
  );
}

// ============================================
// 四、公域直播模块
// ============================================

async function testPublicLivesList() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/public-lives`);
  printResult(
    '获取直播计划列表',
    res.status === 200 && Array.isArray(res.data?.data?.list),
    `计划数量: ${res.data?.data?.list?.length}, 统计: ${JSON.stringify(res.data?.data?.stats)}`
  );
}

async function testPublicLivesListWithStatus() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/public-lives?status=upcoming`);
  printResult(
    '获取直播计划 - 待直播',
    res.status === 200 && res.data?.data?.list?.every((l: { status: string }) => l.status === 'upcoming'),
    `待直播数量: ${res.data?.data?.list?.length}`
  );
}

async function testPublicLivesCreateSuccess() {
  const res = await httpRequest('POST', `${BASE_URL}/instructor/public-lives`, {
    title: '公域直播测试-' + Date.now(),
    courseId: 'C001',
    courseName: 'Python 从入门到精通',
    platform: 'douyin',
    scheduledAt: '2024-12-31T12:00:00Z'
  });
  printResult(
    '创建直播计划 - 成功',
    res.status === 200 && res.data?.data?.id,
    `新计划ID: ${res.data?.data?.id}`
  );
}

async function testPublicLivesCreateInvalidPlatform() {
  const res = await httpRequest('POST', `${BASE_URL}/instructor/public-lives`, {
    title: '测试直播',
    courseId: 'C001',
    platform: 'invalid_platform',
    scheduledAt: '2024-12-31T12:00:00Z'
  });
  printResult(
    '创建直播计划 - 无效平台',
    res.status === 400 && res.data?.code === 400,
    `错误码: ${res.data?.code}`
  );
}

async function testPublicLivesDelete() {
  // 先创建
  const createRes = await httpRequest('POST', `${BASE_URL}/instructor/public-lives`, {
    title: '待删除直播-' + Date.now(),
    courseId: 'C001',
    platform: 'video',
    scheduledAt: '2024-12-31T12:00:00Z'
  });
  
  const planId = createRes.data?.data?.id;
  if (planId) {
    const deleteRes = await httpRequest('DELETE', `${BASE_URL}/instructor/public-lives?id=${planId}`);
    printResult(
      '删除直播计划',
      deleteRes.status === 200 && deleteRes.data?.code === 200,
      `删除ID: ${planId}`
    );
  } else {
    printResult('删除直播计划', false, '创建失败，无法测试删除');
  }
}

// ============================================
// 五、私域课堂模块
// ============================================

async function testClassroomLivesList() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/classroom/lives`);
  printResult(
    '获取私域直播列表',
    res.status === 200 && Array.isArray(res.data?.data?.list),
    `课程数量: ${res.data?.data?.list?.length}, 统计: ${JSON.stringify(res.data?.data?.stats)}`
  );
}

async function testClassroomLivesListWithStatus() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/classroom/lives?status=live`);
  printResult(
    '获取私域直播 - 直播中',
    res.status === 200 && res.data?.data?.list?.every((l: { status: string }) => l.status === 'live'),
    `直播中数量: ${res.data?.data?.list?.length}`
  );
}

async function testClassroomLivesCreateSuccess() {
  const res = await httpRequest('POST', `${BASE_URL}/instructor/classroom/lives`, {
    title: '私域直播测试-' + Date.now(),
    courseId: 'C001',
    courseName: 'Python 从入门到精通',
    scheduledAt: '2024-12-31T14:00:00Z',
    duration: 90,
    maxStudents: 200
  });
  printResult(
    '创建私域直播课 - 成功',
    res.status === 200 && res.data?.data?.id,
    `新课程ID: ${res.data?.data?.id}`
  );
}

// ============================================
// 六、多平台对接模块
// ============================================

async function testPlatformsBindingsAll() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/platforms/bindings`);
  printResult(
    '获取所有平台绑定',
    res.status === 200 && res.data?.data,
    `抖音: ${res.data?.data?.douyin?.length}, 视频号: ${res.data?.data?.video?.length}`
  );
}

async function testPlatformsBindingsSingle() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/platforms/bindings?platform=douyin`);
  printResult(
    '获取抖音绑定账号',
    res.status === 200 && Array.isArray(res.data?.data),
    `抖音账号数量: ${res.data?.data?.length}`
  );
}

async function testPlatformsBindingsInvalidPlatform() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/platforms/bindings?platform=invalid`);
  printResult(
    '获取绑定 - 无效平台',
    res.status === 400 && res.data?.code === 400,
    `错误码: ${res.data?.code}`
  );
}

async function testPlatformsUnbindSuccess() {
  // 先添加一个账号再解绑（测试用）
  const bindings = await httpRequest('GET', `${BASE_URL}/instructor/platforms/bindings?platform=video`);
  const videoAccount = bindings.data?.data?.[0];
  
  if (videoAccount) {
    const deleteRes = await httpRequest('DELETE', `${BASE_URL}/instructor/platforms/bindings?id=${videoAccount.id}&platform=video`);
    printResult(
      '解绑账号',
      deleteRes.status === 200 && deleteRes.data?.code === 200,
      `解绑账号: ${videoAccount.name}`
    );
  } else {
    printResult('解绑账号', false, '无可用账号可解绑');
  }
}

// ============================================
// 七、学员管理模块
// ============================================

async function testStudentsList() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/students`);
  printResult(
    '获取学员列表',
    res.status === 200 && Array.isArray(res.data?.data?.list),
    `学员数量: ${res.data?.data?.list?.length}, 统计: ${JSON.stringify(res.data?.data?.stats)}`
  );
}

async function testStudentsListSearch() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/students?keyword=张`);
  printResult(
    '搜索学员',
    res.status === 200 && res.data?.data?.list?.length > 0,
    `搜索"张"结果: ${res.data?.data?.list?.length}条`
  );
}

// ============================================
// 八、订单管理模块
// ============================================

async function testOrdersList() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/orders`);
  printResult(
    '获取订单列表',
    res.status === 200 && Array.isArray(res.data?.data?.list),
    `订单数量: ${res.data?.data?.list?.length}, 统计: ${JSON.stringify(res.data?.data?.stats)}`
  );
}

async function testOrdersListWithFilters() {
  const res = await httpRequest('GET', `${BASE_URL}/instructor/orders?status=paid`);
  printResult(
    '获取订单列表 - 已支付',
    res.status === 200 && res.data?.data?.list?.every((o: { status: string }) => o.status === 'paid'),
    `已支付订单: ${res.data?.data?.list?.length}条`
  );
}

// ============================================
// 运行所有测试
// ============================================

async function runTests() {
  console.log('\n');
  console.log('='.repeat(60));
  console.log(`${colors.blue}卖课小程序 API 测试${colors.reset}`);
  console.log('='.repeat(60));
  console.log(`测试地址: ${BASE_URL}`);
  console.log(`测试时间: ${new Date().toLocaleString('zh-CN')}`);
  console.log('-'.repeat(60));

  const testGroups: TestGroup[] = [
    {
      name: '一、登录注册模块',
      tests: [
        testAuthLoginSuccess,
        testAuthLoginWrongPassword,
        testAuthLoginMissingParams,
        testAuthSendCodeSuccess,
        testAuthSendCodeInvalidPhone,
        testAuthRegisterSuccess
      ]
    },
    {
      name: '二、讲师认证模块',
      tests: [
        testInstructorAuthStatus,
        testInstructorAuthSubmitPersonal,
        testInstructorAuthSubmitMissingInfo
      ]
    },
    {
      name: '三、课程管理模块',
      tests: [
        testCoursesList,
        testCoursesListWithFilters,
        testCoursesListSearch,
        testCoursesCreateSuccess,
        testCoursesCreateMissingInfo
      ]
    },
    {
      name: '四、公域直播模块',
      tests: [
        testPublicLivesList,
        testPublicLivesListWithStatus,
        testPublicLivesCreateSuccess,
        testPublicLivesCreateInvalidPlatform,
        testPublicLivesDelete
      ]
    },
    {
      name: '五、私域课堂模块',
      tests: [
        testClassroomLivesList,
        testClassroomLivesListWithStatus,
        testClassroomLivesCreateSuccess
      ]
    },
    {
      name: '六、多平台对接模块',
      tests: [
        testPlatformsBindingsAll,
        testPlatformsBindingsSingle,
        testPlatformsBindingsInvalidPlatform,
        testPlatformsUnbindSuccess
      ]
    },
    {
      name: '七、学员管理模块',
      tests: [
        testStudentsList,
        testStudentsListSearch
      ]
    },
    {
      name: '八、订单管理模块',
      tests: [
        testOrdersList,
        testOrdersListWithFilters
      ]
    }
  ];

  for (const group of testGroups) {
    console.log(`\n${colors.yellow}[${group.name}]${colors.reset}`);
    console.log('-'.repeat(40));
    
    for (const test of group.tests) {
      await test();
    }
  }

  // 打印汇总
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.blue}测试汇总${colors.reset}`);
  console.log('-'.repeat(40));
  console.log(`总计: ${testGroups.reduce((sum, g) => sum + g.tests.length, 0)} 个`);
  console.log(`${colors.green}通过: ${globals.passed} 个${colors.reset}`);
  console.log(`${colors.red}失败: ${globals.failed} 个${colors.reset}`);
  console.log(`通过率: ${((globals.passed / (globals.passed + globals.failed)) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  // 返回退出码
  process.exit(globals.failed > 0 ? 1 : 0);
}

// 执行测试
runTests().catch(console.error);
