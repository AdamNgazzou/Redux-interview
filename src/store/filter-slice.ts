import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface FiltersState {
  selectedCategories: string[]
  initialized: boolean // Add a flag to track if we've initialized
}

const initialState: FiltersState = {
  selectedCategories: [],
  initialized: false,
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.selectedCategories.indexOf(action.payload)
      if (index > -1) {
        state.selectedCategories.splice(index, 1)
      } else {
        state.selectedCategories.push(action.payload)
      }
    },
    clearCategories: (state) => {
      state.selectedCategories = []
    },
    initializeCategories: (state, action: PayloadAction<string[]>) => {
      // Only initialize if not already initialized
      if (!state.initialized) {
        state.selectedCategories = action.payload
        state.initialized = true
      }
    },
  },
})

export const { toggleCategory, clearCategories, initializeCategories } = filtersSlice.actions
export default filtersSlice.reducer
