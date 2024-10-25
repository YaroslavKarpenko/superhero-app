import { Superhero } from '../../../server/src/types';

export enum LoadingStatus {
  PENDING = 'pending',
  FULFILLED = 'succeeded',
  REJECTED = 'failed',
}

export interface SuperheroSliceState {
  currentPageSuperheroes: Superhero[];
  pageCount: number;
  currentPage: number;
  loading: LoadingStatus;
}
