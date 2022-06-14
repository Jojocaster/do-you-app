export const fetchData = async ({
  url,
  method = 'POST',
  data,
}: {
  url: string
  method?: 'GET' | 'POST'
  data?: any
}) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
