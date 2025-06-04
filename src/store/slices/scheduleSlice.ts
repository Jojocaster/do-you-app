import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SCHEDULE_URL } from '../../constants/Endpoints'
import {
  formatSchedule,
  FormattedSchedule,
  Schedule,
} from '../../utils/schedule'
import { getCalendars } from 'expo-localization'
import moment from 'moment-timezone'

export interface ScheduleState {
  shows: FormattedSchedule
  lastUpdated: number | null
  loading: boolean
}

const initialState: ScheduleState = {
  // TODO: enum instead of boolean to handle errors?
  loading: false,
  shows: {},
  lastUpdated: null,
}

export const fetchSchedule = createAsyncThunk(
  'schedule/fetchSchedule',
  async () => {
    const tz = getCalendars()[0].timeZone
    const isAUS = tz?.startsWith('Australia')
    const timezone = !isAUS && tz ? moment.tz(tz).format('z') : tz || undefined

    const response = await fetch(`${SCHEDULE_URL}?timezone=${timezone}`)
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
      console.log('[fetchSchedule]: resolved')
      state.loading = false
      state.shows = formatSchedule(action.payload)
      state.lastUpdated = new Date().getTime()
    }),
      builder.addCase(fetchSchedule.pending, (state, action) => {
        console.log('[fetchSchedule]: pending')

        state.loading = true
      }),
      //TODO: handle errors
      builder.addCase(fetchSchedule.rejected, (state, action) => {
        console.log('[fetchSchedule]: error', action.error)
        state.loading = false
        state.lastUpdated = new Date().getTime()
      })
  },
})

export default scheduleSlice.reducer
