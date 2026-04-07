'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Shield,
  UserCheck,
  FileCheck,
  ShoppingCart,
  Settings,
  BarChart3,
  LogOut,
  Home,
  HelpCircle
} from 'lucide-react';

const adminNavItems = [
  {
    title: '管理首页',
    href: '/admin',
    icon: Home,
  },
  {
    title: '账号管理',
    href: '/admin/accounts',
    icon: UserCheck,
  },
  {
    title: '内容审核',
    href: '/admin/content',
    icon: FileCheck,
  },
  {
    title: '订单管理',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: '平台设置',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    title: '数据统计',
    href: '/admin/analytics',
    icon: BarChart3,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              管理后台
            </span>
          </Link>
        </div>

        {/* 导航菜单 */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* 用户信息 */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  管理员
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  admin@platform.com
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                平台管理后台
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                管理平台账号、内容、订单等
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/help">
                <Button variant="outline" size="sm">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  帮助中心
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  返回首页
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
