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
import { getSchoolData } from '../hooks/getSchoolData'
type Schema = z.infer<typeof schema>

// 電話番号の正規表現
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

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
const EducationalForm: NextPage = () => {

  const router = useRouter()
  const { user } = useStore()

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

  // useMemo(() => {
  //   getSchoolData().then((data) => console.log(data))
  // }, [])

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
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>

        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>学歴情報登録申請フォーム</h2>

          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>必要事項を記入して完了させてください。</p>
        </div>

        <form className='mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2' onSubmit={handleSubmit(onSubmit)}>
          {/* 学生の名前 姓 */}
          <div>
            <label htmlFor='firstname' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>姓</label>
            <input
              type='text'
              placeholder='田中'
              id='firstname'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('firstname', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.firstname?.message}</div>
          </div>

          {/* 学生の名前 名 */}
          <div>
            <label htmlFor='lastname' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>名</label>
            <input
              type='text'
              placeholder='一郎'
              id='lastname'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('lastname', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.lastname?.message}</div>
          </div>

          {/* 生年月日 */}
          <div className='sm:col-span-2'>
            <label htmlFor='dob' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>生年月日</label>
            <input
              type='date'
              id='dob'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('dob', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.dob?.message}</div>
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
            <label htmlFor='schoolid' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>学校ID</label>
            <input
              type='text'
              placeholder='大阪大学'
              id='uschoolID'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('schoolid', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.schoolid?.message}</div>
          </div>

          {/* 学籍番号 */}
          <div className='sm:col-span-2'>
            <label htmlFor='studentid' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>学籍番号 / 学生ID</label>
            <input
              type='text'
              placeholder='2104240029'
              id='studentid'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('studentid', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.studentid?.message}</div>
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
            <label htmlFor='admissionyear' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>入学した年月</label>
            <input
              type='month'
              placeholder='2104240029'
              id='admissionyear'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('admissionyear', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.admissionyear?.message}</div>
          </div>

          {/* 卒業した年月（または卒業予定） */}
          <div>
            <label htmlFor='graduationyear' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>卒業した年月</label>
            <input
              type='month'
              placeholder='2104240029'
              id='graduationyear'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('graduationyear', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.graduationyear?.message}</div>
          </div>

          {/* GPA */}
          <div className='sm:col-span-2'>
            <label htmlFor='gpa' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>成績評価指数（GPA）</label>
            <input
              type='text'
              placeholder='3.2'
              id='gpa'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('gpa', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.gpa?.message}</div>
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
            <label htmlFor='phonenumber' className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>連絡先電話番号</label>
            <input
              type='tel'
              placeholder='09012345678'
              id='phonenumber'
              className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
              {...register('phonenumber', { required: true })}
            />
            <div className='my-3 text-sm text-red-500'>{errors.phonenumber?.message}</div>
          </div>

          <div className='flex flex-col items-center justify-center gap-5 sm:col-span-2'>
            <p className='text-xs text-gray-400'>学歴を申請すると、<Link href='https://drive.google.com/file/d/1hZA5Bmo2rC6epfJoW_vocYLJeIMH8b7l/view?usp=sharing' className='underline transition duration-100 hover:text-sky-500 active:text-sky-600' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</Link>と<Link href='https://drive.google.com/file/d/1HMVSIHMEa6X9Xkgwghf8aFoSjLdK2FMh/view?usp=sharing' className='underline transition duration-100 hover:text-sky-500 active:text-sky-600' target='_blank' rel='noopener noreferrer'>利用規約</Link>に同意したものとみなされます。</p>

            {/* 次へ進むボタン */}
            {loading ? (
              <Loading />
            ) : (
              <button type='submit' className='rounded-lg bg-sky-500 px-10 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>次へ進む</button>
            )}
            {/* メッセージ */}
            {message && <span className='text-sm text-red-500'>{message}</span>}
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default EducationalForm