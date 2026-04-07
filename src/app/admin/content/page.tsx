'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  Check,
  X,
  FileCheck,
  Video,
  Eye
} from 'lucide-react';

// 模拟课程审核数据
const mockCourseReviews = [
  {
    id: 1,
    title: 'Python 高级编程',
    instructor: '张讲师',
    type: '视频课',
    category: '技能培训',
    status: '待审核',
    submitTime: '2024-03-15 10:30',
  },
  {
    id: 2,
    title: '职场沟通技巧',
    instructor: '李讲师',
    type: '音频课',
    category: '职场提升',
    status: '待审核',
    submitTime: '2024-03-14 15:20',
  },
];

// 模拟直播审核数据
const mockLiveReviews = [
  {
    id: 1,
    title: 'Python 直播分享',
    instructor: '张讲师',
    platform: '抖音',
    scheduledTime: '2024-03-16 19:00',
    status: '待审核',
    submitTime: '2024-03-15 09:00',
  },
];

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  // 过滤课程
  const filteredCourses = mockCourseReviews.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 过滤直播
  const filteredLives = mockLiveReviews.filter((live) =>
    live.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    live.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      '待审核': { label: '待审核', variant: 'secondary' },
      '已通过': { label: '已通过', variant: 'default' },
      '已拒绝': { label: '已拒绝', variant: 'destructive' },
    };
    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleApprove = () => {
    setApproveDialogOpen(true);
  };

  const handleReject = () => {
    setRejectDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">内容审核</h1>
          <p className="text-muted-foreground">
            审核课程和直播内容，确保内容合规
          </p>
        </div>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">
            <FileCheck className="w-4 h-4 mr-2" />
            课程审核
          </TabsTrigger>
          <TabsTrigger value="live">
            <Video className="w-4 h-4 mr-2" />
            直播审核
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>课程审核列表</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索课程..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[300px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>课程信息</TableHead>
                    <TableHead>讲师</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>提交时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        {course.title}
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{course.type}</Badge>
                      </TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>{getStatusBadge(course.status)}</TableCell>
                      <TableCell>{course.submitTime}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(course)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            通过
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(course)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            拒绝
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>直播审核列表</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索直播..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[300px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>直播主题</TableHead>
                    <TableHead>讲师</TableHead>
                    <TableHead>平台</TableHead>
                    <TableHead>预约时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>提交时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLives.map((live) => (
                    <TableRow key={live.id}>
                      <TableCell className="font-medium">{live.title}</TableCell>
                      <TableCell>{live.instructor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{live.platform}</Badge>
                      </TableCell>
                      <TableCell>{live.scheduledTime}</TableCell>
                      <TableCell>{getStatusBadge(live.status)}</TableCell>
                      <TableCell>{live.submitTime}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(live)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            通过
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(live)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            拒绝
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 审核通过对话框 */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认通过审核</DialogTitle>
            <DialogDescription>
              确定通过该内容的审核吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setApproveDialogOpen(false)}>
              确认通过
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 审核拒绝对话框 */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认拒绝审核</DialogTitle>
            <DialogDescription>
              确定拒绝该内容的审核吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => setRejectDialogOpen(false)}>
              确认拒绝
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
