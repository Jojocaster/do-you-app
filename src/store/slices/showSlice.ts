import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LIVE_INFO_URL } from '../../constants/Endpoints'

export enum ShowStatus {
  ON,
  OFF,
  LOADING,
  ERROR,
}

interface ShowInfo {
  name?: string
  starts: string
  image_path: string
}
interface TrackInfo {
  starts: string
  ends: string
  type: string
  name: string
  media_item_played: boolean
  record: string
}

interface ShowState {
  currentShow: ShowInfo | null
  currentTrack: TrackInfo | null
  status: ShowStatus
  lastUpdated: number | null
  lastNotified: number | null
}

interface LiveInfo {
  shows: {
    current: ShowInfo
  }
  tracks: {
    current: TrackInfo
  }
}

export const fetchShowInfo = createAsyncThunk(
  'show/fetchShowInfo',
  async () => {
    const response = await fetch(LIVE_INFO_URL)
    const data = await response.json()
    return data as LiveInfo
  }
)

const initialState: ShowState = {
  currentShow: null,
  currentTrack: null,
  status: ShowStatus.LOADING,
  lastUpdated: null,
  lastNotified: null,
}

const showSlice = createSlice({
  initialState,
  name: 'show',
  reducers: {
    updateLastNotified: (state, action: PayloadAction<number>) => {
      state.lastNotified = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShowInfo.fulfilled, (state, action) => {
      console.log('[fetchShow]: resolved')
      state.status = action.payload.tracks.current
        ? ShowStatus.ON
        : ShowStatus.OFF
      state.lastUpdated = new Date().getTime()

      if (
        state.currentTrack?.starts !== action.payload.tracks?.current?.starts
      ) {
        state.lastNotified = null
      }

      state.currentTrack = action.payload.tracks?.current || null
      state.currentShow = action.payload.shows?.current || null
    }),
      builder.addCase(fetchShowInfo.pending, (state) => {
        console.log('[fetchShow]: pending')
        state.status = ShowStatus.LOADING
      }),
      builder.addCase(fetchShowInfo.rejected, (state, action) => {
        console.log('[fetchShow]: error', action.error)
        state.lastUpdated = new Date().getTime()
        state.status = ShowStatus.ERROR
      })
  },
})

export const { updateLastNotified } = showSlice.actions
export default showSlice.reducer
