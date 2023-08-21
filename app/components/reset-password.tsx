'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
import type { NextPage } from 'next'
type Schema= z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
})

// パスワードリセットページ
const ResetPassword: NextPage = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setMessage('')

    try {
      // パスワードリセットメールを送信
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/auth/reset-password/confirm`,
      })

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message)
        return
      }

      setMessage('パスワードリセットに必要なメールを送信しました。')
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div className='flex max-w-[400px] w-1/2 mx-auto h-[calc(100vh-128px)] flex-col justify-center'>
      <h1 className='text-center font-bold text-xl mb-10'>パスワードを忘れた場合</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <div className='mb-5'>
          <div className='text-slate-500 font-thin text-sm mb-3'>パスワードを変更するには、アカウントに登録されたメールアドレスを入力してください。</div>
          <input
            type='email'
            className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
            placeholder='メールアドレス'
            id='email'
            {...register('email', { required: true })}
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.email?.message}</div>
        </div>

        {/* 送信ボタン */}
        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='w-full rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'
            >
              送信
            </button>
          )}
        </div>
      </form>

      {/* メッセージ */}
      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
    </div>
  )
}

export default ResetPassword