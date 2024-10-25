import React from 'react';
import SuperheroList from '../components/SuperheroList';
import NewSuperhero from '../components/NewSuperhero';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  return (
    <div className="z-20 flex flex-col gap-5 h-fit bg-gradient-to-b  from-black to-gray-500 ">
      <h2 className="mx-auto text-3xl text-gray-200 mt-[-40px] ">Superhero database</h2>
      <NewSuperhero />
      <SuperheroList />
      <Pagination />
    </div>
  );
};

export default Home;
