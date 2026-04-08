'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Building,
  CreditCard,
  Shield,
  Bell,
  Save,
  Upload,
  X,
  AlertCircle
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  // 基础设置
  const [basicSettings, setBasicSettings] = useState({
    platformName: '多平台卖课管理系统',
    platformSlogan: '支持抖音、视频号直播卖课的一体化管理平台',
    contactEmail: 'support@example.com',
    contactPhone: '400-xxx-xxxx',
    address: '北京市朝阳区某某大厦',
    icpNumber: '京ICP备XXXXXXXX号',
  });

  // 支付设置
  const [paymentSettings, setPaymentSettings] = useState({
    wechatPayEnabled: true,
    wechatAppId: '',
    wechatMchId: '',
    wechatApiKey: '',
    douyinPayEnabled: true,
    douyinAppId: '',
  });

  // 权限设置
  const [permissionSettings, setPermissionSettings] = useState({
    requireInstructorAuth: true,
    autoApproveCourse: false,
    autoApproveLive: false,
    refundDays: 7,
    maxCoursePrice: 9999,
    minCoursePrice: 0,
  });

  // 通知设置
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotify: true,
    smsNotify: false,
    orderNotify: true,
    refundNotify: true,
    authNotify: true,
  });

  // 违规规则设置
  const [violationRules, setViolationRules] = useState({
    prohibitedContent: '涉黄、涉暴、涉政、涉毒等内容\n虚假宣传、欺诈行为\n侵犯他人知识产权\n其他违反法律法规的内容',
    penaltyRule: '首次违规：警告并下架内容\n二次违规：封禁账号7天\n三次违规：永久封禁账号',
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
  };

  const handleSaveSettings = (tab: string) => {
    console.log('保存设置:', tab);
    alert(`${tab} 设置已保存`);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold">平台设置</h1>
        <p className="text-muted-foreground mt-1">配置平台基础信息、支付设置、权限规则等</p>
      </div>

      {/* 设置选项卡 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic" className="gap-2">
            <Building className="w-4 h-4" />
            基础设置
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="w-4 h-4" />
            支付设置
          </TabsTrigger>
          <TabsTrigger value="permission" className="gap-2">
            <Shield className="w-4 h-4" />
            权限设置
          </TabsTrigger>
          <TabsTrigger value="notification" className="gap-2">
            <Bell className="w-4 h-4" />
            通知设置
          </TabsTrigger>
          <TabsTrigger value="violation" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            违规规则
          </TabsTrigger>
        </TabsList>

        {/* 基础设置 */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>平台信息</CardTitle>
              <CardDescription>设置平台的基本信息，包括名称、Logo、联系方式等</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo 设置 */}
              <div className="space-y-4">
                <Label>平台 Logo</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <div
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer relative ${
                    logoPreview ? 'p-4' : 'p-8'
                  }`}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  {logoPreview ? (
                    <>
                      <img
                        src={logoPreview}
                        alt="Logo 预览"
                        className="max-h-24 rounded-lg object-contain"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveLogo();
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        删除
                      </Button>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        点击上传 Logo
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        建议尺寸 200x60px，支持 PNG、JPG 格式
                      </p>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              {/* 平台名称 */}
              <div className="space-y-2">
                <Label htmlFor="platformName">平台名称</Label>
                <Input
                  id="platformName"
                  value={basicSettings.platformName}
                  onChange={(e) => setBasicSettings({ ...basicSettings, platformName: e.target.value })}
                />
              </div>

              {/* 平台标语 */}
              <div className="space-y-2">
                <Label htmlFor="platformSlogan">平台标语</Label>
                <Input
                  id="platformSlogan"
                  value={basicSettings.platformSlogan}
                  onChange={(e) => setBasicSettings({ ...basicSettings, platformSlogan: e.target.value })}
                />
              </div>

              {/* 联系信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">联系邮箱</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={basicSettings.contactEmail}
                    onChange={(e) => setBasicSettings({ ...basicSettings, contactEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">联系电话</Label>
                  <Input
                    id="contactPhone"
                    value={basicSettings.contactPhone}
                    onChange={(e) => setBasicSettings({ ...basicSettings, contactPhone: e.target.value })}
                  />
                </div>
              </div>

              {/* 地址 */}
              <div className="space-y-2">
                <Label htmlFor="address">公司地址</Label>
                <Input
                  id="address"
                  value={basicSettings.address}
                  onChange={(e) => setBasicSettings({ ...basicSettings, address: e.target.value })}
                />
              </div>

              {/* ICP备案号 */}
              <div className="space-y-2">
                <Label htmlFor="icpNumber">ICP 备案号</Label>
                <Input
                  id="icpNumber"
                  value={basicSettings.icpNumber}
                  onChange={(e) => setBasicSettings({ ...basicSettings, icpNumber: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings('基础')}>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 支付设置 */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>支付设置</CardTitle>
              <CardDescription>配置平台支持的支付方式和支付参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 微信支付 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-sm font-bold">W</span>
                    </div>
                    <Label className="text-base font-semibold">微信支付</Label>
                  </div>
                  <Switch
                    checked={paymentSettings.wechatPayEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, wechatPayEnabled: checked })}
                  />
                </div>

                {paymentSettings.wechatPayEnabled && (
                  <div className="pl-10 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wechatAppId">App ID</Label>
                      <Input
                        id="wechatAppId"
                        placeholder="请输入微信支付 App ID"
                        value={paymentSettings.wechatAppId}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, wechatAppId: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wechatMchId">商户号</Label>
                      <Input
                        id="wechatMchId"
                        placeholder="请输入微信支付商户号"
                        value={paymentSettings.wechatMchId}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, wechatMchId: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wechatApiKey">API Key</Label>
                      <Input
                        id="wechatApiKey"
                        type="password"
                        placeholder="请输入微信支付 API Key"
                        value={paymentSettings.wechatApiKey}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, wechatApiKey: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* 抖音支付 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                      <span className="text-white text-sm font-bold">D</span>
                    </div>
                    <Label className="text-base font-semibold">抖音支付</Label>
                  </div>
                  <Switch
                    checked={paymentSettings.douyinPayEnabled}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, douyinPayEnabled: checked })}
                  />
                </div>

                {paymentSettings.douyinPayEnabled && (
                  <div className="pl-10 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="douyinAppId">App ID</Label>
                      <Input
                        id="douyinAppId"
                        placeholder="请输入抖音支付 App ID"
                        value={paymentSettings.douyinAppId}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, douyinAppId: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings('支付')}>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 权限设置 */}
        <TabsContent value="permission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>权限设置</CardTitle>
              <CardDescription>配置讲师入驻、课程审核、定价规则等权限</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 入驻设置 */}
              <div className="space-y-4">
                <h3 className="font-semibold">入驻设置</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">要求实名认证</div>
                    <div className="text-sm text-muted-foreground">
                      讲师入驻前必须完成实名认证审核
                    </div>
                  </div>
                  <Switch
                    checked={permissionSettings.requireInstructorAuth}
                    onCheckedChange={(checked) => setPermissionSettings({ ...permissionSettings, requireInstructorAuth: checked })}
                  />
                </div>
              </div>

              <Separator />

              {/* 审核设置 */}
              <div className="space-y-4">
                <h3 className="font-semibold">审核设置</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">自动审核课程</div>
                    <div className="text-sm text-muted-foreground">
                      课程提交后自动审核通过，无需人工干预
                    </div>
                  </div>
                  <Switch
                    checked={permissionSettings.autoApproveCourse}
                    onCheckedChange={(checked) => setPermissionSettings({ ...permissionSettings, autoApproveCourse: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">自动审核直播</div>
                    <div className="text-sm text-muted-foreground">
                      直播提交后自动审核通过，无需人工干预
                    </div>
                  </div>
                  <Switch
                    checked={permissionSettings.autoApproveLive}
                    onCheckedChange={(checked) => setPermissionSettings({ ...permissionSettings, autoApproveLive: checked })}
                  />
                </div>
              </div>

              <Separator />

              {/* 退款规则 */}
              <div className="space-y-4">
                <h3 className="font-semibold">退款规则</h3>
                <div className="space-y-2">
                  <Label htmlFor="refundDays">允许退款天数</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="refundDays"
                      type="number"
                      className="w-32"
                      value={permissionSettings.refundDays}
                      onChange={(e) => setPermissionSettings({ ...permissionSettings, refundDays: parseInt(e.target.value) || 0 })}
                    />
                    <span className="text-muted-foreground">天</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    订单完成后在此天数内可申请退款
                  </p>
                </div>
              </div>

              <Separator />

              {/* 定价规则 */}
              <div className="space-y-4">
                <h3 className="font-semibold">定价规则</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPrice">最低课程价格</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">¥</span>
                      <Input
                        id="minPrice"
                        type="number"
                        value={permissionSettings.minCoursePrice}
                        onChange={(e) => setPermissionSettings({ ...permissionSettings, minCoursePrice: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">最高课程价格</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">¥</span>
                      <Input
                        id="maxPrice"
                        type="number"
                        value={permissionSettings.maxCoursePrice}
                        onChange={(e) => setPermissionSettings({ ...permissionSettings, maxCoursePrice: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings('权限')}>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>配置平台各类通知的发送方式和接收条件</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 通知方式 */}
              <div className="space-y-4">
                <h3 className="font-semibold">通知方式</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">邮件通知</div>
                    <div className="text-sm text-muted-foreground">
                      通过邮件发送重要通知
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotify}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotify: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">短信通知</div>
                    <div className="text-sm text-muted-foreground">
                      通过短信发送重要通知（可能产生费用）
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotify}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsNotify: checked })}
                  />
                </div>
              </div>

              <Separator />

              {/* 通知类型 */}
              <div className="space-y-4">
                <h3 className="font-semibold">通知类型</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">订单通知</div>
                    <div className="text-sm text-muted-foreground">
                      新订单创建时发送通知
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.orderNotify}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, orderNotify: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">退款通知</div>
                    <div className="text-sm text-muted-foreground">
                      退款申请和退款完成时发送通知
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.refundNotify}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, refundNotify: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">认证通知</div>
                    <div className="text-sm text-muted-foreground">
                      讲师认证审核结果通知
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.authNotify}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, authNotify: checked })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings('通知')}>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 违规规则 */}
        <TabsContent value="violation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>违规规则设置</CardTitle>
              <CardDescription>配置平台内容规范和违规处罚规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 禁止内容 */}
              <div className="space-y-2">
                <Label htmlFor="prohibitedContent">禁止发布的内容</Label>
                <Textarea
                  id="prohibitedContent"
                  className="min-h-[150px]"
                  value={violationRules.prohibitedContent}
                  onChange={(e) => setViolationRules({ ...violationRules, prohibitedContent: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  每条规则一行，系统将根据这些关键词进行内容检测
                </p>
              </div>

              {/* 处罚规则 */}
              <div className="space-y-2">
                <Label htmlFor="penaltyRule">违规处罚规则</Label>
                <Textarea
                  id="penaltyRule"
                  className="min-h-[150px]"
                  value={violationRules.penaltyRule}
                  onChange={(e) => setViolationRules({ ...violationRules, penaltyRule: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  设置不同违规次数对应的处罚措施
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings('违规规则')}>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
