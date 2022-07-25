import * as BackgroundFetch from 'expo-background-fetch'
import TrackPlayer, { State } from 'react-native-track-player'
import {
  ARTIST_NAME,
  DEFAULT_SHOW_NAME,
} from '../components/Player/Player.constants'
import { decodeHtmlCharCodes } from '../components/ScheduleItem/ScheduleItem.utils'
import { LIVE_INFO_URL } from '../constants/Endpoints'
import { BACKGROUND_FETCH_TASK } from '../constants/Tasks'
//@ts-ignore
import logo from '../../assets/images/doyou.webp'

export const registerBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 120, // seconds,
    })
    console.log('[BACKGROUND] - Task registered')
  } catch (err) {
    console.log('[BACKGROUND] - Task register error:', err)
  }
}

export const unregisterBackgroundTask = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
    console.log('[BACKGROUND] - Task unregistered')
  } catch (e) {
    console.log('[BACKGROUND] - Cancel error: ', e)
  }
}

export const fetchShowInBackground = async () => {
  try {
    const now = Date.now()

    console.log('[BACKGROUND] - Fetch show: ', new Date(now).toISOString())

    const response = await fetch(LIVE_INFO_URL)
    const data = await response.json()

    if (data.shows.current) {
      const state = await TrackPlayer.getState()

      console.log('[BACKGROUND] - Player state: ', State[state])

      if (state === State.Playing || state === State.Paused) {
        console.log('[BACKGROUND] - Updating metadata')
        TrackPlayer.updateMetadataForTrack(0, {
          artist: ARTIST_NAME,
          artwork: data.shows.current.image_path || logo,
          album: DEFAULT_SHOW_NAME,
          title: decodeHtmlCharCodes(data.shows.current.name),
        })
      }
    }

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (e) {
    console.log('[BACKGROUND] - Error: ', e)
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
}
