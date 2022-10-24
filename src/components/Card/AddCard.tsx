import { Grid, IconButton, TextField, Typography } from '@mui/material'
import { Save } from '@mui/icons-material'
import { FC, useState } from 'react'
import { useAppDispatch } from '~/store'
import { KanbanColumn } from '~/types'
import { addCard } from '~/store/reducers'

interface Props {
  column: KanbanColumn
  show: boolean
}

export const AddCard: FC<Props> = ({ column, show }) => {
  const dispatch = useAppDispatch()
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [colorValue, setColorValue] = useState('white')
  return (
    <Grid
      item
      container
      direction="column"
      minHeight={200}
      sx={{
        border: '1px solid black',
        background: colorValue,
        display: show ? 'flex' : 'none',
      }}
      borderRadius={2}
      wrap="nowrap"
      p={1}
    >
      <TextField
        variant="standard"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <TextField
        variant="standard"
        value={descriptionValue}
        multiline
        onChange={(e) => setDescriptionValue(e.target.value)}
        sx={{ height: '100%' }}
      />
      <IconButton
        sx={{ width: 24, height: 24 }}
        onClick={() => {
          dispatch(
            addCard([
              column,
              {
                title: titleValue,
                description: descriptionValue,
                color: colorValue,
              },
            ]),
          )
          setTitleValue('')
          setDescriptionValue('')
          setColorValue('white')
        }}
      >
        <Save />
      </IconButton>
    </Grid>
  )
}
