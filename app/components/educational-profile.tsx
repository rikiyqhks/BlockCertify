'use client'

import { NextPage } from 'next'
import { getSchoolData } from '../hooks/getSchoolData'
import { useSearchParams } from 'next/navigation'

const EducationalProfile: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  return(
    <>
      <p>{id}</p>
    </>
  )
}

export default EducationalProfile