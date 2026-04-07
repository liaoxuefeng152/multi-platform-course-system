'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">平台设置</h1>
        <p className="text-muted-foreground">
          配置平台基础设置和支付参数
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>平台设置功能</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
