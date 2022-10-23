import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Card, KanbanColumn } from '~/types'

const initialState = null as { cardId: string; from: KanbanColumn } | null

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    onDragStart: (
      _,
      { payload }: PayloadAction<{ cardId: string; from: KanbanColumn }>,
    ) => payload,
    onDragEnd: () => null,
  },
})

export const { onDragStart, onDragEnd } = dragSlice.actions
export default dragSlice.reducer
