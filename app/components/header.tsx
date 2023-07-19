'use client'

import Link from 'next/link'
import useStore from '@/store'
import { useEffect } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']

const Header = ({
  session,
  profile
}: {
  session: Session | null
  profile: ProfileType | null
}) => {
  const { setUser } = useStore()

  // 状態管理にユーザー情報を格納
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
    })
  }, [session, setUser, profile])

  return (
    <header className='bg-sky-700 text-white shadow-lg shadow-gray-100'>
      <div className='py-5 container max-w-screen-sm mx-auto flex items-center justify-between'>
        <Link href='/' className='font-bold text-xl cursor-pointer'>
          BlockCertify
        </Link>

        <div className='text-sm font-bold'>
          {session ? (
            <div className='flex items-center space-x-5'>
              <Link href='/settings/profile'>
                <div>{profile && profile.name ? profile.name + ' さん' : 'ゲスト さん'}</div>
              </Link>
            </div>
          ) : (
            <div className='flex items-center space-x-5'>
              <Link href='/auth/login'>ログイン</Link>
              <Link href='/auth/signup'>サインアップ</Link>
              <Link href='/auth/academy'>教育機関用</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header