import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Sidebar } from "./PagesUrl";
import { MdArrowForwardIos } from "react-icons/md";
import { BiMenuAltRight } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import MenuLink from "./MenuLink";
import Submenu from "./Submenu";
import { FadeSide } from "../Animation/SimpleAnimation";
import { BsSearch } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { imgProfile } from "../../public/Images/Image";
import Image from "next/image";
import CorporateSearch from "../Search/CorporateSearch";
import UserSearch from "../Search/UserSearch";
import CustomerSearch from "../ADMIN/Customer/CustomerSearch";

type Layout = {
    children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
    const [isProfileSearch, setProfileSearch] = useState(false);
    const [isPathName, setPathName] = useState<any>();

    const router = useRouter();
    const ValidateParentUrl = router.pathname.split("/")[1];
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
    // it opens the sidebar search when in user or corporate Detail
    useEffect(() => {
        setPathName(router.asPath);
        if (
            router.asPath.includes("corporate/") ||
            router.asPath.includes("user/") ||
            router.asPath.includes("customer/")
        ) {
            setProfileSearch(true);
        } else {
            setProfileSearch(false);
        }
    }, [router.asPath]);

    return (
        <>
            <Head>
                <title>Boroughcrest</title>
            </Head>
            <div className="flex bg-MainBG bg-no-repeat bg-cover min-h-screen bg-Gray bg-blend-multiply">
                <AnimatePresence>
                    {!isHide && (
                        <>
                            <motion.aside
                                variants={FadeSide}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={`${
                                    isWindow <= 1024 &&
                                    "fixed top-0 left-0 z-50 bg-[#ebedf2f6]"
                                } w-[400px] 1920px:w-[350px] 1280px:w-[300px] border-r-2 border-white min-h-full pt-5 flex flex-col`}
                            >
                                <div className=" w-full flex justify-center">
                                    <img src="/Images/deus.png" alt="" />
                                </div>

                                <div className="w-full h-full flex flex-1">
                                    <ul
                                        className={` self-start pt-10 ${
                                            !isProfileSearch && "w-full"
                                        }`}
                                    >
                                        <div className=" flex justify-between items-center px-5 mb-5 duration-75">
                                            <AnimatePresence>
                                                {!isProfileSearch && (
                                                    <motion.h1
                                                        variants={FadeSide}
                                                        initial="initial"
                                                        animate="animate"
                                                        exit="exit"
                                                    >
                                                        OVERVIEW
                                                    </motion.h1>
                                                )}
                                            </AnimatePresence>
                                            {/* Show the toggle arrow icon */}
                                            {router.asPath.includes(
                                                "corporate/"
                                            ) ||
                                                router.asPath.includes(
                                                    "user/"
                                                ) ||
                                                (router.asPath.includes(
                                                    "customer/"
                                                ) && (
                                                    <motion.div
                                                        layout
                                                        transition={{
                                                            duration: 0.2,
                                                            ease: "linear",
                                                        }}
                                                    >
                                                        <MdArrowForwardIos
                                                            className={`cursor-pointer text-[24px] duration-100 ease-out text-ThemeRed ${
                                                                !isProfileSearch &&
                                                                "rotate-180"
                                                            }`}
                                                            onClick={() =>
                                                                setProfileSearch(
                                                                    !isProfileSearch
                                                                )
                                                            }
                                                        />
                                                    </motion.div>
                                                ))}
                                        </div>

                                        {Sidebar.map((item, index) => (
                                            <MenuLink
                                                key={index}
                                                isProfileSearch={
                                                    isProfileSearch
                                                }
                                                url={item.url}
                                                iconUrl={item.iconUrl}
                                                urlName={item.name}
                                                ActiveUrl={item.ActiveUrl}
                                            >
                                                {ValidateParentUrl ===
                                                    item.ActiveUrl &&
                                                    item.SubMenu.length !==
                                                        0 && (
                                                        <Submenu
                                                            SubmenuDetail={
                                                                item.SubMenu
                                                            }
                                                        />
                                                    )}
                                            </MenuLink>
                                        ))}
                                    </ul>
                                    {/* What Search will show */}
                                    <div className="flex-1 shadow-2xl">
                                        <AnimatePresence>
                                            {isProfileSearch && (
                                                <motion.ul
                                                    variants={FadeSide}
                                                    className=" w-full overflow-hidden h-full bg-[#f1f2f5]"
                                                >
                                                    {isPathName.includes(
                                                        "corporate/"
                                                    ) && <CorporateSearch />}
                                                    {isPathName.includes(
                                                        "user/"
                                                    ) && <UserSearch />}
                                                    {isPathName.includes(
                                                        "customer/"
                                                    ) && <CustomerSearch />}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                <section className="flex flex-col flex-1 1024px:w-full">
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
                                    <IoNotificationsSharp className=" text-ThemeRed text-[32px]" />
                                    <div className="absolute w-4 h-4 text-[11px] top-[-5%] right-[-8%] flex justify-center items-start rounded-full bg-Green text-white">
                                        1
                                    </div>
                                </li>
                                <li className=" flex items-center">
                                    <aside className=" w-10 h-10 rounded-full overflow-hidden relative shadow-lg mr-3">
                                        <Image
                                            src={imgProfile.profile}
                                            layout="fill"
                                        />
                                    </aside>
                                    <p className="flex items-center cursor-pointer">
                                        John Doe{" "}
                                        <IoIosArrowDown className="ml-1 mt-1" />
                                    </p>
                                </li>
                            </ul>
                        </header>
                        <main className="w-full">{children}</main>
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
