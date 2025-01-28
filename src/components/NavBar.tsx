import Sections from "./Sections";

function NavBar() {
  return (
    <nav className="flex items-center justify-center lg:justify-between p-3 lg:px-7 border-none rounded-xl lg:fixed absolute md:backdrop-blur-md w-screen z-50" aria-label="Global">
      <div>
        <a href="#intro" className="-m-1.5 p-1.5">
          <h1 className="text-3xl sm:text-2xl">Hi! My name is <span className="gradient font-semibold">Mateo</span></h1>
        </a>
      </div>
      <div className="hidden lg:flex items-center">
        <Sections></Sections>
      </div>
    </nav>
  );
}

export default NavBar;
