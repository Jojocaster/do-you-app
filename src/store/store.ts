import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'
import scheduleReducer from './slices/scheduleSlice'
import showReducer from './slices/showSlice'
import tracksInfoReducer from './slices/tracksInfoSlice'
import settingsReducer from './slices/settingsSlice'
import storage from 'redux-persist/lib/storage'
import AsyncStore from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStore,
}

const reducers = combineReducers({
  player: playerReducer,
  schedule: scheduleReducer,
  show: showReducer,
  tracksInfo: tracksInfoReducer,
  settings: settingsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export { persistor }
