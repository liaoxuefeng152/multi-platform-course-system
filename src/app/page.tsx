import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* 头部 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            多平台卖课管理系统
          </h1>
          <p className="text-lg text-muted-foreground">
            支持抖音、视频号直播卖课的一体化管理平台
          </p>
        </div>

        {/* 功能入口卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 讲师端入口 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 cursor-pointer">
            <Link href="/instructor">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl mt-4">讲师端</CardTitle>
                <CardDescription className="text-base">
                  课程管理、直播卖课、学员管理、营销工具
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full group-hover:bg-blue-600 transition-colors">
                  进入讲师端
                </Button>
              </CardContent>
            </Link>
          </Card>

          {/* 管理后台入口 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-500 cursor-pointer">
            <Link href="/admin">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl mt-4">管理后台</CardTitle>
                <CardDescription className="text-base">
                  账号审核、内容审核、订单管理、平台设置
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full group-hover:bg-purple-600 transition-colors" variant="secondary">
                  进入管理后台
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* 特性说明 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
            <div className="text-2xl font-bold text-blue-600">多平台</div>
            <div className="text-sm text-muted-foreground">抖音+视频号</div>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
            <div className="text-2xl font-bold text-purple-600">直播卖课</div>
            <div className="text-sm text-muted-foreground">实时转化</div>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
            <div className="text-2xl font-bold text-green-600">智能管理</div>
            <div className="text-sm text-muted-foreground">全流程跟踪</div>
          </div>
          <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur">
            <div className="text-2xl font-bold text-orange-600">数据分析</div>
            <div className="text-sm text-muted-foreground">优化决策</div>
          </div>
        </div>
      </div>
    </div>
  );
}
