import React from "react";
import { PulseLoader } from "react-spinners";

export default function ModalLoading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 bg-[#00000040]">
            <PulseLoader size={20} color="#8f384d" />
        </div>
    );
}
