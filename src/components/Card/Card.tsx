import { Grid, TextField, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useAppSelector, useAppDispatch } from '~/store'
import { onDragStart, updateCard } from '~/store/reducers'
import { KanbanColumn } from '~/types'

interface Props {
  column: KanbanColumn
  cardId: string
}

export const Card: FC<Props> = ({ column, cardId }) => {
  const card = useAppSelector((state) => state.kanban[column][cardId])
  const dispatch = useAppDispatch()
  const [editMode, setEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState(card.title)
  const [descriptionValue, setDescriptionValue] = useState(card.description)
  const changeMode = () => {
    setEditMode((state) => !state)
    if (editMode) {
      dispatch(
        updateCard([
          column,
          { ...card, title: titleValue, description: descriptionValue },
        ]),
      )
    }
  }
  return (
    <Grid
      item
      container
      direction="column"
      minHeight={200}
      sx={{ border: '1px solid black', background: card.color }}
      borderRadius={2}
      onDragStart={() => {
        dispatch(onDragStart({ cardId, from: column }))
      }}
      onDragEnd={(e) => {
        e.stopPropagation()
      }}
      draggable
      onDoubleClick={changeMode}
      wrap="nowrap"
      p={1}
    >
      {editMode ? (
        <>
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
        </>
      ) : (
        <>
          <Typography
            variant="body1"
            borderBottom={1}
            color="GrayText"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {titleValue}
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: 'pre-line' }}
            color="GrayText"
          >
            {descriptionValue}
          </Typography>
        </>
      )}
    </Grid>
  )
}
