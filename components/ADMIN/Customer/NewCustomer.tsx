import React, { useRef, useEffect, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NewCustomer() {
    const modal = useRef<any>();
    const router = useRouter();

    const [isProfileUrl, setProfileUrl] = useState();
    const [isValidIDUrl, setValidIDUrl] = useState("../Images/id-sample.png");
    const DisplayImage = (e: any) => {
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (
                ["image/jpeg", "image/png", "image/svg+xml"].includes(
                    selectedImage.type
                )
            ) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);

                ImageReader.addEventListener("load", (event: any) => {
                    if (e.target.getAttribute("data-type") === "profile") {
                        setProfileUrl(event.target.result);
                    }
                    if (e.target.getAttribute("data-type") === "validID") {
                        setValidIDUrl(event.target.result);
                    }
                });
            } else {
                alert("Invalid Image File");
            }
        } else {
            alert("Nothing Happens");
        }
    };

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
                className=" p-10 bg-[#e2e3e4] rounded-lg w-[90%] max-w-[800px] text-ThemeRed shadow-lg"
            >
                <p className=" text-[16px] mb-3 font-bold">Create Customer</p>
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
                                src={isProfileUrl}
                                alt=""
                                className=" bg-white h-full w-full rounded-full object-cover shadow-lg"
                            />
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                                onChange={DisplayImage}
                                data-type="profile"
                            />
                            <label
                                htmlFor="image"
                                className=" cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                            >
                                <AiFillCamera />
                            </label>
                        </aside>
                    </li>
                    <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <input
                            type="file"
                            id="validid"
                            className="hidden"
                            onChange={DisplayImage}
                            data-type="validID"
                        />
                        <label
                            htmlFor="validid"
                            className="text-[12px] text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                        >
                            <img
                                src={isValidIDUrl}
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
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            COMPANY NAME
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            CONTACT PERSON
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
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
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            TIN
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            BRANCH CODE
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                    <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5">
                        <label className=" text-[12px] font-semibold mb-1 uppercase">
                            PORTAL ID
                        </label>
                        <input
                            type="text"
                            className="w-[90%] rounded-md text-black px-2 py-[2px] outline-none 480px:w-full"
                        />
                    </li>
                </ul>
                <div className=" w-full flex justify-end items-center">
                    <Link href="">
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
