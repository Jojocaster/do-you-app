import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import playerReducer from './slices/playerSlice'
import scheduleReducer from './slices/scheduleSlice'
import showReducer from './slices/showSlice'
import tracksInfoReducer from './slices/tracksInfoSlice'
import settingsReducer from './slices/settingsSlice'
import filtersReducer from './slices/filtersSlice'
import savedArchivesReducer from './slices/savedArchivesSlice'
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
  blacklist: ['show'],
}

const reducers = combineReducers({
  app: appReducer,
  player: playerReducer,
  schedule: scheduleReducer,
  show: showReducer,
  tracksInfo: tracksInfoReducer,
  settings: settingsReducer,
  filters: filtersReducer,
  savedArchives: savedArchivesReducer,
})
//@ts-ignore
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
