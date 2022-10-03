import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

type Layout = {
    children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
    const [isProfileSearch, setProfileSearch] = useState(false);
    const router = useRouter();
    const ValidateParentUrl = router.pathname.split("/")[1];
    const Sidebar = [
        {
            name: "dashboard",
            url: "/",
            iconUrl: "Dashboard.png",
            ActiveUrl: "",
            SubMenu: [],
        },
        {
            name: "project",
            url: "/project/corporate",
            iconUrl: "Project.png",
            ActiveUrl: "project",
            SubMenu: [
                {
                    name: "corporate",
                    url: "/project/corporate",
                    ActiveName: "corporate",
                },
                {
                    name: "user",
                    url: "/project/user",
                    ActiveName: "user",
                },
                {
                    name: "roles",
                    url: "/project/roles",
                    ActiveName: "roles",
                },
            ],
        },
        {
            name: "admin",
            url: "/admin/customer",
            iconUrl: "Admin.png",
            ActiveUrl: "admin",
            SubMenu: [
                {
                    name: "customer",
                    url: "/admin/customer",
                    ActiveName: "customer",
                },
                {
                    name: "property",
                    url: "/admin/property",
                    ActiveName: "property",
                },
                {
                    name: "request",
                    url: "/admin/request",
                    ActiveName: "request",
                },
                {
                    name: "communication",
                    url: "/admin/communication",
                    ActiveName: "communication",
                },
            ],
        },
        {
            name: "finance",
            url: "/finance",
            iconUrl: "Finance.png",
            ActiveUrl: "finance",
            SubMenu: [],
        },
    ];

    return (
        <>
            <Head>
                <title>Boroughcrest</title>
            </Head>
            <div className="flex flex-wrap bg-MainBG bg-no-repeat bg-cover min-h-screen bg-Gray bg-blend-multiply">
                <aside className=" 1920:w-300px 2500:w-[500px] border-r-2 border-white min-h-container pt-5 flex flex-col items-center">
                    <img src="/Images/deus.png" className=" mb-10" alt="" />
                    <h1 className="font-medium w-full pl-5 mb-5">OVERVIEW</h1>
                    <div className="w-full flex">
                        <ul
                            className={` self-start ${
                                !isProfileSearch && "w-full"
                            }`}
                        >
                            {Sidebar.map((item, index) => (
                                <MenuLink
                                    key={index}
                                    isProfileSearch={isProfileSearch}
                                    url={item.url}
                                    iconUrl={item.iconUrl}
                                    urlName={item.name}
                                    ActiveUrl={item.ActiveUrl}
                                >
                                    {ValidateParentUrl === item.ActiveUrl &&
                                        item.SubMenu.length !== 0 && (
                                            <Submenu
                                                SubmenuDetail={item.SubMenu}
                                            />
                                        )}
                                </MenuLink>
                            ))}
                        </ul>
                        {/* Search Profile */}
                        {isProfileSearch && (
                            <ul className=" flex-1 border border-black overflow-hidden">
                                <h1>Search Profile Here</h1>
                            </ul>
                        )}
                    </div>
                </aside>
                <section className=" p-10">
                    <header>Header</header>
                    <main>{children}</main>
                </section>
                <footer className="w-full h-14 flex justify-end items-center px-10">
                    <p className=" text-ThemeRed text-sm font-medium">
                        2022 Boroughcrest Property Management Systems Corp. All
                        rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}
type MenuLink = {
    isProfileSearch: boolean;
    url: string;
    iconUrl: string;
    urlName: string;
    ActiveUrl: string;
    children: React.ReactNode;
};
const MenuLink = ({
    isProfileSearch,
    urlName,
    iconUrl,
    url,
    ActiveUrl,
    children,
}: MenuLink) => {
    const router = useRouter();
    const ValidateUrl = router.pathname.split("/")[1];
    return (
        <li className=" mb-3 z-20">
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
        </li>
    );
};

type SubmenuDetail = {
    SubmenuDetail?: any;
};

const Submenu = ({ SubmenuDetail }: SubmenuDetail) => {
    const router = useRouter();
    const innerUrl = router.pathname.split("/")[2];
    return (
        <ul className=" text-ThemeRed50 font-medium pt-2 overflow-hidden mt-2">
            {SubmenuDetail.map(
                (
                    item: { url: string; ActiveName: string; name: string },
                    index: number
                ) => (
                    <li className=" pl-16 flex items-center mb-2" key={index}>
                        <div
                            className={` h-10 -mt-9 w-3 mr-1 border-l-2 border-b-2 rounded-bl-lg ${
                                innerUrl === item.ActiveName
                                    ? "border-ThemeRed"
                                    : "border-gray-300"
                            }`}
                        ></div>
                        <Link href={`${item.url}`}>
                            <a
                                className={` w-fill flex-1 text-ThemeRed py-1 relative ${
                                    innerUrl === item.ActiveName
                                        ? "border-r-8 border-Green after:bg-GradientGreen after:w-full after:h-full after:absolute after:left-0 after:top-0"
                                        : "hover:border-r-8 hover:border-Green duration-75 after:bg-GradientGreen after:w-0 hover:after:w-full after:h-full after:absolute after:right-0 after:top-0 after:duration-[500ms]"
                                }`}
                            >
                                <p className=" z-10 relative text-[16px]">
                                    {item.name}
                                </p>
                            </a>
                        </Link>
                    </li>
                )
            )}
        </ul>
    );
};
