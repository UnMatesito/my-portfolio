import Tech from "./Tech";

interface Technology {
    name: string;
    icon: string;
}

function Project({ title, description, technologies, image }: { title: string; description: string; technologies: Technology[]; image: string; }) {
    return (
        <div className="lg:flex lg:flex-row justify-around">
            <div className="text-slate-950 lg:w-[400px] content-center">
                <h1 className="text-5xl font-bold text-center mb-2 lg:mb-0 lg:text-left z-50 relative">{title}</h1>
                <p className="hidden lg:block mb-1">{description}</p>
                <div>
                    <h3 className="hidden lg:block text-xl mb-1">Used tecnologies</h3>
                    <div className="flex flex-wrap w-full gap-2 justify-center lg:justify-start z-50">
                        {technologies.map((tech, index) => (
                            <Tech key={index} name={tech.name} icon={tech.icon}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden lg:block w-[600px]">
                <img src={image} alt={title} className="w-full h-96 object-cover shadow-xl"></img>
            </div>
        </div>
    );
}

export default Project;