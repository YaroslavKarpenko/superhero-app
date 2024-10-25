import { setPageCount } from './slice';
import { Superhero, PaginationQuery } from '../../../server/src/types';
import api from '../../api/superhero';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initializeSuperheroes = createAsyncThunk<Superhero[], PaginationQuery>(
  'superheroes/fetchSuperheroes',
  async (params, { dispatch }) => {
    const { page, limit } = params;
    const { total, superheroes } = await api.fetchSuperheroes({
      page,
      limit,
    });

    dispatch(setPageCount(total));
    // dispatch(setCurrentPage(page));
    return superheroes;
  },
);
