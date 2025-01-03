'use client'

import styles from '@/app/components/Components.module.scss'
import { useState, useMemo, useEffect } from 'react'
import { ethers } from 'ethers'
import Link from 'next/link'
import type { NextPage } from 'next'
import useStore from '@/store'
import { getExistData } from '@/app/hooks/getExistData'
import Loading from '@/app/loading'
import artifact from '@/smart_contract/artifacts/contracts/EducationRecord.sol/EducationalUser.json'

type Record = {
  id: string,
  studentName: string,
  DOB: string,
  university: string,
  studentID: number,
  department: string,
  admissionYear: number,
  graduationYear: number,
  GPA: number,
  studentCard: string,
  diploma: string,
  email: string,
  phoneNumber: number,
  transactionID: string,
  verified: boolean
}

const useContent = (contract: ethers.Contract) => {
  const recordCount = contract.getFunction('recordCount')
  const records = contract.getFunction('records')
  const [recordCountValue, setRecordCountValue] = useState<string>('')
  const [recordsValue, setRecordsValue] = useState<Record[]>([])
  useEffect(() => {
    const getRecords = async () => {
      const _recordCount = await recordCount()
      setRecordCountValue(_recordCount)

      const _records = []
      for (let i = 1; i <= _recordCount; i++) {
        const _record = await records(i)
        _records.push({
          ..._record,
          id: i
        })
      }
      setRecordsValue(_records)
    }
    getRecords()
  }, [])

  return {
    recordCount: recordCountValue,
    records: recordsValue
  }
}

// npx hardhat run scripts/deploy.ts --network localhost コマンドで生成
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

// 登録済学歴情報
const Educational: NextPage = () => {
  const { user } = useStore()
  const [educationalData, setEducationalData] = useState<any>()
  const [loading, setLoading] = useState(true)

  const provider = new ethers.JsonRpcProvider('http://localhost:8545')
  const contract = new ethers.Contract(contractAddress, artifact.abi, provider)
  const { recordCount, records } = useContent(contract)

  useMemo(() => {
    const getData = async () => {
      const data = await getExistData(user.id)
      setEducationalData(data)
    }
    getData()
  }, [])

  useMemo(() => {
    educationalData && setLoading(false)
  }, [educationalData])

  switch(loading) {
    case false:
      return (
        <div className='bg-white py-6 sm:py-8 lg:py-12'> 
          <div className='max-w-screen-2xl px-4 md:px-8'>
            <div className='text-center mb-10 md:mb-16'>
              <h2 className='mb-4 text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>登録済学歴情報</h2>
              <p className='mx-auto max-w-screen-md text-gray-500 md:text-lg'>ステータス: {educationalData && educationalData.length !== 0 ? records.map((t: any) => (t[12] == educationalData[0].transactionid)) ? <span className='text-emerald-500'>承認済み</span> : <span className='text-yellow-500'>申請済み、承認待ち</span> : <span className='text-red-600'>申請未完了</span>}</p>
            </div>
            {educationalData && educationalData.length !== 0 ? (
              records.map((t: any, index: number) => (
                t[12] == educationalData[0].transactionid ? (
                  <div className='flex flex-col items-center justify-center gap-5'>
                    <table className={styles.table_info} key={index}>
                      <tr>
                        <th className={styles.table_info_th}>申請日付</th>
                        <td className={styles.table_info_td}>{educationalData[0].submitdate}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>トランザクションID</th>
                        <td className={styles.table_info_td}>{t[12]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>名前</th>
                        <td className={styles.table_info_td}>{t[0]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>生年月日</th>
                        <td className={styles.table_info_td}>{t[1]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>最終学歴</th>
                        <td className={styles.table_info_td}>{t[2]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>学校ID</th>
                        <td className={styles.table_info_td}>{educationalData[0].schoolid}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>学籍番号 / 学生ID</th>
                        <td className={styles.table_info_td}>{t[3]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>学部 / 学科 / 専攻</th>
                        <td className={styles.table_info_td}>{t[4]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>入学した年月</th>
                        <td className={styles.table_info_td}>{t[5]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>卒業した年月（または卒業予定）</th>
                        <td className={styles.table_info_td}>{t[6]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>GPA</th>
                        <td className={styles.table_info_td}>{t[7]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>連絡先メールアドレス</th>
                        <td className={styles.table_info_td}>{t[10]}</td>
                      </tr>
                      <tr>
                        <th className={styles.table_info_th}>連絡先電話番号</th>
                        <td className={styles.table_info_td}>{t[11]}</td>
                      </tr>
                    </table>
                    <Link href='/settings/educational/resume'
                      className='w-96 rounded-full bg-emerald-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-emerald-600 transition duration-100 hover:bg-emerald-600 focus-visible:ring active:bg-emerald-700 md:text-base'
                    >
                      履歴書の作成
                    </Link>
                  </div>
                ) : (
                  <table className={styles.table_info} key={index}>
                    <tr>
                      <th className={styles.table_info_th}>申請日付</th>
                      <td className={styles.table_info_td}>{educationalData[0].submitdate}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>トランザクションID</th>
                      <td className={styles.table_info_td}>{educationalData[0].transactionid}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>名前</th>
                      <td className={styles.table_info_td}>{educationalData[0].firstname + educationalData[0].lastname}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>生年月日</th>
                      <td className={styles.table_info_td}>{educationalData[0].dob}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>最終学歴</th>
                      <td className={styles.table_info_td}>{educationalData[0].university}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>学校ID</th>
                      <td className={styles.table_info_td}>{educationalData[0].schoolid}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>学籍番号 / 学生ID</th>
                      <td className={styles.table_info_td}>{educationalData[0].studentid}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>学部 / 学科 / 専攻</th>
                      <td className={styles.table_info_td}>{educationalData[0].department}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>入学した年月</th>
                      <td className={styles.table_info_td}>{educationalData[0].admissionyear}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>卒業した年月（または卒業予定）</th>
                      <td className={styles.table_info_td}>{educationalData[0].graduationyear}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>GPA</th>
                      <td className={styles.table_info_td}>{educationalData[0].gpa}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>連絡先メールアドレス</th>
                      <td className={styles.table_info_td}>{educationalData[0].email}</td>
                    </tr>
                    <tr>
                      <th className={styles.table_info_th}>連絡先電話番号</th>
                      <td className={styles.table_info_td}>{educationalData[0].phonenumber}</td>
                    </tr>
                  </table>
                )
              ))
            ) : (
              <Link href='/settings/educational/form' target='_blank' rel='noopener noreferrer'><button className='rounded-lg bg-sky-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-600 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base'>学歴登録申請はこちらから</button></Link>
            )}
          </div>
        </div>
      )
    default:
      <Loading />  
  }
}

export default Educational