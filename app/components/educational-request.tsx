'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NextPage } from 'next'
import { Button } from '@/app/components/button'
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import { showSchoolData } from '@/app/hooks/getSchoolData'
import { getRequestData } from '@/app/hooks/getRequestData'
import { useSearchParams } from 'next/navigation'
import { ArrowPathIcon, InboxStackIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Loading from '@/app/loading'

const EducationalRequest: NextPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')
  const uid = searchParams.get('uid')
  const [data, setData] = useState<any>()
  const [request, setRequest] = useState<any>()

  useEffect(() => {
    const getData = async () => {
      if (id) setData(await showSchoolData(id))
    }
    getData()
  }, [])

  useEffect(() => {
    const getRequests = async () => {
      if (data) {
        let index = await getRequestData(data[0].code)
        index && index.map((r: any) => {
          r.uid === uid && setRequest(r)
        })
      }
    }
    getRequests()
  }, [data])

  return (
      <>
        {!data && !request ? (
          <Loading />
        ) : (
          <section className='text-gray-600 body-font bg-gray-100'>
            <div className='container px-5 py-24 mx-auto'>
              <div className='flex flex-col text-center w-full mt-20'>
                {request && (
                  <div>
                    <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>{data[0].name}</h1>
                    <div className='flex flex-row lg:w-2/3 mx-auto leading-relaxed text-base justify-center gap-2 align-middle'>
                      <InboxStackIcon width={30} />
                      <p><span className='underline hover:cursor-pointer' onClick={() => router.back()}>受信トレイ</span> / {request.studentid}</p>
                    </div>
                    <div className='h-full flex flex-col items-center border-gray-200 border p-5 mt-10 rounded-lg bg-gray-50 gap-3'>
                      <img alt='team' className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full' src='https://dummyimage.com/80x80'/>
                      <h2 className='text-gray-900 title-font font-medium'>{request.firstname + request.lastname}</h2>
                      <p className='text-gray-500'>{request.submitdate}</p>
                      <p className='text-gray-500'>{request.dob}</p>
                      <p className='text-gray-500'>{request.university}</p>
                      <p className='text-gray-500'>{request.schoolid}</p>
                      <p className='text-gray-500'>{request.studentid}</p>
                      <p className='text-gray-500'>{request.department}</p>
                      <p className='text-gray-500'>{request.admissionyear}</p>
                      <p className='text-gray-500'>{request.graduationyear}</p>
                      <p className='text-gray-500'>{request.gpa}</p>
                      <p className='text-gray-500'>{request.email}</p>
                      <p className='text-gray-500'>{request.phonenumber}</p>
                      <Button href='/settings/profile' text={'許可する'} icon={<CursorArrowRaysIcon className='inline' width={30} />}/>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </>
  )
}

export default EducationalRequest