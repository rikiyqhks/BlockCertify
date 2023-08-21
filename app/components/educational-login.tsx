'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { getSchoolData } from '../hooks/getSchoolData'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { NextPage } from 'next'
import { AuthenticationError } from '@/app/classes/AuthenticationError'
type Schema= z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  ID: z.string().min(1, { message: 'IDを入力してください。' }),
  password: z.string().min(6, { message: 'パスワードを入力してください。' }),
})

const EducationalLogin: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { ID: '', password: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (input) => {
    setLoading(true)

    try {
      // ログイン
      const data = await getSchoolData(input.ID, input.password)

      if (data === '22P02') throw new AuthenticationError(data)

      // トップぺージに遷移
      router.push(`/settings/educational/${uuidv4()}?id=${input.ID}`)
    } catch (error) {
      if (error instanceof AuthenticationError) {
        setMessage('IDまたはパスワードが違います。')
        throw error
      }
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <div className='flex bg-white py-6 h-[calc(100vh-128px)] justify-center items-center sm:py-8 lg:py-12'>
      <div className='basis-full md:px-8'>
        <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl'>教育機関専用ログイン</h2>

        <form className='mx-auto max-w-lg rounded-lg border' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 p-4 md:p-8'>
            {/* ID */}
            <div>
              <label htmlFor='ID' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>ID</label>
              <input
                type='text'
                className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
                placeholder='ID'
                id='ID'
                {...register('ID', { required: true })}
              />
              <div className='my-3 text-center text-sm text-red-500'>{errors.ID?.message}</div>
            </div>

            {/* パスワード */}
            <div>
              <label htmlFor='password' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>パスワード</label>
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
            {loading ? (
              <Loading />
            ) : (
              <button
                type='submit'
                className='block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base'
              >
                ログイン
              </button>
            )}
          </div>
        </form>
        {/* メッセージ */}
        {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
      </div>
    </div>
  )
}

export default EducationalLogin