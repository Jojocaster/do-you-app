import { fireEvent, render } from '@testing-library/react-native'
import { BananaIcon } from '../BananaIcon'

jest.mock('../../../../assets/images/cropped-gif-logo.gif', () => 'banana-gif')
jest.mock('../../../../assets/images/logo.webp', () => 'logo-webp')

describe('BananaIcon', () => {
  it('should initially show the logo', () => {
    const { getByRole } = render(<BananaIcon />)
    const image = getByRole('image')
    expect(image.props.source).toBe('logo-webp')
  })

  it('should show banana after 5 presses', () => {
    const { getByRole } = render(<BananaIcon />)
    const touchable = getByRole('button')
    const image = getByRole('image')

    // First 5 presses - should still show logo
    for (let i = 0; i < 5; i++) {
      fireEvent.press(touchable)
      expect(image.props.source).toBe('logo-webp')
    }

    // 6th press - should show banana
    fireEvent.press(touchable)
    expect(image.props.source).toBe('banana-gif')
  })

  it('should revert to logo after 6th press', () => {
    const { getByRole } = render(<BananaIcon />)
    const touchable = getByRole('button')
    const image = getByRole('image')

    // Press 6 times to show banana
    for (let i = 0; i < 6; i++) {
      fireEvent.press(touchable)
    }
    expect(image.props.source).toBe('banana-gif')

    // 7th press - should revert to logo
    fireEvent.press(touchable)
    expect(image.props.source).toBe('logo-webp')
  })

  it('should reset counter after completing the sequence', () => {
    const { getByRole } = render(<BananaIcon />)
    const touchable = getByRole('button')
    const image = getByRole('image')

    // Complete one full sequence
    for (let i = 0; i < 7; i++) {
      fireEvent.press(touchable)
    }
    expect(image.props.source).toBe('logo-webp')

    // Start new sequence - should take 5 presses again to show banana
    for (let i = 0; i < 5; i++) {
      fireEvent.press(touchable)
      expect(image.props.source).toBe('logo-webp')
    }

    fireEvent.press(touchable)
    expect(image.props.source).toBe('banana-gif')
  })
})
