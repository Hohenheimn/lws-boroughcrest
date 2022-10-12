import React from "react";
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
                    <Tippy theme="ThemeRed" content={urlName}>
                        <aside className="mx-5 h-5 w-5 my-3 relative">
                            <Image
                                src={`/Images/${
                                    ValidateUrl === ActiveUrl ? "Active" : ""
                                }${iconUrl}`}
                                alt=""
                                layout="fill"
                            />
                        </aside>
                    </Tippy>
                    {!isProfileSearch && (
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
            {!isProfileSearch && children}
        </motion.li>
    );
}
