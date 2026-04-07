'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  Send
} from 'lucide-react';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    type: '',
    content: '',
    contact: '',
  });

  // 问题分类
  const categories = [
    {
      id: 'account',
      name: '账号问题',
      icon: '👤',
      description: '注册、登录、认证等相关问题',
      count: 5,
    },
    {
      id: 'purchase',
      name: '购买流程',
      icon: '💳',
      description: '课程购买、支付、优惠券使用',
      count: 8,
    },
    {
      id: 'study',
      name: '学习问题',
      icon: '📚',
      description: '课程学习、播放、进度查看',
      count: 6,
    },
    {
      id: 'refund',
      name: '退款规则',
      icon: '💰',
      description: '退款申请、退款政策、处理流程',
      count: 4,
    },
    {
      id: 'live',
      name: '直播相关',
      icon: '📺',
      description: '直播观看、预约、互动',
      count: 5,
    },
    {
      id: 'other',
      name: '其他问题',
      icon: '❓',
      description: '其他常见问题',
      count: 3,
    },
  ];

  // 常见问题数据
  const faqs = [
    {
      category: 'account',
      question: '如何注册账号？',
      answer: '您可以通过微信授权或手机号注册账号。点击首页的"注册"按钮，选择微信授权即可快速注册，或使用手机号+验证码的方式注册。',
      hot: true,
    },
    {
      category: 'account',
      question: '忘记密码怎么办？',
      answer: '在登录页面点击"忘记密码"，输入您的注册手机号，通过短信验证码验证后即可重置密码。',
      hot: false,
    },
    {
      category: 'account',
      question: '如何进行讲师认证？',
      answer: '登录后进入个人中心，点击"讲师认证"，根据提示上传身份证或营业执照等材料，提交后等待平台审核，审核通过即可开始创建课程。',
      hot: true,
    },
    {
      category: 'purchase',
      question: '如何购买课程？',
      answer: '浏览课程列表或搜索课程，进入课程详情页查看课程介绍、试看内容，点击"立即购买"按钮，选择支付方式（微信支付/抖音支付）完成支付即可。',
      hot: true,
    },
    {
      category: 'purchase',
      question: '如何使用优惠券？',
      answer: '在课程详情页点击"立即购买"时，如果有可用优惠券会自动显示，选择要使用的优惠券即可抵扣部分金额。',
      hot: false,
    },
    {
      category: 'purchase',
      question: '支持哪些支付方式？',
      answer: '目前支持微信支付和抖音支付两种方式，您可以根据自己的喜好选择合适的支付方式。',
      hot: true,
    },
    {
      category: 'purchase',
      question: '购买后如何查看订单？',
      answer: '登录后进入"我的"页面，点击"我的订单"即可查看所有订单，包括已付款、待付款、已完成等状态的订单。',
      hot: false,
    },
    {
      category: 'study',
      question: '如何开始学习课程？',
      answer: '购买课程后，在"我的"页面点击"我的课程"，选择要学习的课程，点击"开始学习"即可进入学习页面。',
      hot: true,
    },
    {
      category: 'study',
      question: '支持倍速播放吗？',
      answer: '是的，视频课程支持倍速播放，可以在播放器中调整播放速度（0.5x - 2.0x）。',
      hot: true,
    },
    {
      category: 'study',
      question: '学习进度会保存吗？',
      answer: '会自动保存学习进度，下次进入课程时会从上次停止的位置继续播放。',
      hot: false,
    },
    {
      category: 'study',
      question: '可以下载课程到本地吗？',
      answer: '根据课程设置，部分课程支持下载到本地离线观看。如果课程允许下载，在学习页面会显示下载按钮。',
      hot: false,
    },
    {
      category: 'study',
      question: '课程有效期是多久？',
      answer: '根据课程设置，课程有效期分为永久有效和固定时长两种。购买后可以在课程详情页查看有效期信息。',
      hot: true,
    },
    {
      category: 'refund',
      question: '如何申请退款？',
      answer: '在"我的订单"中找到要退款的订单，点击"申请退款"，填写退款原因并提交，等待讲师审核。审核通过后会原路退回支付款项。',
      hot: true,
    },
    {
      category: 'refund',
      question: '退款需要多长时间？',
      answer: '讲师审核通过后，退款通常在1-3个工作日内原路退回，具体时间取决于支付渠道的处理速度。',
      hot: false,
    },
    {
      category: 'refund',
      question: '什么情况下不能退款？',
      answer: '以下情况通常不支持退款：1）课程学习进度超过50%；2）购买超过7天；3）课程已过期。具体退款政策请查看用户协议。',
      hot: false,
    },
    {
      category: 'refund',
      question: '退款手续费如何计算？',
      answer: '正常退款不收取手续费，全额退款。如果因课程质量问题退款，平台会协助处理。',
      hot: false,
    },
    {
      category: 'live',
      question: '如何预约直播？',
      answer: '在讲师发起的直播预告中，点击"预约直播"按钮，直播开始前会收到微信提醒，方便准时观看。',
      hot: true,
    },
    {
      category: 'live',
      question: '如何参与直播互动？',
      answer: '观看直播时可以在评论区发送消息参与互动，部分直播支持连麦功能，可以与讲师实时交流。',
      hot: false,
    },
    {
      category: 'live',
      question: '直播回放可以观看吗？',
      answer: '是的，直播结束后会自动生成回放，购买相关课程的学员可以随时观看回放内容。',
      hot: false,
    },
    {
      category: 'live',
      question: '直播中如何购买课程？',
      answer: '直播过程中，讲师会挂载课程链接，点击链接即可进入课程详情页购买，支持使用优惠券。',
      hot: true,
    },
    {
      category: 'live',
      question: '错过直播怎么办？',
      answer: '错过直播可以观看回放，回放内容与直播内容一致，支持倍速播放和进度保存。',
      hot: false,
    },
    {
      category: 'other',
      question: '如何联系客服？',
      answer: '您可以通过以下方式联系客服：1）在帮助中心点击"联系客服"；2）发送邮件到 support@example.com；3）拨打客服电话 400-xxx-xxxx。',
      hot: false,
    },
    {
      category: 'other',
      question: '如何修改个人信息？',
      answer: '登录后进入个人中心，点击"设置"可以修改头像、昵称、手机号等个人信息。',
      hot: false,
    },
    {
      category: 'other',
      question: '如何绑定抖音账号？',
      answer: '在个人中心点击"账号绑定"，选择"绑定抖音"，按照提示授权绑定即可，绑定后可以参与抖音直播。',
      hot: false,
    },
  ];

  // 过滤问题
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFeedback = () => {
    console.log('提交反馈:', feedbackForm);
    setFeedbackDialogOpen(false);
    setFeedbackForm({ type: '', content: '', contact: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 页面头部 */}
      <div className="text-center space-y-4 py-12">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
          <HelpCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold">帮助中心</h1>
        <p className="text-lg text-muted-foreground">
          我们在这里帮助您解决问题，让学习更轻松
        </p>

        {/* 搜索框 */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="搜索问题关键词..."
            className="pl-12 h-14 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 问题分类 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-4xl">{category.icon}</div>
              <div className="font-semibold">{category.name}</div>
              <div className="text-xs text-muted-foreground">
                {category.count} 个问题
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 常见问题 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            常见问题
            {searchQuery && (
              <Badge variant="secondary">
                找到 {filteredFaqs.length} 个结果
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-2 flex-1">
                    {faq.hot && (
                      <Badge variant="destructive" className="text-xs">
                        热门
                      </Badge>
                    )}
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                没有找到相关内容，请尝试其他关键词
              </div>
            )}
          </Accordion>
        </CardContent>
      </Card>

      {/* 联系方式 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">在线客服</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  工作时间：9:00-21:00
                </p>
              </div>
              <Button className="w-full">
                联系客服
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">电话咨询</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  400-xxx-xxxx
                </p>
              </div>
              <Button variant="outline" className="w-full">
                拨打电话
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">邮件反馈</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  support@example.com
                </p>
              </div>
              <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    发送反馈
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>问题反馈</DialogTitle>
                    <DialogDescription>
                      请详细描述您遇到的问题，我们会尽快为您解决
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>反馈类型</Label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={feedbackForm.type}
                        onChange={(e) =>
                          setFeedbackForm({ ...feedbackForm, type: e.target.value })
                        }
                      >
                        <option value="">请选择反馈类型</option>
                        <option value="usage">使用问题</option>
                        <option value="payment">支付问题</option>
                        <option value="course">课程问题</option>
                        <option value="other">其他问题</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>问题描述 *</Label>
                      <Textarea
                        placeholder="请详细描述您遇到的问题"
                        className="min-h-[120px]"
                        value={feedbackForm.content}
                        onChange={(e) =>
                          setFeedbackForm({ ...feedbackForm, content: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>联系方式</Label>
                      <Input
                        placeholder="手机号或邮箱（可选）"
                        value={feedbackForm.contact}
                        onChange={(e) =>
                          setFeedbackForm({ ...feedbackForm, contact: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setFeedbackDialogOpen(false)}
                    >
                      取消
                    </Button>
                    <Button onClick={handleFeedback}>
                      <Send className="w-4 h-4 mr-2" />
                      提交反馈
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快速链接 */}
      <Card>
        <CardHeader>
          <CardTitle>快速链接</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: '用户协议', href: '#' },
              { name: '隐私政策', href: '#' },
              { name: '退款规则', href: '#' },
              { name: '讲师入驻', href: '#' },
            ].map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-between group"
              >
                {link.name}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
