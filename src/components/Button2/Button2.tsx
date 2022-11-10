import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text, View } from '../Themed'

interface ButtonProps {
  children?: string
  elevated?: boolean
  iconSize?: number
  onPress?: () => void
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  variant?: 'xs' | 'sm' | 'md' | 'lg'
}

const Content: React.FC<
  Pick<ButtonProps, 'children' | 'icon' | 'variant' | 'iconSize'> & {
    visible?: boolean
  }
> = ({ children, icon, visible = true, variant = 'md', iconSize }) => {
  const theme = useColorScheme()
  const activeVariant = variants[variant]

  return (
    <View style={[styles.content, { opacity: visible ? 1 : 0 }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={iconSize || activeVariant.text.fontSize}
          style={{
            marginRight: children ? 3 : 0,
            color: Colors[theme].button.text,
          }}
        />
      )}
      {children && (
        <Text
          style={[
            styles.text,
            activeVariant.text,
            { color: Colors[theme].button.text },
          ]}
        >
          {children}
        </Text>
      )}
    </View>
  )
}

export const Button2: React.FC<ButtonProps> = (props) => {
  const scale = useRef(new Animated.Value(1))
  const theme = useColorScheme()
  const { elevated, onPress, variant = 'md' } = props

  const activeVariant = variants[variant]

  const onPressIn = () => {
    Animated.spring(scale.current, {
      toValue: 0.8,
      friction: 4,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(scale.current, {
      toValue: 1,
      friction: 2,
      useNativeDriver: true,
    }).start()
  }

  return (
    <TouchableWithoutFeedback
      delayLongPress={0}
      onPress={onPress}
      onPressIn={onPress ? onPressIn : undefined}
      onPressOut={onPress ? onPressOut : undefined}
    >
      <Animated.View
        style={[styles.container, elevated ? styles.elevated : null]}
      >
        {/* TODO: clean up */}
        <Animated.View
          style={[
            styles.button,
            activeVariant.button,
            {
              transform: [{ scale: scale.current }],
              backgroundColor: Colors[theme].button.back,
            },
          ]}
        >
          <Content {...props} visible={false} />
          <View
            style={[
              styles.button,
              activeVariant.button,
              styles.inner,
              { backgroundColor: Colors[theme].button.background },
            ]}
          >
            <Content {...props} />
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const xsStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 8,
  },
})

const smStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 10,
  },
})

const mdStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 12,
  },
})

const lgStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  text: {
    fontSize: 13,
  },
})

const variants = {
  xs: xsStyles,
  sm: smStyles,
  md: mdStyles,
  lg: lgStyles,
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
  elevated: {
    elevation: 2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowOpacity: 0.1,
  },
  // buttonSm: {
  //   paddingHorizontal: 8,
  // },
  // buttonLg: {
  //   paddingHorizontal: 16,
  // },
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
  // textSm: {
  //   fontSize: 10,
  // },
  // textLg: {
  //   fontSize: 12,
  // },
})
