import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'
import scheduleReducer from './slices/scheduleSlice'
import showReducer from './slices/showSlice'
import tracksInfoReducer from './slices/tracksInfoSlice'
import settingsReducer from './slices/settingsSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    schedule: scheduleReducer,
    show: showReducer,
    tracksInfo: tracksInfoReducer,
    settings: settingsReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
