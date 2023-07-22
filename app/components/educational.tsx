'use client'

import { useState } from 'react'
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
type Schema = z.infer<typeof schema>

// 電話番号の正規表現
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// 入力データの検証ルールを定義
const schema = z.object({
  submitDate: z.string(),
  firstName: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  lastName: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  DOB: z.string().min(1, { message: 'カレンダーから選択してください。' }),
  university: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  schoolID: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  studentID: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  department: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  admissionYear: z.string().min(1, { message: 'カレンダーから選択してください。' }),
  graduationYear: z.string().min(1, { message: 'カレンダーから選択してください。' }),
  GPA: z.string().min(1, { message: '1文字以上入力する必要があります。' }).max(3, { message: '3文字以下で入力する必要があります。' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  phoneNumber: z.string().regex(phoneRegex, '電話番号の形式ではありません。'),
  transactionID: z.string(),
  verified: z.boolean(),
})

// 登録済学歴情報
const Educational: NextPage = () => {
  const router = useRouter()
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormType>({
    // 初期値
    defaultValues: {
      submitDate: YYYYMMDD,
      firstName: String(),
      lastName: String(),
      DOB: String(),
      university: String(),
      schoolID: String(),
      studentID: String(),
      department: String(),
      admissionYear: String(),
      graduationYear: String(),
      GPA: String(),
      email: String(),
      phoneNumber: String(),
      transactionID: uuidv4(),
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
          submitDate: data.submitDate,
          firstName: data.firstName,
          lastName: data.lastName,
          DOB: data.DOB,
          university: data.university,
          schoolID: data.schoolID,
          studentID: data.studentID,
          department: data.department,
          admissionYear: data.admissionYear,
          graduationYear: data.graduationYear,
          GPA: data.GPA,
          email: data.email,
          phoneNumber: data.phoneNumber,
          transactionID: data.transactionID,
          verified: data.verified,
        }
      }))
      router.push(`/settings/educational/confirm/${data.transactionID}`)
    } catch (error) {
      setMessage('エラーが発生しました。' + error)
      return
    } finally {
      setLoading(false)
      router.refresh()
    }
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>

        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>登録済学歴情報</h2>

          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>登録が行われていない学生アカウントには申請フォームが表示されています。</p>
        </div>

        <form className='mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2' onSubmit={handleSubmit(onSubmit)}>
          {/* 学生の名前 姓 */}
          <div>
            <label htmlFor='firstName' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>姓</label>
            <input
              type='text'
              placeholder='田中'
              id='firstName'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('firstName', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.firstName?.message}</div>
          </div>

          {/* 学生の名前 名 */}
          <div>
            <label htmlFor='lastName' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>名</label>
            <input
              type='text'
              placeholder='一郎'
              id='lastName'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('lastName', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.lastName?.message}</div>
          </div>

          {/* 生年月日 */}
          <div className='sm:col-span-2'>
            <label htmlFor='DOB' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>生年月日</label>
            <input
              type='date'
              id='DOB'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('DOB', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.DOB?.message}</div>
          </div>

          {/* 大学・専門学校 */}
          <div className='sm:col-span-2'>
            <label htmlFor='university' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>最終学歴</label>
            <input
              type='text'
              placeholder='大阪大学'
              id='university'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('university', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.university?.message}</div>
          </div>

          {/* 学校ID */}
          <div className='sm:col-span-2'>
            <label htmlFor='schoolID' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>学校ID</label>
            <input
              type='text'
              placeholder='大阪大学'
              id='uschoolID'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('schoolID', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.schoolID?.message}</div>
          </div>

          {/* 学籍番号 */}
          <div className='sm:col-span-2'>
            <label htmlFor='studentID' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>学籍番号 / 学生ID</label>
            <input
              type='text'
              placeholder='2104240029'
              id='studentID'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('studentID', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.studentID?.message}</div>
          </div>

          {/* 学部・学科・専攻 */}
          <div className='sm:col-span-2'>
            <label htmlFor='department' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>学部 / 学科 / 専攻</label>
            <input
              type='text'
              placeholder='文学部文学研究科'
              id='department'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('department', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.department?.message}</div>
          </div>

          {/* 入学した年月 */}
          <div>
            <label htmlFor='admissionYear' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>入学した年月</label>
            <input
              type='month'
              placeholder='2104240029'
              id='admissionYear'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('admissionYear', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.admissionYear?.message}</div>
          </div>

          {/* 卒業した年月（または卒業予定） */}
          <div>
            <label htmlFor='graduationYear' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>卒業した年月</label>
            <input
              type='month'
              placeholder='2104240029'
              id='graduationYear'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('graduationYear', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.graduationYear?.message}</div>
          </div>

          {/* GPA */}
          <div className='sm:col-span-2'>
            <label htmlFor='GPA' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>成績評価指数（GPA）</label>
            <input
              type='text'
              placeholder='3.2'
              id='GPA'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('GPA', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.GPA?.message}</div>
          </div>

          {/* 連絡先メールアドレス */}
          <div className='sm:col-span-2'>
            <label htmlFor='email' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>連絡先メールアドレス</label>
            <input
              type='email'
              placeholder='xxxx@gmail.com'
              id='email'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('email', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.email?.message}</div>
          </div>

          {/* 連絡先電話番号 */}
          <div className='sm:col-span-2'>
            <label htmlFor='phoneNumber' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>連絡先電話番号</label>
            <input
              type='tel '
              placeholder='09012345678'
              id='phoneNumber'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('phoneNumber', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.phoneNumber?.message}</div>
          </div>

          <div className='flex items-center justify-between sm:col-span-2'>
            {/* 次へ進むボタン */}
            {loading ? (
              <Loading />
            ) : (
              <button type='submit' className='inline-block rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>次へ進む</button>
            )}
            {/* メッセージ */}
            {message && <span className='text-sm text-red-500'>{message}</span>}
            
          </div>

          <p className='text-xs text-gray-400'>学歴を申請すると、<Link href='https://drive.google.com/file/d/1hZA5Bmo2rC6epfJoW_vocYLJeIMH8b7l/view?usp=drive_link' className='underline transition duration-100 hover:text-sky-500 active:text-sky-600' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</Link>に同意したものとみなされます。</p>
        </form>
      </div>
    </div>
  )
}

export default Educational