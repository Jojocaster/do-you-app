import { ARCHIVES_URL } from '../../constants/Endpoints'
import { Filter } from '../Filters/Filters'
import { ArchiveItem } from './ArchivesList.types'

export const getArchives = async ({
  page,
  filter,
}: {
  page: number
  filter?: Filter
}): Promise<ArchiveItem[]> => {
  if (!filter) {
    const response = await fetch(`${ARCHIVES_URL}/shows/page/${page}/`)
    const data = await response.json()

    return data
  }

  const response = await fetch(`${ARCHIVES_URL}/search/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hosts: [filter.id], page }),
  })
  const data = await response.json()
  return data
}
