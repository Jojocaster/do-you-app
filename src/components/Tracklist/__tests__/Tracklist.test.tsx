import { fireEvent, waitFor } from '@testing-library/react-native'
import { FlatList } from 'react-native'
import renderer, { act } from 'react-test-renderer'
import { StatusType } from '../../Status/Status.types'
import { Track } from '../../Track/Track'
import { Tracklist } from '../Tracklist'

const mockStore = {
  settings: {
    darkTheme: false,
  },
  tracksInfo: { loading: true, tracks: [] },
  show: {
    status: StatusType.OFF,
  },
}

// mock for expo icons
jest.mock(
  '@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js',
  () => {
    return () => ''
  }
)
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn((cb) => cb(mockStore)),
}))

jest.mock('../../../hooks/useColorScheme', () => jest.fn(() => 'dark'))

const mockTracks = [
  {
    artist: 'Hipnotic',
    played_date: '2022-07-27',
    timecode: '00:03',
    song_link: 'https://lis.tn/uoxrjY',
    label: 'Essential Media Group',
    score: 64,
    received_datetime: '2022-07-27 09:23:13+0100',
    album: 'The Soul Of Philadelphia',
    release_date: '2008-09-09',
    played_datetime: '2022-07-27 09:23:04+0100',
    out_of: 1,
    title: 'Are You Lonely?',
  },
  {
    artist: 'Larry Wu',
    played_date: '2022-07-27',
    timecode: '00:15',
    song_link: 'https://lis.tn/Zgqvv',
    label: 'SME - Sony Music Entertainment',
    score: 100,
    received_datetime: '2022-07-27 09:33:51+0100',
    album: 'Grand 12 inches 13',
    release_date: '2015-05-29',
    played_datetime: '2022-07-27 09:33:41+0100',
    out_of: 1,
    title: 'Let Me Show You (Long Vocal Version)',
  },
  {
    artist: 'John Kongos',
    played_date: '2022-07-27',
    timecode: '00:08',
    song_link: 'https://lis.tn/XFHWU',
    label: 'MERLIN - Fabric Records',
    score: 100,
    received_datetime: '2022-07-27 09:45:35+0100',
    album: 'fabric presents Danilo Plessow (MCDE)',
    release_date: '2021-05-28',
    played_datetime: '2022-07-27 09:45:25+0100',
    out_of: 2,
    title: "I'm Dreaming (Any Moment I May Wake Up Screaming)",
  },
  {
    artist: 'Dreams Unlimited',
    played_date: '2022-07-27',
    timecode: '05:39',
    song_link: 'https://lis.tn/DEEPINYOULTJCLUBMIX',
    label: 'Broma16',
    score: 100,
    received_datetime: '2022-07-27 09:51:52+0100',
    album: 'The Best of DREAMS UNLIMITED',
    release_date: '2019-04-01',
    played_datetime: '2022-07-27 09:51:43+0100',
    out_of: 1,
    title: 'DEEP IN YOU (LTJ CLUB MIX)',
  },
]

describe('Tracklist', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Tracklist tracks={mockTracks} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('should render on `Track` component per item', () => {
    const wrapper = renderer.create(<Tracklist tracks={mockTracks} />)
    expect(wrapper.root.findAllByType(Track).length).toEqual(mockTracks.length)
  })

  describe('when `virtual` is set to false', () => {
    it('should NOT use a Flatlist', () => {
      const wrapper = renderer.create(
        <Tracklist virtual={false} tracks={mockTracks} />
      )
      const flatlist = wrapper.root.findAllByType(FlatList)
      expect(flatlist.length).toBe(0)
    })
  })

  describe('when `virtual` is set to true', () => {
    it('should use a Flatlist', () => {
      const wrapper = renderer.create(
        <Tracklist virtual={true} tracks={mockTracks} />
      )
      const flatlist = wrapper.root.findAllByType(FlatList)
      expect(flatlist.length).toBe(1)
    })
  })

  // describe('when a track is pressed', () => {
  //   it('should set its `active` prop to true', async () => {
  //     const wrapper = renderer.create(<Tracklist tracks={mockTracks} />)
  //     const item = wrapper.root.findAllByType(Track)[0]
  //     expect(item.props.active).toBeFalsy()

  //     act(() => {
  //       item.props.onToggle(mockTracks[0])
  //     })
  //     await waitFor(() => expect(item.props.active).toBeTruthy())
  //   })
  // })
})
