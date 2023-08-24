'use client'

import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { showSchoolData } from '@/app/hooks/getSchoolData'
import { getRequestData } from '@/app/hooks/getRequestData'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Loading from '@/app/loading'

const EducationalProfile: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [data, setData] = useState<any>()
  const [requests, setRequests] = useState<any>()

  useEffect(() => {
    const getData = async () => {
      if (id) setData(await showSchoolData(id))
    }
    getData()
  }, [])

  useEffect(() => {
    const getRequests = async () => {
      if (data) setRequests(await getRequestData(data[0].code))
    }
    getRequests()
  }, [data])

  return (
      <>
        {!data && !requests ? (
          <Loading />
        ) : (
          <section className='text-gray-600 body-font'>
            <div className='container px-5 py-24 mx-auto'>
              <div className='flex flex-col text-center w-full mb-20'>
                <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>{data[0].name}</h1>
                <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>新しい申請が来ています。</p>
              </div>
              <div className='flex flex-wrap -m-2'>
                {requests && requests.map((request: any) => (
                  <Link className='p-2 lg:w-1/3 md:w-1/2 w-full' key={request.uid} href={`/settings/educational/requests?id=${id}&uid=${request.uid}`}>
                    <div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
                      <img alt='team' className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4' src='https://dummyimage.com/80x80'/>
                      <div className='flex-grow'>
                        <h2 className='text-gray-900 title-font font-medium'>{request.firstName}</h2>
                        <p className='text-gray-500'>{request.firstname + request.lastname}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </>
  )
}

export default EducationalProfile