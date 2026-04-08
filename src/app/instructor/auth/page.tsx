'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Upload,
  User,
  Building2,
  Camera,
  CheckCircle,
  X,
  FileText,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function InstructorAuthPage() {
  const router = useRouter();
  const [authType, setAuthType] = useState<'personal' | 'enterprise'>('personal');
  const [step, setStep] = useState<'form' | 'face' | 'success'>('form');
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 个人认证材料
  const [personalDocs, setPersonalDocs] = useState({
    idCardFront: null as File | null,
    idCardBack: null as File | null,
    phone: '',
    contactName: '',
  });

  // 机构认证材料
  const [enterpriseDocs, setEnterpriseDocs] = useState({
    businessLicense: null as File | null,
    legalIdCardFront: null as File | null,
    legalIdCardBack: null as File | null,
    companyName: '',
    creditCode: '',
    contactName: '',
    phone: '',
  });

  const [coverPreview, setCoverPreview] = useState<{
    idCardFront: string | null;
    idCardBack: string | null;
    businessLicense: string | null;
    legalIdCardFront: string | null;
    legalIdCardBack: string | null;
  }>({
    idCardFront: null,
    idCardBack: null,
    businessLicense: null,
    legalIdCardFront: null,
    legalIdCardBack: null,
  });

  const handleFileUpload = (
    type: keyof typeof coverPreview,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview({ ...coverPreview, [type]: previewUrl });

      if (authType === 'personal') {
        if (type === 'idCardFront') setPersonalDocs({ ...personalDocs, idCardFront: file });
        if (type === 'idCardBack') setPersonalDocs({ ...personalDocs, idCardBack: file });
      } else {
        if (type === 'businessLicense') setEnterpriseDocs({ ...enterpriseDocs, businessLicense: file });
        if (type === 'legalIdCardFront') setEnterpriseDocs({ ...enterpriseDocs, legalIdCardFront: file });
        if (type === 'legalIdCardBack') setEnterpriseDocs({ ...enterpriseDocs, legalIdCardBack: file });
      }
    }
  };

  const handleRemoveFile = (type: keyof typeof coverPreview) => {
    setCoverPreview({ ...coverPreview, [type]: null });
    if (authType === 'personal') {
      if (type === 'idCardFront') setPersonalDocs({ ...personalDocs, idCardFront: null });
      if (type === 'idCardBack') setPersonalDocs({ ...personalDocs, idCardBack: null });
    } else {
      if (type === 'businessLicense') setEnterpriseDocs({ ...enterpriseDocs, businessLicense: null });
      if (type === 'legalIdCardFront') setEnterpriseDocs({ ...enterpriseDocs, legalIdCardFront: null });
      if (type === 'legalIdCardBack') setEnterpriseDocs({ ...enterpriseDocs, legalIdCardBack: null });
    }
  };

  const canSubmit = authType === 'personal'
    ? personalDocs.idCardFront && personalDocs.idCardBack && personalDocs.phone && personalDocs.contactName
    : enterpriseDocs.businessLicense && enterpriseDocs.legalIdCardFront && enterpriseDocs.legalIdCardBack &&
      enterpriseDocs.companyName && enterpriseDocs.creditCode && enterpriseDocs.phone && enterpriseDocs.contactName;

  const handleSubmitAuth = () => {
    if (!canSubmit) return;
    setSubmitDialogOpen(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  const handleSkip = () => {
    router.push('/instructor');
  };

  const renderUploadArea = (
    type: keyof typeof coverPreview,
    label: string,
    required = true
  ) => (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(type, e)}
        className="hidden"
        id={`upload-${type}`}
      />
      <div
        onClick={() => document.getElementById(`upload-${type}`)?.click()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer relative ${
          coverPreview[type] ? 'p-4' : 'p-8'
        }`}
      >
        {coverPreview[type] ? (
          <>
            <img
              src={coverPreview[type]!}
              alt={label}
              className="max-h-32 rounded-lg object-contain"
            />
            <Button
              variant="destructive"
              size="sm"
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile(type);
              }}
            >
              <X className="w-4 h-4 mr-2" />
              删除
            </Button>
          </>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm text-muted-foreground">点击上传</p>
            <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG 格式</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-4xl">
        {/* 顶部 */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/instructor" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回控制台
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              <AlertCircle className="w-3 h-3 mr-1" />
              未认证
            </Badge>
          </div>
        </div>

        {/* 认证类型切换 */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Tabs value={authType} onValueChange={(v) => setAuthType(v as 'personal' | 'enterprise')}>
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="personal" className="flex-1 rounded-t-lg">
                  <User className="w-4 h-4 mr-2" />
                  个人讲师
                </TabsTrigger>
                <TabsTrigger value="enterprise" className="flex-1 rounded-t-lg">
                  <Building2 className="w-4 h-4 mr-2" />
                  机构讲师
                </TabsTrigger>
              </TabsList>

              {/* 认证表单 */}
              <div className="p-6">
                <CardTitle className="text-xl mb-6">认证材料</CardTitle>

                {authType === 'personal' ? (
                  // 个人认证
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderUploadArea('idCardFront', '身份证正面')}
                    {renderUploadArea('idCardBack', '身份证反面')}

                    <div className="space-y-2">
                      <Label htmlFor="personalName">
                        真实姓名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="personalName"
                        placeholder="请输入您的真实姓名"
                        value={personalDocs.contactName}
                        onChange={(e) => setPersonalDocs({ ...personalDocs, contactName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personalPhone">
                        手机号码 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="personalPhone"
                        type="tel"
                        placeholder="请输入手机号码"
                        value={personalDocs.phone}
                        onChange={(e) => setPersonalDocs({ ...personalDocs, phone: e.target.value })}
                        maxLength={11}
                      />
                    </div>

                    {/* 人脸识别 */}
                    <div className="col-span-2 space-y-2">
                      <Label>
                        人脸识别 <span className="text-red-500">*</span>
                      </Label>
                      <div
                        className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => setStep('face')}
                      >
                        <Camera className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-sm text-muted-foreground">点击进行人脸识别验证</p>
                        <p className="text-xs text-muted-foreground mt-1">需要摄像头权限</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // 机构认证
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderUploadArea('businessLicense', '营业执照')}
                      {renderUploadArea('legalIdCardFront', '法人身份证正面')}
                      {renderUploadArea('legalIdCardBack', '法人身份证反面')}

                      <div className="space-y-2">
                        <Label htmlFor="companyName">
                          机构名称 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="请输入机构名称"
                          value={enterpriseDocs.companyName}
                          onChange={(e) => setEnterpriseDocs({ ...enterpriseDocs, companyName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="creditCode">
                          统一社会信用代码 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="creditCode"
                          placeholder="请输入18位信用代码"
                          value={enterpriseDocs.creditCode}
                          onChange={(e) => setEnterpriseDocs({ ...enterpriseDocs, creditCode: e.target.value })}
                          maxLength={18}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="legalName">
                          法人姓名 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="legalName"
                          placeholder="请输入法人姓名"
                          value={enterpriseDocs.contactName}
                          onChange={(e) => setEnterpriseDocs({ ...enterpriseDocs, contactName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="enterprisePhone">
                          联系电话 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="enterprisePhone"
                          type="tel"
                          placeholder="请输入联系电话"
                          value={enterpriseDocs.phone}
                          onChange={(e) => setEnterpriseDocs({ ...enterpriseDocs, phone: e.target.value })}
                          maxLength={11}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleSkip}>
            暂不认证
          </Button>
          <Button disabled={!canSubmit || loading} onClick={() => setSubmitDialogOpen(true)}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            提交认证
          </Button>
        </div>

        {/* 提示 */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <FileText className="w-4 h-4 inline mr-2" />
            提交认证后，预计1-2个工作日内完成审核。审核结果将通过短信通知您。
          </p>
        </div>
      </div>

      {/* 人脸识别弹窗 */}
      <Dialog open={step === 'face'} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>人脸识别验证</DialogTitle>
            <DialogDescription>请确保光线充足，将面部对准摄像头</DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground">摄像头预览区域</p>
              <p className="text-xs text-muted-foreground mt-2">请允许浏览器访问摄像头</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStep('form')}>
              取消
            </Button>
            <Button onClick={() => {
              // 模拟人脸识别通过
              setTimeout(() => {
                alert('人脸识别验证通过');
                setStep('form');
              }, 1000);
            }}>
              开始验证
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 提交确认弹窗 */}
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认提交认证</DialogTitle>
            <DialogDescription>
              请确认您提交的认证材料真实有效，提交后将进入审核流程。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmitDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitAuth}>
              确认提交
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 提交成功弹窗 */}
      <Dialog open={step === 'success'} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center py-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <DialogTitle className="text-2xl">提交成功</DialogTitle>
            </div>
            <DialogDescription className="text-center">
              您的认证申请已提交，预计1-2个工作日内完成审核。
              <br />
              审核结果将通过短信通知您，请保持手机畅通。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push('/instructor')}>
              返回控制台
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
