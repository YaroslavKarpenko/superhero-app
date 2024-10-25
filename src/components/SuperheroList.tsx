import React from 'react';
import { useAppDispatch, useAppSelector } from '../storage/hooks';
import {
  selectSuperheroList,
  selectCurrentPage,
  selectLoadingStatus,
} from '../storage/superhero/selectors';
import { initializeSuperheroes } from '../storage/superhero/asyncActions';
import { LoadingStatus } from '../storage/superhero/types';
import SuperheroListItem from './SuperheroListItem';
import CircularIndeterminate from './CircularIndeterminate';

const SuperheroList: React.FC = () => {
  const dispatch = useAppDispatch();

  const superheroList = useAppSelector(selectSuperheroList);
  const currentPage = useAppSelector(selectCurrentPage);
  const loadingStatus = useAppSelector(selectLoadingStatus);

  React.useEffect(() => {
    dispatch(initializeSuperheroes({ page: currentPage, limit: 5 }));
  }, [currentPage, dispatch]);

  const renderSuperheroList = () => {
    if (loadingStatus === LoadingStatus.FULFILLED) {
      return superheroList.length !== 0 ? (
        superheroList.map((superhero) => <SuperheroListItem key={superhero.id} {...superhero} />)
      ) : (
        <div className="flex justify-center">The list of superheroes is empty.....</div>
      );
    } else {
      return <CircularIndeterminate />;
    }
  };
  return (
    <ul className=" flex flex-col w-full gap-4 mx-auto items-center min-h-screen h-full">
      {renderSuperheroList()}
    </ul>
  );
};

export default SuperheroList;
