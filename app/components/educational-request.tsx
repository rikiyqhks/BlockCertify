'use client'

import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Button } from '@/app/components/button'
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
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

  console.log(request)

  return (
      <>
        {!data && !request ? (
          <Loading />
        ) : (
          <section className='text-gray-600 body-font'>
            <div className='container px-5 py-24 mx-auto'>
              <div className='flex flex-wrap -m-2'>
                {request && (
                  <div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
                    <img alt='team' className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4' src='https://dummyimage.com/80x80'/>
                    <div className='flex-grow'>
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