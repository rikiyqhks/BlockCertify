'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NextPage } from 'next'
import { showSchoolData } from '@/app/hooks/getSchoolData'
import { getRequestData } from '@/app/hooks/getRequestData'
import { useSearchParams } from 'next/navigation'
import { ArrowPathIcon, InboxStackIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Loading from '@/app/loading'

const EducationalProfile: NextPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
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
          <section className='text-gray-600 body-font bg-gray-100 h-[calc(100vh-60px)]'>
            <div className='container px-5 py-24 mx-auto'>
              <div className='flex flex-col text-center w-full mt-20'>
                <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>{data[0].name}</h1>
                <div className='flex flex-row lg:w-2/3 mx-auto leading-relaxed text-base justify-center gap-2 align-middle'>
                  <InboxStackIcon width={30} />
                  <p>受信トレイ</p>
                </div>
              </div>
              <div className='m-5'>
                <ArrowPathIcon width={40} className='p-2 hover:bg-gray-200 hover:cursor-pointer hover:rounded-full' onClick={() => router.refresh()}/>
              </div>
              <div className='flex flex-wrap -m-2 border-gray-300 border rounded-lg p-4 h-[550px] bg-gray-50 overflow-y-scroll'>
                {requests ? requests.map((request: any) => (
                  <Link className='p-2 lg:w-1/3 md:w-1/2 w-full h-24' key={request.uid} href={`/settings/educational/requests?id=${id}&uid=${request.uid}`}>
                    <div className='flex items-center border-gray-200 border p-4 rounded-lg hover:border-b-4 hover:border-gray-300'>
                      <img alt='team' className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4' src='https://dummyimage.com/80x80'/>
                      <div className='flex-grow'>
                        <h2 className='text-gray-900 title-font font-medium'>{request.firstname + request.lastname}</h2>
                        <p className='text-gray-500'>{request.studentid}</p>
                      </div>
                      <small>{request.submitdate}</small>
                    </div>
                  </Link>
                )) : (
                  <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>リクエストが存在しません。</p>
                )}
              </div>
            </div>
          </section>
        )}
      </>
  )
}

export default EducationalProfile