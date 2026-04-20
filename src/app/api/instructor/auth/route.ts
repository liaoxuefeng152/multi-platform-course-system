import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET: 获取认证状态
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { code: 400, message: '缺少用户ID', data: null },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();

    const { data: profile, error } = await client
      .from('instructor_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw new Error(`查询认证状态失败: ${error.message}`);

    if (!profile) {
      return NextResponse.json({
        code: 200,
        message: 'success',
        data: {
          status: 'none',
          message: '未提交认证申请'
        }
      });
    }

    return NextResponse.json({
      code: 200,
      message: 'success',
      data: {
        status: profile.status,
        realName: profile.real_name,
        idCard: profile.id_card,
        rejectionReason: profile.rejection_reason,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at
      }
    });
  } catch (error) {
    console.error('获取认证状态失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}

// POST: 提交认证
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, realName, idCard, idCardFront, idCardBack } = body;

    if (!userId || !realName || !idCard) {
      return NextResponse.json(
        { code: 400, message: '请填写完整信息', data: null },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();

    // 检查是否已有认证记录
    const { data: existing } = await client
      .from('instructor_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      // 更新认证信息
      const { data: updated, error } = await client
        .from('instructor_profiles')
        .update({
          real_name: realName,
          id_card: idCard,
          id_card_front: idCardFront,
          id_card_back: idCardBack,
          status: 'pending',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw new Error(`更新认证失败: ${error.message}`);

      return NextResponse.json({
        code: 200,
        message: '提交成功，审核中',
        data: {
          status: updated.status,
          realName: updated.real_name
        }
      });
    }

    // 创建新认证记录
    const { data: newProfile, error } = await client
      .from('instructor_profiles')
      .insert({
        user_id: userId,
        real_name: realName,
        id_card: idCard,
        id_card_front: idCardFront,
        id_card_back: idCardBack,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw new Error(`提交认证失败: ${error.message}`);

    return NextResponse.json({
      code: 200,
      message: '提交成功，审核中',
      data: {
        status: newProfile.status,
        realName: newProfile.real_name
      }
    });
  } catch (error) {
    console.error('提交认证失败:', error);
    return NextResponse.json(
      { code: 500, message: '服务器错误', data: null },
      { status: 500 }
    );
  }
}
