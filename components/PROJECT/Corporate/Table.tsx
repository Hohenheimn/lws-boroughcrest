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
        <>
            <div className="table_container">
                <table className="table_list corp">
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
            </div>

            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.last_page}
                CurrentPage={data?.data.current_page}
            />
        </>
    );
}

const List = ({ itemDetail }: any) => {
    const { corpColumn } = useContext(AppContext);

    let Logo: any;
    if (itemDetail.logo) {
        Logo =
            "https://boroughcrest-api.lws.codes/get-img?image=" +
            itemDetail.logo;
    } else {
        Logo = "/Images/sampleProfile.png";
    }
    const Address = `${itemDetail.address_unit_floor} ${itemDetail.address_building} ${itemDetail.address_district} ${itemDetail.address_municipal_city} ${itemDetail.address_province} ${itemDetail.address_zip_code}`;
    return (
        <>
            <tr>
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
