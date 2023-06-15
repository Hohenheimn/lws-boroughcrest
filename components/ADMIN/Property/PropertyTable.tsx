import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import Link from "next/link";
import { GetPropertyList } from "../../ReactQuery/PropertyMethod";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "../../Reusable/TableErrorMessage";
import Pagination from "../../Reusable/Pagination";
import { AccessActionValidation } from "../../Reusable/PermissionValidation/ActionAccessValidation";
import { useRouter } from "next/router";

export default function PropertyTable({ isSearchTable }: any) {
    const PermissionValidationView = AccessActionValidation("Property", "view");

    const { propTableColumn, propTableRows, setPrint } = useContext(AppContext);

    const [TablePage, setTablePage] = useState(1);

    const { isLoading, data, isError } = GetPropertyList(
        TablePage,
        isSearchTable,
        propTableRows
    );

    const PropertyData = data?.data?.data;

    // Set parameter for print
    useEffect(() => {
        setPrint({
            keyword: isSearchTable,
            page: TablePage,
            limit: propTableRows,
            url: "/admin/property/print",
            columns: propTableColumn,
        });
    }, [isSearchTable, TablePage, propTableRows, propTableColumn]);

    return (
        <>
            <div className="table_container">
                <table className="table_list prop">
                    <thead>
                        <tr>
                            <th>ID</th>
                            {propTableColumn?.map(
                                (item: any, index: number) => (
                                    <th key={index}>{item}</th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {PropertyData?.map((itemDetail: any, index: number) => (
                            <List
                                key={index}
                                itemDetail={itemDetail}
                                PermissionValidationView={
                                    PermissionValidationView
                                }
                            />
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

const List = ({ itemDetail, PermissionValidationView }: any) => {
    const { ImgUrl, propTableColumn } = useContext(AppContext);
    const Owner = itemDetail.owner;

    const router = useRouter();

    const redirect = () => {
        if (!PermissionValidationView) return;
        router.push(
            `${
                itemDetail.status === "Draft"
                    ? `?draft=${itemDetail.id}`
                    : `/admin/property/${itemDetail.id}`
            }`
        );
    };

    return (
        <tr
            onClick={redirect}
            className={` ${PermissionValidationView && "cursor-pointer"}`}
        >
            <td>
                <div className="item">
                    <div>
                        <h2>{itemDetail.id}</h2>
                    </div>
                </div>
            </td>
            {propTableColumn.map((item: any, index: number) => (
                <td key={index}>
                    <div className="item">
                        {item === "Unit Code" && (
                            <div>
                                <h2>{itemDetail?.unit_code}</h2>
                            </div>
                        )}
                        {item === "Project" && (
                            <div>
                                <h2>{itemDetail?.project?.name}</h2>
                            </div>
                        )}
                        {item === "Developer" && (
                            <div>
                                <h2>{itemDetail?.developer?.name}</h2>
                            </div>
                        )}
                        {item === "Tower" && (
                            <div>
                                <h2>{itemDetail?.tower?.name}</h2>
                            </div>
                        )}
                        {item === "Floor" && (
                            <div>
                                <h2>{itemDetail?.floor?.name}</h2>
                            </div>
                        )}
                        {item === "Class" && (
                            <div>
                                <h2>{itemDetail?.class}</h2>
                            </div>
                        )}
                        {item === "Type" && (
                            <div>
                                <h2>{itemDetail?.type}</h2>
                            </div>
                        )}
                        {item === "Turn Over" && (
                            <div>
                                <h2>{itemDetail?.turnover_date}</h2>
                            </div>
                        )}
                        {item === "Owner" && (
                            <div>
                                <h2 key={index}>{itemDetail?.owner?.name}</h2>
                            </div>
                        )}
                    </div>
                </td>
            ))}
        </tr>
    );
};
