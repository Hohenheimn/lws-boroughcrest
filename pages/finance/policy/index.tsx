import React, { useContext, useEffect, useState } from "react";
import { PencilButton } from "../../../components/Reusable/Icons";
import SelectDropdown from "../../../components/Reusable/SelectDropdown";
import {
    NumberBlockInvalidKey,
    TextFieldValidationNoSpace,
} from "../../../components/Reusable/InputField";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../util/api";
import { getCookie } from "cookies-next";
import TableLoadingNError from "../../../components/Reusable/TableLoadingNError";
import AppContext from "../../../components/Context/AppContext";
import { ErrorSubmit } from "../../../components/Reusable/ErrorMessage";
import { ScaleLoader } from "react-spinners";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

type FinanceReference = {
    document: string;
    prefix: string;
    serial_from: string;
    serial_to: string;
    id: number;
};

export default function Policy() {
    const { setPrompt } = useContext(AppContext);

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const queryClient = useQueryClient();

    const { mutate, isLoading: LoadingMutate } = useMutation(
        (Payload: any) => {
            return api.post("/finance/policy", Payload, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("policy");
                setToggle(false);
                setPrompt({
                    message: "Policy successfully updated",
                    toggle: true,
                    type: "success",
                });
            },
            onError: onError,
        }
    );

    const { data, isLoading, isError } = useQuery(
        ["policy"],
        () => {
            return api.get(`/finance/policy`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const [FinanceReference, setFinanceReference] = useState<
        FinanceReference[]
    >([]);

    const [isYear, setYear] = useState<string>();

    const [isMonth, setMonth] = useState<string>();

    const [isToggle, setToggle] = useState(false);

    useEffect(() => {
        SetValue();
    }, [data?.data]);

    const SetValue = () => {
        const getDataFromApi = data?.data.finance_reference.map(
            (item: FinanceReference, index: number) => {
                return {
                    document: item.document,
                    prefix: item.prefix,
                    serial_from: item.serial_from,
                    serial_to: item.serial_to,
                    id: index,
                };
            }
        );
        setFinanceReference(getDataFromApi);
        setYear(data?.data.year === null ? "" : data?.data.year);
        setMonth(
            data?.data.finance_period === null ? "" : data?.data.finance_period
        );
    };

    const UpdateValue = (key: string, value: string, id: number) => {
        const cloneToUpdate = FinanceReference.map((item: FinanceReference) => {
            if (item.id === id) {
                if (key === "prefix") {
                    return {
                        ...item,
                        prefix: value,
                    };
                }
                if (key === "serial_from") {
                    return {
                        ...item,
                        serial_from: value,
                    };
                }
                if (key === "serial_to") {
                    return {
                        ...item,
                        serial_to: value,
                    };
                }
            }
            return item;
        });
        setFinanceReference(cloneToUpdate);
    };

    const CancelHandler = () => {
        SetValue();
        setToggle(false);
    };

    const SaveHandler = () => {
        const Payload = {
            finance_period: isMonth,
            year: isYear,
            finance_reference: FinanceReference.map((item) => {
                return {
                    prefix: item.prefix,
                    serial_from: item.serial_from,
                    serial_to: item.serial_to,
                };
            }),
        };
        mutate(Payload);
    };

    const PagePermisson = PageAccessValidation("Policy");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <div className="py-20 640px:py-10">
            <h1 className="pageTitle mb-5">Finance Policy</h1>
            <ul
                className={` duration-200 ease-in-out flex relative w-full p-10 rounded-2xl 480px:p-8 ${
                    !isToggle && "shadow-lg bg-white"
                }`}
            >
                <li className="absolute top-4 right-4">
                    {!isToggle && (
                        <PencilButton
                            FunctionOnClick={() => {
                                setToggle(true);
                            }}
                            title={"Modify"}
                        />
                    )}
                </li>
                <li className="w-2/12 640px:hidden">
                    <div className=" mb-10 640px:mb-5">
                        <h4 className="main_text noMB">FINANCE PERIOD</h4>
                    </div>
                    <div>
                        <h4 className="main_text noMB">FINANCE REFERENCE</h4>
                    </div>
                </li>
                <li className="border-l pl-10 ml-10 640px:m-0 640px:p-0 640px:border-none w-full overflow-auto">
                    <h4 className="main_text noMB hidden 640px:block">
                        FINANCE PERIOD
                    </h4>
                    <section className="flex items-center mb-10 ">
                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setMonth(value);
                            }}
                            noStyle={!isToggle}
                            className="w-[150px]"
                            inputElement={
                                <input
                                    className={`w-full field ${
                                        !isToggle && "noStyle"
                                    } `}
                                    value={isMonth}
                                    readOnly
                                    autoComplete="off"
                                />
                            }
                            listArray={[
                                "Calendar",
                                "Febuary",
                                "March",
                                "Aprill",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                            ]}
                        />

                        <input
                            type="number"
                            className={`ml-3 w-[150px] field ${
                                !isToggle && "noStyle"
                            } duration-200 ease-in-out`}
                            value={isYear}
                            onKeyDown={NumberBlockInvalidKey}
                            onChange={(e) => {
                                if (!TextFieldValidationNoSpace(e, 4)) return;
                                setYear(e.target.value);
                            }}
                        />
                    </section>
                    <h4 className="main_text noMB hidden 640px:block">
                        FINANCE REFERENCE
                    </h4>
                    <section className=" 640px:mt-5">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="label_text">DOCUMENT</th>
                                    <th className="label_text">PREFIX</th>
                                    <th className="label_text">SERIAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FinanceReference?.map(
                                    (item: FinanceReference, index) => (
                                        <tr key={index}>
                                            <td className="py-2 pr-5 min-w-[200px]">
                                                <h4 className="main_text noMB">
                                                    {item.document}
                                                </h4>
                                            </td>
                                            <td className="pr-5 py-2">
                                                {isToggle ? (
                                                    <input
                                                        type="text"
                                                        className={`field duration-200 ease-in-out`}
                                                        value={item.prefix}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.value
                                                                    .length <= 9
                                                            ) {
                                                                UpdateValue(
                                                                    "prefix",
                                                                    e.target
                                                                        .value,
                                                                    item.id
                                                                );
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <h4 className="main_text noMB">
                                                        {item.prefix}
                                                    </h4>
                                                )}
                                            </td>
                                            <td className="flex items-center py-2">
                                                {isToggle ? (
                                                    <input
                                                        type="text"
                                                        className={`field duration-200 ease-in-out`}
                                                        value={item.serial_from}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.value
                                                                    .length <= 9
                                                            ) {
                                                                UpdateValue(
                                                                    "serial_from",
                                                                    e.target
                                                                        .value,
                                                                    item.id
                                                                );
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <h4 className="main_text noMB">
                                                        {item.serial_from}
                                                    </h4>
                                                )}
                                                <span className=" text-DarkBlue font-NHU-bold mx-5">
                                                    -
                                                </span>{" "}
                                                {isToggle ? (
                                                    <input
                                                        type="text"
                                                        className={`field duration-200 ease-in-out`}
                                                        value={item.serial_to}
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.value
                                                                    .length <= 9
                                                            ) {
                                                                UpdateValue(
                                                                    "serial_to",
                                                                    e.target
                                                                        .value,
                                                                    item.id
                                                                );
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <h4 className="main_text noMB">
                                                        {item.serial_to}
                                                    </h4>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                        <TableLoadingNError
                            isLoading={isLoading}
                            isError={isError}
                        />
                    </section>
                </li>
            </ul>
            {isToggle && (
                <div className="flex justify-end items-center mt-5 1550px:mt-2">
                    <button className="button_cancel" onClick={CancelHandler}>
                        CANCEL
                    </button>
                    <button className="buttonRed" onClick={SaveHandler}>
                        {LoadingMutate ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : (
                            "SAVE"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
