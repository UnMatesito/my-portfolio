import Title from "./components/Title";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import Carrousel from "./components/Carrousel";
import HeroSection from "./components/HeroSection";
import ContactCards from "./components/ContactCards";

function App() {
    return (
        <div className="w-screen h-screen text-white bg-background">
            <div>
                <NavBar></NavBar>
                <div id="intro" className="container h-auto mx-auto">
                    <Title></Title>
                </div>
                <div id="aboutMe">
                    <HeroSection></HeroSection>
                </div>
                <div id="proyects">
                    <Carrousel></Carrousel>
                </div>
                <div id="contact">
                    <h2 className="text-center">Let's start a new project together!</h2>
                    <ContactCards></ContactCards>
                </div>
                <FooterBar></FooterBar>
            </div>
        </div>
    );
}

export default App;