import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SCHEDULE_URL } from '../../constants/Endpoints'
import { formatSchedule, Schedule, ShowInfo } from '../../utils/schedule'

export interface ScheduleState {
  shows: ShowInfo[][]
  lastUpdated: number | null
  loading: boolean
}

const initialState: ScheduleState = {
  // TODO: enum instead of boolean to handle errors?
  loading: false,
  shows: [],
  lastUpdated: null,
}

export const fetchSchedule = createAsyncThunk(
  'schedule/fetchSchedule',
  async () => {
    const response = await fetch(SCHEDULE_URL)
    const data = await response.json()
    return data as Schedule
  }
)

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSchedule.fulfilled, (state, action) => {
      state.loading = false
      state.shows = formatSchedule(action.payload)
      state.lastUpdated = new Date().getTime()
    }),
      builder.addCase(fetchSchedule.pending, (state, action) => {
        state.loading = true
      }),
      //TODO: handle errors
      builder.addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default scheduleSlice.reducer
