import React, { useRef, useEffect } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

export default function NewUser() {
    const modal = useRef<any>();
    const router = useRouter();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                router.push("");
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
                <p className=" text-[16px] mb-3 font-bold">Create User</p>
                <h1 className=" w-[95%] text-[12px] flex items-center justify-end mb-5">
                    <span className="mr-2 font-bold">STATUS</span>

                    <div
                        className=" h-5 w-5 rounded-full border-4 border-[#19d142] cursor-pointer"
                        style={{ boxShadow: "0 0 15px 0 #19d142" }}
                    ></div>
                </h1>
                <ul className=" flex mb-5 flex-wrap 480px:mb-2">
                    <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <aside className="w-20 h-20 relative flex mr-4">
                            <img
                                src=""
                                alt=""
                                className=" bg-white h-full w-full rounded-full object-cover shadow-lg"
                            />
                            <input type="file" id="image" className="hidden" />
                            <label
                                htmlFor="image"
                                className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[-10px] bottom-[-5px]"
                            >
                                <AiFillCamera />
                            </label>
                        </aside>
                    </li>
                    <li className="  flex flex-col w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 w-[90%]">
                            NAME
                        </label>
                        <input
                            type="text"
                            className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                        <label
                            className=" text-[12px] font-NHU-medium mb-1 uppercase cursor-pointer w-[90%] 480px:w-full"
                            htmlFor="file"
                        >
                            Upload Signature
                        </label>
                        <input id="file" type="file" className="hidden" />
                    </li>
                </ul>
                <ul className=" flex mb-10 flex-wrap 480px:mb-2">
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            POSITION
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            EMPLOYEE ID
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase w-[90%]">
                            DEPARTMENT
                        </label>
                        <select
                            name=""
                            id=""
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        >
                            <option value=""></option>
                        </select>
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            EMAIL
                        </label>
                        <input
                            type="email"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>

                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            MOBILE
                        </label>
                        <input
                            type="number"
                            placeholder="+63"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            CORPORATE
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
                <div className=" w-full flex justify-end items-center">
                    <Link href="">
                        <a className=" text-ThemeRed font-semibold text-[14px] mr-5">
                            Cancel
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
