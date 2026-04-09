'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  Hand,
  Monitor,
  Mic2,
  MoreVertical,
  Send,
  Volume2,
  VolumeX,
  Settings,
  Maximize2,
  ChevronDown,
  Radio,
  Clock,
  Eye,
  Gift,
  FileText,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  isMuted: boolean;
  hasQuestion: boolean;
  handRaised: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isInstructor?: boolean;
}

interface OnlineStudent {
  id: string;
  name: string;
  joinedAt: string;
}

export default function LiveClassPage({ params }: { params: { id: string } }) {
  // 直播状态
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // 在线学员
  const [onlineStudents] = useState<OnlineStudent[]>([
    { id: '1', name: '张小明', joinedAt: '19:00' },
    { id: '2', name: '李华', joinedAt: '19:01' },
    { id: '3', name: '王芳', joinedAt: '19:02' },
    { id: '4', name: '赵雷', joinedAt: '19:03' },
    { id: '5', name: '陈静', joinedAt: '19:05' },
  ]);

  // 举手的学员
  const [raisedHands] = useState<Student[]>([
    { id: '2', name: '李华', isOnline: true, isMuted: true, hasQuestion: true, handRaised: true },
    { id: '4', name: '赵雷', isOnline: true, isMuted: false, hasQuestion: false, handRaised: true },
  ]);

  // 聊天消息
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: '张小明', content: '老师好！', time: '19:01' },
    { id: '2', sender: '李华', content: '终于开课了，期待已久！', time: '19:02' },
    { id: '3', sender: '讲师', content: '同学们好，我们准备开始了。', time: '19:03', isInstructor: true },
    { id: '4', sender: '王芳', content: '老师能听到吗？', time: '19:04' },
    { id: '5', sender: '陈静', content: '课件能看清楚吗？', time: '19:05' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // 直播时长
  const [duration, setDuration] = useState(0);

  // 统计数据
  const stats = {
    views: 187,
    likes: 1256,
    comments: 89,
    shares: 23,
  };

  // 模拟直播计时
  useEffect(() => {
    if (isLive) {
      const timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLive]);

  // 格式化时长
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 发送消息
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          sender: '讲师',
          content: newMessage,
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          isInstructor: true,
        },
      ]);
      setNewMessage('');
    }
  };

  // 开始/结束直播
  const toggleLive = () => {
    setIsLive(!isLive);
    if (!isLive) {
      setDuration(0);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* 顶部工具栏 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/instructor/classroom" className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Badge className={`${isLive ? 'bg-red-500' : 'bg-gray-600'}`}>
              {isLive ? '直播中' : '未开播'}
            </Badge>
            <span className="text-gray-400">|</span>
            <span className="text-white font-medium">Python 入门第一课</span>
          </div>
          {isLive && (
            <div className="flex items-center gap-2 text-red-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="font-mono">{formatDuration(duration)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{stats.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{onlineStudents.length}</span>
            </div>
          </div>
          <div className="h-6 w-px bg-gray-700" />
          <Button
            variant={isLive ? 'destructive' : 'default'}
            size="sm"
            onClick={toggleLive}
            className={isLive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
          >
            {isLive ? (
              <>
                <X className="w-4 h-4 mr-1" />
                结束直播
              </>
            ) : (
              <>
                <Radio className="w-4 h-4 mr-1" />
                开始直播
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：直播画面 + 课件 */}
        <div className="flex-1 flex flex-col p-4 gap-4">
          {/* 直播画面区域 */}
          <div className="flex-1 bg-black rounded-lg relative overflow-hidden">
            {isVideoOn ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/avatars/teacher.jpg" />
                    <AvatarFallback className="bg-blue-500 text-3xl">讲</AvatarFallback>
                  </Avatar>
                  <p className="text-white text-lg">讲师画面</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <VideoOff className="w-16 h-16 text-gray-600" />
              </div>
            )}

            {/* 直播信息叠加 */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {isLive && (
                <Badge className="bg-red-500 text-white">
                  <Radio className="w-3 h-3 mr-1 animate-pulse" />
                  直播中
                </Badge>
              )}
              <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                <Clock className="w-3 h-3 mr-1" />
                {formatDuration(duration)}
              </Badge>
            </div>

            {/* 底部互动按钮 */}
            {isLive && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="secondary" className="rounded-full bg-black/50 hover:bg-black/70">
                      <Gift className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>发送礼物</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {/* 课件区域 */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                课件
                <Badge variant="outline" className="ml-auto text-xs">当前: 第3页</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-700 rounded flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Python 环境搭建指南</p>
                  <p className="text-xs">点击切换课件</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：互动面板 */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Tab 切换 */}
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                true ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              聊天
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                false ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
              }`}
            >
              <Users className="w-4 h-4" />
              学员 ({onlineStudents.length})
            </button>
          </div>

          {/* 聊天区域 */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.isInstructor ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className={msg.isInstructor ? 'bg-blue-500' : 'bg-gray-600'}>
                      {msg.sender.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[200px] ${msg.isInstructor ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <div
                      className={`inline-block px-3 py-2 rounded-lg text-sm ${
                        msg.isInstructor
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-700 text-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* 消息输入 */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <Input
                placeholder="输入消息..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 举手列表 */}
          {raisedHands.length > 0 && (
            <div className="border-t border-gray-700 p-4">
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Hand className="w-4 h-4 text-yellow-400" />
                举手提问 ({raisedHands.length})
              </p>
              <div className="space-y-2">
                {raisedHands.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gray-600 text-xs">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{student.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Mic2 className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-500">
                        <Check className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部控制栏 */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          {/* 麦克风 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="ghost"
                className={`rounded-full w-14 h-14 ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isMuted ? '开启麦克风' : '关闭麦克风'}</TooltipContent>
          </Tooltip>

          {/* 摄像头 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="ghost"
                className={`rounded-full w-14 h-14 ${!isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <VideoOff className="w-6 h-6 text-white" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isVideoOn ? '关闭摄像头' : '开启摄像头'}</TooltipContent>
          </Tooltip>

          {/* 屏幕共享 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
              >
                <Monitor className="w-6 h-6 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>屏幕共享</TooltipContent>
          </Tooltip>

          {/* 分隔线 */}
          <div className="h-10 w-px bg-gray-700 mx-2" />

          {/* 音量 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
                onClick={() => setIsSoundOn(!isSoundOn)}
              >
                {isSoundOn ? (
                  <Volume2 className="w-6 h-6 text-white" />
                ) : (
                  <VolumeX className="w-6 h-6 text-white" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isSoundOn ? '静音' : '取消静音'}</TooltipContent>
          </Tooltip>

          {/* 设置 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full w-14 h-14 bg-gray-700 hover:bg-gray-600"
              >
                <Settings className="w-6 h-6 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>设置</TooltipContent>
          </Tooltip>

          {/* 分隔线 */}
          <div className="h-10 w-px bg-gray-700 mx-2" />

          {/* 结束通话 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="destructive"
                className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700"
                disabled={!isLive}
                onClick={toggleLive}
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>结束直播</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
