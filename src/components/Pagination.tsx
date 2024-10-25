import React from 'react';
import { useAppDispatch, useAppSelector } from '../storage/hooks';
import { setCurrentPage } from '../storage/superhero/slice';

import { Pagination as Pag } from '@mui/material';

import {
  selectCurrentPage,
  selectLoadingStatus,
  selectPageCount,
  selectSuperheroList,
} from '../storage/superhero/selectors';
import { LoadingStatus } from '../storage/superhero/types';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const pageCount = useAppSelector(selectPageCount);
  const currentPage = useAppSelector(selectCurrentPage);
  const superheroList = useAppSelector(selectSuperheroList);
  const loadingStatus = useAppSelector(selectLoadingStatus);

  return (
    <div
      className={`${
        loadingStatus === LoadingStatus.FULFILLED && superheroList.length === 0 ? 'hidden' : 'flex'
      } flex-row items-center justify-center mb-14`}>
      <Pag
        variant="outlined"
        color="standard"
        shape="rounded"
        count={pageCount}
        page={currentPage}
        onChange={(_, num) => dispatch(setCurrentPage(num))}
        siblingCount={1}
        sx={{ '& .MuiPagination-root': {} }}
      />
    </div>
  );
};

export default Pagination;
