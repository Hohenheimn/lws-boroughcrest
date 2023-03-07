import React, { useRef, useEffect, useContext } from "react";
import AppContext from "..//Context/AppContext";
import Image from "next/image";

type Modal_Image = {
    setView: Function;
    isView: string | null | undefined;
};

export default function Modal_Image({ setView, isView }: Modal_Image) {
    const modal = useRef<any>();

    const { ImgUrl } = useContext(AppContext);

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setView("");
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <div className=" fixed top-0 left-0 h-screen overflow-auto w-full bg-[#00000040] p-10 z-50 flex justify-center items-center origin-top 480px:p-5">
            <section
                ref={modal}
                className=" p-10 bg-[#e2e3e4ef] rounded-lg w-[90%] max-w-[700px] text-ThemeRed shadow-lg"
            >
                <aside className="w-full aspect-[1.8/1] relative flex justify-center items-center">
                    {isView === undefined ||
                    isView === null ||
                    isView === "" ? (
                        <h2>No Image Registered</h2>
                    ) : (
                        <Image src={ImgUrl + isView} layout="fill" alt="" />
                    )}
                </aside>
            </section>
        </div>
    );
}
