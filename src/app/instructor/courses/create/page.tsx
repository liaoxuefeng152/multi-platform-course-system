'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Upload, Save, X, Plus, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CourseFormData {
  title: string;
  category: string;
  type: string;
  description: string;
  price: number;
  isFree: boolean;
  validity: string;
  validityDays: number;
  allowDownload: boolean;
  coverImage: File | null;
  coverKey: string | null;
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<CourseFormData>({
    title: '',
    category: '',
    type: 'video',
    description: '',
    price: 0,
    isFree: true,
    validity: 'permanent',
    validityDays: 0,
    allowDownload: false,
    coverImage: null,
    coverKey: null,
  });

  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: '第一章',
      sections: [{ id: 1, title: '', type: 'video', file: null, duration: 0 }],
    },
  ]);

  // 获取当前用户信息
  const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token));
      return decoded;
    } catch {
      return null;
    }
  };

  // 上传封面图片
  const uploadCover = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload/cover', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      if (result.code === 200) {
        return result.data.key;
      }
      throw new Error(result.message || '上传失败');
    } catch (error) {
      console.error('封面上传失败:', error);
      return null;
    }
  };

  // 保存课程
  const handleSave = async () => {
    if (!courseData.title) {
      toast.error('请填写课程标题');
      return;
    }
    if (!courseData.category) {
      toast.error('请选择课程分类');
      return;
    }
    if (!courseData.isFree && courseData.price <= 0) {
      toast.error('请填写课程价格');
      return;
    }

    setIsSubmitting(true);
    try {
      // 如果有封面，先上传
      let coverKey = courseData.coverKey;
      if (courseData.coverImage && !coverKey) {
        coverKey = await uploadCover(courseData.coverImage);
      }

      // 获取当前用户
      const user = getCurrentUser();
      
      const response = await fetch('/api/instructor/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.userId,
          title: courseData.title,
          category: courseData.category,
          type: courseData.type,
          coverKey,
          price: courseData.isFree ? 0 : Math.round(courseData.price * 100), // 转换为分
          description: courseData.description,
        }),
      });

      const result = await response.json();
      
      if (result.code === 200) {
        toast.success('保存成功');
        router.push('/instructor/courses');
      } else {
        toast.error(result.message || '保存失败');
      }
    } catch (error) {
      console.error('保存课程失败:', error);
      toast.error('保存失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 提交审核
  const handleSubmit = async () => {
    await handleSave();
    // 提交审核逻辑可以后续扩展
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
              { id: chapter.sections.length + 1, title: '', type: 'video', file: null, duration: 0 },
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

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('请上传图片文件（JPG、PNG 格式）');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('图片大小不能超过 5MB');
        return;
      }
      setCourseData({ ...courseData, coverImage: file, coverKey: null });
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    }
  };

  const handleRemoveCover = () => {
    setCourseData({ ...courseData, coverImage: null, coverKey: null });
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
      setCoverPreview(null);
    }
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
          <Button variant="outline" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            保存草稿
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
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
                  value={courseData.type}
                  onValueChange={(value) => setCourseData({ ...courseData, type: value })}
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
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                />
              </div>

              {/* 课程分类 */}
              <div className="space-y-2">
                <Label>课程分类 *</Label>
                <Select
                  value={courseData.category}
                  onValueChange={(value) => setCourseData({ ...courseData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择课程分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skill">技能培训</SelectItem>
                    <SelectItem value="career">职场提升</SelectItem>
                    <SelectItem value="hobby">兴趣爱好</SelectItem>
                    <SelectItem value="programming">编程开发</SelectItem>
                    <SelectItem value="business">商业营销</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 课程封面 */}
              <div className="space-y-2">
                <Label>课程封面 *</Label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleCoverUpload}
                  className="hidden"
                  id="cover-upload"
                />
                <div
                  onClick={() => document.getElementById('cover-upload')?.click()}
                  className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  {coverPreview ? (
                    <>
                      <img src={coverPreview} alt="课程封面预览" className="max-h-48 rounded-lg object-cover" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-4"
                        onClick={(e) => { e.stopPropagation(); handleRemoveCover(); }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        删除封面
                      </Button>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground">点击上传或拖拽文件到此处</p>
                      <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG 格式，建议尺寸 800x600px</p>
                    </>
                  )}
                </div>
              </div>

              {/* 课程简介 */}
              <div className="space-y-2">
                <Label>课程简介</Label>
                <Textarea
                  placeholder="请输入课程简介，简要描述课程内容和学习目标"
                  className="min-h-[120px]"
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
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
            <CardContent className="space-y-4">
              {chapters.map((chapter) => (
                <Card key={chapter.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="章节标题"
                        value={chapter.title}
                        onChange={(e) => {
                          const newChapters = [...chapters];
                          const idx = newChapters.findIndex((c) => c.id === chapter.id);
                          newChapters[idx].title = e.target.value;
                          setChapters(newChapters);
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeChapter(chapter.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {chapter.sections.map((section) => (
                      <div key={section.id} className="flex items-center gap-2">
                        <Select
                          value={section.type}
                          onValueChange={(value) => {
                            const newChapters = [...chapters];
                            const cIdx = newChapters.findIndex((c) => c.id === chapter.id);
                            const sIdx = newChapters[cIdx].sections.findIndex((s: any) => s.id === section.id);
                            newChapters[cIdx].sections[sIdx].type = value;
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
                            {section.type === 'video' ? '上传视频' : section.type === 'audio' ? '上传音频' : '上传图文'}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSection(chapter.id, section.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addSection(chapter.id)}>
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
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">免费课程</div>
                  <div className="text-sm text-muted-foreground">设置为免费后，所有用户无需购买即可学习</div>
                </div>
                <Switch
                  checked={courseData.isFree}
                  onCheckedChange={(checked) => setCourseData({ ...courseData, isFree: checked })}
                />
              </div>

              {!courseData.isFree && (
                <div className="space-y-2">
                  <Label>课程价格 (元) *</Label>
                  <Input
                    type="number"
                    placeholder="请输入课程价格"
                    value={courseData.price || ''}
                    onChange={(e) => setCourseData({ ...courseData, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 预览 */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>课程预览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  {coverPreview ? (
                    <img src={coverPreview} alt="预览" className="max-w-full max-h-full object-contain rounded-lg" />
                  ) : (
                    <p className="text-gray-400">暂无封面预览</p>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{courseData.title || '课程标题'}</h3>
                  <p className="text-muted-foreground mt-1">{courseData.description || '暂无课程简介'}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    {courseData.category || '未分类'}
                  </span>
                  <span className="font-semibold text-lg">
                    {courseData.isFree ? '免费' : `¥${courseData.price}`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
