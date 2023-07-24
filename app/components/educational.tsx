'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import useStore from '@/store'
import { getExistData } from '@/app/hooks/getExistData'
import Loading from '../loading'

// 登録済学歴情報
const Educational: NextPage = () => {
  const { user } = useStore()
  const [educationalData, setEducationalData] = useState<any>()
  const [loading, setLoading] = useState(true)

  useMemo(() => {
    const getData = async () => {
      const data = await getExistData(user.id)
      setEducationalData(data)
    }
    getData()
  }, [])

  useMemo(() => {
    educationalData && setLoading(false)
  }, [educationalData])

  switch(loading) {
    case false:
      return (
        <div className='bg-white py-6 sm:py-8 lg:py-12'>
          <div className='mx-auto max-w-screen-2xl px-4 md:px-8 text-center'>
  
            <div className='mb-10 md:mb-16'>
              <h2 className='mb-4 text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>登録済学歴情報</h2>
  
              <p className='mx-auto max-w-screen-md text-gray-500 md:text-lg'>ステータス: {educationalData && educationalData.length !== 0 ? <span className='text-emerald-500'>申請済み、承認待ち</span> : <span className='text-red-600'>申請未完了</span>}</p>
            </div>
  
            {educationalData && educationalData.length !== 0 ? (
              <section>
                <p>申請日付: {educationalData[0].submitdate}</p>
                <p>トランザクションID: {educationalData[0].transactionid}</p>
                <p>名前: {educationalData[0].firstname + educationalData[0].lastname}</p>
                <p>生年月日: {educationalData[0].dob}</p>
                <p>最終学歴: {educationalData[0].university}</p>
                <p>学校ID: {educationalData[0].schoolid}</p>
                <p>学籍番号 / 学生ID: {educationalData[0].studentid}</p>
                <p>学部 / 学科 / 専攻: {educationalData[0].department}</p>
                <p>入学した年月: {educationalData[0].admissionyear}</p>
                <p>卒業した年月（または卒業予定）: {educationalData[0].graduationyear}</p>
                <p>GPA: {educationalData[0].gpa}</p>
                <p>連絡先メールアドレス: {educationalData[0].email}</p>
                <p>連絡先電話番号: {educationalData[0].phonenumber}</p>
                <p>ステータス: 申請済み、承認待ち</p>
              </section>
            ) : (
              <Link href='/settings/educational/form' target='_blank' rel='noopener noreferrer'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>学歴登録申請はこちらから</button></Link>
            )}
          </div>
        </div>
      )
    default:
      <Loading />  
  }
}

export default Educational