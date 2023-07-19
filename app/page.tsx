import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import YoutubeMovie from '@/app/components/youtube'
import type { Database } from '@/lib/database.types'
import { ScrollToTop } from '@/app/components/scroll-to-top'

import TitleSVG from '@/public/imgs/items/title.svg'
import wallpaper_1_PNG from '@/public/imgs/main_1_wallpaper.png'
import secureSVG from '@/public/imgs/items/secure.svg'
import educationSVG from '@/public/imgs/items/education.svg'
import certificationSVG from '@/public/imgs/items/certification.svg'

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <section className='flex bg-main_0_wallpaper h-screen justify-center items-center gap-20 rounded-b-3xl tracking-wider'>
        <div className='flex justify-center items-center gap-20 flex-wrap flex-col'>
          <Image src={TitleSVG.src} alt='タイトル画像' />
          <h2 className='text-lg font-thin drop-shadow-sm'>
            就活生に向けた就活の為のシステム<br/>
            最新の技術であなたの学歴をデジタル化してみませんか？<br/>
            電子履歴書が暗号化され、安全な状態で保管されます。
          </h2>
          {session ? (
            <Link href='/settings/profile'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>マイページへ進む</button></Link>
          ) : (
            <Link href='/auth/signup'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>無料でサインアップ</button></Link>
          )}
        </div>
        <div className='overflow-hidden'>
          <Image src={wallpaper_1_PNG.src} className='w-full h-full' alt='壁紙の画像' />
        </div>
      </section>
      <section className='mx-auto w-full pt-20 tracking-wider'>
        {/* アピールポイント#1 */}
        <div className='mb-10 flex flex-wrap flex-col items-center gap-10'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>デジタル学歴証明とは？</h2>
            <hr className='my-2 w-2/3' />
            <Image src={secureSVG.src} width={500} alt='デジタル学歴証明とは？の画像' />
          </div>
          <div className='flex flex-wrap flex-row gap-10'>
            <div className='flex flex-col items-center gap-5'>
              <h2 className='text-xl font-bold'>【信頼性と安全性】</h2>
              <p className='text-lg w-96'>
                ブロックチェーン技術を活用することで、学歴情報の改ざんや不正な変更を防ぎます。<br />
                デジタル証明書により、学歴情報の信頼性が保証され、検証可能な証拠となります。
              </p>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <h2 className='text-xl font-bold'>【透明性と信用】</h2>
              <p className='text-lg w-96'>
                学生が自身の学歴情報を登録し、検証できるため、信頼度が向上します。<br />
                また、教育機関との連携により、正確な学歴情報を提供します。<br />
                就職や進学の際に、信頼される学歴情報を提供することができます。
              </p>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <h2 className='text-xl font-bold'>【プライバシーとセキュリティ】</h2>
              <p className='text-lg w-96'>
                個人のプライバシーを尊重し、情報は暗号化されて保存されます。<br />
                ユーザーのデータは安全に保護され、不正アクセスや漏洩のリスクが最小限に抑えられます。
              </p>
            </div>
          </div>
        </div>
        {/* アピールポイント#2 */}
        <div className='bg-gray-50 p-5 my-10 flex flex-wrap flex-col items-center gap-10'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>柔軟性と将来性</h2>
            <hr className='my-2 w-2/3' />
            <Image src={educationSVG.src} width={500} alt='スムーズの参照と共有の画像' />
          </div>
          <div className='flex flex-wrap flex-row gap-10'>
            <div className='flex flex-col items-center gap-5'>
              <h2 className='text-xl font-bold'>【簡単な操作】</h2>
              <p className='text-lg w-96'>
                シンプルで使いやすいインターフェースにより、学歴情報の登録や検証が簡単に行えます。<br />
                ユーザーフレンドリーなデザインと直感的な操作性で、誰でも利用できます。
              </p>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <h2 className='text-xl font-bold'>【未来の学歴管理】</h2>
              <p className='text-lg w-96'>
                Block Certifyは、従来の学歴管理方法を革新し、デジタル化の未来に対応しています。<br />
                ブロックチェーンの利点を最大限に活用し、教育業界の進化を推進します。
              </p>
            </div>
          </div>
        </div>
        {/* アピールポイント#3 */}
        <div className='my-10 flex flex-wrap flex-col items-center gap-10'>
          <div className='flex flex-wrap flex-col items-center gap-10'>
            <h2 className='text-4xl font-bold'>BlockCertify でできること</h2>
            <p className='text-lg'>「使用感を一度拝見したい」という方に向けて、BlockCertifyでできることを動画で紹介しています。</p>
            <hr className='my-2 w-2/3' />
            <YoutubeMovie />
          </div>
        </div>
      </section>
      {/* サブフッター */}
      <section className='flex bg-gray-100 w-full py-5 px-2 flex-wrap flex-col items-center gap-5 mx-auto'>
        <Image src={certificationSVG.src} width={150} alt='PDFの画像' />
        <h2 className='text-lg my-1 mx-auto tracking-wider'>PDFファイル1つで簡単に学歴を証明してみよう！</h2>
        {session ? (
            <Link href='/settings/profile'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>マイページへ進む</button></Link>
          ) : (
            <Link href='/auth/signup'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>無料でサインアップ</button></Link>
        )}
      </section>
      <ScrollToTop />
    </>
  )
}

export default Home