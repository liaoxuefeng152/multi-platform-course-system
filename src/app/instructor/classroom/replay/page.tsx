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
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Eye,
  Download,
  Trash2,
  Edit,
  Share2,
  MoreVertical,
  Video,
  FileText,
  Search,
  Filter,
  BarChart3,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface Replay {
  id: string;
  title: string;
  courseName: string;
  duration: number;
  recordedAt: string;
  views: number;
  likes: number;
  comments: number;
  fileSize: string;
  status: 'ready' | 'processing' | 'failed';
  allowPurchase: boolean;
  price: number;
}

export default function ReplayPage() {
  // 回放列表
  const [replays, setReplays] = useState<Replay[]>([
    {
      id: 'RP001',
      title: 'Python 入门第一课：环境搭建',
      courseName: 'Python 从入门到精通',
      duration: 7200, // 2小时
      recordedAt: '2024-01-15 21:00',
      views: 156,
      likes: 89,
      comments: 23,
      fileSize: '1.2GB',
      status: 'ready',
      allowPurchase: true,
      price: 29,
    },
    {
      id: 'RP002',
      title: 'Python 进阶：函数与模块',
      courseName: 'Python 从入门到精通',
      duration: 5400, // 1.5小时
      recordedAt: '2024-01-18 21:30',
      views: 98,
      likes: 56,
      comments: 15,
      fileSize: '890MB',
      status: 'ready',
      allowPurchase: true,
      price: 29,
    },
    {
      id: 'RP003',
      title: 'JavaScript 基础语法',
      courseName: 'JavaScript 入门到精通',
      duration: 5400,
      recordedAt: '2024-01-20 22:00',
      views: 0,
      likes: 0,
      comments: 0,
      fileSize: '-',
      status: 'processing',
      allowPurchase: false,
      price: 0,
    },
  ]);

  // 编辑弹窗
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedReplay, setSelectedReplay] = useState<Replay | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    price: '',
    allowPurchase: false,
  });

  // 统计
  const stats = {
    totalReplays: replays.length,
    totalViews: replays.reduce((sum, r) => sum + r.views, 0),
    totalDuration: replays.reduce((sum, r) => sum + r.duration, 0),
    processing: replays.filter(r => r.status === 'processing').length,
  };

  // 格式化时长
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) {
      return `${h}小时${m > 0 ? m + '分钟' : ''}`;
    }
    return `${m}分钟`;
  };

  // 获取状态标签
  const getStatusBadge = (status: Replay['status']) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-500">可观看</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500">处理中</Badge>;
      case 'failed':
        return <Badge variant="destructive">处理失败</Badge>;
    }
  };

  // 打开编辑弹窗
  const handleEdit = (replay: Replay) => {
    setSelectedReplay(replay);
    setEditForm({
      title: replay.title,
      price: replay.price.toString(),
      allowPurchase: replay.allowPurchase,
    });
    setEditDialogOpen(true);
  };

  // 保存编辑
  const handleSave = () => {
    if (selectedReplay) {
      setReplays(
        replays.map((r) =>
          r.id === selectedReplay.id
            ? {
                ...r,
                title: editForm.title,
                price: parseFloat(editForm.price) || 0,
                allowPurchase: editForm.allowPurchase,
              }
            : r
        )
      );
      setEditDialogOpen(false);
    }
  };

  // 删除回放
  const handleDelete = (id: string) => {
    setReplays(replays.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/instructor/classroom" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold">回放管理</h1>
              <p className="text-sm text-muted-foreground">管理直播课程回放视频</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索回放..."
                className="w-64 pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">回放总数</p>
                  <p className="text-2xl font-bold">{stats.totalReplays}</p>
                </div>
                <Video className="w-10 h-10 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">总播放量</p>
                  <p className="text-2xl font-bold">{stats.totalViews}</p>
                </div>
                <Eye className="w-10 h-10 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">总时长</p>
                  <p className="text-2xl font-bold">{formatDuration(stats.totalDuration)}</p>
                </div>
                <Clock className="w-10 h-10 text-purple-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">处理中</p>
                  <p className="text-2xl font-bold text-yellow-500">{stats.processing}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-yellow-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 回放列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-500" />
              回放列表
            </CardTitle>
            <CardDescription>
              直播结束后自动生成的回放视频，支持设置付费观看
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>回放信息</TableHead>
                  <TableHead>关联课程</TableHead>
                  <TableHead>时长</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>播放量</TableHead>
                  <TableHead>付费设置</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {replays.map((replay) => (
                  <TableRow key={replay.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{replay.title}</p>
                          <p className="text-xs text-gray-500">
                            录制于 {replay.recordedAt} · {replay.fileSize}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{replay.courseName}</Badge>
                    </TableCell>
                    <TableCell>{formatDuration(replay.duration)}</TableCell>
                    <TableCell>{getStatusBadge(replay.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm">
                          <Eye className="w-4 h-4 text-gray-400" />
                          {replay.views}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-gray-400">赞</span>
                          {replay.likes}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {replay.allowPurchase ? (
                        <Badge className="bg-green-500">¥{replay.price}</Badge>
                      ) : (
                        <Badge variant="outline">免费</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {replay.status === 'ready' && (
                          <>
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/instructor/classroom/replay/${replay.id}`}>
                                <Play className="w-4 h-4 mr-1" />
                                预览
                              </Link>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="w-4 h-4 mr-1" />
                              分享
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(replay)}>
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              下载
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              数据统计
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 功能说明 */}
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">自动生成回放</p>
                  <p className="text-sm text-gray-500 mt-1">
                    直播结束后系统自动录制并生成回放视频，无需手动操作。
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">付费观看设置</p>
                  <p className="text-sm text-gray-500 mt-1">
                    可设置回放付费观看，为未到场学员提供二次变现渠道。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 编辑弹窗 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑回放信息</DialogTitle>
            <DialogDescription>
              修改回放标题和付费设置
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">回放标题</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">付费金额（元）</Label>
              <Input
                id="edit-price"
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                设置为 0 则免费观看
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="edit-purchase"
                checked={editForm.allowPurchase}
                onChange={(e) => setEditForm({ ...editForm, allowPurchase: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="edit-purchase">允许付费观看</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>
              保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
