import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 8,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; 
    },
    redirectPage: (state, action: PayloadAction<number>) => {
        state.currentPage = 1 ;
    },
    resetPagination: () => initialState,
  },
});

export const { setCurrentPage, setItemsPerPage,redirectPage, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
