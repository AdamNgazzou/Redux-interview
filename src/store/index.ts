import { configureStore, combineReducers } from "@reduxjs/toolkit"
import counterSlice, { CounterState } from "./counter-slice"
import filtersReducer, { FiltersState } from "./filter-slice"; 
import likeReducer, {LikeState} from "./like-slice"; 

import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

export interface RootState {
  counter: CounterState
  filter: FiltersState
  likes: LikeState
}

const rootReducer = combineReducers({
  counter: counterSlice,
  filter: filtersReducer,
  likes: likeReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filter','like'], // Only persist the 'filter' slice

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export const persistor = persistStore(store)
export default store
