'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Download
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">数据统计</h1>
          <p className="text-muted-foreground">
            查看课程、直播、学员等数据统计报表
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">最近 7 天</SelectItem>
              <SelectItem value="30">最近 30 天</SelectItem>
              <SelectItem value="90">最近 90 天</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">总览</TabsTrigger>
          <TabsTrigger value="courses">课程数据</TabsTrigger>
          <TabsTrigger value="live">直播数据</TabsTrigger>
          <TabsTrigger value="students">学员数据</TabsTrigger>
          <TabsTrigger value="revenue">收入分析</TabsTrigger>
        </TabsList>

        {/* 总览 */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">总销售额</p>
                    <p className="text-2xl font-bold mt-1">¥123,456</p>
                    <p className="text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +15.2%
                    </p>
                  </div>
                  <DollarSign className="w-10 h-10 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">总订单数</p>
                    <p className="text-2xl font-bold mt-1">2,345</p>
                    <p className="text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +8.5%
                    </p>
                  </div>
                  <BookOpen className="w-10 h-10 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">活跃学员</p>
                    <p className="text-2xl font-bold mt-1">3,456</p>
                    <p className="text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +12.3%
                    </p>
                  </div>
                  <Users className="w-10 h-10 text-purple-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">课程转化率</p>
                    <p className="text-2xl font-bold mt-1">32.5%</p>
                    <p className="text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      +2.1%
                    </p>
                  </div>
                  <BarChart3 className="w-10 h-10 text-orange-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">销售趋势</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-muted-foreground">销售趋势图表区域</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">课程销量排行</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Python 入门到精通', sales: 456, revenue: 90744 },
                    { name: 'Excel 数据分析实战', sales: 389, revenue: 50181 },
                    { name: '短视频运营全攻略', sales: 312, revenue: 93288 },
                    { name: '职场沟通技巧', sales: 234, revenue: 23166 },
                    { name: '摄影基础教程', sales: 189, revenue: 13041 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-muted-foreground w-6">
                          {index + 1}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">¥{item.revenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{item.sales} 销量</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 课程数据 */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">课程总数</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">在售课程</p>
                <p className="text-2xl font-bold mt-1">10</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">课程总销量</p>
                <p className="text-2xl font-bold mt-1">1,580</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">课程好评率</p>
                <p className="text-2xl font-bold mt-1">96.5%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">课程数据分析</h3>
              <div className="space-y-4">
                {[
                  { name: 'Python 入门到精通', type: '视频课', students: 456, completion: 78, rating: 4.8 },
                  { name: 'Excel 数据分析实战', type: '视频课', students: 389, completion: 82, rating: 4.7 },
                  { name: '短视频运营全攻略', type: '视频课', students: 312, completion: 75, rating: 4.9 },
                ].map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {course.type} · {course.students} 学员
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">完成率</div>
                        <div className="font-semibold text-lg">{course.completion}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">好评率</div>
                        <div className="font-semibold text-lg text-yellow-500">
                          {course.rating} ★
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 直播数据 */}
        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">直播场次</p>
                <p className="text-2xl font-bold mt-1">23</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">总观看人数</p>
                <p className="text-2xl font-bold mt-1">8,234</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">直播转化数</p>
                <p className="text-2xl font-bold mt-1">456</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">直播销售额</p>
                <p className="text-2xl font-bold mt-1">¥45,678</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">直播数据分析</h3>
              <div className="space-y-4">
                {[
                  { title: 'Python 进阶技巧分享', platform: '抖音', viewers: 1234, conversions: 89, sales: 17800, duration: 120 },
                  { title: 'Excel 数据分析实战', platform: '视频号', viewers: 892, conversions: 67, sales: 13400, duration: 90 },
                  { title: '短视频运营技巧', platform: '抖音', viewers: 1567, conversions: 134, sales: 26800, duration: 150 },
                ].map((live, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{live.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {live.platform} · {live.duration} 分钟
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">观看人数</div>
                        <div className="font-semibold text-lg">{live.viewers}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">转化人数</div>
                        <div className="font-semibold text-lg">{live.conversions}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">销售额</div>
                        <div className="font-semibold text-lg text-green-600">¥{live.sales.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 学员数据 */}
        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">学员总数</p>
                <p className="text-2xl font-bold mt-1">5,678</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">活跃学员</p>
                <p className="text-2xl font-bold mt-1">3,456</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">新增学员</p>
                <p className="text-2xl font-bold mt-1">234</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">复购率</p>
                <p className="text-2xl font-bold mt-1">32.5%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">学员活跃度分析</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-muted-foreground">学员活跃度图表区域</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 收入分析 */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">本月收入</p>
                <p className="text-2xl font-bold mt-1">¥45,678</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +15.2%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">待结算金额</p>
                <p className="text-2xl font-bold mt-1">¥12,345</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">可提现金额</p>
                <p className="text-2xl font-bold mt-1">¥8,901</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">已提现金额</p>
                <p className="text-2xl font-bold mt-1">¥33,333</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">收入趋势</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-muted-foreground">收入趋势图表区域</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">收入来源分析</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold">¥28,456</div>
                  <div className="text-sm text-muted-foreground mt-1">课程销售</div>
                  <div className="text-xs text-green-600 mt-1">62%</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold">¥12,345</div>
                  <div className="text-sm text-muted-foreground mt-1">直播销售</div>
                  <div className="text-xs text-blue-600 mt-1">27%</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-bold">¥4,877</div>
                  <div className="text-sm text-muted-foreground mt-1">其他收入</div>
                  <div className="text-xs text-purple-600 mt-1">11%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
