import { useLayoutEffect } from 'react'
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { BananaIcon } from '../../components/BananaIcon/BananaIcon'
import { RootTabScreenProps } from '../../../types'
import { EventWidget } from '../../components/EventWidget/EventWidget'
import { NotificationWidget } from '../../components/NotificationWidget/NotificationWidget'
import { Player } from '../../components/Player/Player'
import { ScheduleWidget } from '../../components/ScheduleWidget/ScheduleWidget'
import { ShowProgress } from '../../components/ShowProgress/ShowProgress'
import { SupportWidget } from '../../components/SupportWidget/SupportWidget'
import Colors, { ThemeColors } from '../../constants/Colors'
import Space from '../../constants/Space'
import { RootState } from '../../store/store'
import { getShowTitle } from '../../utils/show'
import { Tag } from '../ArchiveDetailsScreen/ArchiveDetailsNewScreen'
import useColorScheme from '../../hooks/useColorScheme'

export default function LiveScreen() {
  const theme = useColorScheme()
  const { currentShow, currentTrack } = useSelector(
    (state: RootState) => state.show
  )
  const isReplay =
    currentShow?.name?.startsWith('(R)') ||
    currentTrack?.name?.startsWith('(R)')

  const showName = getShowTitle({ currentShow, currentTrack })

  useLayoutEffect(() => {
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
  }, [currentShow?.name])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
      style={[
        styles.scrollView,
        { backgroundColor: ThemeColors[theme].background },
      ]}
    >
      <View style={styles.iconWrapper}>
        <BananaIcon />
      </View>
      <View style={styles.wrapper}>
        <Player background={'../../../assets/logo.webp'} />

        {(currentShow || currentTrack) && (
          <>
            <View style={styles.showWrapper}>
              <Tag>{isReplay ? 'playing now' : 'live now'}</Tag>

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
    paddingVertical: 24,
  },
  scrollViewContainer: {
    paddingBottom: Platform.OS === 'ios' ? 24 : 48,
  },
  iconWrapper: { marginLeft: 24 },
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
