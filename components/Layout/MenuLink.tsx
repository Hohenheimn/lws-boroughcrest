import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { FadeSide } from "../Animation/SimpleAnimation";
import { motion } from "framer-motion";

type MenuLink = {
    isProfileSearch: boolean;
    url: string;
    iconUrl: string;
    urlName: string;
    ActiveUrl: string;
    children: React.ReactNode;
};
export default function MenuLink({
    isProfileSearch,
    urlName,
    iconUrl,
    url,
    ActiveUrl,
    children,
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
                    className={` flex items-center cursor-pointer ${
                        ValidateUrl === ActiveUrl && "bg-ThemeRed"
                    }`}
                >
                    <Tippy theme="ThemeRed" content={urlName}>
                        <img
                            className="mx-5 my-3"
                            src={`/images/${
                                ValidateUrl === ActiveUrl ? "Active" : ""
                            }${iconUrl}`}
                            alt=""
                        />
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
