import { getCookie } from "cookies-next";
import React from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../util/api";
import type { property } from "../../../types/PropertyList";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PrintTemplate from "../../../components/Reusable/PrintTemplate";
import { GetPropertyList } from "../../../components/ReactQuery/PropertyMethod";

type Props = {
    Keyword: string;
    PageNumber: string | number;
    RowNumber: number;
    Columns: string;
};

export default function Print({
    Keyword,
    PageNumber,
    RowNumber,
    Columns,
}: Props) {
    const ColumnsArray = Columns.split(",");

    const { data, isLoading, isError } = GetPropertyList(
        PageNumber,
        Keyword,
        RowNumber
    );

    const printhandler = () => {
        print();
    };

    return (
        <>
            <div className="flex items-center flex-col">
                <aside className="w-full max-w-[1366px] py-5 flex justify-end px-5 hidePrint">
                    <Tippy theme="ThemeRed" content="Print">
                        <div
                            className="relative h-[35px] w-[35px] hover:scale-[1.1] transition-all duration-75"
                            onClick={printhandler}
                        >
                            <Image
                                src="/Images/Print.png"
                                alt=""
                                layout="fill"
                            />
                        </div>
                    </Tippy>
                </aside>

                <PrintTemplate title="Property">
                    <table className="w-full">
                        <thead className="text-[#545454] text-[14px] text-start">
                            <tr>
                                <th className="text-start px-2 py-1">ID</th>
                                {ColumnsArray?.map(
                                    (item: any, index: number) => (
                                        <th key={index} className="text-start">
                                            {item}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody className="text-[14px]">
                            {data?.data?.data.map(
                                (item: any, index: number) => (
                                    <List
                                        key={index}
                                        itemDetail={item}
                                        Columns={ColumnsArray}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                </PrintTemplate>
                {isLoading && (
                    <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
                        <aside className="text-center flex justify-center py-5">
                            <BarLoader
                                color={"#8f384d"}
                                height="10px"
                                width="200px"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </aside>
                    </div>
                )}
                <button></button>
            </div>
        </>
    );
}

interface ListProps {
    itemDetail: property;
    Columns: any;
}

const List = ({ itemDetail, Columns }: ListProps) => {
    return (
        <tr>
            <td className=" px-2 py-3 border-b border-gray-300 text-[#2E4364] font-NHU-medium">
                <p className="font-NHU-medium">{itemDetail.id}</p>
            </td>
            {Columns.map((item: any, index: number) => (
                <td
                    key={index}
                    className=" px-2 py-3 border-b border-gray-300 text-[#2E4364] font-NHU-medium"
                >
                    {item === "Unit Code" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.unit_code
                                ? itemDetail?.unit_code
                                : "N/A"}
                        </p>
                    )}
                    {item === "Project" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.project?.name
                                ? itemDetail?.project?.name
                                : "N/A"}
                        </p>
                    )}
                    {item === "Developer" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.developer?.name
                                ? itemDetail?.developer?.name
                                : "N/A"}
                        </p>
                    )}
                    {item === "Tower" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.tower?.name
                                ? itemDetail?.tower?.name
                                : "N/A"}
                        </p>
                    )}
                    {item === "Floor" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.floor?.name
                                ? itemDetail?.floor?.name
                                : "N/A"}
                        </p>
                    )}
                    {item === "Class" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.class ? itemDetail?.class : "N/A"}
                        </p>
                    )}
                    {item === "Type" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.type ? itemDetail?.type : "N/A"}
                        </p>
                    )}
                    {item === "Turn Over" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.turnover_date
                                ? itemDetail?.turnover_date
                                : "N/A"}
                        </p>
                    )}
                    {item === "Owner" && (
                        <p className="font-NHU-medium">
                            {itemDetail?.owner?.name
                                ? itemDetail?.owner?.name
                                : "N/A"}
                        </p>
                    )}
                </td>
            ))}
        </tr>
    );
};

export async function getServerSideProps({ query }: any) {
    const Keyword = query.keyword;
    const PageNumber = query.page;
    const RowNumber = query.limit;
    const Columns = query.columns;
    return {
        props: {
            PageNumber: PageNumber,
            RowNumber: RowNumber,
            Columns: Columns,
            Keyword: Keyword,
        },
    };
}

Print.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
