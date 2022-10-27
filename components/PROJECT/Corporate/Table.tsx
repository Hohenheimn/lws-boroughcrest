import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";
import api from "../../../util/api";
import { useQuery } from "react-query";
import Pagination from "../../Pagination";
import BarLoader from "react-spinners/BarLoader";
import { getCookie } from "cookies-next";

type Props = {
    isSearchTable: string;
};

export default function Table({ isSearchTable }: Props) {
    const { TableRows, corpColumn } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = useQuery(
        ["get-corporate-list", TablePage, isSearchTable, TableRows],
        () => {
            return api.get(
                `/project/corporate?keywords=${isSearchTable}&paginate=${TableRows}&page=${TablePage}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
    return (
        <div className=" w-full overflow-x-auto">
            <table className="table_list 1024px:min-w-[1200px]">
                <thead>
                    <tr>
                        {corpColumn.map((item: any, index: number) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isError && (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Error...
                            </td>
                        </tr>
                    )}
                    {data?.data.data.map((item: any, index: number) => (
                        <List key={index} itemDetail={item} />
                    ))}
                </tbody>
            </table>
            {isLoading && (
                <div>
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
            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.last_page}
                CurrentPage={data?.data.current_page}
            />
        </div>
    );
}

const List = ({ itemDetail }: any) => {
    const [isEdit, setEdit] = useState(false);
    const [isEdit1, setEdit1] = useState(false);
    const { corpColumn } = useContext(AppContext);
    const MouseEnter = () => {
        setEdit(true);
    };
    const MouseLeave = () => {
        setEdit(false);
    };
    const MouseEnter1 = () => {
        setEdit1(true);
    };
    const MouseLeave1 = () => {
        setEdit1(false);
    };
    const Logo =
        "https://boroughcrest-api.lws.codes/get-img?image=" + itemDetail.logo;
    const Address = `${itemDetail.address_unit_floor} ${itemDetail.address_building} ${itemDetail.address_building} ${itemDetail.address_district} ${itemDetail.address_municipal_city} ${itemDetail.address_province} ${itemDetail.address_zip_code}`;
    return (
        <>
            <tr onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
                {corpColumn.map((item: any, index: number) => (
                    <td key={index}>
                        {item === "ID" && (
                            <Link href={`/project/corporate/${itemDetail.id}`}>
                                <a className="item">
                                    <aside>
                                        <Image
                                            src={Logo}
                                            alt=""
                                            layout="fill"
                                        />
                                    </aside>
                                    <div>
                                        <h2>{itemDetail.id}</h2>
                                    </div>
                                </a>
                            </Link>
                        )}
                        {item === "Name" && (
                            <Link href={`/project/corporate/${itemDetail.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail.name}</h2>
                                    </div>
                                </a>
                            </Link>
                        )}
                        {item === "Address" && (
                            <Link href={`/project/corporate/${itemDetail.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{Address}</h2>
                                    </div>
                                </a>
                            </Link>
                        )}
                        {item === "TIN" && (
                            <Link href={`/project/corporate/${itemDetail.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail.tin}</h2>
                                    </div>
                                </a>
                            </Link>
                        )}
                        {item === "Contact no." && (
                            <Link href={`/project/corporate/${itemDetail.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail.contact_no}</h2>
                                    </div>
                                </a>
                            </Link>
                        )}
                        {item === "Email" && (
                            <Link href={`/project/corporate/${itemDetail.id}`}>
                                <a className="item">
                                    <div>
                                        <h2>{itemDetail.email}</h2>
                                    </div>
                                </a>
                            </Link>
                        )}
                    </td>
                ))}
            </tr>
        </>
    );
};
