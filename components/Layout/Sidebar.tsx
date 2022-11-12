import React, { useContext, useEffect, useRef } from "react";
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
import AppContext from "../Context/AppContext";

type SidebarType = {
    isProfileSearch: boolean;
    setProfileSearch: Function;
    isPathName: string;
    setHide: Function;
    isWide: boolean;
    isWindow: any;
};

export default function Sidebar({
    isProfileSearch,
    setProfileSearch,
    isPathName,
    setHide,
    isWide,
    isWindow,
}: SidebarType) {
    const router = useRouter();
    const ValidateParentUrl = router.pathname.split("/")[1];
    const { collapseSide, setCollapseSide } = useContext(AppContext);
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
                className={` transition-all duration-200 ease-linear fixed h-screen overflow-y-auto overflow-x-hidden left-0 top-0 bg-[#fcfcff] w-[${
                    isWide ? "350px" : "258px"
                }] 1550px:w-[220px] ${
                    collapseSide && !isWide && "collapse"
                } border-r-2 border-white min-h-full flex flex-col z-50`}
            >
                {!collapseSide && (
                    <div className="absolute top-0 left-0 w-full flex justify-center mt-5 h-32 items-center 1550px:mt-0">
                        <Image
                            src="/Images/deus.png"
                            width={250}
                            height={100}
                            alt=""
                        />
                    </div>
                )}

                <div className="w-full h-full flex mt-28">
                    <ul
                        className={` self-start pt-5 ${
                            !isProfileSearch && "w-full"
                        }`}
                    >
                        <div className=" flex justify-between items-center px-5 mb-5 duration-75">
                            <AnimatePresence>
                                {!isProfileSearch && !collapseSide && (
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
                            {/* Collapse Arrow */}
                            {isWindow > 820
                                ? router.query.id === undefined && (
                                      <MdArrowForwardIos
                                          className={`cursor-pointer text-[24px] duration-100 ease-out text-ThemeRed ${
                                              !collapseSide && "rotate-180"
                                          }`}
                                          onClick={() =>
                                              setCollapseSide(!collapseSide)
                                          }
                                      />
                                  )
                                : ""}

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
                    <div className="shadow-2xl flex-1">
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
