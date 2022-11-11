import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { FadeSide } from "../Animation/SimpleAnimation";
import { motion } from "framer-motion";
import Image from "next/image";

type MenuLink = {
    isProfileSearch: boolean;
    url: string;
    iconUrl: string;
    urlName: string;
    ActiveUrl: string;
    children: React.ReactNode;
    closeOnClick: () => void;
};
export default function MenuLink({
    isProfileSearch,
    urlName,
    iconUrl,
    url,
    ActiveUrl,
    children,
    closeOnClick,
}: MenuLink) {
    const { collapseSide, setCollapseSide } = useContext(AppContext);
    const router = useRouter();
    const ValidateUrl = router.pathname.split("/")[1];
    return (
        <motion.li
            variants={FadeSide}
            initial="initial"
            animate="animate"
            exit="exit"
            className=" mb-3 z-20"
        >
            <Link href={`${url}`}>
                <a
                    onClick={closeOnClick}
                    className={` flex items-center cursor-pointer ${
                        ValidateUrl === ActiveUrl && "bg-ThemeRed"
                    }`}
                >
                    <Tippy
                        theme="ThemeRed"
                        content={<span className="capitalize">{urlName}</span>}
                    >
                        <aside className="mx-5 h-5 w-5 hover:scale-[1.3] transition duration-75 my-2 1550px:my-2 relative">
                            <Image
                                src={`/Images/${
                                    ValidateUrl === ActiveUrl ? "Active" : ""
                                }${iconUrl}`}
                                alt=""
                                layout="fill"
                            />
                        </aside>
                    </Tippy>
                    {!isProfileSearch && !collapseSide && (
                        <p
                            className={`${
                                ValidateUrl === ActiveUrl
                                    ? "text-white"
                                    : "text-ThemeRed"
                            } font-medium capitalize`}
                        >
                            {urlName}
                        </p>
                    )}
                </a>
            </Link>
            {!isProfileSearch && !collapseSide && children}
        </motion.li>
    );
}
