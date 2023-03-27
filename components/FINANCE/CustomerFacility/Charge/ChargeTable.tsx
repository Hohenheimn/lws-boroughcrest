import React, { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import style from "../../../../styles/SearchFilter.module.scss";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import api from "../../../../util/api";
import AppContext from "../../../Context/AppContext";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import Pagination from "../../../Reusable/Pagination";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";

type Props = {
    page: string;
    setCreate: Function;
};

export default function ChargeTable({ page, setCreate }: Props) {
    const { setPrompt } = useContext(AppContext);
    const [TablePage, setTablePage] = useState(1);
    const [isSearch, setSearch] = useState("");
    const { data, isLoading, isError } = useQuery(
        ["charge-list", isSearch, TablePage],
        () => {
            return api.get(
                `/finance/customer-facility/charges?keywords=${isSearch}&paginate=10&page=${TablePage}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );
    if (isError) {
        setPrompt({
            message: "Something is wrong!",
            type: "error",
            toggle: true,
        });
    }
    return (
        <>
            <section className={style.container}>
                <div className={style.searchBar}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={isSearch}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <BsSearch className={style.searchIcon} />
                </div>

                <ul className={style.navigation}>
                    <li className={style.new}>
                        <button
                            className="buttonRed"
                            onClick={() => setCreate(true)}
                        >
                            CREATE <span className=" uppercase">{page}</span>
                        </button>
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
                            <th>Receivable</th>
                            <th>Discounts</th>
                            <th>Revenue</th>
                            <th>Advances</th>
                            <th>Minimum</th>
                            <th>Interest</th>
                            <th>Payment Heirarchy</th>
                            <th>SOA Sort Order</th>
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
                {isError && <TableErrorMessage />}
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
                            <h2>{itemDetail.code}</h2>
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
                            <h2>{itemDetail.type}</h2>
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
                            <h2>{itemDetail.name}</h2>
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
                            <h2>{itemDetail.description}</h2>
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
                            <h2>{itemDetail.base_rate}</h2>
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
                            <h2>{itemDetail?.uom?.name}</h2>
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
                            <h2>
                                <TextNumberDisplay
                                    value={itemDetail.vat_percent}
                                    className="w-full"
                                    suffix="%"
                                />
                            </h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td className="xLarge">
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>{itemDetail.receivable_coa.account_name}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td className="xLarge">
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>{itemDetail.discounts_coa.account_name}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td className="xLarge">
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>{itemDetail.revenue_coa.account_name}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            <td className="xLarge">
                <Link
                    href={`/finance/customer-facility/charge?modify=${itemDetail.id}`}
                >
                    <a className="item">
                        <div>
                            <h2>{itemDetail.advances_coa.account_name}</h2>
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
                            <h2>{itemDetail.minimum}</h2>
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
                            <h2>{itemDetail.interest}</h2>
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
                            <h2>{itemDetail.payment_heirarchy}</h2>
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
                            <h2>{itemDetail.soa_sort_order}</h2>
                        </div>
                    </a>
                </Link>
            </td>
        </tr>
    );
};
