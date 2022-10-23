import { Kanban } from '~/types'

export const INITIAL_KANBAN: Kanban = {
  'To do:': {
    '1': {
      id: '1',
      title: 'ssassss',
      color: 'yellow',
      position: 0,
    },
    '2': {
      id: '2',
      title: 'qweeeee',
      color: 'blue',
      position: 1,
    },
  },
  'In Progress': {},
  'Done:': {},
  'Backlog:': {},
}
