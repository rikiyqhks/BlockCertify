import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import EducationalResume from '@/app/components/educational-resume'

import type { Database } from '@/lib/database.types'

const EducationalResumePage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/')
  }

  return <EducationalResume />
}

export default EducationalResumePage