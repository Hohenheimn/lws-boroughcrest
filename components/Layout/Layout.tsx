import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import { BiMenuAltRight } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import SignOut from "./SignOut";

type Layout = {
    children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
    const [isProfileSearch, setProfileSearch] = useState(false);
    const [isPathName, setPathName] = useState<any>();
    const [toggleProfileMenu, setToggleProfileMenu] = useState(false);

    const router = useRouter();

    // toggle for responsive sidebar
    const [isHide, setHide] = useState<boolean>(false);
    const [isWindow, setWindow] = useState<any>();

    useEffect(() => {
        window.innerWidth <= 1024 ? setHide(true) : setHide(false);
        const updateSize = () => {
            window.innerWidth <= 1024 ? setHide(true) : setHide(false);
            setWindow(window.innerWidth);
        };
        window.addEventListener("resize", updateSize);
        setWindow(window.innerWidth);
    }, []);

    // run this code when the URL change
    // it opens the sidebar search when following asPath
    useEffect(() => {
        setPathName(router.asPath);
        if (
            router.asPath.includes("corporate/") ||
            router.asPath.includes("user/") ||
            router.asPath.includes("customer/") ||
            router.asPath.includes("property/")
        ) {
            setProfileSearch(true);
        } else {
            setProfileSearch(false);
        }
    }, [router.asPath]);

    return (
        <>
            <Head>
                <title>
                    Boroughcrest{" "}
                    {router.pathname.split("/")[1]
                        ? `- ${router.pathname.split("/")[1]}`
                        : "- dashboard"}
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>

            <div className="flex bg-MainBG bg-no-repeat bg-cover min-h-screen bg-Gray bg-blend-multiply">
                <AnimatePresence>
                    {!isHide && (
                        <Sidebar
                            isWindow={isWindow}
                            isProfileSearch={isProfileSearch}
                            setProfileSearch={setProfileSearch}
                            isPathName={isPathName}
                            setHide={setHide}
                        />
                    )}
                </AnimatePresence>

                <section className="flex flex-col 1024px:w-full calc-sidebar">
                    <div className="h-full w-full 1024px:p-5 1024px:py-10  p-10 relative">
                        {isWindow <= 1024 && (
                            <button
                                onClick={() => setHide(!isHide)}
                                className={`absolute z-[99]  right-5 top-3 text-[16px] duration-75 ease-in-out p-1 px-5 shadow-lg rounded-full ${
                                    isHide
                                        ? "bg-ThemeRed text-white"
                                        : "bg-white text-ThemeRed"
                                }`}
                            >
                                <BiMenuAltRight />
                            </button>
                        )}
                        <header
                            className={` flex ${
                                router.pathname === "/"
                                    ? "justify-between"
                                    : "justify-end"
                            } items-center mb-10 480px:flex-wrap 480px:justify-end`}
                        >
                            {router.pathname === "/" && (
                                <div
                                    className=" flex items-center px-8 py-4 bg-white flex-1 max-w-[600px] rounded-lg shadow-lg 640px:px-4 640px:py-2 480px:order-2
                            "
                                >
                                    <input
                                        type="text"
                                        className="flex-1 outline-none text-14px "
                                        placeholder="Search anything here..."
                                    />
                                    <BsSearch className=" mr-2 text-gray-500 text-[18px]" />
                                </div>
                            )}
                            <ul className=" flex items-center ml-5  480px:my-5">
                                <li className=" relative mr-5 cursor-pointer">
                                    <Tippy
                                        theme="ThemeRed"
                                        content={
                                            <span className="capitalize">
                                                Notification
                                            </span>
                                        }
                                    >
                                        <div>
                                            <IoNotificationsSharp className=" text-ThemeRed text-[32px]" />
                                        </div>
                                    </Tippy>

                                    <div className="absolute w-4 h-4 text-[11px] top-[-5%] right-[-8%] flex justify-center items-start rounded-full bg-Green text-white">
                                        1
                                    </div>
                                </li>
                                <li className=" flex items-center">
                                    <aside className=" w-10 h-10 rounded-full overflow-hidden relative shadow-lg mr-3">
                                        <Image
                                            src="/Images/sampleProfile.png"
                                            layout="fill"
                                            alt=""
                                        />
                                    </aside>
                                    <div className="relative">
                                        <p
                                            className="flex items-center cursor-pointer relative"
                                            onClick={() =>
                                                setToggleProfileMenu(
                                                    !toggleProfileMenu
                                                )
                                            }
                                        >
                                            John Doe{" "}
                                            <IoIosArrowDown className="ml-1 mt-1" />
                                        </p>
                                        {toggleProfileMenu && <SignOut />}
                                    </div>
                                </li>
                            </ul>
                        </header>
                        <main className="relative min-h-[100%]">
                            {children}
                        </main>
                    </div>
                    <footer className="w-full h-14 flex justify-end items-center px-10 1024px:px-5">
                        <p className=" text-ThemeRed text-sm 480px:text-[11px] font-medium">
                            2022 Boroughcrest Property Management Systems Corp.
                            All rights reserved.
                        </p>
                    </footer>
                </section>
            </div>
        </>
    );
}
