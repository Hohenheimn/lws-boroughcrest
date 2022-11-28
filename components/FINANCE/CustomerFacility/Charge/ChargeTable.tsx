import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import Image from "next/image";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { BarLoader } from "react-spinners";

type Props = {
    page: string;
    data: any;
    column: any;
    isError: any;
    isLoading: any;
    setCreate: Function;
};

export default function ChargeTable({
    data,
    column,
    isError,
    isLoading,
    page,
    setCreate,
}: Props) {
    return (
        <>
            <section className={style.container}>
                <div className={style.searchBar}>
                    <input type="text" placeholder="Search anything here..." />
                    <BsSearch className={style.searchIcon} />
                </div>

                <ul className={style.navigation}>
                    <li className={style.new}>
                        <div onClick={() => setCreate(true)}>
                            Create <span className=" capitalize">{page}</span>
                        </div>
                    </li>
                </ul>
            </section>

            <div className="table_container">
                <table className="table_list corp">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Base Rate</th>
                            <th>UOM</th>
                            <th>VAT%</th>
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
                        {data?.data.map((item: any, index: number) => (
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
        </>
    );
}

type ListProps = {
    itemDetail: any;
};

const List = ({ itemDetail }: ListProps) => {
    return (
        <tr>
            <td>
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>

            <td>
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>Lorem, ipsum.</h2>
                        </div>
                    </a>
                </Link>
            </td>
        </tr>
    );
};
