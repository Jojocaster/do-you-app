import { Image, ScrollView, Text, View } from 'react-native'
import { Header } from '../../components/Header/Header'
import { useDispatch } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ShowStatus } from '../../store/slices/showSlice'
import { isToday } from 'date-fns'
import { fetchTracksInfo, TrackInfo } from '../../store/slices/tracksInfoSlice'

//@ts-ignore
import gif from '../../../assets/images/ezgif-5f13f00e4e5b50.gif'
import { TrackIDs } from '../../components/TrackIDs/TrackIDs'

const TrackList = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const timeout = useRef<NodeJS.Timeout>(null)
  const { status } = useSelector((state: RootState) => state.show)
  const { lastUpdated, loading, tracks } = useSelector(
    (state: RootState) => state.tracksInfo
  )

  const showTrackDetails = (track: TrackInfo) => {
    navigate('TrackDetails', { track })
  }

  const loadTracks = () => {
    if (status === ShowStatus.ON || !isToday(lastUpdated)) {
      dispatch(fetchTracksInfo())
    }
  }

  useEffect(() => {
    // fetch tracks when tab is focused
    if (isFocused) {
      loadTracks()

      timeout.current = setInterval(() => {
        loadTracks()
      }, 1000 * 60)
    } else {
      if (timeout.current) {
        clearInterval(timeout.current)
      }
    }
  }, [isFocused])

  if ((loading && !tracks.length) || (loading && !isToday(lastUpdated))) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            height: 200,
          }}
          source={gif}
        />
        <Text style={{ marginTop: 16 }}>Loading bangers ...</Text>
      </View>
    )
  }

  if ((!loading && !tracks.length) || (!loading && !isToday(lastUpdated))) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            height: 200,
          }}
          source={gif}
        />
        <Text style={{ marginTop: 16 }}>No bangers here - yet</Text>
      </View>
    )
  }

  return <TrackIDs tracks={tracks} />
}

export default function TrackIDScreen() {
  return (
    <>
      <Header title="Track IDs">
        <Text style={{ color: 'white', marginTop: 16, marginBottom: 16 }}>
          The next best thing after Shazam. This list is generated
          automatically, so there might be a few tracks missing - or completely
          wrong.
        </Text>
      </Header>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TrackList />
      </ScrollView>
    </>
  )
}
