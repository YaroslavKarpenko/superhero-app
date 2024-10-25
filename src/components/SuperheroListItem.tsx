import React from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Superhero } from '../../server/src/types';
import api from '../api/superhero';
import { useAppDispatch, useAppSelector } from '../storage/hooks';
import { initializeSuperheroes } from '../storage/superhero/asyncActions';
import { selectCurrentPage } from '../storage/superhero/selectors';
import EditSuperheroForm from './EditSuperheroForm';
import SuperheroDetails from './SuperheroDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const SuperheroListItem: React.FC<Superhero> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [formIsVisible, setFormIsVisible] = React.useState<boolean>(false);

  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  const showImgAndNickname = () => {
    return (
      <div className="grid grid-cols-3 w-full text-lg text-gray-200 items-center">
        {props.images[0] ? (
          <img
            className=" col-span-1 flex ml-14 items-center justify-center rounded-sm  border border-gray-200 w-20 h-20 object-cover"
            src={props.images[0]}
          />
        ) : (
          <img
            className=" col-span-1 flex ml-14 items-center justify-center rounded-sm  border border-gray-200 w-20 h-20 object-cover"
            src={'photo_2024-10-25_04-35-40.jpg'}
          />
        )}
        <title className=" col-span-1 flex items-center justify-center text-xl text-gray-200">
          {props.nickname}
        </title>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="flex shadow-md justify-center mx-auto  h-8 w-fit items-center gap-1 border border-gray-200 border-solid rounded-md p-2 text-gray-200 hover:text-gray-400 hover:border-gray-400 transition-all	duration-200	ease-in-o">
          <ExpandMoreIcon color="inherit" />
          <span className="text-xl">More</span>
        </button>
      </div>
    );
  };

  const handleDeleteSuperhero = async () => {
    if (confirm('Are you sure you want to delete this superhero?')) {
      try {
        await api.removeSuperhero(props.id!);
        alert('Superhero successfully deleted.');

        dispatch(initializeSuperheroes({ page: currentPage, limit: 5 }));
      } catch (error) {
        console.error('Error deleting superhero:', error);
        alert('Failed to delete superhero. Please try again.');
      }
    }
  };

  const showDetails = () => {
    return (
      <div className="flex flex-col gap-4 mx-auto text-gray-200">
        <div className="grid grid-cols-3">
          {formIsVisible ? (
            <button
              onClick={() => {
                setFormIsVisible(!formIsVisible);
              }}
              className="flex shadow-md justify-center mx-auto mt-1  h-8 w-fit items-center gap-1 border border-gray-200 border-solid rounded-md p-2 text-gray-200 hover:text-gray-400 hover:border-gray-400 transition-all	duration-200	ease-in-o">
              <CancelIcon color="inherit" />
              <span className="text-xl">Cancel</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setFormIsVisible(!formIsVisible);
              }}
              className="flex shadow-md justify-center mx-auto mt-1  h-8 w-fit items-center gap-1 border border-gray-200 border-solid rounded-md p-2 text-gray-200 hover:text-gray-400 hover:border-gray-400 transition-all	duration-200	ease-in-o">
              <EditIcon color="inherit" />
              <span className="text-xl">Edit</span>
            </button>
          )}
          <button
            onClick={handleDeleteSuperhero}
            className="flex shadow-md justify-center mx-auto mt-1  h-8 w-fit items-center gap-1 border border-gray-200 border-solid rounded-md p-2 text-gray-200 hover:text-gray-400 hover:border-gray-400 transition-all	duration-200	ease-in-o">
            <DeleteIcon color="inherit" />
            <span className="text-xl">Delete</span>
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex shadow-md justify-center mx-auto mt-1  h-8 w-fit items-center gap-1 border border-gray-200 border-solid rounded-md p-2 text-gray-200 hover:text-gray-400 hover:border-gray-400 transition-all	duration-200	ease-in-o">
            <ExpandLessIcon color="inherit" />
            <span className="text-xl">Less</span>
          </button>
        </div>
        {formIsVisible ? <EditSuperheroForm {...props} /> : <SuperheroDetails {...props} />}
      </div>
    );
  };

  return (
    <li
      className={`flex flex-row px-4 py-1 items-center justify-between gap-10 w-[600px] h-20 ${
        isOpen && 'h-fit'
      } border-solid border shadow-xl box-content border-gray-200 rounded-md px-2 cursor-pointer`}>
      {isOpen ? showDetails() : showImgAndNickname()}
    </li>
  );
};

export default SuperheroListItem;
