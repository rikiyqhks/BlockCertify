import supabase from '@/lib/supabase'

export const getRequestData = async (id: string) => {

  const { data, error: requestError } = await supabase
  .from('requests')
  .select()
  .filter('schoolid', 'in', `(${id})`)

  // エラーチェック
  if (requestError) {
    console.log(requestError)
    return
  }

  return data
}