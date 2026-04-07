'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import {
  Video,
  Calendar as CalendarIcon,
  Upload,
  ArrowLeft,
  Save,
  Send,
  Check
} from 'lucide-react';

export default function CreateLivePage() {
  const router = useRouter();
  const [liveData, setLiveData] = useState({
    title: '',
    platform: ['douyin'],
    scheduledDate: new Date(),
    scheduledTime: '19:00',
    coverImage: null as File | null,
    description: '',
    isAutoStart: false,
    isRecord: true,
    allowComment: true,
    allowShare: true,
    attachedCourses: [] as number[],
  });

  const platforms = [
    { value: 'douyin', label: '抖音' },
    { value: 'weixin', label: '视频号' },
  ];

  // 模拟可挂载的课程
  const availableCourses = [
    { id: 1, title: 'Python 入门到精通', price: 199 },
    { id: 2, title: 'Excel 数据分析实战', price: 129 },
    { id: 3, title: '短视频运营全攻略', price: 299 },
    { id: 4, title: '职场沟通技巧', price: 99 },
  ];

  const togglePlatform = (platform: string) => {
    if (liveData.platform.includes(platform)) {
      setLiveData({
        ...liveData,
        platform: liveData.platform.filter((p) => p !== platform),
      });
    } else {
      setLiveData({
        ...liveData,
        platform: [...liveData.platform, platform],
      });
    }
  };

  const toggleCourse = (courseId: number) => {
    if (liveData.attachedCourses.includes(courseId)) {
      setLiveData({
        ...liveData,
        attachedCourses: liveData.attachedCourses.filter((id) => id !== courseId),
      });
    } else {
      setLiveData({
        ...liveData,
        attachedCourses: [...liveData.attachedCourses, courseId],
      });
    }
  };

  const handleSave = () => {
    console.log('保存直播:', liveData);
    router.push('/instructor/live');
  };

  const handlePublish = () => {
    console.log('发布直播:', liveData);
    router.push('/instructor/live');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            保存草稿
          </Button>
          <Button onClick={handlePublish}>
            <Send className="w-4 h-4 mr-2" />
            创建直播
          </Button>
        </div>
      </div>

      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 直播标题 */}
          <div className="space-y-2">
            <Label>直播标题 *</Label>
            <Input
              placeholder="请输入直播标题"
              value={liveData.title}
              onChange={(e) => setLiveData({ ...liveData, title: e.target.value })}
            />
          </div>

          {/* 直播平台 */}
          <div className="space-y-2">
            <Label>直播平台 *</Label>
            <div className="flex gap-4">
              {platforms.map((platform) => (
                <div key={platform.value}>
                  <div
                    className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      liveData.platform.includes(platform.value)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => togglePlatform(platform.value)}
                  >
                    <input
                      type="checkbox"
                      checked={liveData.platform.includes(platform.value)}
                      readOnly
                      className="w-4 h-4"
                    />
                    <span className="font-medium">{platform.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 预约时间 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>预约日期 *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {liveData.scheduledDate ? (
                      liveData.scheduledDate.toLocaleDateString('zh-CN')
                    ) : (
                      <span>选择日期</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={liveData.scheduledDate}
                    onSelect={(date) =>
                      date && setLiveData({ ...liveData, scheduledDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>开始时间 *</Label>
              <Input
                type="time"
                value={liveData.scheduledTime}
                onChange={(e) =>
                  setLiveData({ ...liveData, scheduledTime: e.target.value })
                }
              />
            </div>
          </div>

          {/* 直播封面 */}
          <div className="space-y-2">
            <Label>直播封面 *</Label>
            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-muted-foreground">
                点击上传或拖拽文件到此处
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                支持 JPG、PNG 格式，建议尺寸 1920x1080px
              </p>
            </div>
          </div>

          {/* 直播简介 */}
          <div className="space-y-2">
            <Label>直播简介</Label>
            <Textarea
              placeholder="请输入直播简介，介绍直播内容和亮点"
              className="min-h-[120px]"
              value={liveData.description}
              onChange={(e) =>
                setLiveData({ ...liveData, description: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 直播设置 */}
      <Card>
        <CardHeader>
          <CardTitle>直播设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">自动开始</div>
              <div className="text-sm text-muted-foreground">
                到达预约时间后自动开始直播
              </div>
            </div>
            <Switch
              checked={liveData.isAutoStart}
              onCheckedChange={(checked) =>
                setLiveData({ ...liveData, isAutoStart: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">录制回放</div>
              <div className="text-sm text-muted-foreground">
                自动录制直播内容，生成回放
              </div>
            </div>
            <Switch
              checked={liveData.isRecord}
              onCheckedChange={(checked) =>
                setLiveData({ ...liveData, isRecord: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">允许评论</div>
              <div className="text-sm text-muted-foreground">
                允许观众在直播时发送评论
              </div>
            </div>
            <Switch
              checked={liveData.allowComment}
              onCheckedChange={(checked) =>
                setLiveData({ ...liveData, allowComment: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">允许分享</div>
              <div className="text-sm text-muted-foreground">
                允许观众分享直播间
              </div>
            </div>
            <Switch
              checked={liveData.allowShare}
              onCheckedChange={(checked) =>
                setLiveData({ ...liveData, allowShare: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 挂载课程 */}
      <Card>
        <CardHeader>
          <CardTitle>挂载课程</CardTitle>
          <p className="text-sm text-muted-foreground">
            选择在直播中要销售的课程
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                  liveData.attachedCourses.includes(course.id)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => toggleCourse(course.id)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={liveData.attachedCourses.includes(course.id)}
                    readOnly
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      ¥{course.price}
                    </div>
                  </div>
                </div>
                {liveData.attachedCourses.includes(course.id) && (
                  <Check className="w-5 h-5 text-blue-500" />
                )}
              </div>
            ))}
          </div>
          {liveData.attachedCourses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              尚未选择课程，请至少选择一门课程进行挂载
            </div>
          )}
        </CardContent>
      </Card>

      {/* 直播预览 */}
      <Card>
        <CardHeader>
          <CardTitle>直播预览</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
            <Video className="w-16 h-16 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {liveData.platform.map((p) => (
                <Badge key={p} variant="outline">
                  {platforms.find((plat) => plat.value === p)?.label}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-bold">{liveData.title || '直播标题'}</h3>
            <p className="text-muted-foreground">{liveData.description || '直播简介'}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {liveData.scheduledDate.toLocaleDateString('zh-CN')} {liveData.scheduledTime}
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-4 h-4" />
                {liveData.attachedCourses.length} 门课程
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
