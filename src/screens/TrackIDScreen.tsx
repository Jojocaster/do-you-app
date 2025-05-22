import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Header } from '../components/Header/Header'
import { useDispatch } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { ShowStatus } from '../store/slices/showSlice'
import { isToday } from 'date-fns'
import { fetchTracksInfo, TrackInfo } from '../store/slices/tracksInfoSlice'
import { Loader } from '../components/Loader/Loader'
import moment from 'moment'
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
    return <Loader testID="loader">Loading bangers</Loader>
  }

  if ((!loading && !tracks.length) || (!loading && !isToday(lastUpdated))) {
    return <Loader testID="noTracks">No bangers here - yet</Loader>
  }

  return (
    <View style={{ padding: 16, gap: 16 }}>
      {tracks.map((track, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => showTrackDetails(track)}
          style={{ flexDirection: 'row' }}
        >
          <View>
            <Text>{moment(track.played_datetime).format('HH:mm')}</Text>
          </View>
          <View
            style={{
              marginLeft: 32,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: Colors.common.purple,
                  fontFamily: 'Lato_900Black',
                }}
              >
                {track.artist ? track.artist.toUpperCase() : 'N/A'}
              </Text>
              <MaterialCommunityIcons
                size={16}
                name="chevron-right"
                color={Colors.common.purple}
              />
            </View>
            <Text style={{ marginTop: 4, flexWrap: 'wrap' }}>
              {track.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
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

      <ScrollView>
        <TrackList />
      </ScrollView>
    </>
  )
}
