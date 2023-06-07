import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Card, { RequestDetailType } from "./Card";
import { GetRequest } from "./Query";
import { BarLoader } from "react-spinners";

type Props = {
    type: string;
    color: string;
    refreshToggle: boolean;
    setRefetching: Function;
};

export default function CardContainer({
    type,
    color,
    refreshToggle,
    setRefetching,
}: Props) {
    const [isSearch, setSearch] = useState("");

    const [isPaginate, setPaginate] = useState(10);

    const { isLoading, data, isError, refetch, isFetching } = GetRequest(
        type,
        isSearch,
        isPaginate,
        1
    );

    useEffect(() => {
        if (isFetching) {
            setRefetching(true);
        } else {
            setRefetching(false);
        }
    });

    useEffect(() => {
        refetch();
    }, [refreshToggle]);

    return (
        <>
            <div
                className={` relativew-full border border-gray-200 rounded-md overflow-auto h-[75vh] requestContainer ${type.replaceAll(
                    " ",
                    ""
                )}
         `}
            >
                <div className=" sticky top-0 shadow-md w-full py-3 px-5 bg-white flex justify-between items-center">
                    <p
                        className="py-2 px-4 text-[14px] 640px:text-[13px] 640px:py-1 640px:px-3 rounded-[50px] text-white"
                        style={{ backgroundColor: color }}
                    >
                        {type}
                    </p>
                    <h1 style={{ color: color }}>{data?.data.data.length}</h1>
                </div>
                <div className=" px-5">
                    <div className="w-full py-3">
                        <div
                            className="w-full p-2 px-2 flex items-center border justify-between rounded-lg overflow-hidden"
                            style={{ borderColor: color }}
                        >
                            <input
                                type="text"
                                className=" outline-none bg-transparent w-full text-[14px]"
                                placeholder="Search New Request here..."
                                value={isSearch}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <BsSearch className="ml-2 text-RegularColor" />
                        </div>
                    </div>
                    {isLoading && (
                        <div className="flex justify-center my-5">
                            <BarLoader color={color} height={7} />
                        </div>
                    )}
                    {isError && (
                        <h1 className=" text-ThemeRed text-center">
                            Something went wrong
                        </h1>
                    )}
                    {data?.data.data.map(
                        (item: RequestDetailType, index: number) => (
                            <Card key={index} Detail={item} type={type} />
                        )
                    )}
                    {Number(isPaginate) === Number(data?.data.data.length) && (
                        <div className=" flex justify-center">
                            <button
                                className=" text-ThemeRed hover:underline text-[14px] mt-2"
                                onClick={() =>
                                    setPaginate((prev) => Number(prev) + 10)
                                }
                            >
                                See More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
