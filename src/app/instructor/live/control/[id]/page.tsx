'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  ArrowLeft,
  Radio,
  Users,
  Heart,
  Gift,
  ShoppingCart,
  DollarSign,
  Settings,
  Camera,
  Mic,
  Volume2,
  Maximize,
  UserPlus,
  Trash2,
  Send,
  XCircle,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';

interface LiveStats {
  viewers: number;
  likes: number;
  comments: number;
  orders: number;
  sales: number;
  newStudents: number;
}

interface Comment {
  id: number;
  user: string;
  content: string;
  time: string;
}

interface Course {
  id: number;
  title: string;
  price: number;
  enabled: boolean;
}

export default function LiveControlPage() {
  const router = useRouter();
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [liveDuration, setLiveDuration] = useState(0);

  // 统计数据
  const [stats, setStats] = useState<LiveStats>({
    viewers: 1256,
    likes: 8923,
    comments: 456,
    orders: 89,
    sales: 17650,
    newStudents: 45,
  });

  // 模拟数据
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: '学员A', content: '老师讲得太好了！', time: '刚刚' },
    { id: 2, user: '学员B', content: '这门课多少钱？', time: '1分钟前' },
    { id: 3, user: '学员C', content: '已购买，期待课程内容', time: '2分钟前' },
    { id: 4, user: '学员D', content: '可以先试看吗？', time: '3分钟前' },
    { id: 5, user: '学员E', content: '老师再来一个！', time: '5分钟前' },
  ]);

  const [linkedCourses, setLinkedCourses] = useState<Course[]>([
    { id: 1, title: 'Python 入门到精通', price: 199, enabled: true },
    { id: 2, title: '短视频运营全攻略', price: 299, enabled: true },
  ]);

  const [selectedComments, setSelectedComments] = useState<number[]>([]);

  const availableCourses = [
    { id: 3, title: 'Excel 数据分析实战', price: 129 },
    { id: 4, title: '职场沟通技巧', price: 99 },
    { id: 5, title: '摄影基础教程', price: 199 },
  ];

  // 计时器
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveDuration((prev) => prev + 1);
      // 模拟数据增长
      setStats((prev) => ({
        ...prev,
        viewers: prev.viewers + Math.floor(Math.random() * 5),
        likes: prev.likes + Math.floor(Math.random() * 20),
        comments: prev.comments + Math.floor(Math.random() * 2),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendComment = () => {
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      user: '讲师',
      content: commentInput,
      time: '刚刚',
    };
    setComments([newComment, ...comments]);
    setCommentInput('');
  };

  const toggleCommentSelection = (id: number) => {
    setSelectedComments((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleDeleteSelectedComments = () => {
    setComments(comments.filter((c) => !selectedComments.includes(c.id)));
    setSelectedComments([]);
  };

  const toggleCourseEnabled = (id: number) => {
    setLinkedCourses(
      linkedCourses.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleAddCourse = (courseId: number) => {
    const course = availableCourses.find((c) => c.id === courseId);
    if (course) {
      setLinkedCourses([...linkedCourses, { ...course, enabled: true }]);
    }
    setAddCourseDialogOpen(false);
  };

  const handleRemoveCourse = (id: number) => {
    setLinkedCourses(linkedCourses.filter((c) => c.id !== id));
  };

  const handleEndLive = () => {
    setEndDialogOpen(false);
    alert('直播已结束，回放正在生成中');
    router.push('/instructor/live');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 顶部状态栏 */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/instructor/live" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 animate-pulse">
                <Radio className="w-3 h-3 mr-1" />
                直播中
              </Badge>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">直播时长：{formatDuration(liveDuration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
              onClick={() => setCouponDialogOpen(true)}
            >
              <Gift className="w-4 h-4 mr-2" />
              发送优惠券
            </Button>
            <Button
              variant="destructive"
              onClick={() => setEndDialogOpen(true)}
            >
              结束直播
            </Button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* 左侧直播画面 */}
        <div className="flex-1 p-6">
          <div className="bg-black rounded-lg h-full flex items-center justify-center relative">
            <div className="text-center">
              <Camera className="w-24 h-24 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">直播画面预览</p>
              <p className="text-xs text-gray-600 mt-2">1920x1080</p>
            </div>

            {/* 观看人数 */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full">
              <Users className="w-4 h-4 text-red-400" />
              <span className="font-medium">{stats.viewers.toLocaleString()}</span>
            </div>

            {/* 工具栏 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <Button variant="secondary" size="icon" className="rounded-full">
                <Camera className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Mic className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* 统计卡片 */}
          <div className="p-4 border-b border-gray-700">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <DollarSign className="w-4 h-4 mx-auto text-green-400 mb-1" />
                <p className="text-lg font-bold">¥{stats.sales.toLocaleString()}</p>
                <p className="text-xs text-gray-400">销售额</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <ShoppingCart className="w-4 h-4 mx-auto text-blue-400 mb-1" />
                <p className="text-lg font-bold">{stats.orders}</p>
                <p className="text-xs text-gray-400">订单数</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                <UserPlus className="w-4 h-4 mx-auto text-purple-400 mb-1" />
                <p className="text-lg font-bold">{stats.newStudents}</p>
                <p className="text-xs text-gray-400">新增学员</p>
              </div>
            </div>
          </div>

          {/* Tab 切换 */}
          <div className="flex border-b border-gray-700">
            <button
              className="flex-1 py-3 text-sm font-medium border-b-2 border-blue-500 text-blue-400"
            >
              互动区
            </button>
            <button className="flex-1 py-3 text-sm font-medium text-gray-400 hover:text-white">
              挂载课程
            </button>
          </div>

          {/* 互动区 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 工具栏 */}
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-sm">{stats.likes.toLocaleString()}</span>
              </div>
              {selectedComments.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300"
                  onClick={handleDeleteSelectedComments}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  删除({selectedComments.length})
                </Button>
              )}
            </div>

            {/* 讲师输入 */}
            <div className="p-3 border-b border-gray-700">
              <div className="flex gap-2">
                <Input
                  placeholder="说点什么..."
                  className="bg-gray-700 border-0"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
                />
                <Button size="sm" onClick={handleSendComment}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="flex-1 overflow-y-auto">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 border-b border-gray-700/50 hover:bg-gray-700/30 cursor-pointer"
                  onClick={() => toggleCommentSelection(comment.id)}
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(comment.id)}
                      readOnly
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 挂载课程区 */}
          <div className="border-t border-gray-700">
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm font-medium">已挂载课程</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAddCourseDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                添加
              </Button>
            </div>
            <div className="p-3 pt-0 space-y-2">
              {linkedCourses.map((course) => (
                <div
                  key={course.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    course.enabled ? 'bg-blue-600/20 border border-blue-600/50' : 'bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleCourseEnabled(course.id)}>
                      {course.enabled ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <div>
                      <p className="text-sm font-medium">{course.title}</p>
                      <p className="text-xs text-gray-400">¥{course.price}</p>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-400"
                    onClick={() => handleRemoveCourse(course.id)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 结束直播确认 */}
      <Dialog open={endDialogOpen} onOpenChange={setEndDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认结束直播</DialogTitle>
            <DialogDescription>
              结束直播后，观众将无法继续观看。回放将在直播结束后自动生成。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEndDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleEndLive}>
              确认结束
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 发送优惠券 */}
      <Dialog open={couponDialogOpen} onOpenChange={setCouponDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>发送优惠券</DialogTitle>
            <DialogDescription>选择要发送给观众的优惠券</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">新人专享券</p>
                  <p className="text-sm text-gray-500">满100减20</p>
                </div>
                <Badge>20元</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">限时折扣券</p>
                  <p className="text-sm text-gray-500">9折优惠</p>
                </div>
                <Badge variant="secondary">9折</Badge>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCouponDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => {
              alert('优惠券已发送到评论区');
              setCouponDialogOpen(false);
            }}>
              确认发送
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 添加课程 */}
      <Dialog open={addCourseDialogOpen} onOpenChange={setAddCourseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加挂载课程</DialogTitle>
            <DialogDescription>选择要挂载到直播间的课程</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
                onClick={() => handleAddCourse(course.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-gray-500">¥{course.price}</p>
                  </div>
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCourseDialogOpen(false)}>
              取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
