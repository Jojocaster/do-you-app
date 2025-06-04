import { format, parse } from 'date-fns'
import { ArchiveItem } from '../components/ArchivesList/ArchivesList.types'
import { ARCHIVES_URL } from '../constants/Endpoints'

export const formatArchiveTitle = (title: string): string => {
  if (!title) {
    return 'N/A'
  }

  try {
    const titleItems = title.split(' - ')
    return titleItems[0]
  } catch (e) {
    return title
  }
}

export const formatArchiveDate = (track: ArchiveItem): string => {
  try {
    const titleItems = track.name?.split(' - ')
    if (titleItems.length > 1) {
      const formattedDate = parse(titleItems[1], 'dd/M/yy', new Date())
      return format(formattedDate, 'E, dd MMM yyyy')
    }
    return format(new Date(track.date), 'E, dd MMM yyyy')
  } catch (e) {
    return format(new Date(track.date), 'E, dd MMM yyyy')
  }
}

export const getRandomArchive = async () => {
  try {
    const response = await fetch(`${ARCHIVES_URL}/shows/random/`)
    const data = await response.json()

    return data
  } catch {
    return null
  }
}
