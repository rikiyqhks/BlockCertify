const API_KEY = '128|3DfJjj7S44IAl95kicOLC5axPZIL7MgaqpZoqqWi'

export const getSchoolData = async () => {
  const res = await fetch('https://api.edu-data.jp/api/v1/school', {
    method: 'GET',
    headers: {
      'Authorization': API_KEY,
      'Content-Type': 'application/json'
    },
  })

  return res.json()
}