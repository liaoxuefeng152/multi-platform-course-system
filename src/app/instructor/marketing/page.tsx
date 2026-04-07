'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Gift,
  Tag,
  Users,
  Target,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

export default function MarketingPage() {
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [seckillDialogOpen, setSeckillDialogOpen] = useState(false);

  // 模拟优惠券数据
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      name: '新用户专享券',
      type: '满减券',
      value: 20,
      minAmount: 99,
      total: 1000,
      used: 234,
      status: '进行中',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
    },
    {
      id: 2,
      name: '春季特惠',
      type: '折扣券',
      value: 8,
      minAmount: 0,
      total: 500,
      used: 156,
      status: '进行中',
      startDate: '2024-03-10',
      endDate: '2024-04-10',
    },
  ]);

  // 模拟拼团数据
  const [groupBuys, setGroupBuys] = useState([
    {
      id: 1,
      name: 'Python 课程拼团',
      originalPrice: 199,
      groupPrice: 99,
      groupSize: 3,
      duration: 24,
      participants: 45,
      successCount: 15,
      status: '进行中',
      startDate: '2024-03-10',
      endDate: '2024-03-20',
    },
  ]);

  // 模拟秒杀数据
  const [seckills, setSeckills] = useState([
    {
      id: 1,
      name: '秒杀特惠',
      originalPrice: 299,
      seckillPrice: 99,
      stock: 100,
      sold: 78,
      status: '进行中',
      startTime: '2024-03-15 20:00',
      endTime: '2024-03-15 22:00',
    },
  ]);

  // 优惠券表单状态
  const [couponForm, setCouponForm] = useState({
    name: '',
    type: '满减券',
    value: 0,
    minAmount: 0,
    total: 100,
    startDate: '',
    endDate: '',
  });

  // 拼团表单状态
  const [groupForm, setGroupForm] = useState({
    name: '',
    originalPrice: 0,
    groupPrice: 0,
    groupSize: 3,
    duration: 24,
    startDate: '',
    endDate: '',
  });

  // 秒杀表单状态
  const [seckillForm, setSeckillForm] = useState({
    name: '',
    originalPrice: 0,
    seckillPrice: 0,
    stock: 100,
    startTime: '',
    endTime: '',
  });

  const handleCreateCoupon = () => {
    console.log('创建优惠券:', couponForm);
    setCoupons([
      ...coupons,
      {
        id: coupons.length + 1,
        ...couponForm,
        used: 0,
        status: '进行中',
      },
    ]);
    setCouponDialogOpen(false);
  };

  const handleCreateGroup = () => {
    console.log('创建拼团:', groupForm);
    setGroupBuys([
      ...groupBuys,
      {
        id: groupBuys.length + 1,
        ...groupForm,
        participants: 0,
        successCount: 0,
        status: '进行中',
      },
    ]);
    setGroupDialogOpen(false);
  };

  const handleCreateSeckill = () => {
    console.log('创建秒杀:', seckillForm);
    setSeckills([
      ...seckills,
      {
        id: seckills.length + 1,
        ...seckillForm,
        sold: 0,
        status: '进行中',
      },
    ]);
    setSeckillDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">营销工具</h1>
          <p className="text-muted-foreground">
            创建优惠券、拼团活动、秒杀活动等营销活动
          </p>
        </div>
      </div>

      <Tabs defaultValue="coupons" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="coupons">
            <Tag className="w-4 h-4 mr-2" />
            优惠券
          </TabsTrigger>
          <TabsTrigger value="groups">
            <Users className="w-4 h-4 mr-2" />
            拼团活动
          </TabsTrigger>
          <TabsTrigger value="seckill">
            <Target className="w-4 h-4 mr-2" />
            秒杀活动
          </TabsTrigger>
          <TabsTrigger value="distribution">
            <Gift className="w-4 h-4 mr-2" />
            分销设置
          </TabsTrigger>
        </TabsList>

        {/* 优惠券 */}
        <TabsContent value="coupons" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>优惠券列表</CardTitle>
                <Dialog open={couponDialogOpen} onOpenChange={setCouponDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      创建优惠券
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>创建优惠券</DialogTitle>
                      <DialogDescription>
                        设置优惠券类型、面值和使用条件
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>优惠券名称 *</Label>
                        <Input
                          placeholder="请输入优惠券名称"
                          value={couponForm.name}
                          onChange={(e) =>
                            setCouponForm({ ...couponForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>优惠券类型</Label>
                          <Select
                            value={couponForm.type}
                            onValueChange={(value) =>
                              setCouponForm({ ...couponForm, type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="满减券">满减券</SelectItem>
                              <SelectItem value="折扣券">折扣券</SelectItem>
                              <SelectItem value="无门槛券">无门槛券</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>{couponForm.type === '折扣券' ? '折扣（如8折填8）' : '优惠金额（元）'}</Label>
                          <Input
                            type="number"
                            placeholder="请输入金额或折扣"
                            value={couponForm.value}
                            onChange={(e) =>
                              setCouponForm({
                                ...couponForm,
                                value: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      {couponForm.type === '满减券' && (
                        <div className="space-y-2">
                          <Label>最低消费金额（元）</Label>
                          <Input
                            type="number"
                            placeholder="请输入最低消费金额"
                            value={couponForm.minAmount}
                            onChange={(e) =>
                              setCouponForm({
                                ...couponForm,
                                minAmount: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <Input
                            type="date"
                            value={couponForm.startDate}
                            onChange={(e) =>
                              setCouponForm({ ...couponForm, startDate: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <Input
                            type="date"
                            value={couponForm.endDate}
                            onChange={(e) =>
                              setCouponForm({ ...couponForm, endDate: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>发放数量</Label>
                        <Input
                          type="number"
                          placeholder="请输入发放数量"
                          value={couponForm.total}
                          onChange={(e) =>
                            setCouponForm({
                              ...couponForm,
                              total: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setCouponDialogOpen(false)}>
                        取消
                      </Button>
                      <Button onClick={handleCreateCoupon}>创建</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>优惠券名称</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>面值</TableHead>
                    <TableHead>使用进度</TableHead>
                    <TableHead>有效期</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">{coupon.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{coupon.type}</Badge>
                      </TableCell>
                      <TableCell>
                        {coupon.type === '折扣券'
                          ? `${coupon.value}折`
                          : `¥${coupon.value}`}
                      </TableCell>
                      <TableCell>
                        {coupon.used} / {coupon.total}
                      </TableCell>
                      <TableCell>
                        {coupon.startDate} ~ {coupon.endDate}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{coupon.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 拼团活动 */}
        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>拼团活动列表</CardTitle>
                <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      创建拼团活动
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>创建拼团活动</DialogTitle>
                      <DialogDescription>
                        设置拼团价格、人数和活动时间
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>活动名称 *</Label>
                        <Input
                          placeholder="请输入活动名称"
                          value={groupForm.name}
                          onChange={(e) =>
                            setGroupForm({ ...groupForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>原价（元）</Label>
                          <Input
                            type="number"
                            placeholder="请输入原价"
                            value={groupForm.originalPrice}
                            onChange={(e) =>
                              setGroupForm({
                                ...groupForm,
                                originalPrice: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>拼团价（元）</Label>
                          <Input
                            type="number"
                            placeholder="请输入拼团价"
                            value={groupForm.groupPrice}
                            onChange={(e) =>
                              setGroupForm({
                                ...groupForm,
                                groupPrice: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>拼团人数</Label>
                          <Input
                            type="number"
                            placeholder="请输入拼团人数"
                            value={groupForm.groupSize}
                            onChange={(e) =>
                              setGroupForm({
                                ...groupForm,
                                groupSize: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>拼团时限（小时）</Label>
                          <Input
                            type="number"
                            placeholder="请输入拼团时限"
                            value={groupForm.duration}
                            onChange={(e) =>
                              setGroupForm({
                                ...groupForm,
                                duration: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <Input
                            type="date"
                            value={groupForm.startDate}
                            onChange={(e) =>
                              setGroupForm({ ...groupForm, startDate: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <Input
                            type="date"
                            value={groupForm.endDate}
                            onChange={(e) =>
                              setGroupForm({ ...groupForm, endDate: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setGroupDialogOpen(false)}>
                        取消
                      </Button>
                      <Button onClick={handleCreateGroup}>创建</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>活动名称</TableHead>
                    <TableHead>原价</TableHead>
                    <TableHead>拼团价</TableHead>
                    <TableHead>拼团人数</TableHead>
                    <TableHead>参与/成功</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupBuys.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>¥{group.originalPrice}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ¥{group.groupPrice}
                      </TableCell>
                      <TableCell>{group.groupSize}人团</TableCell>
                      <TableCell>
                        {group.participants} / {group.successCount}成功
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{group.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 秒杀活动 */}
        <TabsContent value="seckill" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>秒杀活动列表</CardTitle>
                <Dialog open={seckillDialogOpen} onOpenChange={setSeckillDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      创建秒杀活动
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>创建秒杀活动</DialogTitle>
                      <DialogDescription>
                        设置秒杀价格、库存和活动时间
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>活动名称 *</Label>
                        <Input
                          placeholder="请输入活动名称"
                          value={seckillForm.name}
                          onChange={(e) =>
                            setSeckillForm({ ...seckillForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>原价（元）</Label>
                          <Input
                            type="number"
                            placeholder="请输入原价"
                            value={seckillForm.originalPrice}
                            onChange={(e) =>
                              setSeckillForm({
                                ...seckillForm,
                                originalPrice: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>秒杀价（元）</Label>
                          <Input
                            type="number"
                            placeholder="请输入秒杀价"
                            value={seckillForm.seckillPrice}
                            onChange={(e) =>
                              setSeckillForm({
                                ...seckillForm,
                                seckillPrice: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>秒杀库存</Label>
                        <Input
                          type="number"
                          placeholder="请输入库存数量"
                          value={seckillForm.stock}
                          onChange={(e) =>
                            setSeckillForm({
                              ...seckillForm,
                              stock: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>开始时间</Label>
                          <Input
                            type="datetime-local"
                            value={seckillForm.startTime}
                            onChange={(e) =>
                              setSeckillForm({ ...seckillForm, startTime: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>结束时间</Label>
                          <Input
                            type="datetime-local"
                            value={seckillForm.endTime}
                            onChange={(e) =>
                              setSeckillForm({ ...seckillForm, endTime: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSeckillDialogOpen(false)}>
                        取消
                      </Button>
                      <Button onClick={handleCreateSeckill}>创建</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>活动名称</TableHead>
                    <TableHead>原价</TableHead>
                    <TableHead>秒杀价</TableHead>
                    <TableHead>库存/已售</TableHead>
                    <TableHead>活动时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seckills.map((seckill) => (
                    <TableRow key={seckill.id}>
                      <TableCell className="font-medium">{seckill.name}</TableCell>
                      <TableCell>¥{seckill.originalPrice}</TableCell>
                      <TableCell className="text-red-600 font-medium">
                        ¥{seckill.seckillPrice}
                      </TableCell>
                      <TableCell>
                        {seckill.sold} / {seckill.stock}
                      </TableCell>
                      <TableCell>
                        {seckill.startTime} ~ {seckill.endTime}
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{seckill.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 分销设置 */}
        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>分销设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 border rounded-lg">
                <div>
                  <div className="font-medium text-lg">启用分销功能</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    开启后，学员分享课程可获得佣金奖励
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">佣金设置</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>佣金比例（%）</Label>
                    <Input type="number" placeholder="请输入佣金比例" />
                  </div>
                  <div className="space-y-2">
                    <Label>结算周期（天）</Label>
                    <Input type="number" placeholder="请输入结算周期" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">提现设置</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>最低提现金额（元）</Label>
                    <Input type="number" placeholder="请输入最低提现金额" />
                  </div>
                  <div className="space-y-2">
                    <Label>提现手续费（%）</Label>
                    <Input type="number" placeholder="请输入手续费比例" />
                  </div>
                </div>
              </div>

              <Button className="w-full">保存设置</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
