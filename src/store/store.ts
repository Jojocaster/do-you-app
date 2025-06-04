import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import playerReducer from './slices/playerSlice'
import scheduleReducer from './slices/scheduleSlice'
import showReducer from './slices/showSlice'
import tracksInfoReducer from './slices/tracksInfoSlice'
import settingsReducer from './slices/settingsSlice'
import filtersReducer from './slices/filtersSlice'
import savedArchivesReducer from './slices/savedArchivesSlice'
import eventsReducer from './slices/eventsSlice'
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
import { useDispatch } from 'react-redux'

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
  events: eventsReducer,
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
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export { persistor }
