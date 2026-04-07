import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Video,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowRight,
  Gift
} from 'lucide-react';

export default function InstructorDashboard() {
  return (
    <div className="space-y-6">
      {/* 数据概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日销售额</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥12,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> 较昨日
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">课程总销量</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> 较上周
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">学员总数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.5%</span> 较上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">直播场次</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              本月已完成
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 快捷操作 */}
      <Card>
        <CardHeader>
          <CardTitle>快捷操作</CardTitle>
          <CardDescription>快速访问常用功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/instructor/courses/create">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">新建课程</div>
                    <div className="text-xs text-muted-foreground">创建新的视频/音频/图文课程</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/instructor/live/create">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">发起直播</div>
                    <div className="text-xs text-muted-foreground">创建抖音/视频号直播预约</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/instructor/marketing">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Gift className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">创建优惠券</div>
                    <div className="text-xs text-muted-foreground">设置满减、折扣等营销活动</div>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 待办事项 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>待处理事项</CardTitle>
            <CardDescription>需要您关注的任务</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div>
                  <div className="text-sm font-medium">3 个退款申请待审核</div>
                  <div className="text-xs text-muted-foreground">请在 24 小时内处理</div>
                </div>
              </div>
              <Link href="/instructor/orders">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <div>
                  <div className="text-sm font-medium">2 个课程待审核</div>
                  <div className="text-xs text-muted-foreground">预计 1-2 个工作日完成审核</div>
                </div>
              </div>
              <Link href="/instructor/courses">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <div className="text-sm font-medium">1 场直播即将开始</div>
                  <div className="text-xs text-muted-foreground">今天 19:00 开始</div>
                </div>
              </div>
              <Link href="/instructor/live">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>数据趋势</CardTitle>
            <CardDescription>最近 7 天的数据变化</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">销售转化率</span>
              </div>
              <span className="text-sm font-medium">32.5%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '32.5%' }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm">学员活跃度</span>
              </div>
              <span className="text-sm font-medium">68.2%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '68.2%' }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-purple-600" />
                <span className="text-sm">直播完播率</span>
              </div>
              <span className="text-sm font-medium">45.8%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '45.8%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 热门课程 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>热门课程</CardTitle>
            <CardDescription>销量最高的课程</CardDescription>
          </div>
          <Link href="/instructor/courses">
            <Button variant="outline" size="sm">
              查看全部
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Python 入门到精通', sales: 456, price: '¥199', students: 456, growth: '+15%' },
              { name: 'Excel 数据分析实战', sales: 389, price: '¥129', students: 389, growth: '+12%' },
              { name: '短视频运营全攻略', sales: 312, price: '¥299', students: 312, growth: '+18%' },
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{index + 1}</Badge>
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.students} 学员 · {course.sales} 销量
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{course.price}</div>
                  <div className="text-xs text-green-600">{course.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
