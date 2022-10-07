import React, { useRef, useEffect } from "react";
import { AiFillCamera } from "react-icons/ai";
import Link from "next/link";

type ModifyCustomer = {
    setToggleModify: Function;
};

export default function ModifyCustomer({ setToggleModify }: ModifyCustomer) {
    const modal = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setToggleModify(false);
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
                className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg"
            >
                <p className=" text-[16px] mb-3 font-bold">Modify Customer</p>
                <h1 className=" w-full text-[24px] mb-3">
                    Primary Information
                </h1>
                <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                    <aside className=" w-4/12 480px:w-2/4">
                        <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                            TYPE
                        </p>
                        <select
                            name=""
                            id=""
                            className="rounded-md text-black px-2 py-[2px] outline-none w-[90%] 480px:w-full"
                        >
                            <option value=""></option>
                        </select>
                    </aside>
                    <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                        <span className="mr-2 font-bold">STATUS</span>

                        <div
                            className=" h-5 w-5 rounded-full border-4 border-[#19d142] cursor-pointer"
                            style={{ boxShadow: "0 0 15px 0 #19d142" }}
                        ></div>
                    </aside>
                </div>
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
                                className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                            >
                                <AiFillCamera />
                            </label>
                        </aside>
                    </li>
                    <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <input type="file" id="image" className="hidden" />
                        <label
                            htmlFor="image"
                            className="text-[12px] text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                        >
                            <img
                                src="../../Images/id-sample.png"
                                alt=""
                                className=" w-24 mr-2"
                            />
                            UPLOAD VALID ID
                        </label>
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
                            ID
                        </label>
                        <input
                            type="text"
                            disabled={true}
                            className="w-[90%] bg-ThemeRed50 rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            CLASS
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
                        <label className=" text-[12px] font-semibold mb-1 uppercase w-[90%]">
                            NAME
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            SPOUSE / CO-OWNER
                        </label>
                        <input
                            type="email"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>

                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            CITIZENSHIP
                        </label>
                        <input
                            type="number"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            BIRTH DATE
                        </label>
                        <input
                            type="number"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
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
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            PROPERTY
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                </ul>
                <div className=" w-full flex justify-end items-center">
                    <button
                        className=" text-ThemeRed font-semibold text-[14px] mr-5"
                        onClick={() => setToggleModify(false)}
                    >
                        CANCEL
                    </button>
                    <button className=" text-white h-8 w-20 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px] mr-5">
                        NEXT
                    </button>
                </div>
            </section>
        </div>
    );
}
