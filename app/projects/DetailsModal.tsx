import { Button } from "flowbite-react";
import Image from "next/image";
import TechPill from "../components/TechPill";

export default function Modal({
  title,
  description,
  images,
  techStack,
  onClose,
}: {
  title: string;
  description: string;
  images: string[];
  techStack: { name: string; icon: string }[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center animate-appear-from-bottom">
      <div className="backdrop-blur-xs">
        <div className="bg-gray-200/40 w-250 min-h-150 h-full max-h-250 rounded-sm font-helvetica shadow-lg z-100 flex flex-col justify-center">
          <div className="bg-black rounded-t-sm text-gray-500 font-bold text-center text-2xl z-10 py-1">
            <h1>{title}</h1>
          </div>
          <div className="font-light text-lg bg-gray-300/60 mx-2 rounded-sm flex flex-row h-full">
            <div className="bg-zinc-400/60 w-85 rounded-l-sm p-2 space-y-2">
            {images.length > 0 ? (
              images.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Project image ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="rounded-sm object-cover w-full h-40"
                />
              ))
            ) : (
              <div className="w-full h-48 rounded-sm flex items-center justify-center">
                <span className="text-gray-600 italic">No images available</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="p-2 w-full h-3/4 text-[18px] font-mono overflow-y-auto">
              <p>{description}</p>
            </div>
            <div className="p-2 w-full h-1/4 bg-linear-to-r from-zinc-900 to-transparent rounded-br-sm">
              <h2 className="font-bold text-lg text-white italic mb-1">Tech Stack:</h2>
              <div className="flex flex-row gap-1.5 flex-wrap">
                {techStack.map((tech) => (
                  <TechPill key={tech.name} name={tech.name} logo={tech.icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-3 items-center">
          <Button
            className="font-bold rounded-full text-2xl text-black px-25 h-8 focus:ring-0"
            color="primary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}