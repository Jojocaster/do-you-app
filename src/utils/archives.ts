import { format, parse } from 'date-fns'
import { ArchiveItem } from '../components/Archives/Archives.types'

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
      return format(formattedDate, 'E, MMM dd')
    }
    return format(new Date(track.date), 'E, MMM dd')
  } catch (e) {
    console.log(e)

    return format(new Date(track.date), 'E, MMM dd')
  }
}
