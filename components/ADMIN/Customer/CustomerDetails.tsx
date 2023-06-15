import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { HiPencil } from "react-icons/hi";
import Image from "next/image";
import CustomerInformation from "./CustomerInformation";
import CustomerProperty from "./CustomerProperty";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { GetCustomer, SendPortal } from "../../ReactQuery/CustomerMethod";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import { customer } from "../../../types/customerList";
import Modal_Image from "../../Reusable/Modal_Image";
import { PencilButton } from "../../Reusable/Icons";
import ModifyCustomer from "./CustomerForm/ModifyCustomer";
import { AccessActionValidation } from "../../Reusable/PermissionValidation/ActionAccessValidation";

export default function CustomerDetail() {
    const PermissionValidationModify = AccessActionValidation(
        "Customer",
        "modify"
    );

    const { ImgUrl, setPrompt, cusToggle, setCusToggle } =
        useContext(AppContext);

    const [isToggleInfoRole, setToggleInfoRole] = useState<boolean>(false);

    const [isView, setView] = useState("");

    const router = useRouter();

    const id = router.query.id;

    // Send Portal
    const onSuccess = () => {
        setPrompt({
            message: "Email Successfully Sent!",
            type: "success",
            toggle: true,
        });
    };
    const onError = () => {
        setPrompt({
            message: "Something is wrong",
            type: "error",
            toggle: true,
        });
    };
    const { mutate, isLoading } = SendPortal(onSuccess, onError);

    const SendPortalHandler = () => {
        mutate(id);
    };

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
    let data: customer = DetailData?.data;

    let Logo;
    if (
        data?.image_photo === undefined ||
        data?.image_photo === null ||
        data?.image_photo === ""
    ) {
        Logo = "/Images/sampleProfile.png";
    } else {
        Logo =
            "https://boroughcrest-api.lws.codes/get-img?image=" +
            data?.image_photo;
    }

    return (
        <div>
            {isView !== "" && <Modal_Image setView={setView} isView={isView} />}
            {cusToggle && <ModifyCustomer />}
            <h1 className=" font-bold mb-10 text-[24px] 480px:mb-5">
                Customer Details
            </h1>

            <ul className=" w-full shadow-lg flex p-10 bg-white rounded-2xl flex-wrap mb-10">
                <li className=" flex justify-between items-center w-full mb-5">
                    <h1 className=" font-bold text-[24px] 480px:mb-0 480px:text-[16px]">
                        Primary Informations
                    </h1>
                    {PermissionValidationModify && (
                        <PencilButton
                            FunctionOnClick={() => {
                                setCusToggle(true);
                            }}
                            title={"Modify"}
                        />
                    )}
                </li>
                <li className="w-3/12 1280px:w-4/12 flex-col 480px:w-full p-5 flex justify-center items-center">
                    <aside className=" w-6/12 820px:w-10/12 rounded-full overflow-hidden 480px:w-5/12 aspect-square relative shadow-xl">
                        <Image
                            src={Logo}
                            alt="profile"
                            layout="fill"
                            objectFit="cover"
                        />
                    </aside>
                    <Tippy content={`${data?.status}`} theme="ThemeRed">
                        <div
                            className={"my-2 statusCircle " + data?.status}
                        ></div>
                    </Tippy>

                    {isLoading ? (
                        <p className=" text-white py-2 px-3 flex justify-center items-center duration-75 leading-none bg-ThemeRed rounded-md text-[14px]">
                            <BeatLoader
                                color={"#fff"}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </p>
                    ) : (
                        <button
                            onClick={SendPortalHandler}
                            className=" text-white py-3 px-3 flex justify-center items-center duration-75 hover:bg-ThemeRed50 leading-none bg-ThemeRed rounded-md text-[14px]"
                        >
                            SEND PORTAL ACCESS
                        </button>
                    )}
                </li>
                <li className=" w-9/12 1280px:w-8/12  480px:w-full flex flex-wrap items-start">
                    <ul className="flex flex-wrap">
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                ID
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data?.id}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                {data?.type == "Company" ? "COMPANY" : ""} NAME
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data?.name}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                CLASS
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data?.class}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                TYPE
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data?.type}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                TIN
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data?.tin}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                PORTAL ID
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data?.user.portal_id}
                            </h4>
                        </li>
                        {data?.type !== "Company" && (
                            <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                                <p className=" text-gray-400 1024px:text-[14px]">
                                    CITIZENSHIP
                                </p>
                                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                    {data?.individual_citizenship}
                                </h4>
                            </li>
                        )}
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                VALID ID
                            </p>
                            <button
                                className="mt-1 px-5 rounded-lg py-1 bg-ThemeRed text-white hover:bg-ThemeRed50 duration-75"
                                onClick={() =>
                                    setView(
                                        (imgPass) =>
                                            (imgPass = data?.image_valid_id)
                                    )
                                }
                            >
                                VIEW
                            </button>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                SIGNATURE
                            </p>
                            <button
                                className="mt-1 px-5 rounded-lg py-1 bg-ThemeRed text-white hover:bg-ThemeRed50 duration-75"
                                onClick={() =>
                                    setView(
                                        (imgPass) =>
                                            (imgPass = data?.image_signature)
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
                    <CustomerProperty
                        data={data?.properties}
                        classType={data?.class}
                        PermissionValidationModify={PermissionValidationModify}
                    />
                )}
            </ul>
        </div>
    );
}
