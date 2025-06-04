/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { RootStackParamList } from '../../types'
import ScheduleScreen from '../screens/ScheduleModalScreen/ScheduleScreen'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Live: {
            screens: {
              LiveScreen: 'live',
            },
          },
          Schedule: {
            screens: {
              ScheduleScreen: 'schedule',
            },
          },
          Tracks: {
            screens: {
              TracksScreen: 'tracks',
            },
          },
          Chat: {
            screens: {
              ChatScreen: 'chat',
            },
          },
          More: {
            screens: {
              MoreScreen: 'more',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
}

export default linking
