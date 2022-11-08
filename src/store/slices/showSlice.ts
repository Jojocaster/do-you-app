import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LIVE_INFO_URL } from '../../constants/Endpoints'

export enum ShowStatus {
  ON,
  OFF,
  LOADING,
  ERROR,
}

export interface CurrentShowInfo {
  name?: string
  ends: string
  starts: string
  image_path: string
}
export interface CurrentTrackInfo {
  starts: string
  ends: string
  type: string
  name: string
  media_item_played: boolean
  record: string
}

interface ShowState {
  currentShow: CurrentShowInfo | null
  currentTrack: CurrentTrackInfo | null
  status: ShowStatus
  lastUpdated: number | null
}

interface LiveInfo {
  shows: {
    current: CurrentShowInfo
  }
  tracks: {
    current: CurrentTrackInfo
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
}

const showSlice = createSlice({
  initialState,
  name: 'show',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowInfo.fulfilled, (state, action) => {
      console.log('[fetchShow]: resolved')
      state.status =
        action.payload.tracks.current || action.payload.shows.current
          ? ShowStatus.ON
          : ShowStatus.OFF
      state.lastUpdated = new Date().getTime()

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

export default showSlice.reducer
