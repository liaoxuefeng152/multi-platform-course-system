'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, History, Settings, CheckCircle, XCircle, Clock, AlertCircle, Download } from 'lucide-react';

export default function WithdrawalPage() {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({
    amount: 0,
    accountType: 'weixin',
    accountName: '',
    accountNumber: '',
  });

  // 模拟可提现金额
  const withdrawableAmount = 8920.50;

  // 模拟提现记录
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 1,
      amount: 5000,
      accountType: '微信支付',
      accountName: '张*',
      status: '已到账',
      applyTime: '2024-03-10 14:30',
      completeTime: '2024-03-11 09:15',
      fee: 50,
      actualAmount: 4950,
    },
    {
      id: 2,
      amount: 3000,
      accountType: '抖音支付',
      accountName: '李*',
      status: '审核中',
      applyTime: '2024-03-12 10:20',
      completeTime: '-',
      fee: 30,
      actualAmount: 2970,
    },
    {
      id: 3,
      amount: 2000,
      accountType: '微信支付',
      accountName: '张*',
      status: '已拒绝',
      applyTime: '2024-03-05 16:45',
      completeTime: '2024-03-05 17:00',
      fee: 0,
      actualAmount: 2000,
      rejectReason: '账户信息有误',
    },
  ]);

  const handleWithdraw = () => {
    console.log('发起提现:', withdrawForm);
    setWithdrawals([
      {
        id: withdrawals.length + 1,
        amount: withdrawForm.amount,
        accountType: withdrawForm.accountType === 'weixin' ? '微信支付' : '抖音支付',
        accountName: withdrawForm.accountName,
        status: '审核中',
        applyTime: new Date().toLocaleString('zh-CN'),
        completeTime: '-',
        fee: Math.floor(withdrawForm.amount * 0.01),
        actualAmount: Math.floor(withdrawForm.amount * 0.99),
      },
      ...withdrawals,
    ]);
    setWithdrawDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: any; icon: any }> = {
      '审核中': { label: '审核中', variant: 'secondary', icon: Clock },
      '已到账': { label: '已到账', variant: 'default', icon: CheckCircle },
      '已拒绝': { label: '已拒绝', variant: 'destructive', icon: XCircle },
    };
    const config = statusConfig[status] || { label: status, variant: 'outline', icon: AlertCircle };
    const Icon = config.icon;
    return (
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">提现管理</h1>
        <p className="text-muted-foreground">
          设置提现账户，查看提现记录和申请提现
        </p>
      </div>

      <Tabs defaultValue="withdraw" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="withdraw">
            <Wallet className="w-4 h-4 mr-2" />
            申请提现
          </TabsTrigger>
          <TabsTrigger value="records">
            <History className="w-4 h-4 mr-2" />
            提现记录
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            提现账户
          </TabsTrigger>
        </TabsList>

        {/* 申请提现 */}
        <TabsContent value="withdraw" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Wallet className="w-10 h-10 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">可提现金额</p>
                    <p className="text-3xl font-bold text-green-600">¥{withdrawableAmount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div>
                  <p className="text-sm text-muted-foreground">待结算金额</p>
                  <p className="text-3xl font-bold">¥1,234.00</p>
                  <p className="text-xs text-muted-foreground mt-1">预计 3 天后到账</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div>
                  <p className="text-sm text-muted-foreground">累计提现</p>
                  <p className="text-3xl font-bold">¥33,333.00</p>
                  <p className="text-xs text-muted-foreground mt-1">已提现 10 次</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>提现说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">提现额度：</span>
                  <span className="text-muted-foreground">最低提现金额 ¥100.00</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">提现手续费：</span>
                  <span className="text-muted-foreground">提现金额的 1%（最低 ¥1.00）</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">到账时间：</span>
                  <span className="text-muted-foreground">审核通过后 1-3 个工作日</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">注意：</span>
                  <span className="text-muted-foreground">提现前请确保账户信息正确，信息错误将导致提现失败</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>申请提现</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>提现金额 *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl font-medium">
                    ¥
                  </span>
                  <Input
                    type="number"
                    placeholder="请输入提现金额"
                    className="pl-10 text-2xl font-medium h-14"
                    min={100}
                    max={withdrawableAmount}
                    value={withdrawForm.amount || ''}
                    onChange={(e) =>
                      setWithdrawForm({
                        ...withdrawForm,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>可提现 ¥{withdrawableAmount.toFixed(2)}</span>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() =>
                      setWithdrawForm({ ...withdrawForm, amount: withdrawableAmount })
                    }
                  >
                    全部提现
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>提现账户 *</Label>
                <Select
                  value={withdrawForm.accountType}
                  onValueChange={(value) =>
                    setWithdrawForm({ ...withdrawForm, accountType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weixin">微信支付</SelectItem>
                    <SelectItem value="douyin">抖音支付</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">提现金额</span>
                  <span className="font-medium">¥{withdrawForm.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">手续费（1%）</span>
                  <span className="font-medium text-red-500">
                    -¥{(withdrawForm.amount * 0.01).toFixed(2)}
                  </span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>实际到账</span>
                  <span className="text-green-600">
                    ¥{(withdrawForm.amount * 0.99).toFixed(2)}
                  </span>
                </div>
              </div>

              <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full h-12 text-lg"
                    disabled={withdrawForm.amount < 100 || withdrawForm.amount > withdrawableAmount}
                  >
                    <Wallet className="w-5 h-5 mr-2" />
                    确认提现
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>确认提现</DialogTitle>
                    <DialogDescription>
                      确认提现 ¥{withdrawForm.amount.toFixed(2)} 到{' '}
                      {withdrawForm.accountType === 'weixin' ? '微信支付' : '抖音支付'}
                      账户吗？
                    </DialogDescription>
                  </DialogHeader>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">提现金额</span>
                      <span className="font-medium">¥{withdrawForm.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">手续费</span>
                      <span className="font-medium">-¥{(withdrawForm.amount * 0.01).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>实际到账</span>
                      <span className="text-green-600">
                        ¥{(withdrawForm.amount * 0.99).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>
                      取消
                    </Button>
                    <Button onClick={handleWithdraw}>
                      <Wallet className="w-4 h-4 mr-2" />
                      确认提现
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 提现记录 */}
        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>提现记录</CardTitle>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  导出记录
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>提现金额</TableHead>
                    <TableHead>账户类型</TableHead>
                    <TableHead>账户名称</TableHead>
                    <TableHead>手续费</TableHead>
                    <TableHead>实际到账</TableHead>
                    <TableHead>申请时间</TableHead>
                    <TableHead>完成时间</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="font-medium">
                        ¥{withdrawal.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{withdrawal.accountType}</Badge>
                      </TableCell>
                      <TableCell>{withdrawal.accountName}</TableCell>
                      <TableCell className="text-red-500">
                        -¥{withdrawal.fee}
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ¥{withdrawal.actualAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>{withdrawal.applyTime}</TableCell>
                      <TableCell>{withdrawal.completeTime}</TableCell>
                      <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 提现账户 */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>提现账户设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">微信支付</div>
                      <div className="text-sm text-muted-foreground">未绑定</div>
                    </div>
                  </div>
                  <Button variant="outline">绑定账户</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">抖音支付</div>
                      <div className="text-sm text-muted-foreground">未绑定</div>
                    </div>
                  </div>
                  <Button variant="outline">绑定账户</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>安全提示</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  请绑定本人实名认证的支付账户，确保资金安全
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  提现账户修改后，需要经过平台审核，审核期间无法提现
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  如遇账户异常，请联系平台客服处理
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
