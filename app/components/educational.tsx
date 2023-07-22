'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid' 
import { useRecoilState } from 'recoil'
import { inputState } from '@/states/atoms/inputAtom'
import Loading from '@/app/loading'
import * as z from 'zod'
import InputFormType from '@/lib/inputForm.types'
import type { NextPage } from 'next'
import useStore from '@/store'
import { getExistData } from '@/app/hooks/getExistData'
type Schema = z.infer<typeof schema>

// 電話番号の正規表現
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// 入力データの検証ルールを定義
const schema = z.object({
  uid: z.string(),
  submitdate: z.string(),
  firstname: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  lastname: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  dob: z.string().min(1, { message: 'カレンダーから選択してください。' }),
  university: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  schoolid: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  studentid: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  department: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  admissionyear: z.string().min(1, { message: 'カレンダーから選択してください。' }),
  graduationyear: z.string().min(1, { message: 'カレンダーから選択してください。' }),
  gpa: z.string().min(1, { message: '1文字以上入力する必要があります。' }).max(3, { message: '3文字以下で入力する必要があります。' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  phonenumber: z.string().regex(phoneRegex, '電話番号の形式ではありません。'),
  transactionid: z.string(),
  verified: z.boolean(),
})

// 登録済学歴情報
const Educational: NextPage = () => {

  const router = useRouter()
  const { user } = useStore()
  const [educationalData, setEducationalData] = useState<any>()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [fileErrorMessage, setFileErrorMessage] = useState({
    frontStudentCard: '',
    backStudentCard: '',
    diploma: '',
  })
  const [frontStudentCard, setFrontStudentCard] = useState('')
  const [backStudentCard, setBackStudentCard] = useState('')
  const [diploma, setDiploma] = useState('')
  const [input, setInput] = useRecoilState(inputState);

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const YYYYMMDD = `${year}年${month}月${date}日`

  useMemo(() => {
    const getData = async () => {
      const data = await getExistData(user.id)
      setEducationalData(data)
    }
    getData()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormType>({
    // 初期値
    defaultValues: {
      uid: user.id,
      submitdate: YYYYMMDD,
      firstname: String(),
      lastname: String(),
      dob: String(),
      university: String(),
      schoolid: String(),
      studentid: String(),
      department: String(),
      admissionyear: String(),
      graduationyear: String(),
      gpa: String(),
      email: String(),
      phonenumber: String(),
      transactionid: uuidv4(),
      verified: false,
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data: InputFormType) => {
    setLoading(true)

    try {
      setInput((currentInput) => ({
        ...currentInput,
        ...{
          uid: data.uid,
          submitdate: data.submitdate,
          firstname: data.firstname,
          lastname: data.lastname,
          dob: data.dob,
          university: data.university,
          schoolid: data.schoolid,
          studentid: data.studentid,
          department: data.department,
          admissionyear: data.admissionyear,
          graduationyear: data.graduationyear,
          gpa: data.gpa,
          email: data.email,
          phonenumber: data.phonenumber,
          transactionid: data.transactionid,
          verified: data.verified,
        }
      }))
      router.push(`/settings/educational/confirm/${data.transactionid}`)
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }

  console.log(educationalData)

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8 text-center'>

        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>登録済学歴情報</h2>

          <p className='mx-auto max-w-screen-md text-gray-500 md:text-lg'>{educationalData && educationalData.length !== 0 ? 'ステータス: 申請済み、承認待ち' : 'ステータス: 申請未完了'}</p>
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
}

export default Educational