import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
} from 'react-native'
import { useSelector } from 'react-redux'
//@ts-ignore
import logo from '../../assets/images/logo.webp'
import { RootTabScreenProps } from '../../types'
import { Button2 } from '../components/Button2/Button2'
import { LiveTabs } from '../components/LiveTabs/LiveTabs'
import { Player } from '../components/Player/Player'
import { ShowProgress } from '../components/ShowProgress/ShowProgress'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import Space from '../constants/Space'
import useColorScheme from '../hooks/useColorScheme'
import useCustomTheme from '../hooks/useCustomTheme'
import { RootState } from '../store/store'
import { getShowTitle } from '../utils/show'
import { MonoText } from '../components/StyledText'
import { Schedule } from '../components/Schedule/Schedule'
import { MaterialIcons } from '@expo/vector-icons'
import { Schedule2 } from '../components/Schedule/Schedule2'

const NewSchedule = () => {
  const theme = useColorScheme()

  return (
    <View style={{ paddingHorizontal: Space.viewPadding, marginTop: 48 }}>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: Colors[theme].secondary,
          padding: 16,
        }}
      >
        {/* <MonoText style={{ fontSize: 24, fontWeight: 'bold' }}>TODAY</MonoText> */}
        <Schedule2 />
      </View>
    </View>
  )
}

//TODO: clean up styles
export default function LiveScreen({ navigation }: RootTabScreenProps<'Live'>) {
  const { whatsNew, config } = useSelector((state: RootState) => state.app)
  const { currentShow, currentTrack } = useSelector(
    (state: RootState) => state.show
  )
  const [animEnabled, setEnabled] = useState(false)
  const ref = useRef<ScrollView>(null)
  const showName = getShowTitle({ currentShow, currentTrack })
  const customTheme = useCustomTheme()
  // const dispatch = useDispatch()
  const theme = useColorScheme()

  // useEffect(() => {
  //   if (whatsNew && whatsNew < '0.4.4') {
  //     navigation.navigate('Modal')
  //     dispatch(updateWhatsNew('0.4.4'))
  //   }
  // }, [])
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
        setEnabled(true)
      }
    }
  }, [])

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
      ref={ref}
      // overScrollMode="never"
      // bounces={false}
      contentContainerStyle={{ paddingBottom: 48 }}
      style={{ backgroundColor: Colors[theme].background, paddingVertical: 25 }}
    >
      <View style={{ marginLeft: 20 }}>
        <Image
          defaultSource={logo}
          source={icon}
          resizeMode="contain"
          style={{ height: 60, width: 60 }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <Player background={'assets/logo.webp'} />

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
              <Button2 variant="xs">NOW PLAYING</Button2>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  color: Colors[theme].primary,
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
        {/* <VolumeControl /> */}
      </View>

      {/* <NewSchedule /> */}
      <View style={{ marginTop: 40, height: '100%' }}>
        <LiveTabs onChange={() => ref.current?.scrollToEnd()} />
      </View>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    marginHorizontal: '10%',
    height: 1,
    width: '80%',
  },
})
