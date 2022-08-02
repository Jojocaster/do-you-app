import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { fireEvent } from '@testing-library/react-native'
import { Clipboard, TouchableOpacity } from 'react-native'
import renderer, { act } from 'react-test-renderer'
import { TrackInfo } from '../../../store/slices/tracksInfoSlice'
import { Button2 } from '../../Button2/Button2'
import { Track } from '../Track'

//@ts-ignore
const spy = jest
  .spyOn(Clipboard, 'setString')
  .mockImplementation(() => jest.fn())

const mockStore = {
  settings: {
    darkTheme: false,
  },
  tracksInfo: { loading: true, tracks: [] },
}

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn((cb) => cb(mockStore)),
}))

// mock for expo icons
jest.mock(
  '@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js',
  () => {
    return () => ''
  }
)

const mockTrack: TrackInfo = {
  album: 'Ema By The Sea',
  artist: 'Pink Shabab',
  label: 'MERLIN - Karaoke Kalk',
  played_datetime: '2022-07-29 10:46:32+0100',
  release_date: '2019-11-29',
  score: 100,
  song_link: 'https://lis.tn/WITYQZ',
  timecode: '00:22',
  title: 'Let Me Explain',
}

const mockToggle = jest.fn()

describe('Track', () => {
  it('should render', () => {
    const wrapper = renderer.create(
      <Track track={mockTrack} active={false} onToggle={mockToggle} />
    )
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  describe('when active', () => {
    it('should show the track details', () => {
      const wrapper = renderer.create(
        <Track track={mockTrack} active={false} onToggle={mockToggle} />
      )
      const details = wrapper.root.findAllByProps({ testID: 'trackDetails' })
      expect(details.length).toEqual(0)

      act(() => {
        wrapper.update(
          <Track track={mockTrack} active={true} onToggle={mockToggle} />
        )
      })

      expect(wrapper.root.findByProps({ testID: 'trackDetails' })).toBeDefined()
    })

    it('should update the icon', () => {
      const wrapper = renderer.create(
        <Track track={mockTrack} active={false} onToggle={mockToggle} />
      )
      const icon = wrapper.root.findByType(MaterialIcons)
      expect(icon.props.name).toEqual('expand-more')

      act(() => {
        wrapper.update(
          <Track track={mockTrack} active={true} onToggle={mockToggle} />
        )
      })
      expect(icon.props.name).toEqual('expand-less')
    })
  })

  describe('when pressed', () => {
    it('should call `onPress`', () => {
      const wrapper = renderer.create(
        <Track track={mockTrack} active={false} onToggle={mockToggle} />
      )

      const btn = wrapper.root.findByType(TouchableOpacity)
      fireEvent.press(btn)
      expect(mockToggle).toHaveBeenCalledWith(mockTrack.played_datetime)
    })
  })

  describe('when copy is pressed', () => {
    it('should store the title in the clipboard', () => {
      const wrapper = renderer.create(
        <Track track={mockTrack} active={true} onToggle={mockToggle} />
      )
      const btn = wrapper.root.findByType(Button2)
      fireEvent.press(btn)

      expect(spy).toHaveBeenCalledWith(
        `${mockTrack.artist} - ${mockTrack.title}`
      )
    })
  })
})
