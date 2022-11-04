import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { HiPencil } from "react-icons/hi";
import Image from "next/image";
import ModifyCustomer from "./ModifyCustomer";
import CustomerInformation from "./CustomerInformation";
import CustomerProperty from "./CustomerProperty";
import Modal_Image from "../../Modal_Image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { GetCustomer } from "../../ReactQuery/CustomerMethod";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import { customer } from "../../../types/customerList";

export default function CustomerDetail() {
    const { ImgUrl, isModifyCustomer, setModifyCustomer } =
        useContext(AppContext);
    const [toggleModify, setToggleModify] = useState(false);
    const [isToggleInfoRole, setToggleInfoRole] = useState<boolean>(false);
    const [isView, setView] = useState("");

    const router = useRouter();
    const id = router.query.id;

    const {
        isLoading: DetailLoading,
        data: DetailData,
        isError: DetailError,
    } = GetCustomer(id);

    if (DetailLoading || DetailError) {
        return (
            <div className="pageDetail">
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    const data: customer = DetailData?.data;

    return (
        <div>
            {isView !== "" && <Modal_Image setView={setView} isView={isView} />}
            {toggleModify && (
                <ModifyCustomer setToggleModify={setToggleModify} />
            )}
            <h1 className=" font-bold mb-10 text-[24px] 480px:mb-5">
                Customer Details
            </h1>

            <ul className=" w-full shadow-lg flex p-10 bg-white rounded-2xl flex-wrap mb-10">
                <li className=" flex justify-between items-center w-full mb-5">
                    <h1 className=" font-bold text-[24px] 480px:mb-0 480px:text-[16px]">
                        Primary Informations
                    </h1>
                    <Tippy
                        theme="ThemeRed"
                        content={<span className="capitalize">Modify</span>}
                    >
                        <div>
                            <HiPencil
                                className=" text-ThemeRed font-bold text-[32px] 480px:text-[24px] cursor-pointer"
                                onClick={() => {
                                    setModifyCustomer({
                                        ...data,
                                        tin: data.tin.replaceAll("-", ""),
                                        _method: "PUT",
                                    });
                                    setToggleModify(true);
                                }}
                            />
                        </div>
                    </Tippy>
                </li>
                <li className="w-3/12 flex-col 480px:w-full p-5 flex justify-center items-center">
                    <aside className=" w-6/12 820px:w-10/12 rounded-full overflow-hidden 480px:w-5/12 aspect-square relative shadow-xl">
                        <Image
                            src={ImgUrl + data.image_photo}
                            alt="profile"
                            layout="fill"
                        />
                    </aside>
                    {data.status ? (
                        <div
                            className=" h-5 w-5 rounded-full border-4 border-[#19d142] cursor-pointer my-3"
                            style={{ boxShadow: "0 0 15px 0 #19d142" }}
                        ></div>
                    ) : (
                        <div
                            className=" h-5 w-5 rounded-full border-4 border-[#8f384d] cursor-pointer my-3"
                            style={{ boxShadow: "0 0 15px 0 #8f384d" }}
                        ></div>
                    )}
                    <button className=" text-white h-8 px-2 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px]">
                        SEND PORTAL ACCESS
                    </button>
                </li>
                <li className=" w-9/12  480px:w-full flex flex-wrap items-start">
                    <ul className="flex flex-wrap">
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                ID
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.id}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                {data.type == "Company" ? "COMPANY" : ""} NAME
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.name}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                CLASS
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.class}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                TYPE
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.type}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                TIN
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.tin}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                PORTAL ID
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.portal_id}
                            </h4>
                        </li>
                        {data.type !== "Company" && (
                            <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                                <p className=" text-gray-400 1024px:text-[14px]">
                                    CITIZENSHIP
                                </p>
                                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                    {data.individual_citizenship}
                                </h4>
                            </li>
                        )}
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                VALID ID
                            </p>
                            <button
                                className="mt-1 px-5 rounded-lg py-1 bg-ThemeRed text-white hover:bg-ThemeRed50 duration-75"
                                onClick={() =>
                                    setView(
                                        (imgPass) =>
                                            (imgPass =
                                                ImgUrl + data.image_valid_id)
                                    )
                                }
                            >
                                VIEW
                            </button>
                        </li>
                        <li className=" w-4/12 mb-5 820px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                SIGNATURE
                            </p>
                            <button
                                className="mt-1 px-5 rounded-lg py-1 bg-ThemeRed text-white hover:bg-ThemeRed50 duration-75"
                                onClick={() =>
                                    setView(
                                        (imgPass) =>
                                            (imgPass =
                                                ImgUrl + data.image_signature)
                                    )
                                }
                            >
                                VIEW
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul className="flex items-end mb-2">
                <li
                    className={` text-[16px] uppercase mr-4 hover:underline cursor-pointer text-ThemeRed 480px:text-[14px] ${
                        !isToggleInfoRole && "underline font-NHU-bold"
                    }`}
                    onClick={() => setToggleInfoRole(false)}
                >
                    INFORMATION
                </li>
                <li
                    className={` text-[16px] uppercase mr-4 hover:underline cursor-pointer text-ThemeRed 480px:text-[14px] ${
                        isToggleInfoRole && "underline font-NHU-bold"
                    }`}
                    onClick={() => setToggleInfoRole(true)}
                >
                    PROPERTY
                </li>
            </ul>
            <ul className=" w-full shadow-lg p-10  bg-white rounded-2xl">
                {!isToggleInfoRole && <CustomerInformation itemDetail={data} />}
                {isToggleInfoRole && (
                    <CustomerProperty data={data.properties} />
                )}
            </ul>
        </div>
    );
}
