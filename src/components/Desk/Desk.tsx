import { Grid } from '@mui/material'
import { useAppSelector } from '~/store'
import { KanbanColumn } from '~/types'
import { CardColumn } from '../CardColumn'

export const Desk = () => {
  const columns = useAppSelector((state) =>
    Object.keys(state.kanban),
  ) as KanbanColumn[]

  return (
    <Grid container justifyContent="space-around">
      {columns.map((column) => (
        <CardColumn column={column} key={column} />
      ))}
    </Grid>
  )
}
