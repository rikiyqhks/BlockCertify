'use client'

import styles from '@/app/components/Components.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import useStore from '@/store'
import React, { useEffect, useState } from 'react'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import FaviconICO from '@/app/favicon.ico'
import type { Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { usePathname } from 'next/navigation'
type ProfileType = Database['public']['Tables']['profiles']['Row']

const Header = ({
  session,
  profile
}: {
  session: Session | null
  profile: ProfileType | null
}) => {
  const { setUser } = useStore()
  const pathname = usePathname()
  const pathchk = () => {
    if (pathname === '/settings/educational/form' || pathname.includes('/settings/educational/confirm')) {
      return true
    } else {
      return false
    }
  }

  // 状態管理にユーザー情報を格納
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
    })
  }, [session, setUser, profile])

  // 🍔メニューの状態監視
  const [openMenu, setOpenMenu] = useState(false)

  // 🍔メニューの開閉関数
  const menuFunction = () => {
    setOpenMenu(!openMenu)
  }

  switch(pathchk()) {
    case true:
      return (
        <div className='flex justify-center items-center pt-5'>
          <Image src={FaviconICO} width={64} height={64} alt='favicon' />
        </div>
      )
    default:
      return (
        <React.Fragment>
          <header className='bg-transparent text-dark fixed w-full tracking-wider z-50'>
            <nav className='py-10 px-20 flex items-center justify-between'>
    
              <li className='flex items-center space-x-3 list-none'>
                <Link href='/' className='cursor-pointer'>
                  <Image src={FaviconICO} width={64} height={64} alt='favicon' />
                </Link>
                <Link href='/' className='font-semibold text-3xl cursor-pointer text-black'>
                  BlockCertify
                </Link>
              </li>
    
              <ul className='text-md font-semibold list-none'>
                {session ? (
                  <li className='flex items-center space-x-20'>
                    <Link href='/settings/profile'>
                      {profile && profile.name + ' さん'}
                    </Link>
                    {openMenu ? (
                      <XMarkIcon
                        className='bg-transparent border border-black text-black w-12 h-12 p-2 rounded-full cursor-pointer'
                        onClick={() => menuFunction()}
                      />
                    ) : (
                      <Bars2Icon
                        className='bg-transparent border border-black text-black w-12 h-12 p-2 rounded-full cursor-pointer'
                        onClick={() => menuFunction()}
                      />
                    )}
                  </li>
                ) : (
                  <li className='flex items-center space-x-20'>
                    <Link href='/auth/login'>ログイン</Link>
                    <Link href='/auth/signup'>サインアップ</Link>
                    <Link href='/auth/academy'>教育機関用</Link>
                    {openMenu ? (
                      <XMarkIcon
                        className='bg-transparent border border-black text-black w-12 h-12 p-2 rounded-full cursor-pointer'
                        onClick={() => menuFunction()}
                      />
                    ) : (
                      <Bars2Icon
                        className='bg-transparent border border-black text-black w-12 h-12 p-2 rounded-full cursor-pointer'
                        onClick={() => menuFunction()}
                      />
                    )}
                  </li>
                )}
              </ul>
            </nav>
          </header>
          <div className={`${styles.drawerMenu} ${openMenu ? styles.open : undefined}`}>
            <section className='bg-transparent fixed top-0 w-full tracking-wider z-50'>
              <nav className='py-10 px-20 flex items-center justify-between'>
    
                <li className='flex items-center space-x-3 list-none'>
                  <Link href='/' className='cursor-pointer'>
                    <Image src={FaviconICO} width={64} height={64} alt='favicon' />
                  </Link>
                  <Link href='/' className='font-semibold text-3xl cursor-pointer'>
                    BlockCertify
                  </Link>
                </li>
    
                <ul className='text-md font-semibold list-none'>
                  <ul className='flex items-center space-x-20'>
                    {session && (
                      <Link href='/settings/profile' onClick={() => setOpenMenu(false)}>
                        {profile && profile.name + ' さん'}
                      </Link>
                    )}
                    <li className='flex items-center space-x-20'>
                      {openMenu ? (
                        <XMarkIcon
                          className='bg-transparent border border-white w-12 h-12 p-2 rounded-full cursor-pointer'
                          onClick={() => menuFunction()}
                        />
                      ) : (
                        <Bars2Icon
                          className='bg-transparent border border-black text-black w-12 h-12 p-2 rounded-full cursor-pointer'
                          onClick={() => menuFunction()}
                        />
                      )}
                    </li>
                  </ul>
                </ul>
              </nav>
            </section>
            <section className='flex justify-center items-center text-center fixed w-[calc(100vw-17.7px)] h-screen'>
              <ul className='flex w-screen'>
                {session ? (
                  <>
                    <li className='flex flex-col items-center gap-3 w-1/2'>
                      <p className='text-4xl pb-5 w-fit'>Account</p>
                      <Link href='/settings/profile' className='w-fit' onClick={() => setOpenMenu(false)}>マイページ</Link>
                      <Link href='/settings/educational' className='w-fit' onClick={() => setOpenMenu(false)}>学歴情報の確認 / 申請</Link>
                      <Link href='/settings/email' className='w-fit' onClick={() => setOpenMenu(false)}>メールアドレスの変更</Link>
                      <Link href='/settings/password' className='w-fit' onClick={() => setOpenMenu(false)}>パスワードの変更</Link>
                      <Link href='/settings/logout' className='w-fit' onClick={() => setOpenMenu(false)}>ログアウト</Link>
                    </li>
                    <li className='flex flex-col items-center gap-3 w-1/2'>
                      <p className='text-4xl pb-5 w-fit'>Others</p>
                      <Link href='https://drive.google.com/file/d/1hZA5Bmo2rC6epfJoW_vocYLJeIMH8b7l/view?usp=drive_link' target='_blank' rel='noopener noreferrer' onClick={() => setOpenMenu(false)}>プライバシーポリシー</Link>
                      <Link href='/auth/academy' className='w-fit' onClick={() => setOpenMenu(false)}>利用規約</Link>
                      <Link href='/auth/academy' className='w-fit' onClick={() => setOpenMenu(false)}>クッキーポリシー</Link>
                      <Link href='/auth/academy' className='w-fit' onClick={() => setOpenMenu(false)}>情報セキュリティ方針</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='flex flex-col items-center gap-3 w-1/3'>
                      <p className='text-4xl pb-5 w-fit'>Account</p>
                      <Link href='/auth/login' className='w-fit' onClick={() => setOpenMenu(false)}>ログイン</Link>
                      <Link href='/auth/signup' className='w-fit' onClick={() => setOpenMenu(false)}>サインアップ</Link>
                      <Link href='/auth/reset-password' className='w-fit' onClick={() => setOpenMenu(false)}>パスワードを忘れた方</Link>
                    </li>
                    <li className='flex flex-col items-center gap-3 w-1/3'>
                      <p className='text-4xl pb-5 w-fit'>Works</p>
                      <Link href='/auth/academy' className='w-fit' onClick={() => setOpenMenu(false)}>教育機関用</Link>
                      <Link href='/auth/academy' className='w-fit' onClick={() => setOpenMenu(false)}>教育機関アカウントを申し込む</Link>
                    </li>
                    <li className='flex flex-col items-center gap-3 w-1/3'>
                      <p className='text-4xl pb-5 w-fit'>Others</p>
                      <Link href='https://drive.google.com/file/d/1hZA5Bmo2rC6epfJoW_vocYLJeIMH8b7l/view?usp=sharing' className='w-fit' target='_blank' rel='noopener noreferrer' onClick={() => setOpenMenu(false)}>プライバシーポリシー</Link>
                      <Link href='https://drive.google.com/file/d/1HMVSIHMEa6X9Xkgwghf8aFoSjLdK2FMh/view?usp=sharing' className='w-fit' target='_blank' rel='noopener noreferrer' onClick={() => setOpenMenu(false)}>利用規約</Link>
                    </li>
                  </>
                )}
              </ul>
            </section>
            <section className='fixed bottom-5 text-center w-full'>
              <p>&copy; 2024 BlockCertify. All Rights Reserved.</p>
            </section>
          </div>
        </React.Fragment>
      )
  }
}

export default Header