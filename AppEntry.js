import registerRootComponent from 'expo/src/launch/registerRootComponent'
import App from './App'
import TrackPlayer from 'react-native-track-player'
import service from './service'
import { BACKGROUND_FETCH_TASK } from './src/constants/Tasks'
import * as TaskManager from 'expo-task-manager'
import { fetchShowInBackground } from './src/utils/tasks'

registerRootComponent(App)

TrackPlayer.registerPlaybackService(() => service)
