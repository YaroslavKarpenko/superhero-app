import Home from './pages/Home';

function App() {
  return (
    <div className="flex flex-col mx-auto min-h-[100vh] h-full ">
      <div className="relative w-full h-[150px] z-0">
        <img
          className=" absolute left-0 top-0 w-full h-full object-cover object-center"
          src={'superhero-svj3txxxmkdcrjzj.jpg'}
          alt="Superheroes Background"
        />
        <div className=" absolute left-0 top-0 w-full h-full bg-gradient-to-t from-black to-gray-500/10"></div>
      </div>
      <Home />
    </div>
  );
}

export default App;

