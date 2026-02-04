import { Button } from "flowbite-react";

export default function Modal({ title, heading }: { title: string; heading: string }) {
    return (
        <div className="bg-gray-200 w-200 h-64 rounded-sm font-helvetica shadow-lg">
            <div className="bg-black rounded-t-sm text-gray-500 font-bold text-center text-lg">
                <h1>{title}</h1>
            </div>
            <div className="font-light text-lg bg-gray-300 text-center mx-2 rounded-sm h-42 flex flex-col justify-center">
                <p>{heading}</p>
            </div>
            <div className="flex justify-center mt-3 space-x-10">
                <Button className="font-bold rounded-full text-2xl text-black px-25 h-8 focus:ring-0" color="primary">
                    OK
                </Button>
            </div>
        </div>
    );
}