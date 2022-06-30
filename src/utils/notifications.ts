import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications'
import { Platform } from 'react-native'
import { getEnv } from '../constants/Env'
import { fetchData } from './fetch'

export const getToken = async () => {
  const { status: existingStatus } = await getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    throw new Error('Permission not granted!')
  }
  const token = await getExpoPushTokenAsync({
    experienceId: '@joelbeaudon/DoYouWorld',
  })

  console.log('[fetchToken]: ', token?.data)

  // create notif channel for icons & vibrate on Android
  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('notification-sound-channel', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    })
  }

  return token?.data
}

export const registerToken = async (token: string): Promise<boolean> => {
  try {
    const data = await fetchData({
      url: `${getEnv('API_URL')}/register`,
      data: { token },
      method: 'POST',
    })

    console.log('[registerToken]: ', data)

    return true
    // TODO: fix type
  } catch (e: any) {
    console.log('There was an error registering this token', e)
    return false
  }
}

export const unregisterToken = async (token: string) => {
  try {
    const data = await fetchData({
      url: `${getEnv('API_URL')}/unregister`,
      data: { token },
      method: 'POST',
    })

    console.log('[unregisterToken]: ', data)

    return true
    // TODO: fix type
  } catch (e: any) {
    console.log('There was an error unregistering this token', e)
    return false
  }
}
