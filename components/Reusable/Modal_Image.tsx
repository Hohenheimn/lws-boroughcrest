import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

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
  var FileSaver = require("file-saver");
  const downloadImage = (url: string) => {
    FileSaver.saveAs(url, "image.jpg");
  };

  return (
    <div className=" fixed top-0 left-0 h-screen overflow-auto w-full bg-[#00000040] z-[99999] flex justify-center items-center origin-top 480px:p-5">
      <aside ref={modal} className=" relative bg-white w-10/12 h-[90vh]">
        {isView === undefined || isView === null || isView === "" ? (
          <div className="flex w-full h-full items-center justify-center">
            <h2>No Image Registered</h2>
          </div>
        ) : (
          <div className=" relative w-full h-full flex justify-center items-center">
            <button
              className="buttonRed absolute bottom-4 right-4"
              onClick={() =>
                downloadImage(
                  `https://boroughcrest-api.lws.codes/get-img?image=${isView}`
                )
              }
            >
              Download
            </button>
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
            >
              <TransformComponent>
                <img
                  src={`https://boroughcrest-api.lws.codes/get-img?image=${isView}`}
                  alt="test"
                  className=" min-h-full min-w-full object-contain object-center"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        )}
      </aside>
    </div>
  );
}
