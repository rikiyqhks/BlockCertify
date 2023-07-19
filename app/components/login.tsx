'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
type Schema= z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
})

// ログインページ
const Login = () => {
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
    defaultValues: { email: '', password: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // ログイン
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      // エラーチェック
      if (error) {
        setMessage('エラーが発生しました。' + error.message)
        return
      }

      // トップぺージに遷移
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
    <div className='flex max-w-[400px] w-1/2 mx-auto h-[calc(100vh-128px)] flex-col justify-center'>
      <div className='text-center font-bold text-xl mb-10'>ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <div className='mb-3'>
          <input
            type='email'
            className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
            placeholder='メールアドレス'
            id='email'
            {...register('email', { required: true })}
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.email?.message}</div>
        </div>

        {/* パスワード */}
        <div className='mb-5'>
          <input
            type='password'
            className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
            placeholder='パスワード'
            id='password'
            {...register('password', { required: true })}
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.password?.message}</div>
        </div>

        {/* ログインボタン */}
        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='w-full rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'
            >
              ログイン
            </button>
          )}
        </div>
      </form>

      {/* メッセージ */}
      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}

      <div className='text-center text-sm mb-5'>
        <Link href='/auth/reset-password' className='text-gray-500 font-bold'>
          パスワードを忘れた方はこちら
        </Link>
      </div>

      <div className='text-center text-sm'>
        <Link href='/auth/signup' className='text-gray-500 font-bold'>
          アカウントを作成する
        </Link>
      </div>
    </div>
  )
}

export default Login