'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Mail,
  Phone,
  Bell,
  Shield,
  Key,
  Camera,
  Save,
  ArrowLeft,
  CheckCircle,
  X,
  LogOut,
  Settings,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react';

interface Profile {
  name: string;
  avatar: string | null;
  email: string;
  phone: string;
  gender: string;
  birthday: string;
  bio: string;
  wechat: string;
  qq: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderNotification: boolean;
  commentNotification: boolean;
  systemNotification: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // 个人信息
  const [profile, setProfile] = useState<Profile>({
    name: '张老师',
    avatar: null,
    email: 'zhangteacher@example.com',
    phone: '138****8888',
    gender: 'male',
    birthday: '1990-01-01',
    bio: '专注于在线教育领域10年，帮助10000+学员实现职业成长。',
    wechat: 'zhanglaoshi888',
    qq: '123456789',
  });

  // 通知设置
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    sms: true,
    push: false,
    orderNotification: true,
    commentNotification: true,
    systemNotification: false,
  });

  // 密码修改
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
  };

  const handleSaveProfile = () => {
    alert('个人信息保存成功');
  };

  const handleSaveNotifications = () => {
    alert('通知设置保存成功');
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    if (passwords.newPassword.length < 6) {
      alert('密码长度不能少于6位');
      return;
    }
    alert('密码修改成功');
    setPasswordDialogOpen(false);
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    router.push('/login/instructor');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/instructor" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold">个人中心</h1>
          </div>
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => setLogoutDialogOpen(true)}
          >
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              个人信息
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              通知设置
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              安全设置
            </TabsTrigger>
          </TabsList>

          {/* 个人信息 */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>修改您的个人资料信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 头像 */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={avatarPreview || profile.avatar || undefined} />
                      <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700"
                    >
                      <Camera className="w-4 h-4" />
                    </label>
                  </div>
                  <div>
                    <p className="font-medium">头像</p>
                    <p className="text-sm text-gray-500">支持 JPG、PNG 格式，最大 2MB</p>
                    {avatarPreview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 mt-2"
                        onClick={handleRemoveAvatar}
                      >
                        <X className="w-4 h-4 mr-1" />
                        删除
                      </Button>
                    )}
                  </div>
                </div>

                {/* 表单 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">性别</Label>
                    <Select
                      value={profile.gender}
                      onValueChange={(v) => setProfile({ ...profile, gender: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                        <SelectItem value="secret">保密</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled
                    />
                    <p className="text-xs text-gray-500">如需修改请联系客服</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthday">生日</Label>
                    <Input
                      id="birthday"
                      type="date"
                      value={profile.birthday}
                      onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wechat">微信号</Label>
                    <Input
                      id="wechat"
                      value={profile.wechat}
                      onChange={(e) => setProfile({ ...profile, wechat: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">个人简介</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="介绍一下自己..."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    保存修改
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知设置 */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知偏好</CardTitle>
                <CardDescription>选择您希望接收的通知方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 通知渠道 */}
                <div>
                  <h3 className="font-medium mb-4">通知渠道</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">邮件通知</p>
                          <p className="text-sm text-gray-500">接收邮件提醒</p>
                        </div>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notificationSettings.email ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            email: !notificationSettings.email,
                          })
                        }
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notificationSettings.email ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">短信通知</p>
                          <p className="text-sm text-gray-500">接收短信提醒</p>
                        </div>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notificationSettings.sms ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            sms: !notificationSettings.sms,
                          })
                        }
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notificationSettings.sms ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium">系统推送</p>
                          <p className="text-sm text-gray-500">接收站内消息</p>
                        </div>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notificationSettings.push ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            push: !notificationSettings.push,
                          })
                        }
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notificationSettings.push ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 通知类型 */}
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">通知类型</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">订单通知</p>
                        <p className="text-sm text-gray-500">新订单、订单状态变更</p>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notificationSettings.orderNotification ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            orderNotification: !notificationSettings.orderNotification,
                          })
                        }
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notificationSettings.orderNotification ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">评论通知</p>
                        <p className="text-sm text-gray-500">学员评论、新回复</p>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notificationSettings.commentNotification ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            commentNotification: !notificationSettings.commentNotification,
                          })
                        }
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notificationSettings.commentNotification ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">系统通知</p>
                        <p className="text-sm text-gray-500">平台公告、系统消息</p>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notificationSettings.systemNotification ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            systemNotification: !notificationSettings.systemNotification,
                          })
                        }
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notificationSettings.systemNotification ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    保存设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* 账号安全 */}
              <Card>
                <CardHeader>
                  <CardTitle>账号安全</CardTitle>
                  <CardDescription>管理您的账号安全设置</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">账号状态</p>
                        <p className="text-sm text-gray-500">已认证的讲师账号</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">安全</Badge>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">邮箱绑定</p>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      修改
                    </Button>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">手机绑定</p>
                        <p className="text-sm text-gray-500">{profile.phone}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      已绑定
                    </Button>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Key className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">登录密码</p>
                        <p className="text-sm text-gray-500">定期修改密码可以保护账号安全</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPasswordDialogOpen(true)}
                    >
                      修改密码
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 登录记录 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    登录记录
                  </CardTitle>
                  <CardDescription>最近30天的登录历史</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Windows / Chrome</p>
                          <p className="text-sm text-gray-500">IP地址: 192.168.1.xxx</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">2024-01-15 14:30</p>
                        <p className="text-xs text-gray-500">当前登录</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <Settings className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Windows / Chrome</p>
                          <p className="text-sm text-gray-500">IP地址: 192.168.1.xxx</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">2024-01-14 09:15</p>
                        <p className="text-xs text-gray-500">广东广州</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <Settings className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">iPhone / Safari</p>
                          <p className="text-sm text-gray-500">IP地址: 10.0.0.xxx</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">2024-01-13 18:42</p>
                        <p className="text-xs text-gray-500">广东深圳</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 修改密码弹窗 */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改密码</DialogTitle>
            <DialogDescription>请输入当前密码和新密码</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">当前密码</Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showPasswords.old ? 'text' : 'password'}
                  placeholder="请输入当前密码"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
                >
                  {showPasswords.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">新密码</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  placeholder="请输入新密码"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  placeholder="请再次输入新密码"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleChangePassword}>确认修改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 退出登录弹窗 */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认退出登录</DialogTitle>
            <DialogDescription>退出后需要重新登录才能继续使用</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              确认退出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
