function Card({ title, logo}: { title: string; logo: string;}) {
  return (
    <div className="hover:bg-backgroundBlack bg-none transition ease-in-out flex flex-col justify-center lg:border-2 rounded-xl lg:rounded-3xl h-[12rem] w-[12rem] lg:w-[18rem] lg:h-[18rem] xl:w-490 xl:h-490 hover:scale-110">
        <div className="flex text-9xl justify-center lg:mb-5 z-20">
          <i className={logo}></i>
        </div>
        <div className="font-bold text-center opacity-0 lg:text-3xl xl:text-5xl lg:opacity-100 absolute lg:static z-20">
          <h2>{title}</h2>
        </div>
    </div>
  );
}

export default Card;