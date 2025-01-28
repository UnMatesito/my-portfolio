function GhButton({link}: {link: string}) {
    return (
        <div className="absolute lg:end-1 lg:bottom-6 lg:right-6 group lg:translate-y-0 md:translate-y-12 translate-y-20 z-20">
            <button className="bg-slate-800 rounded-full p-2 lg:w-14 h-14 flex items-center justify-center shadow-lg lg:hover:w-52 w-52 transition-all duration-300 lg:overflow-hidden group relative pb-3 lg:pb-0 lg:pt-0" onClick={() => window.open(link, "_blank")}>
                <i className="lg:absolute devicon-github-original text-4xl group-hover:static transition-all duration-300 mr-2 lg:mr-0"></i>
                <span className="font-medium lg:opacity-0 group-hover:opacity-100 group-hover:duration-500 group-hover:pl-2 whitespace-nowrap">Go to Repository</span>
            </button>
        </div>
    )
}

export default GhButton;