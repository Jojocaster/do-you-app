import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArchiveItem } from '../../components/ArchivesList/ArchivesList.types'

interface SavedArchive {
  lastUpdated: number
  archive: ArchiveItem
}

const initialState: { archives: SavedArchive[] } = {
  archives: [],
}

const savedArchivesSlice = createSlice({
  initialState,
  name: 'savedArchives',
  reducers: {
    addArchive(state, action: PayloadAction<ArchiveItem>) {
      state.archives.push({
        lastUpdated: new Date().getTime(),
        archive: action.payload,
      })
    },
    deleteArchive(state, action: PayloadAction<ArchiveItem>) {
      const archives = state.archives.filter((a) => {
        return a.archive.id !== action.payload.id
      })

      state.archives = archives
    },
  },
})

export const { addArchive, deleteArchive } = savedArchivesSlice.actions
export default savedArchivesSlice.reducer
