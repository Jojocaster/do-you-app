import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'
import scheduleReducer from './slices/scheduleSlice'
import showReducer from './slices/showSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    schedule: scheduleReducer,
    show: showReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
