'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">订单管理</h1>
        <p className="text-muted-foreground">
          查看和管理平台所有订单
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>订单管理功能</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
