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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Search,
  Send,
  Download,
  Filter,
  User,
  BookOpen,
  Clock,
  TrendingUp
} from 'lucide-react';

// 模拟学员数据
const mockStudents = [
  {
    id: 1,
    name: '张三',
    avatar: 'Z',
    phone: '138****1234',
    courses: ['Python 入门到精通', 'Excel 数据分析实战'],
    totalOrders: 2,
    totalSpent: 328,
    joinDate: '2024-01-15',
    lastActive: '2024-03-10',
    progress: 75,
  },
  {
    id: 2,
    name: '李四',
    avatar: 'L',
    phone: '139****5678',
    courses: ['短视频运营全攻略'],
    totalOrders: 1,
    totalSpent: 299,
    joinDate: '2024-02-01',
    lastActive: '2024-03-12',
    progress: 45,
  },
  {
    id: 3,
    name: '王五',
    avatar: 'W',
    phone: '137****9012',
    courses: ['Python 入门到精通', '职场沟通技巧', '摄影基础教程'],
    totalOrders: 3,
    totalSpent: 367,
    joinDate: '2024-02-15',
    lastActive: '2024-03-11',
    progress: 90,
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [progressFilter, setProgressFilter] = useState('all');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [messageContent, setMessageContent] = useState('');

  // 过滤学员
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery);
    const matchesProgress =
      progressFilter === 'all' ||
      (progressFilter === 'completed' && student.progress === 100) ||
      (progressFilter === 'learning' && student.progress > 0 && student.progress < 100) ||
      (progressFilter === 'not-started' && student.progress === 0);
    return matchesSearch && matchesProgress;
  });

  const handleSendMessage = (student: any) => {
    setSelectedStudent(student);
    setMessageDialogOpen(true);
  };

  const handleExport = () => {
    console.log('导出学员数据');
    // TODO: 实现导出逻辑
  };

  const sendMessage = () => {
    console.log('发送消息给学员:', selectedStudent?.name, messageContent);
    setMessageDialogOpen(false);
    setMessageContent('');
    setSelectedStudent(null);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 20) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* 数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">学员总数</p>
                <p className="text-2xl font-bold mt-1">5,678</p>
              </div>
              <User className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">活跃学员</p>
                <p className="text-2xl font-bold mt-1">3,456</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">本月新增</p>
                <p className="text-2xl font-bold mt-1">234</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均完成率</p>
                <p className="text-2xl font-bold mt-1">68.5%</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 顶部操作栏 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>学员管理</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                查看和管理您的所有学员，支持发送消息和导出数据
              </p>
            </div>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索学员姓名或手机号..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 筛选器 */}
            <div className="flex gap-2">
              <Select value={progressFilter} onValueChange={setProgressFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="学习进度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部进度</SelectItem>
                  <SelectItem value="not-started">未开始</SelectItem>
                  <SelectItem value="learning">学习中</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 学员列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>学员信息</TableHead>
                <TableHead>手机号</TableHead>
                <TableHead>购买课程</TableHead>
                <TableHead>订单数</TableHead>
                <TableHead>消费金额</TableHead>
                <TableHead>加入时间</TableHead>
                <TableHead>最后活跃</TableHead>
                <TableHead>学习进度</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                        {student.avatar}
                      </div>
                      <div className="font-medium">{student.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      {student.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{student.totalOrders}</TableCell>
                  <TableCell>¥{student.totalSpent}</TableCell>
                  <TableCell>{student.joinDate}</TableCell>
                  <TableCell>{student.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {student.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSendMessage(student)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      发消息
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    暂无学员数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 发送消息对话框 */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>发送消息</DialogTitle>
            <DialogDescription>
              向学员 {selectedStudent?.name} 发送消息
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>消息内容</Label>
              <Textarea
                placeholder="请输入消息内容..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMessageDialogOpen(false)}
            >
              取消
            </Button>
            <Button onClick={sendMessage}>
              <Send className="w-4 h-4 mr-2" />
              发送
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
