function Sections() {
    return (
        <div className="flex gap-x-20 lg:gap-x-12 justify-center flex-1 absolute left-1/2 transform -translate-x-1/2">
            <a href="#aboutMe" className="text-lg text-nowrap lg:text-md font-semibold active:text-gradientRed hover:scale-110 transition-transform">About Me</a>
            <a href="#projects" className="text-lg text-nowrap lg:text-md font-semibold active:text-gradientRed hover:scale-110 transition-transform">Proyects</a>
            <a href="#contact" className="text-lg lg:text-md font-semibold active:text-gradientRed hover:scale-110 transition-transform">Contact</a>
        </div>
    );
}

export default Sections;