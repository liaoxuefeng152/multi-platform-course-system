'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Smartphone,
  PlayCircle,
  Check,
  QrCode,
  Loader2
} from 'lucide-react';

interface BoundAccount {
  id: string;
  name: string;
  boundAt: string;
  status: 'active' | 'inactive';
  followers: number;
  avatar?: string;
}

interface MountedCourse {
  id: number;
  title: string;
  platform: string;
  linkedAt: string;
  views: number;
}

export default function PlatformLinksPage() {
  // 弹窗状态
  const [bindDialogOpen, setBindDialogOpen] = useState(false);
  const [unbindDialogOpen, setUnbindDialogOpen] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [syncing, setSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // 挂载相关状态
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

  // 快手已绑定账号
  const [kuaishouAccounts] = useState<BoundAccount[]>([]);

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

  // 打开扫码绑定弹窗
  const handleOpenBind = (platform: string) => {
    setSelectedPlatform(platform);
    setBindDialogOpen(true);
    setScanning(false);
    setScanSuccess(false);
  };

  // 模拟扫码成功
  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanSuccess(true);
    }, 2000);
  };

  // 确认绑定成功
  const handleConfirmBind = () => {
    const newAccount: BoundAccount = {
      id: `${selectedPlatform.toUpperCase()}${Date.now()}`,
      name: selectedPlatform === 'douyin' ? '张老师课堂' : 
            selectedPlatform === 'video' ? '张老师知识分享' : '快手账号',
      boundAt: new Date().toLocaleDateString(),
      status: 'active',
      followers: 0,
    };

    if (selectedPlatform === 'douyin') {
      setDouyinAccounts([...douyinAccounts, newAccount]);
    } else if (selectedPlatform === 'video') {
      setVideoAccounts([...videoAccounts, newAccount]);
    }

    setBindDialogOpen(false);
    setScanSuccess(false);
    alert(`${selectedPlatform === 'douyin' ? '抖音' : selectedPlatform === 'video' ? '视频号' : '快手'}账号绑定成功！`);
  };

  // 解绑账号
  const handleUnbind = () => {
    if (selectedPlatform === 'douyin') {
      setDouyinAccounts(douyinAccounts.filter(a => a.id !== selectedAccount?.id));
    } else if (selectedPlatform === 'video') {
      setVideoAccounts(videoAccounts.filter(a => a.id !== selectedAccount?.id));
    }
    setUnbindDialogOpen(false);
  };

  const [selectedAccount, setSelectedAccount] = useState<BoundAccount | null>(null);

  const handleUnbindClick = (account: BoundAccount, platform: string) => {
    setSelectedAccount(account);
    setSelectedPlatform(platform);
    setUnbindDialogOpen(true);
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
          platform: '抖音',
          linkedAt: new Date().toLocaleDateString(),
          views: 0,
        },
      ]);
      alert('课程挂载成功');
    }
  };

  // 获取平台信息
  const getPlatformInfo = (platform: string) => {
    switch (platform) {
      case 'douyin':
        return { name: '抖音', color: 'bg-pink-500', gradient: 'from-pink-500 to-rose-500' };
      case 'video':
        return { name: '视频号', color: 'bg-green-500', gradient: 'from-green-500 to-emerald-500' };
      case 'kuaishou':
        return { name: '快手', color: 'bg-purple-500', gradient: 'from-purple-500 to-violet-500' };
      default:
        return { name: platform, color: 'bg-gray-500', gradient: 'from-gray-500 to-gray-600' };
    }
  };

  const platformInfo = getPlatformInfo(selectedPlatform);

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
        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="accounts" className="gap-2">
              <Link2 className="w-4 h-4" />
              账号管理
            </TabsTrigger>
            <TabsTrigger value="mount" className="gap-2">
              <BookOpen className="w-4 h-4" />
              挂载课程
            </TabsTrigger>
          </TabsList>

          {/* 账号管理 */}
          <TabsContent value="accounts">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 抖音账号 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${getPlatformInfo('douyin').gradient}`} />
                    抖音
                  </CardTitle>
                  <CardDescription>绑定抖音账号用于直播挂载</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {douyinAccounts.length > 0 ? (
                    <div className="space-y-3">
                      {douyinAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-900/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${getPlatformInfo('douyin').gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                              {account.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{account.name}</p>
                                <Badge className="bg-green-500 text-xs">已绑定</Badge>
                              </div>
                              <p className="text-xs text-gray-500">{account.followers.toLocaleString()} 粉丝</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleUnbindClick(account, 'douyin')}
                          >
                            <Unlink className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed rounded-lg">
                      <Smartphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-3">暂未绑定账号</p>
                    </div>
                  )}
                  <Button 
                    className="w-full" 
                    variant={douyinAccounts.length > 0 ? 'outline' : 'default'}
                    onClick={() => handleOpenBind('douyin')}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    {douyinAccounts.length > 0 ? '绑定更多账号' : '扫码绑定'}
                  </Button>
                </CardContent>
              </Card>

              {/* 视频号账号 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${getPlatformInfo('video').gradient}`} />
                    视频号
                  </CardTitle>
                  <CardDescription>绑定视频号用于直播挂载</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {videoAccounts.length > 0 ? (
                    <div className="space-y-3">
                      {videoAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-900/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${getPlatformInfo('video').gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                              {account.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{account.name}</p>
                                <Badge className="bg-green-500 text-xs">已绑定</Badge>
                              </div>
                              <p className="text-xs text-gray-500">{account.followers.toLocaleString()} 粉丝</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleUnbindClick(account, 'video')}
                          >
                            <Unlink className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed rounded-lg">
                      <Smartphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-3">暂未绑定账号</p>
                    </div>
                  )}
                  <Button 
                    className="w-full"
                    variant={videoAccounts.length > 0 ? 'outline' : 'default'}
                    onClick={() => handleOpenBind('video')}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    {videoAccounts.length > 0 ? '绑定更多账号' : '扫码绑定'}
                  </Button>
                </CardContent>
              </Card>

              {/* 快手账号 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${getPlatformInfo('kuaishou').gradient}`} />
                    快手
                  </CardTitle>
                  <CardDescription>绑定快手账号用于直播挂载</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {kuaishouAccounts.length > 0 ? (
                    <div className="space-y-3">
                      {kuaishouAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-900/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${getPlatformInfo('kuaishou').gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                              {account.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{account.name}</p>
                                <Badge className="bg-green-500 text-xs">已绑定</Badge>
                              </div>
                              <p className="text-xs text-gray-500">{account.followers.toLocaleString()} 粉丝</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleUnbindClick(account, 'kuaishou')}
                          >
                            <Unlink className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed rounded-lg">
                      <Smartphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-3">暂未绑定账号</p>
                    </div>
                  )}
                  <Button 
                    className="w-full"
                    variant={kuaishouAccounts.length > 0 ? 'outline' : 'default'}
                    onClick={() => handleOpenBind('kuaishou')}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    {kuaishouAccounts.length > 0 ? '绑定更多账号' : '扫码绑定'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 帮助说明 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  绑定教程
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getPlatformInfo('douyin').gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                      1
                    </div>
                    <div>
                      <p className="font-medium">点击扫码绑定</p>
                      <p className="text-sm text-gray-500">点击平台卡片下方的"扫码绑定"按钮</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getPlatformInfo('douyin').gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                      2
                    </div>
                    <div>
                      <p className="font-medium">打开对应APP扫码</p>
                      <p className="text-sm text-gray-500">用抖音/微信打开扫一扫，扫描页面中的二维码</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getPlatformInfo('douyin').gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                      3
                    </div>
                    <div>
                      <p className="font-medium">授权成功</p>
                      <p className="text-sm text-gray-500">确认授权后，账号自动绑定成功</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 挂载课程 */}
          <TabsContent value="mount">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 抖音挂载入口 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${getPlatformInfo('douyin').gradient}`} />
                    抖音挂载
                  </CardTitle>
                  <CardDescription>
                    选择课程生成抖音挂载链接
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
                </CardContent>
              </Card>

              {/* 视频号挂载入口 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${getPlatformInfo('video').gradient}`} />
                    视频号挂载
                  </CardTitle>
                  <CardDescription>
                    选择直播并关联课程进行挂载
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
                </CardContent>
              </Card>
            </div>

            {/* 已挂载课程总览 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  已挂载课程
                </CardTitle>
                <CardDescription>查看所有已挂载的课程</CardDescription>
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

      {/* 扫码绑定弹窗 */}
      <Dialog open={bindDialogOpen} onOpenChange={setBindDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${platformInfo.gradient}`} />
              绑定{platformInfo.name}账号
            </DialogTitle>
            <DialogDescription>
              使用{platformInfo.name}APP扫描下方二维码进行授权
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-6">
            {!scanning && !scanSuccess ? (
              <>
                {/* 二维码 */}
                <div className="bg-white p-4 rounded-lg border-2 border-dashed">
                  <QRCodeSVG 
                    value={`https://example.com/bind/${selectedPlatform}?t=${Date.now()}`}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  打开{platformInfo.name} → 扫一扫 → 扫描上方二维码
                </p>
                {/* 模拟扫码按钮 */}
                <Button 
                  className="mt-4"
                  variant="outline"
                  onClick={handleSimulateScan}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  模拟扫码（测试用）
                </Button>
              </>
            ) : scanning ? (
              <>
                <div className="w-48 h-48 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
                <p className="text-sm text-gray-500 mt-4">授权中，请稍候...</p>
              </>
            ) : (
              <>
                <div className="w-48 h-48 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <p className="text-lg font-medium text-green-600 mt-4">授权成功！</p>
                <p className="text-sm text-gray-500 mt-1">即将绑定您的{platformInfo.name}账号</p>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBindDialogOpen(false)}>
              取消
            </Button>
            {scanSuccess ? (
              <Button onClick={handleConfirmBind}>
                <Check className="w-4 h-4 mr-2" />
                确认绑定
              </Button>
            ) : (
              <Button disabled>等待扫码</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 解绑确认弹窗 */}
      <Dialog open={unbindDialogOpen} onOpenChange={setUnbindDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认解绑账号</DialogTitle>
            <DialogDescription>
              解绑后，该账号下的直播将无法挂载课程。确定要解绑"{selectedAccount?.name}"吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnbindDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleUnbind}>
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
              从已绑定平台同步最新的粉丝数据和直播数据
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              {douyinAccounts.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${getPlatformInfo('douyin').gradient} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
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
                    <div className={`w-8 h-8 bg-gradient-to-br ${getPlatformInfo('video').gradient} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
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
            <Button 
              onClick={handleSync} 
              disabled={syncing || (douyinAccounts.length === 0 && videoAccounts.length === 0)}
            >
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
