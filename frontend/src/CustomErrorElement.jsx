import { useRouteError } from "react-router-dom";

export function CustomErrorElement() {
    const error = useRouteError();
    return (
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#1a0b2e] via-[#2d1b4d] to-[#4a1d4d]">
            <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
            <p className="text-white">{error.message}</p>
        </div>
    );
}