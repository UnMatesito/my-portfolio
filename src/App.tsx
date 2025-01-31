import NavBar from "./components/NavBar";
import Title from "./components/Title";
import HeroSection from "./components/HeroSection";
import RotatingCube from "./components/RotatingCube";
import RotatingIco from "./components/RotatingIco";
import Carrousel from "./components/Carrousel";
import RotatingTorus from "./components/RotatingTorus";
import ContactCards from "./components/ContactCards";
import Sections from "./components/Sections";

function App() {
    return (
        <div className="text-white">
                <NavBar></NavBar>

                {/* Intro Section */}
                <section id="intro" className="md:w-[50%] md:mx-auto w-[100%]">
                    <Title></Title>
                </section>

                { /* About Me Section */}
                <section id="aboutMe">
                    <div className="absolute lg:w-[500px] lg:h-[500px] lg:translate-x-[1350px] lg:translate-y-6 w-[200px] h-[200px] translate-x-[13rem] translate-y-[3rem] md:translate-x-[30rem] md:translate-y-[5rem]">
                        <RotatingCube></RotatingCube>
                    </div>
                    <HeroSection></HeroSection>
                </section>

                {/* Projects Section */}
                <section id="projects">
                    <div className="absolute lg:w-[300px] lg:h-[300px] z-30 lg:translate-y-[37rem] lg:translate-x-[50px]">
                        <RotatingIco></RotatingIco>
                    </div>
                    <Carrousel></Carrousel>
                </section>

                {/* Contact Section */}
                <section id="contact">
                    <div className="absolute w-[100%] h-[100%] -z-10">
                        <RotatingTorus></RotatingTorus>
                    </div>
                    <div className="h-screen content-center">
                        <h2 className="text-center font-bold pb-10 text-4xl md:text-5xl z-50">Let's start a new project together!</h2>
                        <ContactCards></ContactCards>
                    </div>
                </section>
                    
                {/* Footer Bar */}
                <footer className="fixed bottom-0 left-0 w-full z-20">
                    <div className="translate-y-[-3rem] lg:hidden">
                        <Sections></Sections>
                    </div>
                    <div className="h-1.5 bg-gradient-to-r from-gradientOrange via-gradientRed to-gradientPurple"></div>
                </footer>
        </div>
    );
}

export default App;