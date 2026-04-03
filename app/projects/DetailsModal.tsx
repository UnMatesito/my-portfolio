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
      <div className="w-full h-full backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-gray-200/40 w-[1000px] max-w-[95vw] h-[620px] max-h-[90vh] rounded-sm font-helvetica shadow-lg flex flex-col">
          <div className="bg-black rounded-t-sm text-gray-500 font-bold text-center text-2xl py-1 shrink-0">
            <h1>{title}</h1>
          </div>

          <div className="font-light text-lg bg-gray-300/60 mx-2 mt-2 rounded-sm flex flex-row flex-1 min-h-0">
            <div className="bg-zinc-400/60 w-[340px] max-w-[35%] rounded-l-sm p-2 space-y-2 overflow-y-auto">
              {images.length > 0 ? (
                images.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={"Project image " + (index + 1)}
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

            <div className="flex flex-col flex-1 min-h-0">
              <div className="p-2 w-full flex-1 min-h-0 text-[18px] font-mono overflow-y-auto">
                <p>{description}</p>
              </div>

              <div className="p-2 w-full shrink-0 bg-linear-to-r from-zinc-900 to-transparent rounded-br-sm">
                <h2 className="font-bold text-lg text-white italic mb-1">Tech Stack:</h2>
                <div className="flex flex-row gap-1.5 flex-wrap">
                  {techStack.map((tech) => (
                    <TechPill key={tech.name} name={tech.name} logo={tech.icon} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-3 items-center shrink-0">
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