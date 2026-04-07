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
  User,
  Users
} from 'lucide-react';

// 模拟讲师数据
const mockInstructors = [
  {
    id: 1,
    name: '张讲师',
    phone: '138****1234',
    type: '个人讲师',
    status: '已认证',
    courses: 5,
    students: 1234,
    joinDate: '2024-01-15',
  },
  {
    id: 2,
    name: '李教育机构',
    phone: '139****5678',
    type: '机构讲师',
    status: '审核中',
    courses: 3,
    students: 567,
    joinDate: '2024-02-01',
  },
];

// 模拟学员数据
const mockStudents = [
  {
    id: 1,
    name: '学员A',
    phone: '137****9012',
    totalOrders: 3,
    totalSpent: 598,
    joinDate: '2024-01-20',
  },
  {
    id: 2,
    name: '学员B',
    phone: '136****3456',
    totalOrders: 1,
    totalSpent: 199,
    joinDate: '2024-02-10',
  },
];

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);

  // 过滤讲师
  const filteredInstructors = mockInstructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.phone.includes(searchQuery)
  );

  // 过滤学员
  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      '已认证': { label: '已认证', variant: 'default' },
      '审核中': { label: '审核中', variant: 'secondary' },
      '已拒绝': { label: '已拒绝', variant: 'destructive' },
      '已禁用': { label: '已禁用', variant: 'secondary' },
    };
    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleApprove = (instructor: any) => {
    setSelectedInstructor(instructor);
    setApproveDialogOpen(true);
  };

  const handleReject = (instructor: any) => {
    setSelectedInstructor(instructor);
    setRejectDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">账号管理</h1>
          <p className="text-muted-foreground">
            管理讲师和学员账号，审核认证申请
          </p>
        </div>
      </div>

      <Tabs defaultValue="instructors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="instructors">
            <User className="w-4 h-4 mr-2" />
            讲师管理
          </TabsTrigger>
          <TabsTrigger value="students">
            <Users className="w-4 h-4 mr-2" />
            学员管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="instructors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>讲师列表</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索讲师..."
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
                    <TableHead>讲师信息</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>课程数</TableHead>
                    <TableHead>学员数</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>加入时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstructors.map((instructor) => (
                    <TableRow key={instructor.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{instructor.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {instructor.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{instructor.type}</Badge>
                      </TableCell>
                      <TableCell>{instructor.courses}</TableCell>
                      <TableCell>{instructor.students}</TableCell>
                      <TableCell>{getStatusBadge(instructor.status)}</TableCell>
                      <TableCell>{instructor.joinDate}</TableCell>
                      <TableCell className="text-right">
                        {instructor.status === '审核中' && (
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(instructor)}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              通过
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(instructor)}
                            >
                              <X className="w-4 h-4 mr-1" />
                              拒绝
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>学员列表</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索学员..."
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
                    <TableHead>学员信息</TableHead>
                    <TableHead>手机号</TableHead>
                    <TableHead>订单数</TableHead>
                    <TableHead>消费金额</TableHead>
                    <TableHead>加入时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.totalOrders}</TableCell>
                      <TableCell>¥{student.totalSpent}</TableCell>
                      <TableCell>{student.joinDate}</TableCell>
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
            <DialogTitle>确认通过认证</DialogTitle>
            <DialogDescription>
              确定通过讲师「{selectedInstructor?.name}」的认证申请吗？
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
            <DialogTitle>确认拒绝认证</DialogTitle>
            <DialogDescription>
              确定拒绝讲师「{selectedInstructor?.name}」的认证申请吗？
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
