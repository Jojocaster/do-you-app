import TrackPlayer, { State } from 'react-native-track-player'
import * as BackgroundTask from 'expo-background-task'
import {
  ARTIST_NAME,
  DEFAULT_SHOW_NAME,
} from '../components/Player/Player.constants'
import { decodeHtmlCharCodes } from '../components/ScheduleItem/ScheduleItem.utils'
import { LIVE_INFO_URL } from '../constants/Endpoints'
import { BACKGROUND_FETCH_TASK } from '../constants/Tasks'
//@ts-ignore
import logo from '../../assets/images/doyou.webp'
import * as TaskManager from 'expo-task-manager'

export const registerBackgroundTask = async () => {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_FETCH_TASK
  )

  if (isRegistered) {
    try {
      await BackgroundTask.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 15, // seconds,
      })
      console.log('[BACKGROUND] - Task registered')
    } catch (err) {
      console.log('[BACKGROUND] - Task register error:', err)
    }
  }
}

export const unregisterBackgroundTask = async () => {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_FETCH_TASK
  )

  if (!isRegistered) {
    return
  }

  try {
    await BackgroundTask.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
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
      const state = await (await TrackPlayer.getPlaybackState()).state

      // console.log('[BACKGROUND] - Player state: ', State[state])

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
    return BackgroundTask.BackgroundTaskResult.Success
  } catch (e) {
    console.log('[BACKGROUND] - Error: ', e)
    return BackgroundTask.BackgroundTaskResult.Failed
  }
}
