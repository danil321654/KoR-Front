import { Grid, Paper, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/store'
import { moveCard, onDragEnd } from '~/store/reducers'
import { KanbanColumn } from '~/types'
import { AddCard, Card } from '../Card'

interface Props {
  column: KanbanColumn
}

export const CardColumn: FC<Props> = ({ column }) => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector((state) => state.kanban[column])
  const dragCard = useAppSelector((state) => state.drag)
  const [showAddCard, setShowCard] = useState(false)
  return (
    <Grid item container direction="column" wrap="nowrap">
      <Typography variant="h3" noWrap mb={4} fontWeight={600} color="GrayText">
        {column}
      </Typography>
      <Paper
        sx={{ height: '100%', overflow: 'auto' }}
        onDragOver={(e) => {
          e.preventDefault()
          console.log('draggin')
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          console.log(column)
          if (dragCard) {
            dispatch(
              moveCard({
                ...dragCard,
                toPosition: Object.values(cards).length,
                to: column,
              }),
            )
            dispatch(onDragEnd())
          }
        }}
        onMouseEnter={() => setShowCard(true)}
        onMouseLeave={() => setShowCard(false)}
      >
        <Grid
          container
          direction="column"
          gap={3}
          p={2}
          wrap="nowrap"
          //   overflow="auto"
        >
          {Object.keys(cards).map((cardId) => (
            <Card cardId={cardId} column={column} key={cardId} />
          ))}
          <AddCard column={column} show={showAddCard} />
        </Grid>
      </Paper>
    </Grid>
  )
}
