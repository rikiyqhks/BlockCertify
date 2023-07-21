import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

// TypeScriptの型定義
type fadeAnimationType = {
  children: ReactNode
}

export const FadeAnimation = (props: fadeAnimationType) => {
  const { children } = props

  /**
   * スクロールイベントのオプション
   * 「ref」検知する要素
   * 「inView」要素が見えたかどうか(見えたらtrue)
   * 「rootMargin」要素の検知の「余白」を設定
   * 「triggerOnce」検知を一度だけ行うかどうか
   */
  const { ref, inView } = useInView({
    rootMargin: '-100px',
    triggerOnce: true,
  })

  return (
    /**
     * ★スクロールさせたい要素を囲む
     * refで指定すると対象の要素になる
     * inViewのtrueかfalseを受け取り、styled-componentに渡す
     */
    <SFadeElem inview={inView} ref={ref}>
      {children}
    </SFadeElem>
  )
}

/**
 * ★inView(trueかfalse)で受け取り、それに応じてcssを切り替える
 */
const SFadeElem = styled.span<{ inview: boolean }>`
  display: inline-block;
  transition: opacity 0.5s cubic-bezier(0.47, 0, 0.745, 0.715);
  
  //opacityをtrueなら1、falseなら0とする
  opacity: ${(props) => (props.inview ? 1 : 0)};
`