import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 8,
  totalItems: 0,
  totalPages: 0,
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      const page = Math.max(1, action.payload)
      state.currentPage = state.totalPages > 0 ? Math.min(page, state.totalPages) : page
    },

    /* Set the number of items to display per page*/
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = Math.max(1, action.payload)
      
      if (state.totalItems > 0) {
        state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage)
        
        if (state.currentPage > state.totalPages) {
          state.currentPage = Math.max(1, state.totalPages)
        }
      } else {
        state.currentPage = 1
      }
    },

    /*Set the total number of items and recalculate total pages*/
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = Math.max(0, action.payload)
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage)
      
      if (state.currentPage > state.totalPages) {
        state.currentPage = Math.max(1, state.totalPages)
      }
    },

    /* Go to the next page if available*/
    nextPage: (state) => {
      if (state.totalPages === 0 || state.currentPage < state.totalPages) {
        state.currentPage += 1
      }
    },

    /* Go to the previous page if available*/
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1
      }
    },

    /*Go to the first page*/
    firstPage: (state) => {
      state.currentPage = 1
    },

    /*Go to the last page if total pages is known*/
    lastPage: (state) => {
      if (state.totalPages > 0) {
        state.currentPage = state.totalPages
      }
    },

    /*Reset pagination to initial state*/
    resetPagination: () => initialState,
  },
})

export const {
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  nextPage,
  prevPage,
  firstPage,
  lastPage,
  resetPagination,
} = paginationSlice.actions

export default paginationSlice.reducer