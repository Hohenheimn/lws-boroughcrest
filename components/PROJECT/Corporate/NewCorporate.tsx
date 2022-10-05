import React, { useRef, useEffect } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NewCorporate() {
    const modal = useRef<any>();
    const router = useRouter();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                router.push("/project/corporate");
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    }, []);
    return (
        <div className=" fixed top-0 left-0 h-screen overflow-auto w-full bg-[#00000040] p-10 z-50 flex justify-center items-center 820px:items-start 480px:p-0 480px:py-5">
            <section
                ref={modal}
                className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[700px] text-ThemeRed shadow-lg"
            >
                <p className=" text-[16px] mb-3">Create Corporate</p>
                <h1 className=" w-full text-[24px] mb-3">
                    Primary Information
                </h1>
                <ul className=" flex mb-10 flex-wrap 480px:mb-2">
                    <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <aside className="w-10 h-10 relative flex mr-4">
                            <img
                                src=""
                                alt=""
                                className=" bg-white h-full w-full object-cover"
                            />
                            <input type="file" id="image" className="hidden" />
                            <label
                                htmlFor="image"
                                className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[-10px] bottom-[-5px]"
                            >
                                <AiFillCamera />
                            </label>
                        </aside>
                        <label
                            htmlFor="image"
                            className=" text-[12px] font-semibold"
                        >
                            UPLOAD LOGO
                        </label>
                    </li>
                    <li className="  flex flex-col w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 w-[90%]">
                            ID
                        </label>
                        <input
                            type="text"
                            value="123"
                            disabled={true}
                            className="rounded-md bg-[#cdb8be] text-black px-2 py-[2px]  w-[90%] 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase  w-[90%]">
                            Corporate Name
                        </label>
                        <input
                            type="text"
                            className="rounded-md text-black px-2 py-[2px] outline-none  w-[90%]  480px:w-full"
                        />
                    </li>
                </ul>
                <p className=" text-[16px]">TIN</p>
                <ul className=" flex mb-10 flex-wrap 480px:mb-2">
                    <li className=" flex justify-between  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <div className=" w-[90%] flex justify-between  480px:w-full">
                            <div className=" w-[48%]">
                                <label className=" text-[12px] font-semibold mb-1 uppercase">
                                    TIN Number
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-md text-black px-2 py-[2px] outline-none text-[12px]"
                                />
                            </div>
                            <div className=" w-[48%]">
                                <label className=" text-[12px] font-semibold mb-1 uppercase">
                                    Branch Code
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-md text-black px-2 py-[2px] outline-none text-[12px]"
                                />
                            </div>
                        </div>
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase w-[90%]">
                            RDO NO.
                        </label>
                        <input
                            type="text"
                            className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            GST TYPE.
                        </label>
                        <select
                            name=""
                            id=""
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        >
                            <option value=""></option>
                        </select>
                    </li>
                </ul>
                <ul className=" flex gap-5 mb-8 820px:flex-wrap 820px:justify-between">
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            SEC. Registration
                        </label>
                        <input
                            type="text"
                            className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                        />
                    </li>
                    <li className=" flex-1 flex flex-col w-[48%]"></li>
                    <li className=" flex-1 flex flex-col w-[48%]"></li>
                </ul>
                <div className=" w-full flex justify-end items-center">
                    <Link href="/project/corporate">
                        <a className=" text-ThemeRed font-semibold text-[14px] mr-5">
                            CANCEL
                        </a>
                    </Link>
                    <button className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                        NEXT
                    </button>
                </div>
            </section>
        </div>
    );
}
