import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await fetch(
    'https://mahina.app/mahina/app/55559291029?page=1'
  )
  const data = await response.json()

  return data as Events
})

interface EventDate {
  date: string
  day: string
  month: string
}
interface EventData {
  description: string
  id: number
  image: string
  location: string
  price_min: number
  price_max: number | null
  title: string
  ticket_links: {
    link: string
    domain: string
  }[]
  start_date: EventDate
  end_date: EventDate
}
interface Events {
  event_dates: string[]
  events_data: EventData[]
  loading: boolean
  updatedAt: number | null
}

const initialState: Events = {
  event_dates: [],
  events_data: [],
  loading: false,
  updatedAt: null,
}

const eventsSlice = createSlice({
  initialState,
  name: 'event',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.event_dates = action.payload.event_dates
      state.events_data = action.payload.events_data
      state.loading = false
      state.updatedAt = new Date().getTime()
    })
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchEvents.rejected, (state) => {
      state.loading = false
    })
  },
})

export default eventsSlice.reducer
