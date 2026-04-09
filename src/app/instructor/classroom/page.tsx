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
  Play,
  Clock,
  Users,
  BookOpen,
  FileText,
  Radio,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Settings,
  GraduationCap,
  Calendar,
  Bell
} from 'lucide-react';

interface LiveClass {
  id: string;
  title: string;
  cover?: string;
  status: 'upcoming' | 'live' | 'ended';
  scheduledAt: string;
  duration: number; // 分钟
  students: number;
  maxStudents: number;
  replayAvailable: boolean;
  courseName: string;
}

export default function ClassroomPage() {
  // 直播课程列表
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([
    {
      id: 'LC001',
      title: 'Python 入门第一课：环境搭建',
      status: 'ended',
      scheduledAt: '2024-01-15 19:00',
      duration: 120,
      students: 256,
      maxStudents: 300,
      replayAvailable: true,
      courseName: 'Python 从入门到精通',
    },
    {
      id: 'LC002',
      title: 'Python 进阶：函数与模块',
      status: 'ended',
      scheduledAt: '2024-01-18 19:00',
      duration: 90,
      students: 198,
      maxStudents: 300,
      replayAvailable: true,
      courseName: 'Python 从入门到精通',
    },
    {
      id: 'LC003',
      title: 'React 核心概念详解',
      status: 'live',
      scheduledAt: '2024-01-20 19:00',
      duration: 120,
      students: 187,
      maxStudents: 200,
      replayAvailable: false,
      courseName: 'React 实战课程',
    },
    {
      id: 'LC004',
      title: 'TypeScript 进阶技巧',
      status: 'upcoming',
      scheduledAt: '2024-01-25 20:00',
      duration: 90,
      students: 0,
      maxStudents: 200,
      replayAvailable: false,
      courseName: 'TypeScript 深入浅出',
    },
    {
      id: 'LC005',
      title: 'Node.js 实战：搭建 RESTful API',
      status: 'upcoming',
      scheduledAt: '2024-01-28 19:30',
      duration: 120,
      students: 0,
      maxStudents: 150,
      replayAvailable: false,
      courseName: 'Node.js 全栈开发',
    },
  ]);

  // 创建直播弹窗状态
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    date: '',
    time: '',
    duration: '90',
    maxStudents: '200',
  });

  // 统计数据
  const stats = {
    total: liveClasses.length,
    live: liveClasses.filter(l => l.status === 'live').length,
    upcoming: liveClasses.filter(l => l.status === 'upcoming').length,
    ended: liveClasses.filter(l => l.status === 'ended').length,
    totalStudents: liveClasses.reduce((sum, l) => sum + l.students, 0),
  };

  // 获取状态标签
  const getStatusBadge = (status: LiveClass['status']) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 animate-pulse">直播中</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">待开始</Badge>;
      case 'ended':
        return <Badge variant="secondary">已结束</Badge>;
    }
  };

  // 处理创建直播
  const handleCreate = () => {
    if (formData.title && formData.course && formData.date && formData.time) {
      const newClass: LiveClass = {
        id: `LC${String(liveClasses.length + 1).padStart(3, '0')}`,
        title: formData.title,
        status: 'upcoming',
        scheduledAt: `${formData.date} ${formData.time}`,
        duration: parseInt(formData.duration),
        students: 0,
        maxStudents: parseInt(formData.maxStudents),
        replayAvailable: false,
        courseName: formData.course,
      };
      setLiveClasses([newClass, ...liveClasses]);
      setCreateDialogOpen(false);
      setFormData({
        title: '',
        course: '',
        date: '',
        time: '',
        duration: '90',
        maxStudents: '200',
      });
    }
  };

  // 格式化学时
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins > 0 ? mins + '分钟' : ''}`;
    }
    return `${mins}分钟`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/instructor" className="text-muted-foreground hover:text-foreground">
              <Video className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">私域课堂</h1>
              <p className="text-sm text-muted-foreground">创建和管理您的在线直播课程</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/instructor/classroom/replay">
                <Eye className="w-4 h-4 mr-2" />
                回放管理
              </Link>
            </Button>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  创建直播课
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    创建直播课程
                  </DialogTitle>
                  <DialogDescription>
                    设置直播课程信息，学员将收到开课提醒
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">课程名称</Label>
                    <Input
                      id="title"
                      placeholder="例如：Python 入门第一课"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">关联课程</Label>
                    <Select value={formData.course} onValueChange={(v) => setFormData({ ...formData, course: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择关联的课程" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Python">Python 从入门到精通</SelectItem>
                        <SelectItem value="React">React 实战课程</SelectItem>
                        <SelectItem value="TypeScript">TypeScript 深入浅出</SelectItem>
                        <SelectItem value="Node">Node.js 全栈开发</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">开课日期</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">开课时间</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">课程时长</Label>
                      <Select value={formData.duration} onValueChange={(v) => setFormData({ ...formData, duration: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 分钟</SelectItem>
                          <SelectItem value="60">1 小时</SelectItem>
                          <SelectItem value="90">1.5 小时</SelectItem>
                          <SelectItem value="120">2 小时</SelectItem>
                          <SelectItem value="180">3 小时</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents">最大人数</Label>
                      <Select value={formData.maxStudents} onValueChange={(v) => setFormData({ ...formData, maxStudents: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 人</SelectItem>
                          <SelectItem value="100">100 人</SelectItem>
                          <SelectItem value="200">200 人</SelectItem>
                          <SelectItem value="500">500 人</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleCreate}>
                    创建课程
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">课程总数</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <BookOpen className="w-10 h-10 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">正在直播</p>
                  <p className="text-2xl font-bold text-red-500">{stats.live}</p>
                </div>
                <Radio className="w-10 h-10 text-red-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">待开课</p>
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
                  <p className="text-sm text-muted-foreground">已完成</p>
                  <p className="text-2xl font-bold">{stats.ended}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">累计学员</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
                <Users className="w-10 h-10 text-purple-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 直播课程列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              直播课程列表
            </CardTitle>
            <CardDescription>
              管理您的在线直播课程，点击&quot;进入教室&quot;开始授课
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>课程信息</TableHead>
                  <TableHead>关联课程</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>上课时间</TableHead>
                  <TableHead>时长</TableHead>
                  <TableHead>学员</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveClasses.map((liveClass) => (
                  <TableRow key={liveClass.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                          liveClass.status === 'live' 
                            ? 'from-red-500 to-orange-500' 
                            : 'from-blue-500 to-purple-500'
                        } flex items-center justify-center`}>
                          {liveClass.status === 'live' ? (
                            <Radio className="w-6 h-6 text-white" />
                          ) : (
                            <Video className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{liveClass.title}</p>
                          <p className="text-xs text-gray-500">ID: {liveClass.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{liveClass.courseName}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(liveClass.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{liveClass.scheduledAt.split(' ')[0]}</p>
                        <p className="text-gray-500">{liveClass.scheduledAt.split(' ')[1]}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDuration(liveClass.duration)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{liveClass.students}/{liveClass.maxStudents}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {liveClass.status === 'live' && (
                          <Button size="sm" asChild className="bg-red-500 hover:bg-red-600">
                            <Link href={`/instructor/classroom/live/${liveClass.id}`}>
                              <Play className="w-4 h-4 mr-1" />
                              进入教室
                            </Link>
                          </Button>
                        )}
                        {liveClass.status === 'upcoming' && (
                          <>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/instructor/classroom/live/${liveClass.id}`}>
                                <Settings className="w-4 h-4 mr-1" />
                                备课
                              </Link>
                            </Button>
                            <Button size="sm" variant="default" className="bg-green-500 hover:bg-green-600">
                              <Bell className="w-4 h-4 mr-1" />
                              提醒
                            </Button>
                          </>
                        )}
                        {liveClass.status === 'ended' && (
                          <>
                            {liveClass.replayAvailable && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/instructor/classroom/replay/${liveClass.id}`}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  查看回放
                                </Link>
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/instructor/classroom/analytics/${liveClass.id}`}>
                                <FileText className="w-4 h-4 mr-1" />
                                数据
                              </Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 功能说明 */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">什么是私域课堂？</p>
                  <p className="text-sm text-gray-500 mt-1">
                    私域课堂是您在平台内开设的直播课程，学员通过微信小程序进入直播间听课。
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">如何开始直播？</p>
                  <p className="text-sm text-gray-500 mt-1">
                    点击&quot;进入教室&quot;即可开启直播，支持屏幕共享、课件展示、学员连麦等教学功能。
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">自动生成回放</p>
                  <p className="text-sm text-gray-500 mt-1">
                    直播结束后系统自动生成回放视频，学员可随时回看，未到场学员也可购买观看。
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
