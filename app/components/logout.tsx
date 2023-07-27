'use client'

import { FormEvent, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import type { Database } from '@/lib/database.types'
import type { NextPage } from 'next'

// ログアウト
const Logout: NextPage = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // 送信
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // ログアウト
      const { error } = await supabase.auth.signOut()

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message)
        return
      }

      router.push('/')
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div>
      <div className='text-center mt-20 mb-10'>アカウントからログアウトしますか？</div>
      {/* ログアウトボタン */}
      <form onSubmit={onSubmit}>
        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <div className='text-center'>
              <button
                type='submit'
                className='w-96 rounded-full bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-600 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base'
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </form>

      {/* メッセージ */}
      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
    </div>
  )
}

export default Logout