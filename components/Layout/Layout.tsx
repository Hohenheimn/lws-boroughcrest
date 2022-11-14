import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import { BiMenuAltRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import SignOut from "./SignOut";
import PrompMessage from "../PrompMessage";
import { FadeSide } from "../Animation/SimpleAnimation";

type Layout = {
    children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
    const { togglePrompt, collapseSide, setCollapseSide } =
        useContext(AppContext);
    const [isProfileSearch, setProfileSearch] = useState(false);
    const [isPathName, setPathName] = useState<any>();
    const [toggleProfileMenu, setToggleProfileMenu] = useState(false);

    const router = useRouter();

    // toggle for responsive sidebar
    const [isWide, setWide] = useState(false);
    const [isHide, setHide] = useState<boolean>(false);
    const [isWindow, setWindow] = useState<any>();

    useEffect(() => {
        const updateSize = () => {
            window.innerWidth <= 820 ? setHide(true) : setHide(false);
            window.innerWidth <= 1024
                ? window.innerWidth <= 820
                    ? setCollapseSide(false)
                    : setCollapseSide(true)
                : setCollapseSide(false);
            setWindow(window.innerWidth);
        };
        window.addEventListener("resize", updateSize);
        setWindow(window.innerWidth);
    }, [isWindow]);

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
        if (router.query.id !== undefined) {
            setWide(true);
        } else {
            setWide(false);
        }
    }, [router.asPath]);

    console.log(isWide);

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

            <div className="flex min-h-screen bg-blend-multiply">
                <AnimatePresence>
                    {togglePrompt.toggle && <PrompMessage />}
                </AnimatePresence>

                <AnimatePresence>
                    {!isHide && (
                        <Sidebar
                            isProfileSearch={isProfileSearch}
                            setProfileSearch={setProfileSearch}
                            isPathName={isPathName}
                            setHide={setHide}
                            isWide={isWide}
                            isWindow={isWindow}
                        />
                    )}
                </AnimatePresence>

                <section
                    className={` transition-all duration-150 flex flex-col w-full bg-MainBG bg-no-repeat bg-cover h-screen overflow-auto ${
                        isWide === true ? "pl-wide" : "pl-no-wide"
                    } ${collapseSide && !isWide && "collapse_container"}`}
                >
                    <div className="flex-1 flex flex-col w-full 1550px:p-5 1550px:px-10 1024px:py-10 480px:pb-0 max  p-10 relative ">
                        {isWindow <= 1024 && (
                            <button
                                onClick={() => setHide(!isHide)}
                                className={`absolute z-[99]  right-5 top-3 text-[16px] duration-75 ease-in-out p-1 px-5 shadow-lg rounded-full ${
                                    isHide
                                        ? "bg-ThemeRed text-white"
                                        : "bg-white text-ThemeRed pointer-events-none"
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
                            } items-center justify-between mb-5 640px:mb-0 480px:flex-wrap 480px:justify-end`}
                        >
                            <AnimatePresence>
                                {collapseSide ? (
                                    <motion.div
                                        variants={FadeSide}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="relative h-20 w-48"
                                    >
                                        <Image
                                            src="/Images/deus.png"
                                            layout="fill"
                                            alt=""
                                        />
                                    </motion.div>
                                ) : (
                                    <p className="h-20"></p>
                                )}
                            </AnimatePresence>
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
                            <ul className=" flex items-center ml-5  480px:my-2">
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
                                            <IoNotificationsSharp className=" text-ThemeRed text-[32px] hover:scale-[1.3] transition duration-75" />
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
                        <main className="relative flex-1 flex flex-col">
                            {children}
                        </main>
                    </div>
                    <footer className="w-full py-5 flex justify-end items-center px-10 1024px:px-5">
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
