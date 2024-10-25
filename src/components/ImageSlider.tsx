import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import React from 'react';

const ImageSlider: React.FC = ({ imagesList }) => {
  return (
    <Splide
      className=""
      hasTrack={false}
      options={{
        speed: 1000,
        height: '150px',
        width: '200px',
        type: 'slide',
        perPage: 1,
        perMove: 1,
        gap: '',
        pagination: false,
        arrows: true,
      }}
      aria-label="My Images">
      <SplideTrack className="relative">
        {imagesList.map((img, index) => (
          <SplideSlide key={index} className="flex justify-center">
            <img src={img} className="w-full h-full object-cover" />
          </SplideSlide>
        ))}
      </SplideTrack>

      <div
        className={` splide__arrows absolute inset-0 flex justify-between items-center ${
          !imagesList[0] && 'hidden'
        }`}>
        <button className=" absolute left-[-20px] splide__arrow splide__arrow--prev bg-gray-300 text-black border border-solid border-black rounded-full p-2">
          &lt;
        </button>
        <button className=" absolute right-[-20px] splide__arrow splide__arrow--next bg-gray-300 text-black border border-solid border-black rounded-full p-2">
          &gt;
        </button>
      </div>
    </Splide>
  );
};

export default ImageSlider;
