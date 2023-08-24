'use client'

import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { showSchoolData } from '@/app/hooks/getSchoolData'
import { getRequestData } from '@/app/hooks/getRequestData'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Loading from '@/app/loading'

const EducationalRequest: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const uid = searchParams.get('uid')
  const [data, setData] = useState<any>()
  const [requests, setRequests] = useState<any>()

  useEffect(() => {
    const getData = async () => {
      if (id) setData(await showSchoolData(id))
    }
    getData()
  }, [])

  console.log(data[0].code)

  useEffect(() => {
    const getRequests = async () => {
      if (data) setRequests(await getRequestData(data[0].code))
    }
    getRequests()
  }, [data])

  return (
      <>
        <p>aa</p>
      </>
  )
}

export default EducationalRequest