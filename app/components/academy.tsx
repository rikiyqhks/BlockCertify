'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import { ScrollToTop } from '@/app/components/scroll-to-top'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import partnershipSVG from '@/public/imgs/items/partnership.svg'
import PhilosophyGraph from '@/app/components/graphs'
import { Button } from '@/app/components/button'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
import type { NextPage } from 'next'
type Schema= z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
  university: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
  tel: z.string().min(5, { message: '5文字以上入力する必要があります。' }),
})

const Academy: NextPage = () => {
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
    defaultValues: { university: '', email: '', tel: '' },
    // 入力値の検証
    resolver: zodResolver(schema),
  })

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true)

    try {
      // ログイン
      // const { error } = await supabase.auth.signInWithPassword({
      //   university: data.university,
      //   email: data.email,
      //   tel: data.tel,
      // })

      // エラーチェック
      // if (error) {
      //   setMessage('エラーが発生しました。' + error.message)
      //   return
      // }

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
    <>
      <section className='mx-auto w-full tracking-wider'>
        {/* アピールポイント#1 */}
        <div className='py-20 flex flex-wrap flex-col items-center justify-center gap-10 h-screen'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>教育機関に存在するメリット</h2>
            <hr className='my-2 w-2/3' />
          </div>
          <div className='flex flex-wrap flex-row gap-10'>
            <div className='flex flex-col items-center gap-5 p-10 border-2 border-sky-500'>
              <h2 className='text-xl font-bold'>【デジタル化による効率向上】</h2>
              <ul className='flex flex-col gap-5 text-lg w-96 list-disc'>
                <li>紙ベースの学歴情報のデジタル化により、煩雑な手続きや保管スペースの問題を解消します。</li>
                <li>自動化されたプロセスにより、学歴情報の管理と提供にかかる時間と労力を削減できます。</li>
              </ul>
            </div>
            <div className='flex flex-col items-center gap-5 p-10 border-2 border-sky-500'>
              <h2 className='text-xl font-bold'>【簡単な情報提供と検証】</h2>
              <ul className='flex flex-col gap-5 text-lg w-96 list-disc'>
                <li>学生が自身の学歴情報を登録し、教育機関が簡単に検証できるため、情報の共有と確認がスムーズに行えます。</li>
                <li>電子的な学歴証明書により、学生の学歴情報を迅速かつ正確に提供できます。</li>
              </ul>
            </div>
            <div className='flex flex-col items-center gap-5 p-10 border-2 border-sky-500'>
              <h2 className='text-xl font-bold'>【プライバシーとセキュリティ】</h2>
              <ul className='flex flex-col gap-5 text-lg w-96 list-disc'>
                <li>学歴情報はブロックチェーン上に暗号化されて保存され、セキュリティが確保されます。</li>
                <li>個人データのプライバシーを尊重し、GDPRなどの規制に準拠します。</li>
                <li>雇用主や他の教育機関が正確かつ確認可能な学歴情報にアクセスできるため、透明性が向上します。</li>
              </ul>
            </div>
          </div>
          <Button href='#application' text={'教育機関アカウントを申し込む'} icon={<CursorArrowRaysIcon className='inline' width={30} />}/>
          <Link href='/settings/educational/login' className='underline hover:text-slate-600'>既にアカウントをお持ちの方はこちら</Link>
        </div>
        {/* アピールポイント#2 */}
        <div className='bg-gray-50 py-20 flex flex-wrap flex-col items-center gap-10'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>理念体系</h2>
            <hr className='my-2 w-2/3' />
          </div>
          <div className='flex justify-center'>
            <p className='text-lg w-3/5'>
              学歴情報の改ざんや不正な変更を防ぎ、学生や教育機関の信頼を高め、正確かつ検証可能な学歴情報の提供を目指します。
            </p>
          </div>
          <PhilosophyGraph />
        </div>
        {/* アピールポイント#3 */}
        <div className='p-20 flex flex-wrap flex-col items-center gap-10'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>パートナーシップとコミュニティの構築</h2>
            <hr className='my-2 w-2/3' />
          </div>
          <div className='flex flex-row justify-center'>
            <Image src={partnershipSVG.src} width={500} height={100} alt='デジタル学歴証明とは？の画像' />
            <div className='flex flex-col items-center justify-center gap-10'>
              <ul className='flex flex-col gap-5 text-lg w-2/3 list-decimal'>
                <li>教育機関との緊密なパートナーシップを築き、共同作業を通じて最良の成果を追求します。</li>
                <li>教育コミュニティを活性化させ、学生と教育機関のニーズに適したサービスを提供します。</li>
                <li>ユーザーのデータを最高水準のセキュリティで保護し、情報の漏洩や不正アクセスを防止します。</li>
              </ul>
              <Button href='#application' text={'教育機関アカウントを申し込む'} icon={<CursorArrowRaysIcon className='inline' width={30} />}/>
              <Link href='/settings/educational/login' className='underline hover:text-slate-600'>既にアカウントをお持ちの方はこちら</Link>
            </div>
          </div>
        </div>
        {/* アカウントの申し込み */}
        <div className='bg-gray-50 py-20 flex flex-wrap flex-col items-center gap-10' id='application'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>資料を請求する</h2>
            <hr className='my-2 w-2/3' />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col w-1/3'>
            {/* 学校名 */}
            <div className='mb-3'>
              <input
                type='text'
                className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
                placeholder='学校名'
                id='university'
                {...register('university', { required: true })}
              />
              <div className='my-3 text-center text-sm text-red-500'>{errors.university?.message}</div>
            </div>

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

            {/* 電話番号 */}
            <div className='mb-5'>
              <input
                type='tel'
                className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-sky-600 transition duration-100 focus:ring'
                placeholder='電話番号'
                id='tel'
                {...register('tel', { required: true })}
              />
              <div className='my-3 text-center text-sm text-red-500'>{errors.tel?.message}</div>
            </div>

            <p className='text-center mt-1 mb-5'>個人情報の利用について、<Link href='https://drive.google.com/file/d/1hZA5Bmo2rC6epfJoW_vocYLJeIMH8b7l/view?usp=sharing' target='_blank' rel='noopener noreferrer' className='underline hover:text-slate-600'>プライバシーポリシー</Link>を必ずご確認ください。</p>

            {/* 申し込みボタン */}
            <div className='mb-5 w-1/3 mx-auto'>
              {loading ? (
                <Loading />
              ) : (
                <button
                  type='submit'
                  className='w-full rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'
                >
                  資料を請求する
                </button>
              )}
            </div>
          </form>

          {/* メッセージ */}
          {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
        </div>
      </section>
      <ScrollToTop />
    </>
  )
}

export default Academy