import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INITIAL_KANBAN } from '~/constants'
import { Card, KanbanColumn } from '~/types'

const initialState = INITIAL_KANBAN

interface MoveActionPayload {
  cardId: Card['id']
  from: KanbanColumn
  to: KanbanColumn
  toPosition: number
}

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    moveCard(state, { payload }: PayloadAction<MoveActionPayload>) {
      if (payload.from !== payload.to) {
        Object.keys(state[payload.to]).forEach((card) => {
          if (state[payload.to][card].position >= payload.toPosition) {
            state[payload.to][card].position++
          }
        })
        state[payload.to][payload.cardId] = {
          ...state[payload.from][payload.cardId],
          position: payload.toPosition,
        }
        delete state[payload.from][payload.cardId]
        Object.keys(state[payload.from]).forEach((card) => {
          if (state[payload.from][card].position >= payload.toPosition) {
            state[payload.from][card].position--
          }
        })
        console.log(current(state))
      }
    },
  },
})

export const { moveCard } = kanbanSlice.actions
export default kanbanSlice.reducer
