'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  Plus,
  Video,
  Calendar,
  ExternalLink,
  Radio,
  Link2,
  Clock,
  BookOpen,
  Trash2,
  ChevronRight,
  Megaphone,
} from 'lucide-react';

interface LivePlan {
  id: string;
  title: string;
  courseName: string;
  courseId: string;
  platform: 'douyin' | 'video' | 'kuaishou' | 'xiaohongshu';
  scheduledAt: string;
  status: 'upcoming' | 'today' | 'ended';
  links: string[];
}

export default function LiveManagementPage() {
  const [livePlans, setLivePlans] = useState<LivePlan[]>([
    {
      id: 'LP001',
      title: 'Python 入门第一课',
      courseName: 'Python 从入门到精通',
      courseId: 'C001',
      platform: 'douyin',
      scheduledAt: '2024-01-20 19:00',
      status: 'today',
      links: [],
    },
    {
      id: 'LP002',
      title: 'React 核心概念详解',
      courseName: 'React 实战课程',
      courseId: 'C002',
      platform: 'video',
      scheduledAt: '2024-01-22 20:00',
      status: 'upcoming',
      links: [],
    },
    {
      id: 'LP003',
      title: 'TypeScript 进阶技巧',
      courseName: 'TypeScript 深入浅出',
      courseId: 'C003',
      platform: 'kuaishou',
      scheduledAt: '2024-01-25 19:30',
      status: 'upcoming',
      links: [],
    },
    {
      id: 'LP004',
      title: 'Node.js 实战指南',
      courseName: 'Node.js 全栈开发',
      courseId: 'C004',
      platform: 'xiaohongshu',
      scheduledAt: '2024-01-28 20:00',
      status: 'upcoming',
      links: [],
    },
    {
      id: 'LP005',
      title: 'Vue3 入门教程',
      courseName: 'Vue3 实战课程',
      courseId: 'C005',
      platform: 'douyin',
      scheduledAt: '2024-01-15 19:00',
      status: 'ended',
      links: ['https://v.douyin.com/xxx'],
    },
  ]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    platform: '',
    date: '',
    time: '',
  });

  const courses = [
    { id: 'C001', name: 'Python 从入门到精通', price: 299 },
    { id: 'C002', name: 'React 实战课程', price: 399 },
    { id: 'C003', name: 'TypeScript 深入浅出', price: 299 },
    { id: 'C004', name: 'Node.js 全栈开发', price: 499 },
    { id: 'C005', name: 'Vue3 实战课程', price: 299 },
  ];

  const getPlatformInfo = (platform: string) => {
    switch (platform) {
      case 'douyin':
        return { name: '抖音', gradient: 'from-pink-500 to-rose-500' };
      case 'video':
        return { name: '视频号', gradient: 'from-green-500 to-emerald-500' };
      case 'kuaishou':
        return { name: '快手', gradient: 'from-purple-500 to-violet-500' };
      case 'xiaohongshu':
        return { name: '小红书', gradient: 'from-red-500 to-pink-500' };
      default:
        return { name: platform, gradient: 'from-gray-500 to-gray-600' };
    }
  };

  const getStatusBadge = (status: LivePlan['status']) => {
    switch (status) {
      case 'today':
        return <Badge className="bg-red-500 animate-pulse">今日直播</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">待直播</Badge>;
      case 'ended':
        return <Badge variant="secondary">已结束</Badge>;
    }
  };

  const handleAddPlan = () => {
    if (formData.title && formData.course && formData.platform && formData.date && formData.time) {
      const course = courses.find((c) => c.id === formData.course);
      const newPlan: LivePlan = {
        id: `LP${String(livePlans.length + 1).padStart(3, '0')}`,
        title: formData.title,
        courseName: course?.name || '',
        courseId: formData.course,
        platform: formData.platform as LivePlan['platform'],
        scheduledAt: `${formData.date} ${formData.time}`,
        status: 'upcoming',
        links: [],
      };
      setLivePlans([newPlan, ...livePlans]);
      setAddDialogOpen(false);
      setFormData({ title: '', course: '', platform: '', date: '', time: '' });
    }
  };

  const handleDelete = (id: string) => {
    setLivePlans(livePlans.filter((p) => p.id !== id));
  };

  const stats = {
    total: livePlans.length,
    today: livePlans.filter((p) => p.status === 'today').length,
    upcoming: livePlans.filter((p) => p.status === 'upcoming').length,
    ended: livePlans.filter((p) => p.status === 'ended').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/instructor" className="text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">公域直播</h1>
              <p className="text-sm text-muted-foreground">
                规划直播计划，挂载课程链接到抖音/视频号/快手/小红书
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/instructor/platforms">
                <Link2 className="w-4 h-4 mr-2" />
                前往多平台对接
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/instructor/classroom">
                <Video className="w-4 h-4 mr-2" />
                私域课堂
              </Link>
            </Button>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  添加直播计划
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-blue-500" />
                    添加直播计划
                  </DialogTitle>
                  <DialogDescription>规划您的直播安排，选择要挂载的课程</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>直播主题</Label>
                    <Input
                      placeholder="例如：Python 入门第一课"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>选择平台</Label>
                    <Select
                      value={formData.platform}
                      onValueChange={(v) => setFormData({ ...formData, platform: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="请选择直播平台" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="douyin">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-pink-500" />
                            抖音
                          </div>
                        </SelectItem>
                        <SelectItem value="video">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            视频号
                          </div>
                        </SelectItem>
                        <SelectItem value="kuaishou">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                            快手
                          </div>
                        </SelectItem>
                        <SelectItem value="xiaohongshu">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            小红书
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>挂载课程</Label>
                    <Select
                      value={formData.course}
                      onValueChange={(v) => setFormData({ ...formData, course: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="请选择要挂载的课程" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name} - ¥{course.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>直播日期</Label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>直播时间</Label>
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddPlan}>添加计划</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">直播计划</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Calendar className="w-10 h-10 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">今日直播</p>
                  <p className="text-2xl font-bold text-red-500">{stats.today}</p>
                </div>
                <Radio className="w-10 h-10 text-red-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">待直播</p>
                  <p className="text-2xl font-bold text-blue-500">{stats.upcoming}</p>
                </div>
                <Clock className="w-10 h-10 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">已结束</p>
                  <p className="text-2xl font-bold">{stats.ended}</p>
                </div>
                <Video className="w-10 h-10 text-gray-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-500" />
              直播计划
            </CardTitle>
            <CardDescription>规划您的直播安排，创建后前往「多平台对接」生成挂载链接</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>直播主题</TableHead>
                  <TableHead>直播平台</TableHead>
                  <TableHead>挂载课程</TableHead>
                  <TableHead>直播时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {livePlans.map((plan) => {
                  const platformInfo = getPlatformInfo(plan.platform);
                  return (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platformInfo.gradient} flex items-center justify-center`}
                          >
                            <Video className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{plan.title}</p>
                            <p className="text-xs text-gray-500">ID: {plan.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{platformInfo.name}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{plan.courseName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{plan.scheduledAt.split(' ')[0]}</p>
                          <p className="text-gray-500">{plan.scheduledAt.split(' ')[1]}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(plan.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {plan.status !== 'ended' && (
                            <Button size="sm" variant="outline" asChild>
                              <Link href="/instructor/platforms">
                                <Link2 className="w-4 h-4 mr-1" />
                                生成链接
                              </Link>
                            </Button>
                          )}
                          {plan.links.length > 0 && (
                            <Button size="sm" variant="ghost">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              查看
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDelete(plan.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">创建直播计划</p>
                  <p className="text-sm text-gray-500 mt-1">
                    选择直播平台和要挂载的课程，设置直播时间，系统将帮助您管理直播计划。
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">生成挂载链接</p>
                  <p className="text-sm text-gray-500 mt-1">
                    点击「生成链接」跳转至「多平台对接」页面，扫码授权后获取课程挂载链接。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
