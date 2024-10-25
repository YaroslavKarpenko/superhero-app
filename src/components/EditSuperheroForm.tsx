import { useFormik } from 'formik';
import React from 'react';
import api from '../api/superhero';
import { initializeSuperheroes } from '../storage/superhero/asyncActions';
import { useAppDispatch, useAppSelector } from '../storage/hooks';
import { Superhero } from '../../server/src/types';
import { selectCurrentPage } from '../storage/superhero/selectors';
import DoneIcon from '@mui/icons-material/Done';

const EditSuperheroForm: React.FC<Superhero> = ({
  id,
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);

  const formik = useFormik({
    initialValues: {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: [],
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append('nickname', values.nickname);
        formData.append('real_name', values.real_name);
        formData.append('origin_description', values.origin_description);
        formData.append('superpowers', values.superpowers);
        formData.append('catch_phrase', values.catch_phrase);

        if (values.images && values.images.length > 0) {
          for (let i = 0; i < values.images.length; i++) {
            formData.append('images', values.images[i]);
          }
        }

        await api.updateSuperhero(id!, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        alert('Superhero successfully updated.');
        dispatch(initializeSuperheroes({ page: currentPage, limit: 5 }));
      } catch (error) {
        console.error('Error updating superhero:', error);
        alert(`Failed to update superhero. Please try again. ${error.response.data}`);
      }
    },
  });

  return (
    <div className="flex flex-col text-gray-200">
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-3 gap-4 items-center text-lg">
        <label className="col-span-1 font-bold">★ Nickname:</label>
        <input
          className="flex col-span-2 w-full h-full overflow-hidden resize-none p-1 text-black bg-gray-200 rounded-md"
          id="nickname"
          name="nickname"
          onChange={formik.handleChange}
          value={formik.values.nickname}
        />

        <div className="col-span-1 font-bold">★ Real Name:</div>
        <input
          className="flex col-span-2 w-full h-full overflow-hidden resize-none p-1 text-black bg-gray-200 rounded-md"
          id="real_name"
          name="real_name"
          onChange={formik.handleChange}
          value={formik.values.real_name}
        />

        <div className="col-span-1 font-bold">★ Origin Description:</div>
        <textarea
          className="flex col-span-2 w-full h-full overflow-hidden resize-none p-1 text-black bg-gray-200 rounded-md"
          id="origin_description"
          name="origin_description"
          onChange={formik.handleChange}
          value={formik.values.origin_description}
        />

        <div className="col-span-1 font-bold">★ Superpowers:</div>
        <textarea
          className="flex col-span-2 w-full h-full overflow-hidden resize-none p-1 text-black bg-gray-200 rounded-md"
          id="superpowers"
          name="superpowers"
          onChange={formik.handleChange}
          value={formik.values.superpowers}
        />

        <div className="col-span-1 font-bold">★ Catch Phrase:</div>
        <input
          className="flex col-span-2 w-full h-full overflow-hidden resize-none p-1 text-black bg-gray-200 rounded-md"
          id="catch_phrase"
          name="catch_phrase"
          onChange={formik.handleChange}
          value={formik.values.catch_phrase}
        />

        <div className="col-span-1 font-bold">★ Images:</div>
        <input
          type="file"
          accept=".jpg, .png, .img"
          id="images"
          name="images"
          multiple
          onChange={(event) => {
            const files = event.currentTarget.files;
            if (files) {
              formik.setFieldValue('images', Array.from(files));
            }
          }}
        />
      </form>
      <button
        type="button"
        onClick={() => formik.submitForm()}
        className="flex shadow-md justify-center mx-auto mt-8  h-8 w-fit items-center gap-1 border-2 border-gray-200 border-solid rounded-md p-2 text-gray-200 hover:text-gray-400 hover:border-gray-400 transition-all	duration-200	ease-in-o">
        <DoneIcon color="inherit" fontSize="large" />
        <span className="text-xl">Submit</span>
      </button>
    </div>
  );
};

export default EditSuperheroForm;
