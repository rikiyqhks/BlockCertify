import Link from 'next/link'

type Props = {
  href: string
  text: string
  icon?: any
}

export const Button = ({ href, text, icon }: Props) => {
  return (
    <Link href={href} className='relative rounded px-5 py-2.5 overflow-hidden group bg-sky-600 relative hover:bg-gradient-to-r hover:from-sky-600 hover:to-sky-500 text-white hover:ring-2 hover:ring-offset-2 hover:ring-sky-500 transition-all ease-out duration-300'>
      <span className='absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease'></span>
      <span className='relative'>{text}</span>
      <span>{icon}</span>
    </Link>
  )
}