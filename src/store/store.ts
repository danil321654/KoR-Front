import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from './queries'
import kanbanReducer from './reducers/cards'
import dragReducer from './reducers/drag'

const reducer = {
  [authApi.reducerPath]: authApi.reducer,
  kanban: kanbanReducer,
  drag: dragReducer,
}

const combinedReducer = combineReducers<typeof reducer>(reducer)

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof combinedReducer>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
