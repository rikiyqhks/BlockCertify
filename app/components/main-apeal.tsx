'use client'

import { useIntersectionObserver } from '@/app/hooks/use-intersection-observer'
import { FC, useRef } from 'react'
import styles from '@/app/components/Components.module.scss'
import Image from 'next/image'
import YoutubeMovie from '@/app/components/youtube'
import { FadeAnimation } from '@/app/components/scroll-fade-in'
import secureSVG from '@/public/imgs/items/secure.svg'
import educationSVG from '@/public/imgs/items/education.svg'

// カスタムフックに渡すコールバック関数
const showElements = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // IntersectionObserver で設定された条件を満たした時に実行する処理
      // 要素に active クラスを適用する
      entry.target.classList.add(styles.active)
    }
  })
}

const MainApeal: FC = () => {

  const ref1 = useRef<HTMLHeadingElement>(null)
  const ref2 = useRef<HTMLHeadingElement>(null)
  const ref3 = useRef<HTMLHeadingElement>(null)

  // カスタムフックを呼ぶ
  useIntersectionObserver([ref1, ref2, ref3], showElements)

  return (
    <section className='mx-auto w-full tracking-wider'>
      {/* アピールポイント#1 */}
      <div className='py-20 flex flex-wrap flex-col items-center gap-10 relative'>
        <FadeAnimation>
          <div className={`absolute right-52 bottom-0 font-black text-slate-100 ${styles.customTextSize_2xl}`}>01</div>
        </FadeAnimation>
        <div className={`flex flex-wrap flex-col items-center gap-10 ${styles.heading_animation_left}`} ref={ref1}>
          <h2 className='text-4xl font-bold'>デジタル学歴証明とは？</h2>
          <hr className='my-2 w-2/3' />
          <Image src={secureSVG.src} width={500} height={100} alt='デジタル学歴証明とは？の画像' />
        </div>
        <FadeAnimation>
          <div className='flex flex-wrap flex-row gap-10 z-40 relative'>
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
        </FadeAnimation>
      </div>
      {/* アピールポイント#2 */}
      <div className='bg-gray-50 py-20 flex flex-wrap flex-col items-center gap-10 relative'>
        <FadeAnimation>
          <div className={`absolute left-52 bottom-0 font-black text-slate-100 ${styles.customTextSize_2xl}`}>02</div>
        </FadeAnimation>
        <div className={`flex flex-wrap flex-col items-center gap-10 ${styles.heading_animation_right}`} ref={ref2}>
          <h2 className='text-4xl font-bold'>柔軟性と将来性</h2>
          <hr className='my-2 w-2/3' />
          <Image src={educationSVG.src} width={500} height={100} alt='スムーズの参照と共有の画像' />
        </div>
        <FadeAnimation>
          <div className='flex flex-wrap flex-row gap-10 z-40 relative'>
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
        </FadeAnimation>
      </div>
      {/* アピールポイント#3 */}
      <div className='py-20 flex flex-wrap flex-col items-center gap-10 relative'>
        <FadeAnimation>
          <div className={`absolute right-52 bottom-0 font-black text-slate-100 ${styles.customTextSize_2xl}`}>03</div>
        </FadeAnimation>
        <div className={`flex flex-wrap flex-col items-center gap-10 z-40 relative ${styles.heading_animation_left}`} ref={ref3}>
          <h2 className='text-4xl font-bold'>BlockCertify でできること</h2>
          <p className='text-lg'>「使用感を一度拝見したい」という方に向けて、BlockCertifyでできることを動画で紹介しています。</p>
          <hr className='my-2 w-2/3' />
        </div>
        <FadeAnimation>
          <YoutubeMovie />
        </FadeAnimation>
      </div>
    </section>
  )
}

export default MainApeal