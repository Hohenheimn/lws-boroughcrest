import React, { useRef, useEffect } from "react";

type Modal_Image = {
    setView: Function;
    isView: string;
};

export default function Modal_Image({ setView, isView }: Modal_Image) {
    const modal = useRef<any>();

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
    }, []);

    return (
        <div className=" fixed top-0 left-0 h-screen overflow-auto w-full bg-[#00000040] p-10 z-50 flex justify-center items-center origin-top 480px:p-5">
            <section
                ref={modal}
                className=" p-10 bg-[#e2e3e4ef] rounded-lg w-[90%] max-w-[700px] text-ThemeRed shadow-lg"
            >
                <img
                    src="../../../Images/id-sample.png"
                    className="w-full h-auto"
                    alt=""
                />
            </section>
        </div>
    );
}
