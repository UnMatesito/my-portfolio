function HeroSection() {
  return (
    <div className="flex flex-row items-center h-screen justify-center ">
      <div className="flex flex-col justify-center basis-1/2">
        <div className="sm:m-5 m-[-50px] z-50">
          <h1 className="font-semibold text-6xl sm:text-8xl pb-2 text-center sm:text-left z-50">Mateo Suarez</h1>
          <p className="text-2xl">I'm a 19-year-old geek from <span className="font-semibold">Argentina</span>. I started 3d modelling at 16 and programming at 17, currently I am doing a degree in computer science in Universidad Nacional de La Plata. I always like to investigate about new tecnologies and how can I use them efficently to complete tasks satisfactorily.</p>
          <p className="text-2xl">Also I am very adaptive to a changing working environment and working together is always a priority.</p>
          <h3 className="font-semibold italic text-2xl pb-3 text-center sm:text-left">Tecnologies I use</h3>
          <div id="technologies" className="flex flex-row text-3xl sm:text-5xl space-x-3 justify-center sm:justify-start">
            <i className="devicon-html5-plain"></i>
            <i className="devicon-css3-plain"></i>
            <i className="devicon-javascript-plain"></i>
            <i className="devicon-java-plain"></i>
            <i className="devicon-blender-original"></i>
        </div>
        </div>
      </div>
      <img src="me.jpg" alt="myself" className="max-w-lg h-auto object-cover basis-1/2 hidden absolute lg:block md:static z-20"></img>
    </div>
  );
}

export default HeroSection;