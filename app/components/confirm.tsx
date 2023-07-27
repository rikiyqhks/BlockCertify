'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import Loading from '@/app/loading'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { inputState } from '@/states/atoms/inputAtom'
import InputFormType from '@/lib/inputForm.types'
import supabase from '@/lib/supabase'
import type { NextPage } from 'next'

// 学歴情報申請確認
const Confirm: NextPage = () => {
  const input = useRecoilValue(inputState)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    handleSubmit,
  } = useForm<InputFormType>({
    // 初期値
    defaultValues: {
      uid: input.uid,
      submitdate: input.submitdate,
      firstname: input.firstname,
      lastname: input.lastname,
      dob: input.dob,
      university: input.university,
      schoolid: input.schoolid,
      studentid: input.studentid,
      department: input.department,
      admissionyear: input.admissionyear,
      graduationyear: input.graduationyear,
      gpa: input.gpa,
      email: input.email,
      phonenumber: input.phonenumber,
      transactionid: input.transactionid,
      verified: input.verified,
    },
  })

  // 送信
  const onSubmit: SubmitHandler<any> = async () => {
    try {
      const { error: requestError } = await supabase
      .from('requests')
      .insert(input)
  
      // エラーチェック
      if (requestError) {
        setMessage('エラーが発生しました。' + requestError.message)
      }
      router.push(`/settings/educational/confirm/${input.transactionid}/done`)  
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <form className='flex items-center flex-col' onSubmit={handleSubmit(onSubmit)}>
      <div className='text-center font-bold text-xl mb-10 tracking-wider'>入力確認画面</div>
      <div className='bg-gray-200 p-10 w-1/2'>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>申請日:</p>
          <p className='text-center w-1/2'>{input.submitdate}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>お名前:</p>
          <p className='text-center w-1/2'>{input.firstname} {input.lastname}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>生年月日:</p>
          <p className='text-center w-1/2'>{input.dob}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>最終学歴:</p>
          <p className='text-center w-1/2'>{input.university}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>学校ID:</p>
          <p className='text-center w-1/2'>{input.schoolid}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>学籍番号 / 学生ID:</p>
          <p className='text-center w-1/2'>{input.studentid}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>学部 / 学科 / 専攻:</p>
          <p className='text-center w-1/2'>{input.department}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>入学した年月:</p>
          <p className='text-center w-1/2'>{input.admissionyear}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>卒業した年月（または卒業予定）:</p>
          <p className='text-center w-1/2'>{input.graduationyear}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>成績評価指数（GPA）:</p>
          <p className='text-center w-1/2'>{input.gpa}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>連絡先メールアドレス:</p>
          <p className='text-center w-1/2'>{input.email}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>連絡先電話番号:</p>
          <p className='text-center w-1/2'>{input.phonenumber}</p>
        </section>
      </div>
      <div className='flex flex-row items-center gap-10 mt-5'>
        <Link href='/settings/educational'><button className='rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-600 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base'>修正する</button></Link>
        {/* 次へ進むボタン */}
        {loading ? (
          <Loading />
        ) : (
          <button type='submit' className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>申請する</button>
        )}
        {/* メッセージ */}
        {message && <span className='text-sm text-red-500'>{message}</span>}
      </div>
    </form>
  )
}

export default Confirm