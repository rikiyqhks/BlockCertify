import supabase from '@/lib/supabase'

export const getExistData = async (uid: string) => {

  const { data, error: requestError } = await supabase
  .from('requests')
  .select()
  .filter('uid', 'in', `(${uid})`)

  // エラーチェック
  if (requestError) {
    console.log(requestError)
    return
  }

  return data
}