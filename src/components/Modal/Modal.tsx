import React, { ReactChildren } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { View } from '../Themed'

export const Modal: React.FC<{
  children?: ReactChildren
  closeOnBlur?: boolean
  onClose: () => void
}> = ({ children, closeOnBlur, onClose }) => {
  const theme = useColorScheme()

  const onBlur = () => {
    if (closeOnBlur) {
      onClose()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onBlur}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={[
            styles.container,
            {
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowRadius: 10,
              shadowOpacity: 0.2,
              borderTopWidth: 3,
              borderBottomWidth: 3,
              borderTopColor: Colors[theme].primary,
              borderBottomColor: Colors[theme].secondary,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 1,
    // flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'transparent',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: 20,
    fontSize: 32,
  },
  text: { lineHeight: 20 },
})
