'use client'

import styles from '@/app/components/Components.module.scss'
import { NextPage } from 'next'
import Link from 'next/link'

const EducationalResume: NextPage = () => {
  return (
    <form>
      <h2 className={`text-center b-4 text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl ${styles.customWidth}`}>履歴書の作成</h2>
      <table className={`border-separate border-spacing-5 bg-lime-200 ${styles.customWidth}`}>
        <thead className='font-bold underline underline-offset-8'>基本情報</thead>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>氏名</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-80 p-1.5 mx-1.5 box-border' />
            <label className='ml-5 font-semibold'>性別</label>
            <select className='bg-gray-200 border border-slate-500 w-13 p-1.5 mx-1.5 box-border'>
              <option selected>男</option>
              <option>女</option>
              <option>その他</option>
            </select>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>生年月日</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-20 p-1.5 mx-1.5 box-border' />
            <label className='mr-3'>年</label>
            <input type='text' className='bg-gray-200 border border-slate-500 w-20 p-1.5 mx-1.5 box-border' />
            <label className='mr-3'>月</label>
            <input type='text' className='bg-gray-200 border border-slate-500 w-20 p-1.5 mx-1.5 box-border' />
            <label>日</label>
            <label>（満<input type='text' className='bg-gray-200 border border-slate-500 w-20 p-1.5 mx-1.5 box-border' />歳）</label>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>郵便番号〒</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-44 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>現住所</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-96 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>連絡先電話番号</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-44 p-1.5 mx-1.5 box-border' />
            <label>（ハイフンなしで入力）</label>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>連絡先メールアドレス</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-96 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>高校名</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-96 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>高校入学した年月</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-40 p-1.5 mx-1.5 box-border' />
            <label className='ml-5 font-semibold'>高校卒業した年月</label>
            <input type='text' className='bg-gray-200 border border-slate-500 w-40 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>学校名（最終学歴）</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-96 p-1.5 mx-1.5 box-border' />
            <label className='ml-5 font-semibold'>学校ID</label>
            <input type='text' className='bg-gray-200 border border-slate-500 w-60 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>学籍番号 / 学生ID</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-60 p-1.5 mx-1.5 box-border' />
            <label className='ml-5 font-semibold'>学部 / 学科 / 専攻</label>
            <input type='text' className='bg-gray-200 border border-slate-500 w-60 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>最終学歴入学した年月</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-40 p-1.5 mx-1.5 box-border' />
            <label className='ml-5 font-semibold'>最終学歴卒業した年月（または卒業予定）</label>
            <input type='text' className='bg-gray-200 border border-slate-500 w-40 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>GPA</label></th>
          <td className='p-2.5 border-b'>
            <input type='text' className='bg-gray-200 border border-slate-500 w-20 p-1.5 mx-1.5 box-border' />
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>学歴に関して補足などあればお書きください。<br/>（最大5行）</label></th>
          <td className='p-2.5 border-b'>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-32' rows={5} cols={68}></textarea>
          </td>
        </tr>
      </table>
      <table className={`border-separate border-spacing-5 bg-amber-200 mt-5 ${styles.customWidth}`}>
        <thead>
          <span className='font-bold underline underline-offset-8 mr-5'>学歴・職歴</span>
          <span>xx年＜＞xx＜＞事柄と「＜＞」で区切る</span>
        </thead>
        <tr>
          <td className='p-2.5 border-b'>
            <label className='font-semibold'>職歴の有無</label>
            <select className='bg-gray-200 border border-slate-500 w-44 p-1.5 mx-1.5 box-border'>
              <option selected>選択してください。</option>
              <option>職歴あり</option>
              <option>職歴なし</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label className='font-semibold align-top'>（最大16行）</label>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-96' rows={16} cols={68}></textarea>
            <p>※特殊型 中央揃え・末揃え単語</p>
            <p>＜＞＜＞ + 学歴/職歴/以上/免許・資格/免許/資格/賞罰/アルバイト歴/バイト歴/画歴</p>
          </td>
        </tr>
      </table>
      <table className={`border-separate border-spacing-5 bg-amber-200 mt-5 ${styles.customWidth}`}>
        <thead>
          <span className='font-bold underline underline-offset-8 mr-5'>資格・免許</span>
          <span>xx年＜＞xx＜＞事柄と「＜＞」で区切る</span>
        </thead>
        <tr>
          <td>
            <label className='font-semibold align-top'>（最大6行）</label>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-96' rows={6} cols={68}>
              平成12＜＞12＜＞第一種普通自動車免許取得
              （※これは書き方例です。上書きしてください）
            </textarea>
            <p>※特殊型 中央揃え・末揃え単語</p>
            <p>＜＞＜＞ + 学歴/職歴/以上/免許・資格/免許/資格/賞罰/アルバイト歴/バイト歴/画歴</p>
          </td>
        </tr>
      </table>
      <table className={`border-separate border-spacing-5 bg-rose-200 mt-5 ${styles.customWidth}`}>
        <thead className='font-bold underline underline-offset-8 mr-5'>配慮事項</thead>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>勤務地や配属先の希望<br/>（最大5行）</label></th>
          <td className='p-2.5 border-b'>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-32' rows={5} cols={68}></textarea>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>持病の有無や転居の予定<br/>（最大5行）</label></th>
          <td className='p-2.5 border-b'>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-32' rows={5} cols={68}></textarea>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>連絡のつかない時間帯<br/>（最大2行）</label></th>
          <td className='p-2.5 border-b'>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-20' rows={2} cols={68}></textarea>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>就労ビザについて（海外留学生のみ）<br/>（最大5行）</label></th>
          <td className='p-2.5 border-b'>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-32' rows={5} cols={68}></textarea>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>障がい者手帳をお持ちの方は障がいの内容や会社に希望するサポート内容を教えてください。
（セミナーやイベント参加の際に必要な配慮・サポートを検討させていただくことを目的とするものです。）<br/>（最大10行）</label></th>
          <td className='p-2.5 border-b'>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-60' rows={10} cols={68}></textarea>
          </td>
        </tr>
        <tr>
          <th className='p-4 border-b text-left align-top'><label className='font-semibold'>その他配慮事項がある方はお書きください。<br/>（最大5行）</label></th>
          <td className='p-2.5 border-b'>
            <textarea className='bg-gray-200 border border-slate-500 resize-none p-1.5 mx-1.5 box-border h-32' rows={5} cols={68}></textarea>
          </td>
        </tr>
      </table>
      <div className={`flex flex-row justify-center items-center gap-5 mt-5 ${styles.customWidth}`}>
        <Link href='/settings/educational' className='w-96 rounded-full bg-rose-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-rose-600 transition duration-100 hover:bg-rose-600 focus-visible:ring active:bg-rose-700 md:text-base'>
          戻る
        </Link>
        <button className='w-96 rounded-full bg-emerald-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-emerald-600 transition duration-100 hover:bg-emerald-600 focus-visible:ring active:bg-emerald-700 md:text-base'>
          履歴書をPDFで作成
        </button>
      </div>
    </form>
  )
}

export default EducationalResume