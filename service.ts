import TrackPlayer, { Event, State } from 'react-native-track-player'
import { LIVE_STREAM_URL } from './src/constants/Endpoints'
import { store } from './src/store/store'
import { getShowTitle } from './src/utils/show'
import { unregisterBackgroundTask } from './src/utils/tasks'
//@ts-ignore
import logo from './assets/images/doyou.webp'
import {
  ARTIST_NAME,
  DEFAULT_SHOW_NAME,
  STREAM_HEADERS,
} from './src/components/Player/Player.constants'

export default async function () {
  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    unregisterBackgroundTask()
    return await TrackPlayer.reset()
  })
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    console.log('RemotePause received')
  })
  TrackPlayer.addEventListener(Event.PlaybackState, async (p) => {
    console.log('PlaybackState received', console.log(p))

    await TrackPlayer.pause()
  })

  TrackPlayer.addEventListener(Event.RemotePlayPause, async () => {
    console.log('RemotePause received')
    if ((await TrackPlayer.getPlaybackState()).state === State.Playing) {
      TrackPlayer.pause()
    } else {
      TrackPlayer.play()
    }
  })

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    const { currentShow, currentTrack } = await store.getState().show
    const title = getShowTitle({ currentShow, currentTrack })

    await TrackPlayer.reset()
    await TrackPlayer.add([
      {
        url: LIVE_STREAM_URL,
        artwork: currentShow?.image_path || logo,
        album: DEFAULT_SHOW_NAME,
        artist: ARTIST_NAME,
        title,
        headers: STREAM_HEADERS,
      },
    ])

    return await TrackPlayer.play()
  })
}

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePlayPause, () => {
    console.log('Event.RemotePlayPause')
    TrackPlayer.pause()
  })

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause')
    TrackPlayer.pause()
  })

  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    const { currentShow, currentTrack } = await store.getState().show
    const title = getShowTitle({ currentShow, currentTrack })

    await TrackPlayer.reset()
    await TrackPlayer.add([
      {
        url: LIVE_STREAM_URL,
        artwork: currentShow?.image_path || logo,
        album: DEFAULT_SHOW_NAME,
        artist: ARTIST_NAME,
        title,
        headers: STREAM_HEADERS,
      },
    ])

    return await TrackPlayer.play()
  })

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext')
    TrackPlayer.skipToNext()
  })

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious')
    TrackPlayer.skipToPrevious()
  })

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
    console.log('Event.RemoteJumpForward', event)
    TrackPlayer.seekBy(event.interval)
  })

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
    console.log('Event.RemoteJumpBackward', event)
    TrackPlayer.seekBy(-event.interval)
  })

  TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    console.log('Event.RemoteSeek', event)
    TrackPlayer.seekTo(event.position)
  })

  TrackPlayer.addEventListener(Event.RemoteDuck, async (event) => {
    console.log('Event.RemoteDuck', event)
  })

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, (event) => {
    console.log('Event.PlaybackQueueEnded', event)
  })

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (event) => {
    console.log('Event.PlaybackActiveTrackChanged', event)
  })

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, (event) => {
    console.log('Event.PlaybackProgressUpdated', event)
  })

  TrackPlayer.addEventListener(Event.PlaybackPlayWhenReadyChanged, (event) => {
    console.log('Event.PlaybackPlayWhenReadyChanged', event)
  })

  TrackPlayer.addEventListener(Event.PlaybackState, (event) => {
    console.log('Event.PlaybackState', event)
  })

  TrackPlayer.addEventListener(Event.MetadataChapterReceived, (event) => {
    console.log('Event.MetadataChapterReceived', event)
  })

  TrackPlayer.addEventListener(Event.MetadataTimedReceived, (event) => {
    console.log('Event.MetadataTimedReceived', event)
  })

  TrackPlayer.addEventListener(Event.MetadataCommonReceived, (event) => {
    console.log('Event.MetadataCommonReceived', event)
  })
}
