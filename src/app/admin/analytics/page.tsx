'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Video,
  ShoppingCart,
  DollarSign,
  Eye,
  Calendar,
  Filter
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState('month');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // 模拟数据
  const overviewData = {
    totalInstructors: 156,
    instructorGrowth: 12.5,
    totalStudents: 12580,
    studentGrowth: 8.3,
    totalCourses: 428,
    courseGrowth: 15.2,
    totalSales: 2568920,
    salesGrowth: 23.5,
    totalLives: 89,
    liveGrowth: 18.7,
  };

  const salesTrendData = [
    { month: '1月', amount: 186500 },
    { month: '2月', amount: 245600 },
    { month: '3月', amount: 312400 },
    { month: '4月', amount: 278900 },
    { month: '5月', amount: 356200 },
    { month: '6月', amount: 398600 },
    { month: '7月', amount: 425800 },
    { month: '8月', amount: 489200 },
    { month: '9月', amount: 512400 },
    { month: '10月', amount: 568900 },
    { month: '11月', amount: 623500 },
    { month: '12月', amount: 698800 },
  ];

  const topCourses = [
    { rank: 1, title: 'Python 入门到精通', instructor: '李老师', sales: 1256, revenue: 249844 },
    { rank: 2, title: '短视频运营全攻略', instructor: '王老师', sales: 986, revenue: 294814 },
    { rank: 3, title: 'Excel 数据分析实战', instructor: '张老师', sales: 856, revenue: 110524 },
    { rank: 4, title: '职场沟通技巧', instructor: '陈老师', sales: 742, revenue: 73458 },
    { rank: 5, title: '摄影基础教程', instructor: '刘老师', sales: 698, revenue: 138902 },
  ];

  const topInstructors = [
    { rank: 1, name: '李老师', avatar: 'L', courses: 12, students: 3562, revenue: 458920 },
    { rank: 2, name: '王老师', avatar: 'W', courses: 8, students: 2896, revenue: 389450 },
    { rank: 3, name: '张老师', avatar: 'Z', courses: 15, students: 2456, revenue: 312800 },
    { rank: 4, name: '陈老师', avatar: 'C', courses: 10, students: 1985, revenue: 256780 },
    { rank: 5, name: '刘老师', avatar: 'L', courses: 6, students: 1562, revenue: 198450 },
  ];

  const liveData = [
    { rank: 1, title: '新年特惠直播专场', instructor: '李老师', platform: '抖音', viewers: 12560, orders: 356, conversion: '2.8%' },
    { rank: 2, title: 'Python 实战分享', instructor: '王老师', platform: '视频号', viewers: 8960, orders: 245, conversion: '2.7%' },
    { rank: 3, title: '职场技能提升指南', instructor: '张老师', platform: '双平台', viewers: 15890, orders: 412, conversion: '2.6%' },
    { rank: 4, title: '摄影后期教学', instructor: '刘老师', platform: '抖音', viewers: 6540, orders: 178, conversion: '2.7%' },
    { rank: 5, title: '数据分析入门', instructor: '陈老师', platform: '视频号', viewers: 5680, orders: 156, conversion: '2.7%' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万';
    }
    return num.toLocaleString();
  };

  const formatCurrency = (num: number) => {
    return '¥' + num.toLocaleString();
  };

  const getTrendIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getTrendClass = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const maxSales = Math.max(...salesTrendData.map((d) => d.amount));

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">数据统计</h1>
          <p className="text-muted-foreground mt-1">平台整体数据概览和分析报表</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">今天</SelectItem>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="year">本年</SelectItem>
              <SelectItem value="all">全部时间</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* 数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">讲师总数</p>
                <p className="text-2xl font-bold mt-1">{formatNumber(overviewData.totalInstructors)}</p>
                <div className={`flex items-center gap-1 mt-1 ${getTrendClass(overviewData.instructorGrowth)}`}>
                  {getTrendIcon(overviewData.instructorGrowth)}
                  <span className="text-sm">{overviewData.instructorGrowth}%</span>
                </div>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">学员总数</p>
                <p className="text-2xl font-bold mt-1">{formatNumber(overviewData.totalStudents)}</p>
                <div className={`flex items-center gap-1 mt-1 ${getTrendClass(overviewData.studentGrowth)}`}>
                  {getTrendIcon(overviewData.studentGrowth)}
                  <span className="text-sm">{overviewData.studentGrowth}%</span>
                </div>
              </div>
              <Users className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">课程总数</p>
                <p className="text-2xl font-bold mt-1">{formatNumber(overviewData.totalCourses)}</p>
                <div className={`flex items-center gap-1 mt-1 ${getTrendClass(overviewData.courseGrowth)}`}>
                  {getTrendIcon(overviewData.courseGrowth)}
                  <span className="text-sm">{overviewData.courseGrowth}%</span>
                </div>
              </div>
              <BookOpen className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总销售额</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(overviewData.totalSales)}</p>
                <div className={`flex items-center gap-1 mt-1 ${getTrendClass(overviewData.salesGrowth)}`}>
                  {getTrendIcon(overviewData.salesGrowth)}
                  <span className="text-sm">{overviewData.salesGrowth}%</span>
                </div>
              </div>
              <DollarSign className="w-10 h-10 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">直播场次</p>
                <p className="text-2xl font-bold mt-1">{formatNumber(overviewData.totalLives)}</p>
                <div className={`flex items-center gap-1 mt-1 ${getTrendClass(overviewData.liveGrowth)}`}>
                  {getTrendIcon(overviewData.liveGrowth)}
                  <span className="text-sm">{overviewData.liveGrowth}%</span>
                </div>
              </div>
              <Video className="w-10 h-10 text-red-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 图表和数据报表 */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">销售趋势</TabsTrigger>
          <TabsTrigger value="courses">课程排行</TabsTrigger>
          <TabsTrigger value="instructors">讲师排行</TabsTrigger>
          <TabsTrigger value="lives">直播数据</TabsTrigger>
        </TabsList>

        {/* 销售趋势 */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>销售额趋势</CardTitle>
              <CardDescription>近12个月销售额变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 简化的柱状图 */}
              <div className="h-[300px] flex items-end justify-between gap-2">
                {salesTrendData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t transition-all hover:from-purple-600 hover:to-purple-400"
                      style={{ height: `${(item.amount / maxSales) * 250}px` }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
                  </div>
                ))}
              </div>
              {/* 数据统计 */}
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-muted-foreground">本月销售额</p>
                  <p className="text-xl font-bold mt-1">{formatCurrency(salesTrendData[11].amount)}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-muted-foreground">环比增长</p>
                  <p className="text-xl font-bold mt-1 text-green-600">+12.1%</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-muted-foreground">年度累计</p>
                  <p className="text-xl font-bold mt-1">{formatCurrency(overviewData.totalSales)}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-muted-foreground">日均销售</p>
                  <p className="text-xl font-bold mt-1">{formatCurrency(Math.round(overviewData.totalSales / 365))}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 课程排行 */}
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>课程销量排行</CardTitle>
                  <CardDescription>按销量和销售额排序的热门课程</CardDescription>
                </div>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-[120px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="筛选" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="video">视频课</SelectItem>
                    <SelectItem value="audio">音频课</SelectItem>
                    <SelectItem value="article">图文课</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">排名</TableHead>
                    <TableHead>课程名称</TableHead>
                    <TableHead>讲师</TableHead>
                    <TableHead className="text-right">销量</TableHead>
                    <TableHead className="text-right">销售额</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCourses.map((course) => (
                    <TableRow key={course.rank}>
                      <TableCell>
                        <Badge variant={course.rank <= 3 ? 'default' : 'outline'}>
                          {course.rank <= 3 ? `TOP ${course.rank}` : course.rank}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell className="text-right">{course.sales.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        {formatCurrency(course.revenue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 讲师排行 */}
        <TabsContent value="instructors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>讲师收入排行</CardTitle>
              <CardDescription>按收入和学员数排序的热门讲师</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">排名</TableHead>
                    <TableHead>讲师</TableHead>
                    <TableHead className="text-right">课程数</TableHead>
                    <TableHead className="text-right">学员数</TableHead>
                    <TableHead className="text-right">总收入</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topInstructors.map((instructor) => (
                    <TableRow key={instructor.rank}>
                      <TableCell>
                        <Badge variant={instructor.rank <= 3 ? 'default' : 'outline'}>
                          {instructor.rank <= 3 ? `TOP ${instructor.rank}` : instructor.rank}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                            {instructor.avatar}
                          </div>
                          <span className="font-medium">{instructor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{instructor.courses}</TableCell>
                      <TableCell className="text-right">{instructor.students.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        {formatCurrency(instructor.revenue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 直播数据 */}
        <TabsContent value="lives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>直播数据统计</CardTitle>
              <CardDescription>热门直播的观看人数和转化数据</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">排名</TableHead>
                    <TableHead>直播主题</TableHead>
                    <TableHead>讲师</TableHead>
                    <TableHead>平台</TableHead>
                    <TableHead className="text-right">观看人数</TableHead>
                    <TableHead className="text-right">下单数</TableHead>
                    <TableHead className="text-right">转化率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {liveData.map((live) => (
                    <TableRow key={live.rank}>
                      <TableCell>
                        <Badge variant={live.rank <= 3 ? 'default' : 'outline'}>
                          {live.rank <= 3 ? `TOP ${live.rank}` : live.rank}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{live.title}</TableCell>
                      <TableCell>{live.instructor}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{live.platform}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          {live.viewers.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                          {live.orders}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        {live.conversion}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* 分页 */}
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="cursor-pointer">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
