import { useLayoutEffect, useRef, useState } from 'react'
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
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
import { RootState } from '../../store/store'
import { getShowTitle } from '../../utils/show'
import { Tag } from '../ArchiveDetailsScreen/ArchiveDetailsNewScreen'

export default function LiveScreen({ navigation }: RootTabScreenProps<'Live'>) {
  const { currentShow, currentTrack } = useSelector(
    (state: RootState) => state.show
  )
  const showName = getShowTitle({ currentShow, currentTrack })

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
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
  }, [currentShow?.name])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.scrollView}
    >
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={onIconPress}>
          <Image
            defaultSource={logo}
            source={showBanana ? banana : logo}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <Player background={'../../../assets/logo.webp'} />

        {(currentShow || currentTrack) && (
          <>
            <View style={styles.showWrapper}>
              <Tag>live now</Tag>

              <Text style={styles.showName}>{showName}</Text>
            </View>

            <ShowProgress />
          </>
        )}
      </View>

      <View style={styles.widgets}>
        <ScheduleWidget />

        <NotificationWidget />

        <EventWidget />

        <SupportWidget />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    paddingVertical: 24,
  },
  scrollViewContainer: {
    paddingBottom: 48,
  },
  iconWrapper: { marginLeft: 24 },
  icon: { height: 48, width: 48 },
  wrapper: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    marginTop: 24,
  },
  showWrapper: {
    paddingHorizontal: Space.viewPadding,
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
  },
  showName: {
    marginTop: 8,
    textAlign: 'center',
    color: Colors.common.purple,
    fontSize: 24,
    fontFamily: 'Lato_700Bold',
  },
  widgets: { gap: 16, marginTop: 36 },
})
