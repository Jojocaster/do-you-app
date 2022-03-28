import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LIVE_INFO_URL } from '../../constants/Endpoints'

export enum ShowStatus {
  ON,
  OFF,
  LOADING,
}

interface ShowState {
  current: string | null
  status: ShowStatus
  lastUpdated: number | null
}

interface ShowInfo {
  shows: {
    current: {
      name?: string
    }
  }
  tracks: {
    current: {
      name?: string
    }
  }
}

export const fetchShowInfo = createAsyncThunk(
  'show/fetchShowInfo',
  async () => {
    const response = await fetch(LIVE_INFO_URL)
    const data = await response.json()
    return data as ShowInfo
  }
)

const initialState: ShowState = {
  current: null,
  status: ShowStatus.LOADING,
  lastUpdated: null,
}

const showSlice = createSlice({
  initialState,
  name: 'show',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowInfo.fulfilled, (state, action) => {
      state.status = action.payload.tracks.current
        ? ShowStatus.ON
        : ShowStatus.OFF
      state.lastUpdated = new Date().getTime()
      state.current = action.payload.tracks?.current?.name || null
    }),
      builder.addCase(fetchShowInfo.pending, (state) => {
        console.log('fetchShow pending')
        state.status = ShowStatus.LOADING
      }),
      builder.addCase(fetchShowInfo.rejected, () => {
        console.log('error fetching show info')
      })
  },
})

export default showSlice.reducer
