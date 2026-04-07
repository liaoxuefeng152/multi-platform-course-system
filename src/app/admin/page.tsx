import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  ShoppingCart,
  TrendingUp,
  FileCheck,
  UserCheck,
  Settings
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* 平台数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总讲师数</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> 本月新增
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总学员数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+345</span> 本月新增
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总课程数</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> 本月新增
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总销售额</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥456,789</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> 较上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">直播场次</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              本月累计
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 待处理事项 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>待处理审核</CardTitle>
            <CardDescription>需要您审核的内容</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/content">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">课程审核</div>
                    <div className="text-sm text-muted-foreground">12 个课程待审核</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  立即处理
                </Button>
              </div>
            </Link>

            <Link href="/admin/accounts">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium">讲师认证</div>
                    <div className="text-sm text-muted-foreground">5 个认证待审核</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  立即处理
                </Button>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>平台动态</CardTitle>
            <CardDescription>最近的重要事件</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <div className="text-sm font-medium">新注册讲师 +12</div>
                <div className="text-xs text-muted-foreground">今天</div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <div className="text-sm font-medium">平台销售额突破 ¥45万</div>
                <div className="text-xs text-muted-foreground">今天</div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <div className="text-sm font-medium">直播转化率提升 5.2%</div>
                <div className="text-xs text-muted-foreground">昨天</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 功能入口 */}
      <Card>
        <CardHeader>
          <CardTitle>快速导航</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin/accounts">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">账号管理</div>
                    <div className="text-xs text-muted-foreground">讲师和学员账号管理</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/admin/content">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">内容审核</div>
                    <div className="text-xs text-muted-foreground">课程和直播内容审核</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/admin/orders">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">订单管理</div>
                    <div className="text-xs text-muted-foreground">平台订单和退款管理</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">平台设置</div>
                    <div className="text-xs text-muted-foreground">基础设置和支付配置</div>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/admin/analytics">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">数据统计</div>
                    <div className="text-xs text-muted-foreground">平台数据分析报表</div>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
