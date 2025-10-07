import { useEffect, useState } from 'react'
import { ArchiveItem } from '../components/ArchivesList/ArchivesList.types'
import { ARCHIVES_URL } from '../constants/Endpoints'
import { Filter } from '../store/slices/filtersSlice'

interface UseArchivesResult {
  loading: boolean
  error: boolean
  data: ArchiveItem[]
}

export const useArchives = (
  page: number,
  filter?: Filter
): UseArchivesResult => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<ArchiveItem[]>([])

  useEffect(() => {
    const fetchArchives = async () => {
      setLoading(true)
      setError(false)

      try {
        let response: Response
        let result: ArchiveItem[]

        if (!filter) {
          response = await fetch(`${ARCHIVES_URL}/shows/page/${page}/`)
          result = await response.json()
        } else {
          response = await fetch(`${ARCHIVES_URL}/search/`, {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hosts: [filter.id], page }),
          })
          result = await response.json()
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        setData(result)
      } catch (err) {
        console.error('Error fetching archives:', err)
        setError(true)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchArchives()
  }, [page, filter])

  return {
    loading,
    error,
    data,
  }
}
