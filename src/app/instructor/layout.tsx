'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BookOpen,
  Video,
  Users,
  ShoppingCart,
  Gift,
  BarChart3,
  Wallet,
  User,
  Home,
  HelpCircle,
  Shield,
  Link2,
  UserCircle
} from 'lucide-react';

const instructorNavItems = [
  {
    title: '讲师首页',
    href: '/instructor',
    icon: Home,
  },
  {
    title: '讲师认证',
    href: '/instructor/auth',
    icon: Shield,
  },
  {
    title: '课程管理',
    href: '/instructor/courses',
    icon: BookOpen,
  },
  {
    title: '直播管理',
    href: '/instructor/live',
    icon: Video,
  },
  {
    title: '多平台对接',
    href: '/instructor/platforms',
    icon: Link2,
  },
  {
    title: '学员管理',
    href: '/instructor/students',
    icon: Users,
  },
  {
    title: '订单管理',
    href: '/instructor/orders',
    icon: ShoppingCart,
  },
  {
    title: '营销工具',
    href: '/instructor/marketing',
    icon: Gift,
  },
  {
    title: '数据统计',
    href: '/instructor/analytics',
    icon: BarChart3,
  },
  {
    title: '提现管理',
    href: '/instructor/withdrawal',
    icon: Wallet,
  },
  {
    title: '个人中心',
    href: '/instructor/profile',
    icon: UserCircle,
  },
];

export default function InstructorLayout({
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              讲师端
            </span>
          </Link>
        </div>

        {/* 导航菜单 */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            {instructorNavItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
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
          <Link href="/instructor/profile">
            <div className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  讲师名称
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  点击进入个人中心
                </p>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                讲师管理后台
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                管理您的课程、直播和学员
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
