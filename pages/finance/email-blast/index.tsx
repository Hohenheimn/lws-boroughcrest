import React, { useContext, useEffect, useRef, useState } from "react";
import Wysiwyg from "../../../components/Reusable/Wysiwyg";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import { AccessActionValidation } from "../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";
import SelectDropdown from "../../../components/Reusable/SelectDropdown";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../util/api";
import { getCookie } from "cookies-next";
import { customer } from "../../../types/customerList";
import AppContext from "../../../components/Context/AppContext";
import { BarLoader, ScaleLoader } from "react-spinners";
import { ErrorSubmit } from "../../../components/Reusable/ErrorMessage";
import { PencilButtonTable } from "../../../components/Reusable/Icons";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Index() {
    const { setPrompt } = useContext(AppContext);

    const [isListCustomer, setListCustomer] = useState<
        { id: number; name: string }[]
    >([]);

    const RemoveCustomerHandler = (id: number) => {
        const clone = isListCustomer.filter(
            (filterItem) => filterItem.id !== id
        );
        setListCustomer(clone);
    };

    const [isWysiwyg, setWysiwyg] = useState("");

    const [isTemplate, setTemplate] = useState("");

    const [isSubject, setSubject] = useState("");

    const SelectHandler = (id: number, name: string) => {
        if (isListCustomer.some((someItem) => someItem.id === id)) {
            setPrompt({
                message: "Customer Already Exist",
                toggle: true,
                type: "draft",
            });
            return;
        }
        setListCustomer([
            ...isListCustomer,
            {
                id: id,
                name: name,
            },
        ]);
    };

    const CancelHandler = () => {
        setWysiwyg("");
        setSubject("");
        setTemplate("");
        setListCustomer([]);
    };

    const queryClient = useQueryClient();

    const onSuccess = () => {
        setPrompt({
            message: "Email successfully save",
            type: "success",
            toggle: true,
        });
        queryClient.invalidateQueries("email-blast");
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: getLoading, data, isError } = GetEmailBlash();

    useEffect(() => {
        if (data?.data !== undefined) {
            setWysiwyg(data?.data.email_content);
            setSubject(data?.data.subject);
            setTemplate(data?.data.template);
            setListCustomer(data?.data.recipient);
        }
    }, [data?.data]);

    const { isLoading, mutate } = SendEmailBlast(onSuccess, onError);

    const [isModifyToggle, setModifyToggle] = useState(false);

    const ApplyHandler = () => {
        if (
            isListCustomer.length <= 0 &&
            isTemplate === "" &&
            isSubject === "" &&
            isWysiwyg === ""
        ) {
            setPrompt({
                message: "Fill out all fields",
                type: "draft",
                toggle: true,
            });
            return;
        }
        const Payload = {
            recipient: isListCustomer.map((item) => item.id),
            template: isTemplate,
            subject: isSubject,
            email_content: isWysiwyg,
        };
        mutate(Payload);
    };

    const PagePermisson = PageAccessValidation("Email Blast");

    const Permission_create = AccessActionValidation("Email Blast", "create");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (!Permission_create && Permission_create !== undefined) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission to Create Email Blast
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className="pageTitle">Email Blast</h1>
            <ul className="w-full flex flex-wrap border-b border-gray-300 pb-10 mb-10">
                <li className="w-2/4 pr-5 640px:p-0 640px:w-full 640px:mb-5">
                    <div className="flex items-center mb-5 w-full 480px:flex-col 480px:items-start 480px:text-[14px]">
                        <h2 className="text-ThemeRed mr-5 1024px:text-[14px]">
                            *RECIPIENT
                        </h2>
                        <DownDownCustomerReset SelectHandler={SelectHandler} />
                    </div>
                    <div className="flex items-center w-full 480px:flex-col 480px:items-start 480px:text-[14px]">
                        <h2 className="text-ThemeRed mr-5 1024px:text-[14px]">
                            *TEMPLATE
                        </h2>
                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setTemplate(value);
                            }}
                            className=" w-full"
                            inputElement={
                                <input
                                    className="w-full field"
                                    value={isTemplate}
                                    readOnly
                                    autoComplete="off"
                                />
                            }
                            listArray={["SOA"]}
                        />
                    </div>
                </li>
                <li className="w-2/4 pl-5 640px:p-0 640px:w-full">
                    <div className=" flex flex-wrap items-start bg-white rounded-lg relative 1024px:text-[14px] 375px:text-[13px] shadow-lg p-2 h-20 overflow-auto font-NHU-bold text-RegularColor">
                        {isListCustomer.map((item, index) => (
                            <div
                                key={index}
                                className={`font-NHU-bold flex items-center mr-1 ${
                                    isModifyToggle &&
                                    " px-2 shadow-md rounded-lg cursor-pointer"
                                }`}
                            >
                                {item.name}
                                {isListCustomer.length - 1 !== index &&
                                !isModifyToggle
                                    ? ","
                                    : ""}
                                {isModifyToggle && (
                                    <AiFillCloseCircle
                                        className="mt-1 ml-1 hover:text-ThemeRed"
                                        onClick={() =>
                                            RemoveCustomerHandler(item.id)
                                        }
                                    />
                                )}
                            </div>
                        ))}
                        <div
                            className="absolute top-2 right-2 z-10"
                            onClick={() => setModifyToggle(!isModifyToggle)}
                        >
                            <PencilButtonTable />
                        </div>
                    </div>
                </li>
            </ul>
            <div>
                <div className="flex w-[500px] 640px:w-full mb-10 480px:flex-col 480px:items-start 480px:text-[14px]">
                    <h2 className="text-ThemeRed mr-5 1024px:text-[14px]">
                        *SUBJECT
                    </h2>
                    <div>
                        <input
                            type="text"
                            value={isSubject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="field w-full"
                        />
                        <span className="text-gray-400 text-[13px] italic">
                            Edit subject description
                        </span>
                    </div>
                </div>
                <p className="text-[20px] 1024px:text-[18px] mb-5">
                    Email Content
                </p>
                <Wysiwyg setTextOS={setWysiwyg} isTextOS={isWysiwyg} />
            </div>

            <div className="mt-5 w-full flex justify-end">
                <button className="button_cancel" onClick={CancelHandler}>
                    CANCEL
                </button>
                <button className="buttonRed" onClick={ApplyHandler}>
                    {isLoading ? (
                        <ScaleLoader height={10} color="#fff" />
                    ) : (
                        "APPLY"
                    )}
                </button>
            </div>
        </>
    );
}

