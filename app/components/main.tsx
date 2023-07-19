'use client'

import { RecoilRoot } from 'recoil'

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  )
}

export default Main