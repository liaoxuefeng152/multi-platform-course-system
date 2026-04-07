'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Gift,
  Tag,
  Users,
  Target,
  Plus
} from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">营销工具</h1>
          <p className="text-muted-foreground">
            创建优惠券、拼团活动、秒杀活动等营销活动
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          新建活动
        </Button>
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

        <TabsContent value="coupons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>优惠券管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>暂无优惠券</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  创建优惠券
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>拼团活动管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>暂无拼团活动</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  创建拼团活动
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seckill" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>秒杀活动管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>暂无秒杀活动</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  创建秒杀活动
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>分销设置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Gift className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>分销功能暂未开启</p>
                <Button className="mt-4">
                  开启分销功能
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
