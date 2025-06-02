import { useLayoutEffect, useRef, useState } from 'react'
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//@ts-ignore
import banana from '../../../assets/images/cropped-gif-logo.gif'
//@ts-ignore
import logo from '../../../assets/images/logo.webp'
import { RootTabScreenProps } from '../../../types'
import { EventWidget } from '../../components/EventWidget/EventWidget'
import { NotificationWidget } from '../../components/NotificationWidget/NotificationWidget'
import { Player } from '../../components/Player/Player'
import { ScheduleWidget } from '../../components/ScheduleWidget/ScheduleWidget'
import { ShowProgress } from '../../components/ShowProgress/ShowProgress'
import { SupportWidget } from '../../components/SupportWidget/SupportWidget'
import { Text, View } from '../../components/Themed'
import Colors from '../../constants/Colors'
import Space from '../../constants/Space'
import useColorScheme from '../../hooks/useColorScheme'
import useCustomTheme from '../../hooks/useCustomTheme'
import { RootState } from '../../store/store'
import { getShowTitle } from '../../utils/show'

//TODO: clean up styles
export default function LiveScreen({ navigation }: RootTabScreenProps<'Live'>) {
  const { config } = useSelector((state: RootState) => state.app)
  const { currentShow, currentTrack } = useSelector(
    (state: RootState) => state.show
  )
  const [animEnabled, setEnabled] = useState(false)
  const showName = getShowTitle({ currentShow, currentTrack })
  const customTheme = useCustomTheme()
  const theme = useColorScheme()
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

  useLayoutEffect(() => {
    //@ts-ignore - seems to be needed for Android
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
    if (animEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
  }, [currentShow?.name])

  const icon = customTheme?.icon
    ? { uri: `${config?.assets}${customTheme?.icon}` }
    : logo

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // ref={ref}
      // overScrollMode="never"
      // bounces={false}
      contentContainerStyle={{ paddingBottom: 48 }}
      style={{ backgroundColor: Colors[theme].background, paddingVertical: 25 }}
    >
      <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={onIconPress}>
          <Image
            defaultSource={logo}
            source={showBanana ? banana : icon}
            resizeMode="contain"
            style={{ height: 60, width: 60 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          marginTop: 24,
        }}
      >
        <Player background={'../../../assets/logo.webp'} />

        {(currentShow || currentTrack) && (
          <>
            <View
              style={{
                paddingHorizontal: Space.viewPadding,
                marginTop: 25,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  alignSelf: 'center',
                  borderRadius: 20,
                  paddingVertical: 4,
                  paddingHorizontal: 16,
                  backgroundColor: Colors.common.yellow,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: 'black',
                    fontFamily: 'space-mono',
                  }}
                >
                  live now
                </Text>
              </View>
              {/* <Button2 variant="xs">NOW PLAYING</Button2> */}
              <Text
                style={{
                  marginTop: 8,
                  textAlign: 'center',
                  // color: Colors[theme].primary,
                  color: Colors.common.purple,
                  fontSize: 24,
                  fontFamily: 'Lato_700Bold',
                }}
              >
                {/* TODO: handle overtime */}
                {showName}
              </Text>
            </View>
            <ShowProgress />
          </>
        )}
      </View>

      <View style={{ gap: 16, marginTop: 40 }}>
        <ScheduleWidget />

        <NotificationWidget />

        <EventWidget />

        <SupportWidget />
      </View>
    </ScrollView>
  )
}
