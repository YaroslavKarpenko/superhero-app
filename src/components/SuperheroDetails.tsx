import React from 'react';
import ImageSlider from './ImageSlider';
import { Superhero } from '../../server/src/types';

const SuperheroDetails: React.FC<Superhero> = ({
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  images,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center text-lg">
      <div className="col-span-1 font-bold">★ Nickname:</div>
      <div className="col-span-2">{nickname}</div>

      <div className="col-span-1 font-bold">★ Real Name:</div>
      <div className="col-span-2">{real_name}</div>

      <div className="col-span-1 font-bold">★ Origin Description:</div>
      <div className="col-span-2">{origin_description}</div>

      <div className="col-span-1 font-bold">★ Superpowers:</div>
      <div className="col-span-2">{superpowers}</div>

      <div className="col-span-1 font-bold">★ Catch Phrase:</div>
      <div className="col-span-2">{catch_phrase}</div>

      <div className="col-span-1 font-bold">★ Images:</div>
      {<ImageSlider imagesList={images} />}
    </div>
  );
};

export default SuperheroDetails;
