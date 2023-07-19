import Footer from '@/app/components/footer'
import Main from '@/app/components/main'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import SupabaseListener from '@/app/components/supabase-listener'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BlockCertify - 学歴証明システム',
  description: 'デジタルで学歴を証明できる最新システムです。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <link href='//db.onlinewebfonts.com/c/1d7edff6ea893206f5bb1de4bc17c49c?family=AxisStd-Light' rel='stylesheet' type='text/css'/>
      </head>
      <body className={inter.className}>
        <div className='flex flex-col min-h-screen'>
          <SupabaseListener />
          <Main>{children}</Main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
