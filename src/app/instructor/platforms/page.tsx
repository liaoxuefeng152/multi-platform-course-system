'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  ArrowLeft,
  Link2,
  Unlink,
  RefreshCw,
  CheckCircle,
  ExternalLink,
  Video,
  Copy,
  Zap,
  BookOpen,
  HelpCircle,
  ChevronRight,
  Smartphone,
  FileText,
  PlayCircle,
  Check
} from 'lucide-react';

interface BoundAccount {
  id: string;
  name: string;
  boundAt: string;
  status: 'active' | 'inactive';
  followers: number;
}

interface MountedCourse {
  id: number;
  title: string;
  platform: string;
  linkedAt: string;
  views: number;
}

export default function PlatformLinksPage() {
  const [bindDialogOpen, setBindDialogOpen] = useState(false);
  const [unbindDialogOpen, setUnbindDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [copied, setCopied] = useState(false);

  // 挂载相关状态
  const [mountPlatform] = useState<'douyin' | 'video'>('douyin');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLive, setSelectedLive] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState<string[]>([]);

  // 抖音已绑定账号
  const [douyinAccounts, setDouyinAccounts] = useState<BoundAccount[]>([
    {
      id: 'DY001',
      name: '张老师课堂',
      boundAt: '2024-01-10',
      status: 'active',
      followers: 125000,
    },
  ]);

  // 视频号已绑定账号
  const [videoAccounts, setVideoAccounts] = useState<BoundAccount[]>([
    {
      id: 'VH001',
      name: '张老师知识分享',
      boundAt: '2024-01-12',
      status: 'active',
      followers: 45600,
    },
  ]);

  // 已挂载课程
  const [mountedCourses, setMountedCourses] = useState<MountedCourse[]>([
    {
      id: 1,
      title: 'Python 从入门到精通',
      platform: '抖音',
      linkedAt: '2024-01-15',
      views: 12500,
    },
    {
      id: 2,
      title: '短视频运营实战课',
      platform: '视频号',
      linkedAt: '2024-01-14',
      views: 8900,
    },
  ]);

  // 课程列表
  const courses = [
    { id: '1', title: 'Python 从入门到精通', price: 199 },
    { id: '2', title: '短视频运营实战课', price: 299 },
    { id: '3', title: 'Excel 数据分析实战', price: 129 },
    { id: '4', title: '职场沟通技巧', price: 99 },
  ];

  // 直播列表
  const lives = [
    { id: '1', title: '前端开发实战直播', time: '2024-03-16 20:00' },
    { id: '2', title: 'Python 进阶技巧分享', time: '2024-03-15 19:00' },
  ];

  const handleBind = () => {
    // 模拟绑定流程
    setBindDialogOpen(false);
    alert('即将跳转平台授权页面，请完成授权操作');
  };

  const handleUnbind = (platform: string) => {
    if (platform === 'douyin') {
      setDouyinAccounts([]);
    } else {
      setVideoAccounts([]);
    }
    setUnbindDialogOpen(false);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncDialogOpen(false);
      alert('数据同步完成');
    }, 2000);
  };

  const handleGenerateLinks = () => {
    if (selectedCourse || selectedLive) {
      const newLinks = [
        `https://v.douyin.com/xxx/${Date.now()}`,
        `https://haokan.baidu.com/v?vid=xxx`
      ];
      setGeneratedLinks(newLinks);
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMountCourse = () => {
    if (selectedCourse && selectedLive) {
      const course = courses.find(c => c.id === selectedCourse);
      setMountedCourses([
        ...mountedCourses,
        {
          id: Date.now(),
          title: course?.title || '',
          platform: mountPlatform === 'douyin' ? '抖音' : '视频号',
          linkedAt: new Date().toLocaleDateString(),
          views: 0,
        },
      ]);
      alert('课程挂载成功');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/instructor" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold">多平台对接</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSyncDialogOpen(true)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            同步数据
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <Tabs defaultValue="douyin" className="space-y-6">
          <TabsList>
            <TabsTrigger value="douyin" className="gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              抖音
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              视频号
            </TabsTrigger>
            <TabsTrigger value="mount" className="gap-2">
              <Link2 className="w-4 h-4" />
              挂载入口
            </TabsTrigger>
          </TabsList>

          {/* 抖音账号绑定 */}
          <TabsContent value="douyin">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧绑定指引 */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-pink-500" />
                    抖音绑定教程
                  </CardTitle>
                  <CardDescription>按照以下步骤完成抖音账号绑定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 font-bold shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-medium">打开抖音开放平台</p>
                        <p className="text-sm text-gray-500">访问抖音开放平台官网</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 font-bold shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-medium">创建应用并获取授权</p>
                        <p className="text-sm text-gray-500">完成开发者认证后创建应用</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 font-bold shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-medium">填写授权信息</p>
                        <p className="text-sm text-gray-500">将 App ID 和 App Secret 填入下方</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-3">帮助资源</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        图文教程
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        视频教程
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 右侧绑定操作区 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>抖音账号绑定</CardTitle>
                  <CardDescription>
                    绑定抖音账号后可以在直播中挂载课程进行销售
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 已绑定账号 */}
                  {douyinAccounts.length > 0 ? (
                    <div className="space-y-4">
                      <Label>已绑定的账号</Label>
                      {douyinAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-900/20"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                              {account.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{account.name}</p>
                                <Badge className="bg-green-500">已绑定</Badge>
                              </div>
                              <p className="text-sm text-gray-500">
                                绑定时间：{account.boundAt} | 粉丝数：{account.followers.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => {
                              setSelectedPlatform('douyin');
                              setUnbindDialogOpen(true);
                            }}
                          >
                            <Unlink className="w-4 h-4 mr-2" />
                            解绑
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-4">暂未绑定抖音账号</p>
                      <Button onClick={() => setBindDialogOpen(true)}>
                        <Link2 className="w-4 h-4 mr-2" />
                        绑定抖音账号
                      </Button>
                    </div>
                  )}

                  {/* 绑定按钮 */}
                  <div className="border-t pt-4">
                    <Button
                      className="w-full"
                      onClick={() => setBindDialogOpen(true)}
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      {douyinAccounts.length > 0 ? '绑定更多账号' : '立即绑定'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 视频号账号绑定 */}
          <TabsContent value="video">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧绑定指引 */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-500" />
                    视频号绑定教程
                  </CardTitle>
                  <CardDescription>按照以下步骤完成视频号账号绑定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-medium">登录微信视频号助手</p>
                        <p className="text-sm text-gray-500">访问微信视频号助手官网</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-medium">获取授权码</p>
                        <p className="text-sm text-gray-500">在设置中生成授权授权码</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-medium">填写授权信息</p>
                        <p className="text-sm text-gray-500">将授权码填入下方完成绑定</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">视频号挂载规则</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        仅认证企业号支持挂载
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        直播需提前30分钟设置
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        短视频需为原创内容
                      </li>
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500 mb-3">帮助资源</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        图文教程
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        视频教程
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 右侧绑定操作区 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>视频号账号绑定</CardTitle>
                  <CardDescription>
                    绑定视频号账号后可以在直播中挂载课程进行销售
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 已绑定账号 */}
                  {videoAccounts.length > 0 ? (
                    <div className="space-y-4">
                      <Label>已绑定的账号</Label>
                      {videoAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-900/20"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                              {account.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{account.name}</p>
                                <Badge className="bg-green-500">已绑定</Badge>
                              </div>
                              <p className="text-sm text-gray-500">
                                绑定时间：{account.boundAt} | 粉丝数：{account.followers.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => {
                              setSelectedPlatform('video');
                              setUnbindDialogOpen(true);
                            }}
                          >
                            <Unlink className="w-4 h-4 mr-2" />
                            解绑
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-4">暂未绑定视频号账号</p>
                      <Button onClick={() => setBindDialogOpen(true)}>
                        <Link2 className="w-4 h-4 mr-2" />
                        绑定视频号账号
                      </Button>
                    </div>
                  )}

                  {/* 绑定按钮 */}
                  <div className="border-t pt-4">
                    <Button
                      className="w-full"
                      onClick={() => setBindDialogOpen(true)}
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      {videoAccounts.length > 0 ? '绑定更多账号' : '立即绑定'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 挂载入口 */}
          <TabsContent value="mount">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 抖音挂载入口 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-pink-500" />
                    抖音挂载入口
                  </CardTitle>
                  <CardDescription>
                    选择课程或直播，生成抖音挂载链接
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>选择课程</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择要挂载的课程" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title} - ¥{course.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>关联直播（可选）</Label>
                    <Select value={selectedLive} onValueChange={setSelectedLive}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择关联的直播" />
                      </SelectTrigger>
                      <SelectContent>
                        {lives.map((live) => (
                          <SelectItem key={live.id} value={live.id}>
                            {live.title} - {live.time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" onClick={handleGenerateLinks}>
                    <Zap className="w-4 h-4 mr-2" />
                    生成挂载链接
                  </Button>

                  {generatedLinks.length > 0 && (
                    <div className="space-y-2 pt-4 border-t">
                      <Label>生成的挂载链接</Label>
                      {generatedLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={link} readOnly className="text-sm" />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyLink(link)}
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">抖音挂载步骤</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>1. 复制生成的挂载链接</p>
                      <p>2. 打开抖音创作服务平台</p>
                      <p>3. 在视频描述中添加挂载链接</p>
                      <p>4. 发布视频后在评论区置顶链接</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 视频号挂载入口 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    视频号挂载入口
                  </CardTitle>
                  <CardDescription>
                    选择视频号直播并关联课程进行挂载
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>选择视频号直播</Label>
                    <Select value={selectedLive} onValueChange={setSelectedLive}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择视频号直播" />
                      </SelectTrigger>
                      <SelectContent>
                        {lives.map((live) => (
                          <SelectItem key={live.id} value={live.id}>
                            {live.title} - {live.time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>选择要挂载的课程</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择要挂载的课程" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title} - ¥{course.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleMountCourse}
                    disabled={!selectedCourse || !selectedLive}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    关联挂载
                  </Button>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">已挂载课程预览</p>
                    <div className="space-y-2">
                      {mountedCourses
                        .filter((c) => c.platform === '视频号')
                        .map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium">{course.title}</p>
                                <p className="text-xs text-gray-500">
                                  挂载时间：{course.linkedAt} | 浏览量：{course.views.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">已挂载</Badge>
                          </div>
                        ))}
                      {mountedCourses.filter((c) => c.platform === '视频号').length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">
                          暂无挂载课程
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 已挂载课程总览 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  已挂载课程总览
                </CardTitle>
                <CardDescription>
                  查看所有已挂载到各平台的课程
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>课程名称</TableHead>
                      <TableHead>挂载平台</TableHead>
                      <TableHead>挂载时间</TableHead>
                      <TableHead>浏览量</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mountedCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              course.platform === '抖音'
                                ? 'border-pink-500 text-pink-500'
                                : 'border-green-500 text-green-500'
                            }
                          >
                            {course.platform}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {course.linkedAt}
                        </TableCell>
                        <TableCell>{course.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            查看
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 绑定弹窗 */}
      <Dialog open={bindDialogOpen} onOpenChange={setBindDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>绑定账号</DialogTitle>
            <DialogDescription>
              点击下方按钮跳转到平台授权页面，完成授权后返回本页面
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold">
                    抖
                  </div>
                  <div>
                    <p className="font-medium">抖音开放平台</p>
                    <p className="text-sm text-gray-500">抖音账号授权</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                    视
                  </div>
                  <div>
                    <p className="font-medium">微信视频号</p>
                    <p className="text-sm text-gray-500">视频号账号授权</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBindDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleBind}>
              <ExternalLink className="w-4 h-4 mr-2" />
              前往授权
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 解绑确认弹窗 */}
      <Dialog open={unbindDialogOpen} onOpenChange={setUnbindDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认解绑</DialogTitle>
            <DialogDescription>
              解绑后，该平台的直播将无法挂载课程。确定要解绑吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnbindDialogOpen(false)}>
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleUnbind(selectedPlatform)}
            >
              确认解绑
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 同步数据弹窗 */}
      <Dialog open={syncDialogOpen} onOpenChange={setSyncDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>同步平台数据</DialogTitle>
            <DialogDescription>
              将从所有已绑定平台同步最新的粉丝数据和直播数据
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              {douyinAccounts.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      抖
                    </div>
                    <span>抖音</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    同步中...
                  </div>
                </div>
              )}
              {videoAccounts.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      视
                    </div>
                    <span>视频号</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    同步中...
                  </div>
                </div>
              )}
              {douyinAccounts.length === 0 && videoAccounts.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  暂无已绑定账号
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSyncDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSync} disabled={syncing || (douyinAccounts.length === 0 && videoAccounts.length === 0)}>
              {syncing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  同步中...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  开始同步
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
