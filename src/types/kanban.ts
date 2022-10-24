export interface Card {
  id: string
  title: string
  description: string
  color: string
}

export type CardInCanban = Card & {
  position: number
}

export interface Kanban {
  'To do:': Record<Card['id'], CardInCanban>
  'In Progress': Record<Card['id'], CardInCanban>
  'Done:': Record<Card['id'], CardInCanban>
  'Backlog:': Record<Card['id'], CardInCanban>
}

export type KanbanColumn = keyof Kanban

export interface MoveActionPayload {
  cardId: Card['id']
  from: KanbanColumn
  to: KanbanColumn
  toPosition: number
}
