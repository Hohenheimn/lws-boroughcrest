import React, { useRef, useEffect } from "react";
import Image from "next/image";

type Modal_Image = {
  setView: Function;
  isView: string | null | undefined;
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
  });

  return (
    <div className=" fixed top-0 left-0 h-screen overflow-auto w-full bg-[#00000040] p-10 z-[99999] flex justify-center items-center origin-top 480px:p-5">
      <aside ref={modal} className=" relative bg-white w-10/12 h-[90vh]">
        {isView === undefined || isView === null || isView === "" ? (
          <h2>No Image Registered</h2>
        ) : (
          <Image
            src={isView}
            layout="fill"
            className=" w-full h-full"
            alt=""
            objectFit="contain"
          />
        )}
      </aside>
    </div>
  );
}
