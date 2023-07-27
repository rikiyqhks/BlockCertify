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
import useStore from '@/store'
type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
})

// プロフィール
const Profile: NextPage = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { user } = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: {
      name: user.name!,
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)
    setMessage('')
    console.log(errors)

    try {
      // プロフィールアップデート
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: data.name,
        })
        .eq('id', user.id)
      
        // エラーチェック
        if (updateError) {
          setMessage('エラーが発生しました。' + updateError)
          return
        }

        setMessage('プロフィールを更新しました。')
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
      <div className='text-center font-bold text-xl mb-10'>プロフィール</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 名前 */}
        <div className='mb-5'>
          <div className='text-center'>
            <label className='text-sm font-bold mr-5' htmlFor='name'>名前</label>
            <input
              type='text'
              className='border rounded-md w-1/2 py-2 px-3 focus:outline-none focus:border-sky-600'
              placeholder='名前'
              id='name'
              {...register('name', { required: true })}
              required
            />
          </div>
          <div className='my-3 text-center text-sm text-red-500'></div>
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
      {message && <div className='my-5 text-center tex-red-500 mb-5'>{message}</div>}
    </div>
  )
}

export default Profile