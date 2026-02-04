import Image from "next/image";
import Link from "next/link";

export default function ContactCard({image, title}: {image: string, title: string}) {
    return (
        <Link href="https://discord.com">
            <div className="bg-black/40 h-45 w-150 rounded-md relative hover:scale-105 transition-transform cursor-pointer shadow-xl">
                <Image 
                    src={image}
                    alt={title + "_image"}
                    fill
                    className="object-cover rounded-md opacity-50"
                />
                <h1 className="font-helvetica font-bold text-white drop-shadow-lg text-4xl flex h-full items-end p-4 tracking-wide">{title}</h1>
            </div>
        </Link>
    );
}