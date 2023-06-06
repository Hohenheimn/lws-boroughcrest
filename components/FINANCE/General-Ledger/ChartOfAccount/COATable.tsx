import React, { useContext, useState } from "react";
import Link from "next/link";
import api from "../../../../util/api";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Pagination from "../../../Reusable/Pagination";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import TableLoadingNError from "../../../Reusable/TableLoadingNError";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";
import { useRouter } from "next/router";
import AppContext from "../../../Context/AppContext";

type Props = {
    isSearchTable: string;
    isFilterTable: boolean;
};

export default function COATable({ isSearchTable, isFilterTable }: Props) {
    const PermissionValidationView = AccessActionValidation(
        "Chart of Accounts",
        "view"
    );

    const [TablePage, setTablePage] = useState(1);

    const { data, isLoading, isError } = useQuery(
        ["COA-list", TablePage, isSearchTable],
        () => {
            return api.get(
                `/finance/general-ledger/chart-of-accounts?keywords=${isSearchTable}&paginate=10&page=${
                    isSearchTable === "" ? TablePage : 1
                }`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const [showHeader3, setShowHeader3] = useState(false);

    return (
        <>
            <div className="table_container">
                <table className="table_list">
                    <thead>
                        <tr>
                            {isFilterTable ? (
                                <>
                                    <th>Chart Code</th>
                                    <th>Primary</th>
                                    <th>Secondary</th>
                                    <th>Tertiary</th>
                                    <th>Account</th>
                                    <th>Sub Account</th>
                                    <th>
                                        <div
                                            onClick={() =>
                                                setShowHeader3(!showHeader3)
                                            }
                                            className="inline-block"
                                        >
                                            <MdKeyboardArrowRight
                                                className={`text-[24px] ${
                                                    showHeader3 && "rotate-180"
                                                }`}
                                            />
                                        </div>
                                    </th>
                                    <th>Description</th>
                                    <th>Default Account</th>
                                </>
                            ) : (
                                <>
                                    <th>Chart Code</th>
                                    <th>Account Name</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Default Account</th>
                                    <th></th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.data.map((item: any, index: number) => (
                            <List
                                key={index}
                                itemDetail={item}
                                isFilterTable={isFilterTable}
                                showHeader3={showHeader3}
                                PermissionValidationView={
                                    PermissionValidationView
                                }
                            />
                        ))}
                    </tbody>
                </table>
                <TableLoadingNError isLoading={isLoading} isError={isError} />
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
    isFilterTable: boolean;
    showHeader3: boolean;
    PermissionValidationView: boolean;
};
const List = ({
    itemDetail,
    isFilterTable,
    showHeader3,
    PermissionValidationView,
}: ListProps) => {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();
    const redirect = () => {
        if (PermissionValidationView) {
            router.push(
                `/finance/general-ledger/chart-of-account?modify=${itemDetail.id}`
            );
        } else {
            setPrompt({
                message: "You do not have a permission to view",
                toggle: true,
                type: "draft",
            });
        }
    };
    return (
        <>
            <tr
                onClick={redirect}
                className={`${PermissionValidationView && " cursor-pointer"}`}
            >
                <td className="normal">
                    <div className="item">
                        <div>
                            <h2>{itemDetail?.chart_code}</h2>
                        </div>
                    </div>
                </td>
                <td className="xLarge">
                    <div className="item">
                        <div>
                            {!isFilterTable ? (
                                <h2>{itemDetail?.account_name}</h2>
                            ) : itemDetail.header === "Primary" ? (
                                <h2>{itemDetail.account_name}</h2>
                            ) : (
                                <h2></h2>
                            )}
                        </div>
                    </div>
                </td>
                <td className="xLarge">
                    <div className="item">
                        <div>
                            {!isFilterTable ? (
                                <h2>{itemDetail?.category}</h2>
                            ) : itemDetail.header === "Secondary" ? (
                                <h2>{itemDetail.account_name}</h2>
                            ) : (
                                <h2></h2>
                            )}
                        </div>
                    </div>
                </td>
                <td className="xLarge">
                    <div className="item">
                        <div>
                            {!isFilterTable ? (
                                <h2>{itemDetail?.description}</h2>
                            ) : itemDetail.header === "Tertiary" ? (
                                <h2>{itemDetail.account_name}</h2>
                            ) : (
                                <h2></h2>
                            )}
                        </div>
                    </div>
                </td>
                {/* Account */}
                {isFilterTable && (
                    <td className="xLarge">
                        <div className="item">
                            <div>
                                <h2>
                                    {itemDetail.header === "Header 1"
                                        ? itemDetail?.account_name
                                        : ""}
                                </h2>
                            </div>
                        </div>
                    </td>
                )}
                {/* Sub Account */}
                {isFilterTable && (
                    <td className="xLarge">
                        <div className="item">
                            <div>
                                <h2>
                                    {itemDetail.header === "Header 2"
                                        ? itemDetail?.account_name
                                        : ""}
                                </h2>
                            </div>
                        </div>
                    </td>
                )}
                {isFilterTable && (
                    <td className={`${showHeader3 && "xLarge"}`}>
                        {showHeader3 && itemDetail.header === "Header 3" && (
                            <div className="relative">
                                <p>{itemDetail.account_name}</p>
                            </div>
                        )}
                    </td>
                )}
                {/* DesCription */}
                {isFilterTable && (
                    <td className="xLarge">
                        <div className="item">
                            <div>
                                <h2>{itemDetail?.description}</h2>
                            </div>
                        </div>
                    </td>
                )}

                <td className={`${isFilterTable ? "xLarge" : "large"}`}>
                    <div className="item">
                        <div>
                            <h2>{itemDetail?.default_account?.name}</h2>
                        </div>
                    </div>
                </td>

                {!isFilterTable && (
                    <td className="icon">
                        <div className="w-full flex justify-center">
                            <Tippy theme="ThemeRed" content={"Modify"}>
                                <div>
                                    <Image
                                        src="/Images/f_pencil.png"
                                        width={12}
                                        height={12}
                                        alt="Modify"
                                    />
                                </div>
                            </Tippy>
                        </div>
                    </td>
                )}
            </tr>
        </>
    );
};
