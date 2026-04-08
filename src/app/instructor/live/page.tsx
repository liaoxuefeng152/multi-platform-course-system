'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Search,
  MoreVertical,
  Video,
  Calendar,
  Users,
  TrendingUp,
  ExternalLink,
  Radio
} from 'lucide-react';

// 模拟直播数据
const mockLives = [
  {
    id: 1,
    title: 'Python 进阶技巧分享',
    time: '2024-03-15 19:00',
    platform: ['抖音', '视频号'],
    status: '预约中',
    viewers: 0,
    conversions: 0,
    sales: 0,
  },
  {
    id: 2,
    title: '前端开发实战直播',
    time: '2024-03-16 20:00',
    platform: ['抖音'],
    status: '直播中',
    viewers: 1256,
    conversions: 89,
    sales: 17800,
  },
  {
    id: 3,
    title: 'Excel 数据分析实战',
    time: '2024-03-10 20:00',
    platform: ['视频号'],
    status: '已结束',
    viewers: 1234,
    conversions: 89,
    sales: 17800,
  },
  {
    id: 4,
    title: '短视频运营技巧',
    time: '2024-03-08 15:00',
    platform: ['抖音'],
    status: '已结束',
    viewers: 892,
    conversions: 67,
    sales: 13400,
  },
];

export default function LivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  // 过滤直播
  const filteredLives = mockLives.filter((live) => {
    const matchesSearch = live.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || live.status === statusFilter;
    const matchesPlatform =
      platformFilter === 'all' || live.platform.includes(platformFilter);
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any; color: string }> = {
      '预约中': { label: '预约中', variant: 'default', color: 'bg-blue-500' },
      '直播中': { label: '直播中', variant: 'default', color: 'bg-green-500' },
      '已结束': { label: '已结束', variant: 'secondary', color: 'bg-gray-500' },
      '已取消': { label: '已取消', variant: 'secondary', color: 'bg-red-500' },
    };
    const config = statusConfig[status] || { label: status, variant: 'outline', color: 'bg-gray-500' };
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>
    );
  };

  const formatMoney = (amount: number) => {
    return `¥${(amount / 100).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* 数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">本月直播场次</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </div>
              <Video className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总观看人数</p>
                <p className="text-2xl font-bold mt-1">8,234</p>
              </div>
              <Users className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总转化人数</p>
                <p className="text-2xl font-bold mt-1">456</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">直播销售额</p>
                <p className="text-2xl font-bold mt-1">¥45,678</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 顶部操作栏 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>直播管理</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                管理您的直播场次，支持抖音、视频号直播挂载
              </p>
            </div>
            <Link href="/instructor/live/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                创建直播
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索直播主题..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 筛选器 */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="预约中">预约中</SelectItem>
                  <SelectItem value="直播中">直播中</SelectItem>
                  <SelectItem value="已结束">已结束</SelectItem>
                </SelectContent>
              </Select>

              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="平台" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部平台</SelectItem>
                  <SelectItem value="抖音">抖音</SelectItem>
                  <SelectItem value="视频号">视频号</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 直播列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>直播主题</TableHead>
                <TableHead>直播时间</TableHead>
                <TableHead>平台</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>观看人数</TableHead>
                <TableHead>转化人数</TableHead>
                <TableHead>销售额</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLives.map((live) => (
                <TableRow key={live.id}>
                  <TableCell className="font-medium">{live.title}</TableCell>
                  <TableCell>{live.time}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {live.platform.map((p) => (
                        <Badge key={p} variant="outline">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(live.status)}</TableCell>
                  <TableCell>{live.viewers}</TableCell>
                  <TableCell>{live.conversions}</TableCell>
                  <TableCell>{formatMoney(live.sales)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {live.status === '预约中' && (
                          <Link href={`/instructor/live/control/${live.id}`}>
                            <DropdownMenuItem>
                              <Radio className="w-4 h-4 mr-2" />
                              进入直播
                            </DropdownMenuItem>
                          </Link>
                        )}
                        {live.status === '直播中' && (
                          <Link href={`/instructor/live/control/${live.id}`}>
                            <DropdownMenuItem>
                              <Radio className="w-4 h-4 mr-2" />
                              进入中控台
                            </DropdownMenuItem>
                          </Link>
                        )}
                        {live.status === '已结束' && (
                          <DropdownMenuItem>
                            <Video className="w-4 h-4 mr-2" />
                            查看回放
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          挂载课程
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          取消直播
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredLives.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    暂无直播数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
