import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Academy from '@/app/components/academy'
import type { Database } from '@/lib/database.types'

// サインアップページ
const AcademyPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // セッションの取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    // 認証している場合、リダイレクト
    if (session) {
        redirect('/')
    }

    return <Academy />
}

export default AcademyPage