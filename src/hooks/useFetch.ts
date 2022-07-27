import { useEffect, useState } from 'react'

export const useFetch = <T>(url: string, options?: any) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)

  useEffect(() => {
    if (!url) {
      setError({ message: 'URL not provided.' })
      return
    }

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(url, options)
        const d = await response.json()
        setData(d)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { loading, error, data }
}
