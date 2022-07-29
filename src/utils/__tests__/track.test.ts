import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { formatTrackTime } from '../track'

describe('track.ts', () => {
  describe('formatTrackTime', () => {
    const mockTrack: TrackInfo = {
      album: 'The Soul Of Philadelphia',
      artist: 'Hipnotic',
      label: 'Essential Media Group',
      played_datetime: '2022-07-27 09:23:04+0100',
      release_date: '2008-09-09',
      score: 64,
      song_link: 'https://lis.tn/uoxrjY',
      timecode: '00:03',
      title: 'Are You Lonely?',
    }
    describe('when `showStart` is NOT defined', () => {
      it('should return the formatted time at which the track was played', () => {
        const result = formatTrackTime(mockTrack)
        expect(result).toEqual('10:23')
      })
    })
    describe('when `showStart` is defined', () => {
      it('should return the formatted timecode ', () => {
        const result = formatTrackTime(mockTrack, '2022-07-27T08:00:00')
        expect(result).toEqual('00:23:04')
      })
    })
    describe('when the function throws', () => {
      it('should return `N/A`', () => {
        const result = formatTrackTime(
          { ...mockTrack, played_datetime: 'foo' },
          '2022-07-27T08:00:00'
        )
        expect(result).toEqual('N/A')
      })
    })
  })
})