import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text, View } from '../Themed'

interface ButtonProps {
  children: string
  onPress?: () => void
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  variant?: 'sm' | 'lg'
}

const Content: React.FC<
  Pick<ButtonProps, 'children' | 'icon' | 'variant'> & { visible?: boolean }
> = ({ children, icon, visible = true, variant }) => {
  return (
    <View style={[styles.content, { opacity: visible ? 1 : 0 }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={12}
          style={{ marginRight: 3 }}
        />
      )}
      <Text
        style={[styles.text, variant === 'sm' ? styles.textSm : styles.textLg]}
      >
        {children}
      </Text>
    </View>
  )
}

export const Button2: React.FC<ButtonProps> = (props) => {
  const scale = useRef(new Animated.Value(1))
  const theme = useColorScheme()
  const { onPress, variant } = props

  const onPressIn = () => {
    Animated.spring(scale.current, {
      toValue: 0.8,
      friction: 4,
      delay: 0,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(scale.current, {
      toValue: 1,
      friction: 2,
      delay: 0,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable
      delayLongPress={0}
      onPress={onPress}
      onPressIn={onPress ? onPressIn : undefined}
      onPressOut={onPress ? onPressOut : undefined}
    >
      <Animated.View style={[styles.container]}>
        <Animated.View
          style={[
            styles.button,
            variant === 'sm' ? styles.buttonSm : styles.buttonLg,
            { transform: [{ scale: scale.current }] },
          ]}
        >
          <Content {...props} visible={false} />
          <View
            style={[
              styles.button,
              variant === 'sm' ? styles.buttonSm : styles.buttonLg,
              styles.inner,
              { backgroundColor: Colors[theme].button },
            ]}
          >
            <Content {...props} />
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    paddingLeft: 4,
    paddingTop: 4,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 4,
  },
  buttonSm: {
    paddingHorizontal: 8,
  },
  buttonLg: {
    paddingHorizontal: 16,
  },
  inner: {
    position: 'absolute',
    top: -4,
    left: -5,
  },
  content: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  textSm: {
    fontSize: 10,
  },
  textLg: {
    fontSize: 12,
  },
})
