'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Settings,
  ExternalLink,
  Video,
  Copy,
  AlertCircle,
  Zap,
  Clock,
  Eye,
  BarChart3
} from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
  status: 'active' | 'inactive' | 'error';
  channelId?: string;
  channelName?: string;
  stats: {
    followers: number;
    liveViews: number;
    sales: number;
  };
}

interface SyncedCourse {
  id: number;
  title: string;
  platform: string;
  syncedAt: string;
  status: 'published' | 'draft' | 'error';
  views: number;
}

export default function PlatformLinksPage() {
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [settingDialogOpen, setSettingDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [channelId, setChannelId] = useState('');
  const [syncing, setSyncing] = useState(false);

  // 平台数据
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'douyin',
      name: '抖音',
      icon: '/icons/douyin.svg',
      connected: true,
      lastSync: '2024-01-15 14:30',
      status: 'active',
      channelId: 'DY123456',
      channelName: '张老师课堂',
      stats: {
        followers: 125000,
        liveViews: 89000,
        sales: 15600,
      },
    },
    {
      id: 'kuaishou',
      name: '快手',
      icon: '/icons/kuaishou.svg',
      connected: true,
      lastSync: '2024-01-15 14:28',
      status: 'active',
      channelId: 'KS789012',
      channelName: '张老师·知识分享',
      stats: {
        followers: 45600,
        liveViews: 32000,
        sales: 8900,
      },
    },
    {
      id: 'bilibili',
      name: '哔哩哔哩',
      icon: '/icons/bilibili.svg',
      connected: false,
      status: 'inactive',
      stats: {
        followers: 0,
        liveViews: 0,
        sales: 0,
      },
    },
    {
      id: 'xiaohongshu',
      name: '小红书',
      icon: '/icons/xiaohongshu.svg',
      connected: false,
      status: 'inactive',
      stats: {
        followers: 0,
        liveViews: 0,
        sales: 0,
      },
    },
    {
      id: 'wechat',
      name: '视频号',
      icon: '/icons/video-account.svg',
      connected: false,
      status: 'inactive',
      stats: {
        followers: 0,
        liveViews: 0,
        sales: 0,
      },
    },
  ]);

  // 已同步课程
  const [syncedCourses] = useState<SyncedCourse[]>([
    {
      id: 1,
      title: 'Python 从入门到精通',
      platform: '抖音',
      syncedAt: '2024-01-15 10:30',
      status: 'published',
      views: 12500,
    },
    {
      id: 2,
      title: '短视频运营实战课',
      platform: '快手',
      syncedAt: '2024-01-14 16:20',
      status: 'published',
      views: 8900,
    },
    {
      id: 3,
      title: '新媒体营销指南',
      platform: '抖音',
      syncedAt: '2024-01-13 09:15',
      status: 'draft',
      views: 0,
    },
  ]);

  const handleConnect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setSettingDialogOpen(true);
  };

  const handleConfirmConnect = () => {
    if (!apiKey || !apiSecret || !channelId) return;

    setPlatforms(
      platforms.map((p) =>
        p.id === selectedPlatform?.id
          ? {
              ...p,
              connected: true,
              status: 'active' as const,
              lastSync: new Date().toLocaleString(),
              channelId,
              channelName: `${selectedPlatform.name}官方账号`,
            }
          : p
      )
    );

    setSettingDialogOpen(false);
    setApiKey('');
    setApiSecret('');
    setChannelId('');
    setSelectedPlatform(null);
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(
      platforms.map((p) =>
        p.id === platformId
          ? {
              ...p,
              connected: false,
              status: 'inactive' as const,
              channelId: undefined,
              channelName: undefined,
            }
          : p
      )
    );
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setPlatforms(
        platforms.map((p) =>
          p.connected ? { ...p, lastSync: new Date().toLocaleString() } : p
        )
      );
      setSyncing(false);
      setSyncDialogOpen(false);
    }, 2000);
  };

  const handleCopyId = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  const getStatusBadge = (status: Platform['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">正常</Badge>;
      case 'inactive':
        return <Badge variant="secondary">未连接</Badge>;
      case 'error':
        return <Badge variant="destructive">异常</Badge>;
    }
  };

  const getCourseStatusBadge = (status: SyncedCourse['status']) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">已上架</Badge>;
      case 'draft':
        return <Badge variant="secondary">草稿</Badge>;
      case 'error':
        return <Badge variant="destructive">同步失败</Badge>;
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSyncDialogOpen(true)}
              disabled={!platforms.some((p) => p.connected)}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              同步数据
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* 提示信息 */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              连接抖音、快手等平台后，您的课程可以一键同步到多个平台进行销售。
              直播时将自动获取多平台数据，统一管理销售订单。
            </p>
          </div>
        </div>

        {/* 平台列表 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              已连接平台
            </CardTitle>
            <CardDescription>
              管理您已连接的直播平台账号
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>平台</TableHead>
                  <TableHead>账号</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最后同步</TableHead>
                  <TableHead>数据统计</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {platforms.map((platform) => (
                  <TableRow key={platform.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {platform.name.charAt(0)}
                        </div>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {platform.connected ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{platform.channelName}</span>
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => handleCopyId(platform.channelId || '')}
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">未连接</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(platform.status)}</TableCell>
                    <TableCell>
                      {platform.lastSync ? (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {platform.lastSync}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {platform.connected ? (
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-blue-500" />
                            {platform.stats.followers.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-3 h-3 text-purple-500" />
                            {platform.stats.liveViews.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3 text-green-500" />
                            ¥{platform.stats.sales.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {platform.connected ? (
                          <>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDisconnect(platform.id)}
                            >
                              <Unlink className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleConnect(platform)}
                          >
                            <Link2 className="w-4 h-4 mr-2" />
                            连接
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 已同步课程 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              已同步课程
            </CardTitle>
            <CardDescription>
              查看已同步到各平台的课程状态
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>课程名称</TableHead>
                  <TableHead>同步平台</TableHead>
                  <TableHead>同步时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>浏览量</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {syncedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.platform}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{course.syncedAt}</TableCell>
                    <TableCell>{getCourseStatusBadge(course.status)}</TableCell>
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
      </div>

      {/* 连接设置弹窗 */}
      <Dialog open={settingDialogOpen} onOpenChange={setSettingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>连接 {selectedPlatform?.name}</DialogTitle>
            <DialogDescription>
              请填写您在 {selectedPlatform?.name} 开放平台获取的 API 密钥
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="请输入 API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input
                id="apiSecret"
                type="password"
                placeholder="请输入 API Secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="channelId">直播频道 ID</Label>
              <Input
                id="channelId"
                placeholder="请输入直播频道 ID"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingDialogOpen(false)}>
              取消
            </Button>
            <Button
              onClick={handleConfirmConnect}
              disabled={!apiKey || !apiSecret || !channelId}
            >
              确认连接
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
              将从所有已连接平台同步最新的观众数据和销售数据
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              {platforms
                .filter((p) => p.connected)
                .map((platform) => (
                  <div
                    key={platform.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {platform.name.charAt(0)}
                      </div>
                      <span>{platform.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-500">同步中...</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSyncDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSync} disabled={syncing}>
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
