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
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Calendar
} from 'lucide-react';

// 模拟订单数据
const mockOrders = [
  {
    id: 'ORD20240315001',
    student: '张三',
    course: 'Python 入门到精通',
    amount: 199,
    status: '已付款',
    paymentMethod: '微信支付',
    createdAt: '2024-03-15 10:30',
    refundStatus: '无',
  },
  {
    id: 'ORD20240314002',
    student: '李四',
    course: '短视频运营全攻略',
    amount: 299,
    status: '已付款',
    paymentMethod: '抖音支付',
    createdAt: '2024-03-14 15:20',
    refundStatus: '退款申请中',
  },
  {
    id: 'ORD20240313003',
    student: '王五',
    course: 'Excel 数据分析实战',
    amount: 129,
    status: '已付款',
    paymentMethod: '微信支付',
    createdAt: '2024-03-13 09:15',
    refundStatus: '无',
  },
  {
    id: 'ORD20240312004',
    student: '赵六',
    course: '职场沟通技巧',
    amount: 99,
    status: '已取消',
    paymentMethod: '微信支付',
    createdAt: '2024-03-12 14:00',
    refundStatus: '无',
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refundFilter, setRefundFilter] = useState('all');
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // 过滤订单
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesRefund =
      refundFilter === 'all' ||
      (refundFilter === 'pending' && order.refundStatus === '退款申请中') ||
      (refundFilter === 'none' && order.refundStatus === '无');
    return matchesSearch && matchesStatus && matchesRefund;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any }> = {
      '待付款': { label: '待付款', variant: 'secondary' },
      '已付款': { label: '已付款', variant: 'default' },
      '已取消': { label: '已取消', variant: 'secondary' },
      '已退款': { label: '已退款', variant: 'secondary' },
    };
    const config = statusConfig[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleRefund = (order: any) => {
    setSelectedOrder(order);
    setRefundDialogOpen(true);
  };

  const approveRefund = () => {
    console.log('同意退款:', selectedOrder);
    setRefundDialogOpen(false);
    setSelectedOrder(null);
  };

  const rejectRefund = () => {
    console.log('拒绝退款:', selectedOrder);
    setRefundDialogOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* 数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">今日订单</p>
                <p className="text-2xl font-bold mt-1">45</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">今日销售额</p>
                <p className="text-2xl font-bold mt-1">¥8,950</p>
              </div>
              <Check className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground text-red-600">
                  待处理退款
                </p>
                <p className="text-2xl font-bold mt-1 text-red-600">3</p>
              </div>
              <X className="w-8 h-8 text-red-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">本月累计</p>
                <p className="text-2xl font-bold mt-1">¥123,456</p>
              </div>
              <Eye className="w-8 h-8 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 顶部操作栏 */}
      <Card>
        <CardHeader>
          <CardTitle>订单管理</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            查看和管理所有订单，处理退款申请
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索订单号、学员或课程..."
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
                  <SelectItem value="待付款">待付款</SelectItem>
                  <SelectItem value="已付款">已付款</SelectItem>
                  <SelectItem value="已取消">已取消</SelectItem>
                  <SelectItem value="已退款">已退款</SelectItem>
                </SelectContent>
              </Select>

              <Select value={refundFilter} onValueChange={setRefundFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="退款状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                  <SelectItem value="none">无退款</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 订单列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>学员</TableHead>
                <TableHead>课程</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>支付方式</TableHead>
                <TableHead>订单状态</TableHead>
                <TableHead>退款状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.student}</TableCell>
                  <TableCell>{order.course}</TableCell>
                  <TableCell>¥{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.paymentMethod}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {order.refundStatus === '退款申请中' ? (
                      <Badge variant="destructive">退款申请中</Badge>
                    ) : (
                      <Badge variant="outline">无</Badge>
                    )}
                  </TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell className="text-right">
                    {order.refundStatus === '退款申请中' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRefund(order)}
                      >
                        处理退款
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    暂无订单数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 退款处理对话框 */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>处理退款申请</DialogTitle>
            <DialogDescription>
              订单号：{selectedOrder?.id}
              <br />
              退款金额：¥{selectedOrder?.amount}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between">
                <span>学员：</span>
                <span className="font-medium">{selectedOrder?.student}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>课程：</span>
                <span className="font-medium">{selectedOrder?.course}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>创建时间：</span>
                <span className="font-medium">{selectedOrder?.createdAt}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={rejectRefund}>
              拒绝退款
            </Button>
            <Button onClick={approveRefund}>
              同意退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
