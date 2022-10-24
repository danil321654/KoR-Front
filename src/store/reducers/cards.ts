import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INITIAL_KANBAN } from '~/constants'
import { Card, KanbanColumn, MoveActionPayload } from '~/types'
import { v4 as uuidv4 } from 'uuid'

const initialState = INITIAL_KANBAN

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
    updateCard(
      state,
      { payload: [column, card] }: PayloadAction<[KanbanColumn, Card]>,
    ) {
      state[column][card.id] = { ...state[column][card.id], ...card }
    },
    addCard(
      state,
      {
        payload: [column, card],
      }: PayloadAction<[KanbanColumn, Omit<Card, 'id'>]>,
    ) {
      const newId = uuidv4()
      state[column][newId] = { ...state[column][newId], ...card, id: newId }
    },
  },
})

export const { moveCard, updateCard, addCard } = kanbanSlice.actions
export default kanbanSlice.reducer
