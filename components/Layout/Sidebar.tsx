import React, { useEffect, useRef } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import MenuLink from "./MenuLink";
import Submenu from "./Submenu";
import { FadeSide } from "../Animation/SimpleAnimation";
import Image from "next/image";
import CorporateSearch from "../Search/CorporateSearch";
import UserSearch from "../Search/UserSearch";
import CustomerSearch from "../Search/CustomerSearch";
import { useRouter } from "next/router";
import { SidebarLinks } from "./PagesUrl";
import PropertySearch from "../Search/PropertySearch";

type SidebarType = {
    isWindow: number;
    isProfileSearch: boolean;
    setProfileSearch: Function;
    isPathName: string;
    setHide: Function;
};

export default function Sidebar({
    isProfileSearch,
    isWindow,
    setProfileSearch,
    isPathName,
    setHide,
}: SidebarType) {
    const router = useRouter();
    const ValidateParentUrl = router.pathname.split("/")[1];

    // click outside close sidebar
    const modal = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                if (window.innerWidth < 1024) setHide(true);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <>
            <motion.aside
                ref={modal}
                variants={FadeSide}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`${
                    isWindow <= 1024 && "fixed top-0 left-0 z-50 bg-[#ebedf2f6]"
                } w-[400px] 1920px:w-[350px] 1550px:w-[270px] border-r-2 border-white min-h-full pt-5 flex flex-col`}
            >
                <div className=" w-full flex justify-center">
                    <Image
                        src="/Images/deus.png"
                        width={250}
                        height={100}
                        alt=""
                    />
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
                                        className="h1-text"
                                    >
                                        OVERVIEW
                                    </motion.h1>
                                )}
                            </AnimatePresence>
                            {/* Show the toggle arrow icon */}
                            {router.query.id !== undefined && (
                                <motion.div
                                    layout
                                    transition={{
                                        duration: 0.2,
                                        ease: "linear",
                                    }}
                                >
                                    <MdArrowForwardIos
                                        className={`cursor-pointer text-[24px] duration-100 ease-out text-ThemeRed ${
                                            !isProfileSearch && "rotate-180"
                                        }`}
                                        onClick={() =>
                                            setProfileSearch(!isProfileSearch)
                                        }
                                    />
                                </motion.div>
                            )}
                        </div>

                        {SidebarLinks.map((item, index) => (
                            <MenuLink
                                key={index}
                                isProfileSearch={isProfileSearch}
                                url={item.url}
                                iconUrl={item.iconUrl}
                                urlName={item.name}
                                ActiveUrl={item.ActiveUrl}
                                closeOnClick={() => {
                                    window.innerWidth < 1024 && setHide(true);
                                }}
                            >
                                {ValidateParentUrl === item.ActiveUrl &&
                                    item.SubMenu.length !== 0 && (
                                        <Submenu
                                            SubmenuDetail={item.SubMenu}
                                            closeOnClick={() => {
                                                window.innerWidth < 1024 &&
                                                    setHide(true);
                                            }}
                                        />
                                    )}
                            </MenuLink>
                        ))}
                    </ul>
                    {/* Pages, the Search will show */}
                    <div className="flex-1 shadow-2xl ">
                        <AnimatePresence>
                            {isProfileSearch && (
                                <motion.ul
                                    variants={FadeSide}
                                    className=" w-full overflow-hidden h-full bg-[#f1f2f5]"
                                >
                                    {isPathName.includes("corporate/") && (
                                        <CorporateSearch />
                                    )}
                                    {isPathName.includes("user/") && (
                                        <UserSearch />
                                    )}
                                    {isPathName.includes("customer/") && (
                                        <CustomerSearch />
                                    )}
                                    {isPathName.includes("property/") && (
                                        <PropertySearch />
                                    )}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
