import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  selectedCategories: string[];
}

const initialState: FiltersState = {
  selectedCategories: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.selectedCategories.indexOf(action.payload);
      if (index > -1) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(action.payload);
      }
    },
    clearCategories: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const { toggleCategory, clearCategories } = filtersSlice.actions;
export default filtersSlice.reducer;
