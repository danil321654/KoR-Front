import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import { moveCard, onDragEnd } from '~/store/reducers'
import { KanbanColumn } from '~/types'
import { Card } from '../Card'

interface Props {
  column: KanbanColumn
}

export const CardColumn: FC<Props> = ({ column }) => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector((state) => state.kanban[column])
  const dragCard = useAppSelector((state) => state.drag)
  return (
    <Grid
      item
      container
      direction="column"
      maxWidth={300}
      onDragLeave={(e) => {
        e.stopPropagation()
        console.log('drop2')
        if (dragCard) {
          dispatch(moveCard({ ...dragCard, toPosition: 1, to: column }))
          dispatch(onDragEnd())
        }
      }}
    >
      <Typography variant="h3" noWrap mb={4}>
        {column}
      </Typography>
      {Object.keys(cards).map((cardId) => (
        <Card cardId={cardId} column={column} key={cardId} />
      ))}
    </Grid>
  )
}
