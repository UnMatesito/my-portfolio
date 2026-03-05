import { Button } from "flowbite-react";
import Image from "next/image";

export default function Modal({
  title,
  heading,
  onClose,
}: {
  title: string;
  heading: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="bg-gray-200/40 w-200 h-150 rounded-sm font-helvetica shadow-lg z-100 flex flex-col justify-center">
        <div className="bg-black rounded-t-sm text-gray-500 font-bold text-center text-lg z-10">
          <h1>{title}</h1>
        </div>
        <div className="font-light text-lg bg-gray-300/60 mx-2 rounded-sm flex flex-row h-full">
          <div className="bg-zinc-400/60 w-2/4 rounded-l-sm p-2 space-y-2">
            <img src="https://placehold.co/600x400" alt="placeholder1" className=""></img>
            <img src="https://placehold.co/600x400" alt="placeholder2" className=""></img>
            <img src="https://placehold.co/600x400" alt="placeholder3" className=""></img>
          </div>
          <p className="p-2 w-full">{heading}</p>
        </div>
        <div className="flex justify-center my-3 space-x-10">
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
  );
}