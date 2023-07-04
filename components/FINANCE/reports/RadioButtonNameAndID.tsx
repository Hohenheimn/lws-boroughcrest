import React, { useEffect } from "react";
import { useQuery } from "react-query";
import api from "../../../util/api";
import { getCookie } from "cookies-next";
import { BarLoader } from "react-spinners";

type Props = {
    name: string;
    endpoint: string;
    SelectHandler: (e: any, column: string, id: number, value: string) => void;
    isCheckBox: { id: number; name: string }[];
};

export default function RadioButtonNameAndID({
    name,
    endpoint,
    isCheckBox,
    SelectHandler,
}: Props) {
    const { isLoading, data, isError } = useQuery(
        [name, "report", endpoint],
        () => {
            return api.get(`${endpoint}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        }
    );

    useEffect(() => {
        if (name === "Project") {
            console.log(isCheckBox);
        }
    });

    return (
        <li className="w-1/5 1024px:w-1/4 1024px:mb-3 640px:w-1/3 480px:w-1/2 pr-2">
            <h3 className={"mb-2 text-ThemeRed 1550px:text-[14px] uppercase"}>
                {name}
            </h3>
            <div className=" max-h-[200px] overflow-auto">
                {isLoading && (
                    <div className="w-full flex justify-center items-center py-5">
                        <BarLoader color="#8f384d" height={5} />
                    </div>
                )}
                {isError && (
                    <div className="w-full flex justify-center items-center py-5">
                        <h1 className=" text-ThemeRed text-[14px]">
                            Something went wrong
                        </h1>
                    </div>
                )}
                {name === "Account" && (
                    <>
                        {data?.data.map(
                            (
                                item: {
                                    account_name: string;
                                    id: number;
                                },
                                index: number
                            ) => (
                                <div className="mb-1" key={index}>
                                    <input
                                        type="radio"
                                        name="radio"
                                        id={`${item.account_name}_${name}_${item.id}`}
                                        checked={
                                            isCheckBox.some(
                                                (someItem) =>
                                                    someItem.id === item.id
                                            )
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            SelectHandler(
                                                e,
                                                name,
                                                item.id,
                                                item.account_name
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor={`${item.account_name}_${name}_${item.id}`}
                                        className={
                                            "text-RegularColor text-[16px] 1024px:text-[14px]"
                                        }
                                    >
                                        {item.account_name}
                                    </label>
                                </div>
                            )
                        )}
                    </>
                )}

                {(name === "Project" || name === "Tower") && (
                    <>
                        {data?.data.map(
                            (
                                item: {
                                    name: string;
                                    id: number;
                                },
                                index: number
                            ) => (
                                <div className="mb-1" key={index}>
                                    <input
                                        type="radio"
                                        name={`report_${name}`}
                                        id={`${item.name}_${name}_${item.id}`}
                                        checked={
                                            isCheckBox.some(
                                                (someItem) =>
                                                    someItem.id === item.id
                                            )
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            SelectHandler(
                                                e,
                                                name,
                                                item.id,
                                                item.name
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor={`${item.name}_${name}_${item.id}`}
                                        className={
                                            "text-RegularColor text-[16px] 1024px:text-[14px]"
                                        }
                                    >
                                        {item.name}
                                    </label>
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </li>
    );
}
