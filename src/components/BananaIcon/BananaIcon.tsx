import { useRef, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

// @ts-ignore
import banana from '../../../assets/images/cropped-gif-logo.gif'
// @ts-ignore
import logo from '../../../assets/images/logo.webp'

export const BananaIcon = () => {
  const iconPress = useRef(0)
  const [showBanana, setShowBanana] = useState(false)

  const onIconPress = () => {
    if (iconPress.current === 5) {
      setShowBanana(true)
      iconPress.current = iconPress.current + 1
    } else if (iconPress.current === 6) {
      setShowBanana(false)
      iconPress.current = 0
    } else {
      iconPress.current = iconPress.current + 1
    }
  }

  return (
    <TouchableOpacity onPress={onIconPress}>
      <Image
        defaultSource={logo}
        source={showBanana ? banana : logo}
        resizeMode="contain"
        style={styles.icon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 48,
    width: 48,
  },
})
