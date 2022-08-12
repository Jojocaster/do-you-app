import { useEffect, useState } from 'react'

export const useFetch = <T>(
  url: string,
  options?: {
    httpOptions?: any
    lazy?: boolean
  }
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(options?.lazy ? false : true)
  const [error, setError] = useState<any | null>(null)

  const fetchData = async () => {
    setLoading(true)

    try {
      const response = await fetch(url, options?.httpOptions)
      const d = await response.json()

      setData(d)
      setError(null)
    } catch (e) {
      console.log(e)

      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchData()
  }

  useEffect(() => {
    if (!url) {
      setError({ message: 'URL not provided.' })
      return
    }

    if (!options?.lazy) {
      fetchData()
    }
  }, [])

  return { loading, error, data, refetch }
}
