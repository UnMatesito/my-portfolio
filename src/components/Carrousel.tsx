import { useState } from "react";
import projData from "../Projects.json";
import Project from "./Project";
import GhButton from "./GhButton";

function Carrousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Function to go to the next item
  function next() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projData.length);
  }

  // Function to go to the previous item
  function prev() {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + projData.length) % projData.length
    );
  }
  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className={`relative md:w-[80%] w-[100%] h-full lg:h-3/4 bg-zinc-300 lg:bg-none lg:shadow-2xl shadow-gradientPurple flex flex-row items-center justify-center gap-3`}>
        <img src={projData[currentIndex].image} alt={projData[currentIndex].title} className="absolute w-[100%] h-[100%] object-cover z-10 blur-sm lg:hidden" />
        {/*Left Arrow*/}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:size-9 stroke-2 stroke-black ml-5 select-none hover:scale-125 transition-transform active:scale-100 z-20 size-14" onClick={prev}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>

        {/*Carrousel*/}
        <div className="relative lg:h-96 md:h-[17%] h-[30%] w-full overflow-hidden z-20">
            {projData.map((proj, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-500 ${
                  index === currentIndex ? "translate-x-0" : index < currentIndex ? "-translate-x-full" : "translate-x-full"
                }`}
              >
                <Project
                  title={proj.title}
                  description={proj.description}
                  technologies={proj.technologies}
                  image={proj.image}
                />
              </div>
            ))}
          </div>

        {/*Right Arrow*/}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:size-9 stroke-2 stroke-black mr-5 select-none hover:scale-125 transition-transform active:scale-100 z-20 size-14" onClick={next}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>

        {/*Github button*/}
        <GhButton link={projData[currentIndex].link}></GhButton>
      </div>
    </div>
  );
}

export default Carrousel;