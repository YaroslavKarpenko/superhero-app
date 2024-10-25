import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSuperheroData = (state: RootState) => state.superhero;

export const selectSuperheroList = createSelector(
  selectSuperheroData,
  (superhero) => superhero.currentPageSuperheroes,
);

export const selectPageCount = createSelector(
  selectSuperheroData,
  (superhero) => superhero.pageCount,
);

export const selectCurrentPage = createSelector(
  selectSuperheroData,
  (superhero) => superhero.currentPage,
);

export const selectLoadingStatus = createSelector(
  selectSuperheroData,
  (superhero) => superhero.loading,
);
