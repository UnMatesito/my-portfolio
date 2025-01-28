function Tech({ name, icon }: { name: string; icon: string}) {
    return (
        <div className="border-2 border-solid border-slate-600 rounded-full pl-3 pr-3 pt-1 pb-1 bg-slate-600 text-white font-medium">{name}&nbsp;&nbsp;<i className={icon}></i></div>
    );
}

export default Tech;