import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import type { Database } from '@/lib/database.types'
import { ScrollToTop } from '@/app/components/scroll-to-top'
import MainApeal from '@/app/components/main-apeal'
import TitleSVG from '@/public/imgs/items/title.svg'
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
      <section className='flex bg-main_0_wallpaper bg-no-repeat bg-cover h-screen justify-center items-center gap-20 rounded-b-3xl tracking-widest'>
        <div className='flex justify-center items-start gap-20 flex-wrap flex-col w-8/12'>
          <Image src={TitleSVG.src} width={472} height={72} alt='タイトル画像' />
          <div className='flex flex-col gap-3 text-lg font-thin drop-shadow-sm'>
            <h2>就活生に向けた就活の為のシステム</h2>
            <h2>最新の技術であなたの学歴をデジタル化してみませんか？</h2>
            <h2>電子履歴書が暗号化され、安全な状態で保管されます。</h2>
          </div>
          {session ? (
            <Link href='/settings/profile'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>マイページへ進む</button></Link>
          ) : (
            <Link href='/auth/signup'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 inline-block hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>無料でサインアップ<CursorArrowRaysIcon className='inline' width={30} /></button></Link>
          )}
        </div>
      </section>
      <MainApeal />
      {/* サブフッター */}
      <section className='flex bg-gray-100 w-full py-5 px-2 flex-wrap flex-col items-center gap-5 mx-auto'>
        <Image src={certificationSVG.src} width={150} height={100} alt='PDFの画像' />
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