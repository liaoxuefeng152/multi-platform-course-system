'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Save, X, Plus, Trash2, ArrowLeft } from 'lucide-react';

export default function CreateCoursePage() {
  const router = useRouter();
  const [courseType, setCourseType] = useState('video');
  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    type: 'video',
    description: '',
    price: 0,
    isFree: true,
    validity: 'permanent',
    validityDays: 0,
    allowDownload: false,
    coverImage: null as File | null,
    chapters: [] as any[],
  });

  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: '第一章',
      sections: [
        { id: 1, title: '', type: 'video', file: null, duration: 0 },
      ],
    },
  ]);

  const handleSave = () => {
    console.log('保存课程:', courseData, chapters);
    // TODO: 实现保存逻辑
  };

  const handleSubmit = () => {
    console.log('提交审核:', courseData, chapters);
    // TODO: 实现提交审核逻辑
    router.push('/instructor/courses');
  };

  const addChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `第${chapters.length + 1}章`,
      sections: [{ id: 1, title: '', type: 'video', file: null, duration: 0 }],
    };
    setChapters([...chapters, newChapter]);
  };

  const removeChapter = (chapterId: number) => {
    setChapters(chapters.filter((c) => c.id !== chapterId));
  };

  const addSection = (chapterId: number) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            sections: [
              ...chapter.sections,
              {
                id: chapter.sections.length + 1,
                title: '',
                type: 'video',
                file: null,
                duration: 0,
              },
            ],
          };
        }
        return chapter;
      })
    );
  };

  const removeSection = (chapterId: number, sectionId: number) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            sections: chapter.sections.filter((s: any) => s.id !== sectionId),
          };
        }
        return chapter;
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
          <Button onClick={handleSubmit}>
            提交审核
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">基础信息</TabsTrigger>
          <TabsTrigger value="content">课程内容</TabsTrigger>
          <TabsTrigger value="price">价格设置</TabsTrigger>
          <TabsTrigger value="preview">预览</TabsTrigger>
        </TabsList>

        {/* 基础信息 */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基础信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 课程类型 */}
              <div className="space-y-2">
                <Label>课程类型 *</Label>
                <Select
                  value={courseType}
                  onValueChange={(value) => setCourseType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择课程类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">视频课</SelectItem>
                    <SelectItem value="audio">音频课</SelectItem>
                    <SelectItem value="text">图文课</SelectItem>
                    <SelectItem value="live">直播课</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 课程标题 */}
              <div className="space-y-2">
                <Label>课程标题 *</Label>
                <Input
                  placeholder="请输入课程标题"
                  value={courseData.title}
                  onChange={(e) =>
                    setCourseData({ ...courseData, title: e.target.value })
                  }
                />
              </div>

              {/* 课程分类 */}
              <div className="space-y-2">
                <Label>课程分类 *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择课程分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skill">技能培训</SelectItem>
                    <SelectItem value="career">职场提升</SelectItem>
                    <SelectItem value="hobby">兴趣爱好</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 课程封面 */}
              <div className="space-y-2">
                <Label>课程封面 *</Label>
                <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    点击上传或拖拽文件到此处
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    支持 JPG、PNG 格式，建议尺寸 800x600px
                  </p>
                </div>
              </div>

              {/* 课程简介 */}
              <div className="space-y-2">
                <Label>课程简介 *</Label>
                <Textarea
                  placeholder="请输入课程简介，简要描述课程内容和学习目标"
                  className="min-h-[120px]"
                  value={courseData.description}
                  onChange={(e) =>
                    setCourseData({ ...courseData, description: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 课程内容 */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>课程内容</CardTitle>
                <Button variant="outline" size="sm" onClick={addChapter}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加章节
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {chapters.map((chapter, chapterIndex) => (
                <Card key={chapter.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Input
                        value={chapter.title}
                        onChange={(e) => {
                          const newChapters = [...chapters];
                          newChapters[chapterIndex].title = e.target.value;
                          setChapters(newChapters);
                        }}
                        className="font-semibold"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeChapter(chapter.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {chapter.sections.map((section: any, sectionIndex: number) => (
                      <div
                        key={section.id}
                        className="flex gap-2 items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="小节标题"
                            value={section.title}
                            onChange={(e) => {
                              const newChapters = [...chapters];
                              newChapters[chapterIndex].sections[sectionIndex].title =
                                e.target.value;
                              setChapters(newChapters);
                            }}
                          />
                          <div className="flex gap-2">
                            <Select
                              value={section.type}
                              onValueChange={(value) => {
                                const newChapters = [...chapters];
                                newChapters[chapterIndex].sections[sectionIndex].type =
                                  value;
                                setChapters(newChapters);
                              }}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">视频</SelectItem>
                                <SelectItem value="audio">音频</SelectItem>
                                <SelectItem value="text">图文</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="flex-1 border-2 border-dashed rounded-lg p-2 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer">
                              <p className="text-sm text-muted-foreground">
                                {section.type === 'video'
                                  ? '上传视频'
                                  : section.type === 'audio'
                                  ? '上传音频'
                                  : '上传图文'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeSection(chapter.id, section.id)
                          }
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSection(chapter.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      添加小节
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 价格设置 */}
        <TabsContent value="price" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>价格设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 免费/付费 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">免费课程</div>
                  <div className="text-sm text-muted-foreground">
                    设置为免费后，所有用户无需购买即可学习
                  </div>
                </div>
                <Switch
                  checked={courseData.isFree}
                  onCheckedChange={(checked) =>
                    setCourseData({ ...courseData, isFree: checked })
                  }
                />
              </div>

              {/* 价格 */}
              {!courseData.isFree && (
                <div className="space-y-2">
                  <Label>课程价格 (元) *</Label>
                  <Input
                    type="number"
                    placeholder="请输入课程价格"
                    value={courseData.price}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              {/* 有效期 */}
              <div className="space-y-2">
                <Label>课程有效期</Label>
                <Select
                  value={courseData.validity}
                  onValueChange={(value) =>
                    setCourseData({ ...courseData, validity: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">永久有效</SelectItem>
                    <SelectItem value="fixed">固定时长</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {courseData.validity === 'fixed' && (
                <div className="space-y-2">
                  <Label>有效天数 *</Label>
                  <Input
                    type="number"
                    placeholder="请输入有效天数"
                    value={courseData.validityDays}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        validityDays: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              {/* 允许下载 */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">允许下载</div>
                  <div className="text-sm text-muted-foreground">
                    允许学员下载课程内容到本地（可能影响内容安全）
                  </div>
                </div>
                <Switch
                  checked={courseData.allowDownload}
                  onCheckedChange={(checked) =>
                    setCourseData({ ...courseData, allowDownload: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 预览 */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>课程预览</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 课程封面 */}
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">课程封面预览</p>
              </div>

              {/* 课程信息 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{courseType === 'video' ? '视频课' : courseType === 'audio' ? '音频课' : courseType === 'text' ? '图文课' : '直播课'}</Badge>
                  {courseData.isFree && <Badge variant="default">免费</Badge>}
                </div>
                <h2 className="text-2xl font-bold">{courseData.title || '课程标题'}</h2>
                <p className="text-muted-foreground">{courseData.description || '课程简介'}</p>
              </div>

              {/* 章节目录 */}
              <div className="space-y-4">
                <h3 className="font-semibold">课程目录</h3>
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="space-y-2">
                    <h4 className="font-medium">{chapter.title}</h4>
                    {chapter.sections.map((section: any) => (
                      <div
                        key={section.id}
                        className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-gray-50 dark:bg-gray-800 rounded"
                      >
                        <span>{section.title || '未命名小节'}</span>
                        <Badge variant="outline" className="text-xs">
                          {section.type === 'video'
                            ? '视频'
                            : section.type === 'audio'
                            ? '音频'
                            : '图文'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
