'use client'

import Link from 'next/link'
import Loading from '@/app/loading'
import { useRecoilValue } from 'recoil'
import { inputState } from '@/states/atoms/inputAtom'
import supabase from '@/lib/supabase'

// 登録済学歴情報
const Confirm = () => {
  const input = useRecoilValue(inputState);
  console.log(input)
  // 送信
  const onSubmit = async () => {
    const { error } = await supabase
    .from('requests')
    .insert(input)
    // errorでる
  }

  return (
    <form className='flex items-center flex-col' onSubmit={onSubmit}>
      <div className='text-center font-bold text-xl mb-10 tracking-wider'>入力確認画面</div>
      <div className='bg-gray-200 p-10 w-1/2'>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>申請日:</p>
          <p className='text-center w-1/2'>{input.submitDate}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>お名前:</p>
          <p className='text-center w-1/2'>{input.firstName} {input.lastName}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>生年月日:</p>
          <p className='text-center w-1/2'>{input.DOB}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>最終学歴:</p>
          <p className='text-center w-1/2'>{input.university}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>学校ID:</p>
          <p className='text-center w-1/2'>{input.schoolID}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>学籍番号 / 学生ID:</p>
          <p className='text-center w-1/2'>{input.studentID}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>学部 / 学科 / 専攻:</p>
          <p className='text-center w-1/2'>{input.department}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>入学した年月:</p>
          <p className='text-center w-1/2'>{input.admissionYear}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>卒業した年月（または卒業予定）:</p>
          <p className='text-center w-1/2'>{input.graduationYear}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>成績評価指数（GPA）:</p>
          <p className='text-center w-1/2'>{input.GPA}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>連絡先メールアドレス:</p>
          <p className='text-center w-1/2'>{input.email}</p>
        </section>
        <section className='flex justify-center'>
          <p className='text-right w-1/2'>連絡先電話番号:</p>
          <p className='text-center w-1/2'>{input.phoneNumber}</p>
        </section>
      </div>
      <div className='flex flex-row items-center gap-10 mt-5'>
        <Link href='/settings/educational'><button className='rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-600 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base'>修正する</button></Link>
        <button type='submit' className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>申請する</button>
      </div>
    </form>
  )
}

export default Confirm