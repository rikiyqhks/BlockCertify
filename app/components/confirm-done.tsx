'use client'

import Link from 'next/link'
import { DocumentCheckIcon } from '@heroicons/react/24/outline'

// 登録学歴情報申請完了
const ConfirmDone = () => {

  return (
    <div className='flex flex-col justify-center items-center'>
      <DocumentCheckIcon width={100} />
      <h1 className='text-3xl font-thin drop-shadow-sm my-5'>学歴の申請が完了しました！</h1>
      <section className='text-center my-10'>
        <p>申請内容を確認の上認可を下しますので、もうしばらくお待ちください。</p>
        <p>申請ステータスはいつでもマイページからご覧いただけます。</p>
      </section>
      <Link href='/settings/profile'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>マイページへ戻る</button></Link>
    </div>
  )
}

export default ConfirmDone