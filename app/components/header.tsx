'use client'

import Link from 'next/link'
import Image from 'next/image'
import useStore from '@/store'
import { useEffect } from 'react'
import { Bars2Icon } from '@heroicons/react/24/outline'
import FaviconICO from '@/app/favicon.ico'
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
    <header className='bg-transparent text-dark fixed w-full tracking-wider z-50'>
      <div className='py-10 px-20 flex items-center justify-between'>

        <div className='flex items-center space-x-3'>
          <Link href='/' className='cursor-pointer'>
            <Image src={FaviconICO} width={64} height={64} alt='favicon' />
          </Link>
          <Link href='/' className='font-semibold text-3xl cursor-pointer'>
            BlockCertify
          </Link>
        </div>

        <div className='text-md font-semibold'>
          {session ? (
            <div className='flex items-center space-x-20'>
              <Link href='/settings/profile'>
                <div>{profile && profile.name ? profile.name + ' さん' : 'ゲスト さん'}</div>
              </Link>
            </div>
          ) : (
            <div className='flex items-center space-x-20'>
              <Link href='/auth/login'>ログイン</Link>
              <Link href='/auth/signup'>サインアップ</Link>
              <Link href='/auth/academy'>教育機関用</Link>
              <Bars2Icon
                className={'bg-transparent border border-black text-dark w-12 h-12 p-2 rounded-full cursor-pointer'}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  // 上までSmoothスクロール
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header