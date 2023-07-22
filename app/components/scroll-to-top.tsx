'use client'

import { FC, useEffect, useState } from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

export const ScrollToTop: FC = () => {
  const [showButton, setShowButton] = useState(false)

  // スクロールイベントをListen
  useEffect(() => {
    window.addEventListener('scroll', watchScroll);
    return () => {
      window.removeEventListener('scroll', watchScroll)
    }
  }, [])

  // Scrollを検知しボタン表示のフラグを切り替え
  const watchScroll = () => {
    const basePosition = 900
    const scrollPosition = window.scrollY
    if (basePosition <= scrollPosition) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  return (
    <ChevronUpIcon
      className={`${showButton ? 'block' : 'hidden'} animate-bounce bg-gray-300 text-gray-500 w-14 h-14 p-2 rounded-full cursor-pointer fixed right-6 bottom-6 shadow-md hover:bg-gray-200`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  // 上までSmoothスクロール
    />
  )
}