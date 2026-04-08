'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Eye, EyeOff, MessageCircle } from 'lucide-react';

export default function InstructorLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'password' | 'code'>('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGetCode = () => {
    if (!phone || phone.length !== 11) {
      alert('请输入正确的手机号');
      return;
    }
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    alert('验证码已发送');
  };

  const handleLogin = () => {
    if (!phone || phone.length !== 11) {
      alert('请输入正确的手机号');
      return;
    }
    if (loginMethod === 'password' && !password) {
      alert('请输入密码');
      return;
    }
    if (loginMethod === 'code' && !code) {
      alert('请输入验证码');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/instructor');
    }, 1500);
  };

  const handleWechatLogin = () => {
    alert('微信授权登录功能开发中');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              多平台卖课管理系统
            </span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">讲师登录</CardTitle>
            <CardDescription className="text-center">
              欢迎回来！请登录您的账号
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 登录方式切换 */}
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as 'password' | 'code')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="password">密码登录</TabsTrigger>
                <TabsTrigger value="code">验证码登录</TabsTrigger>
              </TabsList>

              <TabsContent value="password" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="请输入手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={11}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">密码</Label>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      忘记密码？
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-code">手机号</Label>
                  <Input
                    id="phone-code"
                    type="tel"
                    placeholder="请输入手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={11}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">验证码</Label>
                  <div className="flex gap-2">
                    <Input
                      id="code"
                      type="text"
                      placeholder="请输入验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="flex-1"
                      maxLength={6}
                    />
                    <Button
                      variant="outline"
                      onClick={handleGetCode}
                      disabled={countdown > 0}
                      className="w-28"
                    >
                      {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* 记住我 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                记住我
              </label>
            </div>

            {/* 登录按钮 */}
            <Button
              className="w-full h-12 text-base"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </Button>

            {/* 微信登录 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">或</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 text-base relative"
              onClick={handleWechatLogin}
            >
              <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
              微信授权登录
            </Button>

            {/* 注册链接 */}
            <div className="text-center text-sm text-muted-foreground">
              还没有账号？{' '}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                立即注册
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 返回首页 */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
