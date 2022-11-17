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
import { GetCustomer, SendPortal } from "../../ReactQuery/CustomerMethod";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import { customer } from "../../../types/customerList";

export default function CustomerDetail({ Draft }: any) {
    const { ImgUrl, setModifyCustomer, setPrompt } = useContext(AppContext);
    const [toggleModify, setToggleModify] = useState(false);
    const [isToggleInfoRole, setToggleInfoRole] = useState<boolean>(false);
    const [isView, setView] = useState("");
    const [isDraft, setDraft] = useState(false);

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
    const { mutate, isLoading } = SendPortal(id, onSuccess, onError);

    const SendPortalHandler = () => {
        mutate();
    };

    const {
        isLoading: DetailLoading,
        data: DetailData,
        isError: DetailError,
    } = GetCustomer(id);

    useEffect(() => {
        if (Draft) {
            setDraft(true);
            setModifyCustomer({
                ...Draft.values,
                id: router.query.id,
            });
        }
    }, []);

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
        data.image_photo === undefined ||
        data.image_photo === null ||
        data.image_photo === ""
    ) {
        Logo = "/Images/sampleProfile.png";
    } else {
        Logo = ImgUrl + data.image_photo;
    }

    return (
        <div>
            {isView !== "" && <Modal_Image setView={setView} isView={isView} />}
            {toggleModify && (
                <ModifyCustomer
                    setToggleModify={setToggleModify}
                    isDraft={isDraft}
                />
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
                                // If theres a draft, draft data will be restore on the modifyfields else its customer data
                                onClick={() => {
                                    Draft
                                        ? setModifyCustomer({
                                              ...Draft.values,
                                              tin: data.tin.replaceAll("-", ""),
                                              id: router.query.id,
                                              _method: "PUT",
                                          })
                                        : setModifyCustomer({
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
                <li className="w-3/12 1280px:w-4/12 flex-col 480px:w-full p-5 flex justify-center items-center">
                    <aside className=" w-6/12 820px:w-10/12 rounded-full overflow-hidden 480px:w-5/12 aspect-square relative shadow-xl">
                        <Image src={Logo} alt="profile" layout="fill" />
                    </aside>
                    <Tippy content={`${data?.status}`} theme="ThemeRed">
                        <div
                            className={"my-2 statusCircle " + data.status}
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
                                {data.id}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                {data.type == "Company" ? "COMPANY" : ""} NAME
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.name}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                CLASS
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.class}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                TYPE
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.type}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                TIN
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.tin}
                            </h4>
                        </li>
                        <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                            <p className=" text-gray-400 1024px:text-[14px]">
                                PORTAL ID
                            </p>
                            <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                {data.portal_id}
                            </h4>
                        </li>
                        {data.type !== "Company" && (
                            <li className=" w-4/12 mb-5 1280px:w-2/4 480px:w-full 480px:mb-3">
                                <p className=" text-gray-400 1024px:text-[14px]">
                                    CITIZENSHIP
                                </p>
                                <h4 className=" text-gray-500 mb-5 1024px:text-[14px]">
                                    {data.individual_citizenship}
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
                                            (imgPass = data.image_valid_id)
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
                                            (imgPass = data.image_signature)
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
