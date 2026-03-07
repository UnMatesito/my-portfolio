export default function TechPill({ key, name, logo }: { key:string; name: string; logo: string }) {
    return (
        <div id={key} className="bg-gray-200 text-gray-800 font-light px-4 py-1 rounded-full flex items-center justify-center text-[17px]">
            {name}
            <i className={`${logo} ml-2`}></i>
        </div>
    );
}