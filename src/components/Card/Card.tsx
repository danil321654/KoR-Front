import { Grid } from '@mui/material'
import { FC } from 'react'
import { useAppSelector, useAppDispatch } from '~/store'
import { onDragEnd, onDragStart } from '~/store/reducers'
import { KanbanColumn } from '~/types'

interface Props {
  cardId: string
  column: KanbanColumn
}

export const Card: FC<Props> = ({ column, cardId }) => {
  const card = useAppSelector((state) => state.kanban[column][cardId])
  const dispatch = useAppDispatch()
  return (
    <Grid
      item
      container
      direction="column"
      minHeight={200}
      sx={{ border: '1px solid black' }}
      onDragStart={() => {
        dispatch(onDragStart({ cardId, from: column }))
      }}
      onDragEnd={(e) => {
        e.stopPropagation()
        // dispatch(onDragEnd())
      }}
      draggable
    >
      {card.title}
    </Grid>
  )
}
