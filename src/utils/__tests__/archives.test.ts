import { ArchiveItem } from '../../components/Archives/Archives.types'
import { formatArchiveDate, formatArchiveTitle } from '../archives'

describe('archives.ts', () => {
  describe('formatArchiveTitle', () => {
    it('should return `N/A` if title is undefined', () => {
      const result = formatArchiveTitle(undefined as any)
      expect(result).toEqual('N/A')
      const result2 = formatArchiveTitle('')
      expect(result2).toEqual('N/A')
    })

    it('should return the original title if the function throws', () => {
      const result = formatArchiveTitle('foo')
      expect(result).toEqual('foo')
    })

    it('should return the first part of the title without the date', () => {
      const result = formatArchiveTitle('foo - bar')
      expect(result).toEqual('foo')
    })
  })

  describe('formatArchiveDate', () => {
    const mockTrack: Partial<ArchiveItem> = {
      name: 'foo - 28/07/2022',
      date: '2022-07-28',
    }
    it('should format the date based on the title if defined', () => {
      const result = formatArchiveDate(mockTrack as any)
      expect(result).toEqual('Thu, Jul 28')
    })
  })
})
