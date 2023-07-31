import supabase from '@/lib/supabase'

const API_KEY = '128|3DfJjj7S44IAl95kicOLC5axPZIL7MgaqpZoqqWi'

// 学校コードAPIを利用する
export const getSchoolDataAPI = async () => {
  const res = await fetch('https://api.edu-data.jp/api/v1/school', {
    method: 'GET',
    headers: {
      'Authorization': API_KEY,
      'Content-Type': 'application/json'
    },
  })

  return res.json()
}

// 教育機関ログイン
export const getSchoolData = async (id: string, password: string) => {
  
  const { data, error: requestError } = await supabase
  .from('schools')
  .select()
  .match({ 'id': id, 'code': password })

  // エラーチェック
  if (requestError) return requestError.code

  return data
}

// 教育機関プロフィールの取得
export const showSchoolData = async (id: string) => {
  const { data, error: requestError } = await supabase
  .from('schools')
  .select()
  .filter('id', 'in', `(${id})`)

  // エラーチェック
  if (requestError) return requestError.code

  return data
}