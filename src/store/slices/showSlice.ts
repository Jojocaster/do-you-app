import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LIVE_INFO_URL } from '../../constants/Endpoints'

export enum ShowStatus {
  ON,
  OFF,
  LOADING,
}

interface ShowState {
  status: ShowStatus
  lastUpdated: number | null
}

interface ShowInfo {
  shows: {
    current: any | null
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
  status: ShowStatus.LOADING,
  lastUpdated: null,
}

const showSlice = createSlice({
  initialState,
  name: 'show',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShowInfo.fulfilled, (state, action) => {
      console.log(action.payload)

      state.status = action.payload.shows.current
        ? ShowStatus.ON
        : ShowStatus.OFF
      state.lastUpdated = new Date().getTime()
    }),
      builder.addCase(fetchShowInfo.pending, (state) => {
        console.log('pending')

        state.status = ShowStatus.LOADING
      }),
      builder.addCase(fetchShowInfo.rejected, () => {
        console.log('error fetching show info')
      })
  },
})

export default showSlice.reducer