type PropsDropdown = {
    SelectHandler: (id: number, name: string) => void;
};

const DownDownCustomerReset = ({ SelectHandler }: PropsDropdown) => {
    const [isSearchBar, setSearchBar] = useState("");

    const { isLoading, data, isError } = useQuery(
        ["get-customer-list-report", isSearchBar],
        () => {
            return api.get(`/admin/customer?keywords=${isSearchBar}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        }
    );

    const [isToggle, setToggle] = useState(false);

    const container = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!container.current?.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    }, [container.current]);

    const Customers: customer[] = data?.data.filter(
        (itemFilter: any) => itemFilter.status !== "Draft"
    );

    const SelectInnerHandler = (id: number, name: string) => {
        setSearchBar("");
        setToggle(false);
        SelectHandler(id, name);
    };

    return (
        <div className=" relative w-full z-[99]">
            <input
                type="text"
                className=" field w-full"
                onClick={() => setToggle(!isToggle)}
                value={isSearchBar}
                onChange={(e) => setSearchBar(e.target.value)}
            />
            {isToggle && (
                <ul
                    ref={container}
                    className="absolute max-h-[300px] overflow-auto w-full top-[110%] left-0 bg-white rounded-lg shadow-lg"
                >
                    {isLoading && (
                        <li className=" w-full flex justify-center py-2">
                            <BarLoader color="#8f384d" height={5} />
                        </li>
                    )}
                    {isError && (
                        <li className=" pointer-events-none text-[14px] text-RegularColor w-full py-1 px-2 text-center">
                            Something went wrong
                        </li>
                    )}
                    {Customers?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() =>
                                SelectInnerHandler(Number(item.id), item.name)
                            }
                            className=" border-b border-gray-300 cursor-pointer text-[14px] text-RegularColor w-full py-1 px-2 hover:bg-ThemeRed hover:text-white"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const SendEmailBlast = (onSucces: any, onError: any) => {
    return useMutation(
        (Payload: any) => {
            return api.post("/email/settings", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                onSucces();
            },
            onError: onError,
        }
    );
};

export const GetEmailBlash = () => {
    return useQuery("email-blast", () => {
        return api.get(`/email/settings`, {
            headers: {
                Authorization: "Bearer " + getCookie("user"),
            },
        });
    });
};
