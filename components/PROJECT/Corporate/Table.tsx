import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { GoPencil } from "react-icons/go";
import api from "../../../util/api";
import { useQuery } from "react-query";
import Pagination from "../../Pagination";
import BarLoader from "react-spinners/BarLoader";

type Props = {
    isSearchTable: string;
};

export default function Table({ isSearchTable }: Props) {
    const { TableRows } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = useQuery(
        ["get-corporate-list", TablePage, isSearchTable, TableRows],
        () => {
            return api.get(
                `/project/corporate?keywords=${isSearchTable}&paginate=${TableRows}&page=${TablePage}`
            );
        }
    );

    return (
        <div className=" w-full overflow-x-auto">
            <table className="table_list 1024px:min-w-[1200px]">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>TIN</th>
                        <th>Contact No.</th>
                        <th>Email</th>
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
    const MouseEnter = () => {
        setEdit(true);
    };
    const MouseLeave = () => {
        setEdit(false);
    };

    const Address = `${itemDetail.address_unit_floor} ${itemDetail.address_building} ${itemDetail.address_building} ${itemDetail.address_district} ${itemDetail.address_municipal_city} ${itemDetail.address_province} ${itemDetail.address_zip_code}`;
    return (
        <tr onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
            <td>
                {isEdit && (
                    <Link href={`/project/corporate/${itemDetail.id}`}>
                        <a className="edit">
                            <aside>
                                <GoPencil className="mr-2" /> Edit
                            </aside>
                        </a>
                    </Link>
                )}

                <Link href={`/project/corporate/${itemDetail.id}`}>
                    <a className="item">
                        <aside>
                            <Image
                                src="/Images/sampleProfile.png"
                                alt=""
                                layout="fill"
                            />
                        </aside>
                        <div>
                            <h2>{itemDetail.id}</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href={`/project/corporate/${itemDetail.id}`}>
                    <a className="item">
                        <div>
                            <h2>{itemDetail.name}</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href={`/project/corporate/${itemDetail.id}`}>
                    <a className="item">
                        <div>
                            <h2>{Address}</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href={`/project/corporate/${itemDetail.id}`}>
                    <a className="item">
                        <div>
                            <h2>{itemDetail.tin}</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href={`/project/corporate/${itemDetail.id}`}>
                    <a className="item">
                        <div>
                            <h2>{itemDetail.contact_no}</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href={`/project/corporate/${itemDetail.id}`}>
                    <a className="item">
                        <div>
                            <h2>{itemDetail.email}</h2>
                            <p>Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
        </tr>
    );
};
