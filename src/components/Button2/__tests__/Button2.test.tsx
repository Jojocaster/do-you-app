import { Button2 } from '../Button2'
import renderer, { act } from 'react-test-renderer'
import { fireEvent } from '@testing-library/react-native'
import { Animated, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as RN from 'react-native'

const mockOnPress = jest.fn()

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

describe('Button', () => {
  it('should render', () => {
    const wrapper = renderer.create(<Button2>foo</Button2>)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  describe('when `onPress` is defined', () => {
    it('should be called on press', () => {
      const wrapper = renderer.create(
        <Button2 onPress={mockOnPress}>foo</Button2>
      )
      const button = wrapper.root.findByType(RN.TouchableWithoutFeedback)
      fireEvent.press(button)
      expect(mockOnPress).toHaveBeenCalled()
    })

    // it('should call animated on pressIn & pressOut', async () => {
    //   const wrapper = renderer.create(
    //     <Button2 onPress={mockOnPress}>foo</Button2>
    //   )
    //   const button = wrapper.root.findByType(Pressable)
    //   act(() => {
    //     fireEvent(button, 'pressIn')
    //     fireEvent(button, 'pressOut')
    //   })
    //   act(() => {
    //     expect(button.props.onPressIn).toHaveBeenCalledTimes(1)
    //   })
    // })
  })

  describe('when `icon` is defined', () => {
    it('should display the right icon', () => {
      const wrapper = renderer.create(
        <Button2 icon="ab-testing" onPress={mockOnPress}>
          foo
        </Button2>
      )
      expect(wrapper.root.findAllByType(MaterialCommunityIcons)).toBeDefined()
    })
  })
})
