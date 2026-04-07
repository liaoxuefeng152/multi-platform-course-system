'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export default function WithdrawalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">提现管理</h1>
        <p className="text-muted-foreground">
          设置提现账户，查看提现记录和申请提现
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>可提现金额：¥0.00</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
