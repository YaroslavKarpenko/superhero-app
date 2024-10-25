import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus, SuperheroSliceState } from './types';
import { initializeSuperheroes } from './asyncActions';

const initialState: SuperheroSliceState = {
  currentPageSuperheroes: [],
  pageCount: 0,
  currentPage: 1,
  loading: LoadingStatus.PENDING,
};

const superheroSlice = createSlice({
  name: 'superhero',
  initialState,
  reducers: {
    setPageCount(state, action: PayloadAction<number>) {
      return { ...state, pageCount: action.payload };
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeSuperheroes.pending, (state) => {
      state.currentPageSuperheroes = [];
      state.loading = LoadingStatus.PENDING;
    });
    builder.addCase(initializeSuperheroes.fulfilled, (state, action) => {
      state.currentPageSuperheroes = action.payload;
      state.loading = LoadingStatus.FULFILLED;
    });
    builder.addCase(initializeSuperheroes.rejected, (state) => {
      state.currentPageSuperheroes = [];
      state.loading = LoadingStatus.REJECTED;
    });
  },
});

export const { setPageCount, setCurrentPage } = superheroSlice.actions;

export default superheroSlice.reducer;
