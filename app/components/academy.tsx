import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import type { Database } from '@/lib/database.types'
import { ScrollToTop } from '@/app/components/scroll-to-top'

import partnershipSVG from '@/public/imgs/items/partnership.svg'
import PhilosophyGraph from './graphs'

const Academy = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <section className='mx-auto w-full tracking-wider'>
        {/* アピールポイント#1 */}
        <div className='py-20 mb-10 flex flex-wrap flex-col items-center gap-10'>
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
          <Link href='/auth/signup'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>教育機関アカウントを申し込む</button></Link>
        </div>
        {/* アピールポイント#2 */}
        <div className='bg-gray-50 p-5 my-10 flex flex-wrap flex-col items-center gap-10'>
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
        <div className='p-5 my-10 flex flex-wrap flex-col items-center gap-10'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>パートナーシップとコミュニティの構築</h2>
            <hr className='my-2 w-2/3' />
          </div>
          <div className='flex flex-row justify-center'>
            <Image src={partnershipSVG.src} width={500} alt='デジタル学歴証明とは？の画像' />
            <div className='flex flex-col items-center justify-center gap-10'>
              <ul className='flex flex-col gap-5 text-lg w-2/3 list-decimal'>
                <li>教育機関との緊密なパートナーシップを築き、共同作業を通じて最良の成果を追求します。</li>
                <li>教育コミュニティを活性化させ、学生と教育機関のニーズに適したサービスを提供します。</li>
                <li>ユーザーのデータを最高水準のセキュリティで保護し、情報の漏洩や不正アクセスを防止します。</li>
              </ul>
              <Link href='/auth/signup'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>教育機関アカウントを申し込む</button></Link>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  )
}

export default Academy