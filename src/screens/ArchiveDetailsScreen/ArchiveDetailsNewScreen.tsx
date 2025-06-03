import {
  View,
  Text,
  Animated,
  Platform,
  TouchableOpacity,
  Share,
} from 'react-native'
import React, { ReactElement, useRef } from 'react'
import { ArchiveDetailsHeader } from '../../components/ArchiveDetails/ArchiveDetailsHeader/ArchiveDetailsHeader'
import { Header } from '../../components/Header/Header'
import { format, isAfter, isBefore, parseJSON } from 'date-fns'
import Colors from '../../constants/Colors'
import { formatArchiveTitle } from '../../utils/archives'
import { MIXCLOUD_URL, TRACKLIST_URL } from '../../constants/Endpoints'
import { useFetch } from '../../hooks/useFetch'
import { TrackInfo } from '../../store/slices/tracksInfoSlice'
import { ArchiveItem } from '../../components/ArchivesList/ArchivesList.types'
import { TrackIDs } from '../../components/TrackIDs/TrackIDs'
import { BananaLoader } from '../../components/BananaLoader/BananaLoader'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import {
  addArchive,
  deleteArchive,
} from '../../store/slices/savedArchivesSlice'

const Tag: React.FC<{ children: string }> = ({ children }) => {
  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: Colors.common.yellow,
        backgroundColor: Colors.common.yellow,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontFamily: 'space-mono', color: 'black', fontSize: 10 }}>
        {children}
      </Text>
    </View>
  )
}

const filterArchiveTracklist = (data: TrackInfo[] = [], track: ArchiveItem) => {
  if (!data.length) {
    return []
  }

  try {
    const showStart = parseJSON(track.start_time)
    const showEnd = parseJSON(track.end_time)

    const filteredData = data.filter((t) => {
      const date = t.played_datetime.split(' ')
      const time = date[1].split('+')
      const timecode = parseJSON(`${date[0]}T${time[0]}`)

      return isAfter(timecode, showStart) && isBefore(timecode, showEnd)
    })

    return filteredData
  } catch (e) {
    console.log(e)
    return data
  }
}

export const ArchiveDetailsNewScreen = ({ route }) => {
  const archive: ArchiveItem = route.params.track
  const dispatch = useDispatch()
  const { archives: savedArchives } = useSelector(
    (state: RootState) => state.savedArchives
  )

  const formattedDate = format(new Date(archive?.date), 'dd/MM/yyyy')
  const savedArchive = savedArchives?.find((a) => a.archive.id === archive.id)
  const bookmarkIcon = savedArchive ? 'bookmark' : 'bookmark-outline'
  const { error, data, loading } = useFetch<{ tracks: TrackInfo[] }>(
    `${TRACKLIST_URL}/archive/${formattedDate}`
  )
  const archiveTracks = filterArchiveTracklist(data?.tracks, archive)

  const scrollY = useRef(new Animated.Value(0)).current

  const onSave = () => {
    if (savedArchive) {
      dispatch(deleteArchive(archive))
    } else {
      dispatch(addArchive(archive))
    }
  }
  const onShare = () => {
    const url = `${MIXCLOUD_URL}/${archive.slug}`
    Share.share({ message: url })
  }

  return (
    <>
      <Header
        title="All"
        titleSize={24}
        backButton
        buttons={() => (
          <>
            <TouchableOpacity onPress={onShare}>
              <MaterialCommunityIcons
                name="share-variant"
                color="white"
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave}>
              <MaterialCommunityIcons
                name={bookmarkIcon}
                color="white"
                size={24}
              />
            </TouchableOpacity>
          </>
        )}
      />

      <View style={{ flex: 1, position: 'relative' }}>
        <Animated.ScrollView
          overScrollMode="never"
          bounces={Platform.select({ ios: true, android: false })}
          scrollEventThrottle={8}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true,
            }
          )}
          contentContainerStyle={{
            flexGrow: 1,
            // paddingBottom: Platform.OS === 'ios' ? 60 : 0,
          }}
          // style={styles.scrollView}
        >
          <ArchiveDetailsHeader scrollY={scrollY} track={archive} />

          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 24,
              flex: 1,
            }}
          >
            <Text
              style={{
                textTransform: 'uppercase',
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              {format(new Date(archive.date), 'E dd MMMM yyyy')}
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  color: Colors.common.purple,
                  fontWeight: 'bold',
                }}
              >
                {formatArchiveTitle(archive.name)}
              </Text>
            </View>
            <View
              style={{
                marginTop: 16,
                gap: 8,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {archive.genres?.map((genre, i) => (
                <View key={i} style={{}}>
                  <Tag>{genre.name}</Tag>
                </View>
              ))}
            </View>
          </View>

          <Header titleSize={24} title="Tracklist">
            <Text style={{ color: 'white', marginTop: 16, marginBottom: 16 }}>
              The next best thing after Shazam. This list is generated
              automatically, so there might be a few tracks missing - or
              completely wrong.
            </Text>
          </Header>
          {archiveTracks?.length ? (
            <TrackIDs
              tracks={archiveTracks || []}
              showStart={archive.start_time}
            />
          ) : null}

          {loading ? (
            <View style={{ flex: 1 }}>
              <BananaLoader />
            </View>
          ) : null}

          {!loading && !archiveTracks.length ? (
            <View style={{ padding: 24 }}>
              <Text>No tracks found.</Text>
            </View>
          ) : null}

          {/* <View style={{ backgroundColor: Colors.common.pink, padding: 16 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Lato_700Bold',
              }}
            >
              Track IDs
            </Text>
          </View> */}

          {/* <ArchiveTracklist track={archive} /> */}
        </Animated.ScrollView>
      </View>
    </>
  )
}
