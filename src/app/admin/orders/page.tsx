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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Search,
  Download,
  Filter,
  Eye,
  DollarSign,
  ShoppingCart,
  Clock,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

// 模拟订单数据
const mockOrders = [
  {
    id: 'ORD202403010001',
    orderNo: 'ORD202403010001',
    studentName: '张三',
    studentPhone: '138****1234',
    courseTitle: 'Python 入门到精通',
    instructorName: '李老师',
    amount: 199.00,
    discount: 0.00,
    actualAmount: 199.00,
    status: 'completed',
    paymentMethod: '微信支付',
    paymentTime: '2024-03-01 10:30:25',
    createTime: '2024-03-01 10:30:15',
  },
  {
    id: 'ORD202403010002',
    orderNo: 'ORD202403010002',
    studentName: '李四',
    studentPhone: '139****5678',
    courseTitle: '短视频运营全攻略',
    instructorName: '王老师',
    amount: 299.00,
    discount: 50.00,
    actualAmount: 249.00,
    status: 'completed',
    paymentMethod: '抖音支付',
    paymentTime: '2024-03-01 11:45:30',
    createTime: '2024-03-01 11:45:10',
  },
  {
    id: 'ORD202403010003',
    orderNo: 'ORD202403010003',
    studentName: '王五',
    studentPhone: '137****9012',
    courseTitle: 'Excel 数据分析实战',
    instructorName: '张老师',
    amount: 129.00,
    discount: 0.00,
    actualAmount: 129.00,
    status: 'refunding',
    paymentMethod: '微信支付',
    paymentTime: '2024-03-01 14:20:00',
    createTime: '2024-03-01 14:19:45',
  },
  {
    id: 'ORD202403010004',
    orderNo: 'ORD202403010004',
    studentName: '赵六',
    studentPhone: '136****3456',
    courseTitle: '职场沟通技巧',
    instructorName: '陈老师',
    amount: 99.00,
    discount: 10.00,
    actualAmount: 89.00,
    status: 'pending',
    paymentMethod: '-',
    paymentTime: '-',
    createTime: '2024-03-01 15:30:00',
  },
  {
    id: 'ORD202403010005',
    orderNo: 'ORD202403010005',
    studentName: '孙七',
    studentPhone: '135****7890',
    courseTitle: '摄影基础教程',
    instructorName: '刘老师',
    amount: 199.00,
    discount: 0.00,
    actualAmount: 199.00,
    status: 'refunded',
    paymentMethod: '微信支付',
    paymentTime: '2024-02-28 09:15:00',
    createTime: '2024-02-28 09:14:30',
  },
];

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 过滤订单
  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.studentPhone.includes(searchQuery) ||
      order.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: '待支付', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
      completed: { label: '已完成', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      refunded: { label: '已退款', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' },
      refunding: { label: '退款中', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
    };
    const config = statusMap[status] || { label: status, className: '' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleViewDetail = (order: any) => {
    setSelectedOrder(order);
    setOrderDetailOpen(true);
  };

  const handleRefund = (order: any) => {
    setSelectedOrder(order);
    setRefundReason('');
    setRefundDialogOpen(true);
  };

  const confirmRefund = () => {
    console.log('退款处理:', selectedOrder?.orderNo, refundReason);
    setRefundDialogOpen(false);
    alert('退款已处理');
  };

  const handleExport = () => {
    const headers = ['订单号', '学员姓名', '手机号', '课程名称', '讲师', '订单金额', '优惠金额', '实付金额', '订单状态', '支付方式', '支付时间', '下单时间'];
    const rows = filteredOrders.map((order) => [
      order.orderNo,
      order.studentName,
      order.studentPhone,
      order.courseTitle,
      order.instructorName,
      order.amount,
      order.discount,
      order.actualAmount,
      order.status,
      order.paymentMethod,
      order.paymentTime,
      order.createTime,
    ]);

    const BOM = '\uFEFF';
    const csvContent = [headers, ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `订单数据_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold">订单管理</h1>
        <p className="text-muted-foreground mt-1">管理平台所有订单，处理退款申请</p>
      </div>

      {/* 数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总订单数</p>
                <p className="text-2xl font-bold mt-1">12,568</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">待支付</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">234</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总销售额</p>
                <p className="text-2xl font-bold mt-1">¥ 2,568,920</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">退款中</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">12</p>
              </div>
              <RefreshCw className="w-8 h-8 text-orange-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选操作栏 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>订单列表</CardTitle>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索订单号、学员姓名、手机号、课程名称..."
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
                  <SelectValue placeholder="订单状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待支付</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="refunding">退款中</SelectItem>
                  <SelectItem value="refunded">已退款</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部时间</SelectItem>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="week">本周</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                  <SelectItem value="year">本年</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 订单表格 */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>学员信息</TableHead>
                <TableHead>课程信息</TableHead>
                <TableHead>订单金额</TableHead>
                <TableHead>订单状态</TableHead>
                <TableHead>支付信息</TableHead>
                <TableHead>下单时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.orderNo}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.studentName}</div>
                      <div className="text-sm text-muted-foreground">{order.studentPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.courseTitle}</div>
                      <div className="text-sm text-muted-foreground">{order.instructorName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">¥{order.actualAmount.toFixed(2)}</div>
                      {order.discount > 0 && (
                        <div className="text-sm text-muted-foreground line-through">
                          ¥{order.amount.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{order.paymentMethod}</div>
                      <div className="text-xs text-muted-foreground">{order.paymentTime}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{order.createTime}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetail(order)}>
                        <Eye className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                      {order.status === 'refunding' && (
                        <Button variant="outline" size="sm" onClick={() => handleRefund(order)}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          退款
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    暂无订单数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* 分页 */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="cursor-pointer">{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* 订单详情弹窗 */}
      <Dialog open={orderDetailOpen} onOpenChange={setOrderDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
            <DialogDescription>订单号：{selectedOrder?.orderNo}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* 订单状态 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">订单状态</p>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">实付金额</p>
                  <p className="text-2xl font-bold text-green-600">
                    ¥{selectedOrder.actualAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">学员姓名</p>
                  <p className="font-medium">{selectedOrder.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">手机号</p>
                  <p className="font-medium">{selectedOrder.studentPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">课程名称</p>
                  <p className="font-medium">{selectedOrder.courseTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">讲师</p>
                  <p className="font-medium">{selectedOrder.instructorName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">订单金额</p>
                  <p className="font-medium">¥{selectedOrder.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">优惠金额</p>
                  <p className="font-medium text-red-600">-¥{selectedOrder.discount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">支付方式</p>
                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">支付时间</p>
                  <p className="font-medium">{selectedOrder.paymentTime}</p>
                </div>
              </div>

              {/* 时间线 */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">订单时间线</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>下单时间：{selectedOrder.createTime}</span>
                  </div>
                  {selectedOrder.paymentTime !== '-' && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>支付时间：{selectedOrder.paymentTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderDetailOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 退款处理弹窗 */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>退款处理</DialogTitle>
            <DialogDescription>
              订单号：{selectedOrder?.orderNo}
              <br />
              退款金额：¥{selectedOrder?.actualAmount.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">退款原因</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                placeholder="请输入退款原因..."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
              />
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                确认退款后，款项将原路退回至用户支付账户，退款金额为实付金额 ¥{selectedOrder?.actualAmount.toFixed(2)}。
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmRefund}>
              确认退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
