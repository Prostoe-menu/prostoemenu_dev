import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  recipes: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
}


const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    resetReceiptState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = null;
      state.recipes = [];
    },
    updateReceiptStore: (state, action) => {
      state.isLoading = action.payload;
      state.isError = false;
      state.errorMessage = null;
      state.recipes = action.payload;
    },
  },
  extraReducers: ( builder ) =>{
    builder
      .addCase()
  }
})
