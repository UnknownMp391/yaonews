import FilledButton from '@vendor/lgd-ui/components/button/FilledButton';
import styles from './page.module.scss';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

import type { SupabaseClient } from '@supabase/supabase-js'
import type { DateData } from '@/types/date';
import { dateAdd, dateCopyWith, dateEqual, getCurrentDate, parseDateString } from '@/utils/date';

enum DayType {
  TODAY = 1,
  YEST = 2,
  BEFORE = 3
}

const NEW_TYPE_FMT = {
  [DayType.TODAY]: '今日',
  [DayType.YEST]: '昨日',
  [DayType.BEFORE]: '前几日'
}

async function queryLastNew(supabase: SupabaseClient): Promise<{
  success: true,
  date: DateData,
  image_id: string
} | {
  success: false,
  reason: string
}> {
  const { data, error }  = await supabase.from('news')
    .select()
    .eq('type', 1)
    .order('date', { ascending: false })
    .limit(1)
  
  if (error) {
    return {
      success: false,
      reason: error.message
    }
  }

  const result = data[0]

  return {
    success: true,
    date: parseDateString(result.date),
    image_id: result.image_id
  }
}

function SuccessPart(data: {
    date: DateData;
    image_id: string;
}, supabase: SupabaseClient) {
  const current = getCurrentDate()

  const newType = dateEqual(data.date, current)
    ? DayType.TODAY
    : dateEqual(data.date, dateAdd(current, { d: -1 }))
      ? DayType.YEST
      : DayType.BEFORE

  const imageUrl = supabase.storage
    .from('news_image')
    .getPublicUrl(`images/${data.image_id}`)
    .data.publicUrl

  return <>
    <h1 className={styles.title}>{NEW_TYPE_FMT[newType]} 日刊</h1>
    <h2 className={styles.subtitle}>{data.date.y} 年 {data.date.m} 月 {data.date.d} 日</h2>
    <img src={imageUrl} alt='日刊图片' className={styles.mainImage}/>
    <div className={styles.buttonBar}>
      <FilledButton variant='primary'>昨日</FilledButton>
      <div className={styles.spacer} />
      {/*<FilledButton variant='tertiary'>明日</FilledButton>*/}
    </div>
  </>
}

function FailurePart(reason: string) {
  return <>
    <h1 className={styles.title}>啊! 出错了</h1>
    <p>{reason}</p>
    <p>请刷新或者联系本站管理员 (UnknownMp) 修复此问题</p>
  </>
}

export default async function Home() {
  const supabase = createClient(await cookies())

  const result = await queryLastNew(supabase)

  return (
    <div>
      {
        result.success
        ? SuccessPart(result, supabase)
        : FailurePart(result.reason)
      }
    </div>
  );
}
