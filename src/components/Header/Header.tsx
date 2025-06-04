import React, { ReactElement } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ButtonVariant } from '../Button/Button'

export const Header: React.FC<{
  backButton?: boolean
  variant?: ButtonVariant
  title: string
  children?: ReactElement
  buttons?: () => ReactElement
  titleSize?: number
}> = ({ backButton, title, buttons, children, titleSize = 32 }) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: Colors.common.purple,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            disabled={!backButton}
            onPress={() => navigation.goBack()}
          >
            {backButton ? (
              <View style={{ marginLeft: -10 }}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={32}
                  color="white"
                />
              </View>
            ) : null}

            <Text
              style={{
                fontSize: titleSize,
                fontFamily: 'Lato_700Bold',
                color: 'white',
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
        </View>
        {buttons ? (
          <View style={{ gap: 16, flexDirection: 'row' }}>{buttons()}</View>
        ) : null}
      </View>

      {children}
    </View>
  )
}
