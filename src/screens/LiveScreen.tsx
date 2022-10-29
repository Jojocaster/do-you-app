import { useEffect } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import logo from '../../assets/images/logo.webp'
import { RootTabScreenProps } from '../../types'
import { Player } from '../components/Player/Player'
import { Schedule } from '../components/Schedule/Schedule'
import { View } from '../components/Themed'
import { VolumeControl } from '../components/VolumeControl/VolumeControl'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import useCustomTheme from '../hooks/useCustomTheme'
import { updateWhatsNew } from '../store/slices/appSlice'
import { RootState } from '../store/store'

export default function LiveScreen({ navigation }: RootTabScreenProps<'Live'>) {
  const { whatsNew, config } = useSelector((state: RootState) => state.app)
  const customTheme = useCustomTheme()
  const dispatch = useDispatch()
  const theme = useColorScheme()

  useEffect(() => {
    if (whatsNew && whatsNew < '0.4.4') {
      navigation.navigate('Modal')
      dispatch(updateWhatsNew('0.4.4'))
    }
  }, [])

  const icon = customTheme?.icon
    ? { uri: `${config?.assets}${customTheme?.icon}` }
    : logo

  return (
    <ScrollView
      overScrollMode="never"
      bounces={false}
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
          marginTop: 20,
        }}
      >
        <Player background={'assets/logo.webp'} />
        <VolumeControl />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: Colors[theme].scheduleBackground,
          paddingHorizontal: 40,
          paddingTop: 20,
        }}
      >
        <Schedule />
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
