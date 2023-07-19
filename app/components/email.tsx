'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
type Schema= z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
})

// メールアドレス変更
const Email = ({ email }: { email: string }) => {
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
      // メールアドレス変更メールを送信
      const { error: updateUserError } = await supabase.auth.updateUser(
        { email: data.email },
        { emailRedirectTo: `${location.origin}/auth/login` }
      )

      // エラーチェック
      if (updateUserError) {
        setMessage('エラーが発生しました。' + updateUserError.message)
        return
      }

      setMessage('確認用のURLを記載したメールを送信しました。')

      // ログアウト
      // cookieの情報と新しいメールアドレスとの整合性が取れなくなってしまうため
      const { error: signOutError } = await supabase.auth.signOut()

      // エラーチェック
      if (signOutError) {
        setMessage('エラーが発生しました。' + signOutError.message)
        return
      }

      router.push('/auth/login')
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
      <div className='text-center font-bold text-xl mb-10'>メールアドレス変更</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 現在のメールアドレス */}
        <div className='mb-5 text-center'>
          <label className='text-sm mr-5 font-bold' htmlFor='currentEmail'>現在のメールアドレス</label>
          <input
            type='text'
            className='border rounded-md w-1/2 py-2 px-3 focus:outline-none focus:border-sky-600'
            id='currentEmail'
            value={email}
            readOnly
          />
        </div>

        {/* 新しいメールアドレス */}
        <div className='mb-5'>
          <div className='text-center'>
            <label className='text-sm mr-5 font-bold' htmlFor='email'>新しいメールアドレス</label>
            <input
              type='email'
              className='border rounded-md w-1/2 py-2 px-3 focus:outline-none focus:border-sky-600'
              placeholder='新しいメールアドレス'
              id='email'
              {...register('email', { required: true })}
            />
          </div>
          <div className='my-3 text-center text-sm text-red-500'>{errors.email?.message}</div>
        </div>

        {/* 変更ボタン */}
        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <div className='text-center'>
              <button
                type='submit'
                className='w-96 rounded-full bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'
              >
                変更
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

export default Email