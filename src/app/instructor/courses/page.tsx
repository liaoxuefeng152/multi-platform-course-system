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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Edit,
  Eye,
  EyeOff,
  Trash2,
  Filter
} from 'lucide-react';

// 模拟课程数据
const mockCourses = [
  {
    id: 1,
    title: 'Python 入门到精通',
    type: '视频课',
    category: '技能培训',
    price: 199,
    sales: 456,
    students: 456,
    status: '已上线',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Excel 数据分析实战',
    type: '视频课',
    category: '职场提升',
    price: 129,
    sales: 389,
    students: 389,
    status: '已上线',
    createdAt: '2024-02-10',
  },
  {
    id: 3,
    title: '短视频运营全攻略',
    type: '视频课',
    category: '兴趣爱好',
    price: 299,
    sales: 312,
    students: 312,
    status: '已上线',
    createdAt: '2024-02-20',
  },
  {
    id: 4,
    title: '职场沟通技巧',
    type: '音频课',
    category: '职场提升',
    price: 99,
    sales: 234,
    students: 234,
    status: '已上线',
    createdAt: '2024-03-01',
  },
  {
    id: 5,
    title: '摄影基础教程',
    type: '图文课',
    category: '兴趣爱好',
    price: 69,
    sales: 189,
    students: 189,
    status: '审核中',
    createdAt: '2024-03-10',
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // 过滤课程
  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesType = typeFilter === 'all' || course.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      '已上线': { label: '已上线', variant: 'default' },
      '已下架': { label: '已下架', variant: 'secondary' },
      '审核中': { label: '审核中', variant: 'outline' },
      '草稿': { label: '草稿', variant: 'secondary' },
    };
    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleDelete = (course: any) => {
    setSelectedCourse(course);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('删除课程:', selectedCourse);
    setDeleteDialogOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="space-y-6">
      {/* 顶部操作栏 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>课程管理</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                管理您的所有课程，支持视频课、音频课、图文课、直播课
              </p>
            </div>
            <Link href="/instructor/courses/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                新增课程
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
                placeholder="搜索课程名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 筛选器 */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="已上线">已上线</SelectItem>
                  <SelectItem value="已下架">已下架</SelectItem>
                  <SelectItem value="审核中">审核中</SelectItem>
                  <SelectItem value="草稿">草稿</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="视频课">视频课</SelectItem>
                  <SelectItem value="音频课">音频课</SelectItem>
                  <SelectItem value="图文课">图文课</SelectItem>
                  <SelectItem value="直播课">直播课</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 课程列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>课程信息</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>价格</TableHead>
                <TableHead>销量</TableHead>
                <TableHead>学员数</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.type}</Badge>
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>¥{course.price}</TableCell>
                  <TableCell>{course.sales}</TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>{course.createdAt}</TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          上架
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <EyeOff className="w-4 h-4 mr-2" />
                          下架
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(course)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCourses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    暂无课程数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除课程</DialogTitle>
            <DialogDescription>
              删除课程后，所有相关数据将无法恢复，确定要删除「
              {selectedCourse?.title}」吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
