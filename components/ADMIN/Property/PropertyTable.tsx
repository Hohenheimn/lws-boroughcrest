import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import Link from "next/link";
import { GetPropertyList } from "../../ReactQuery/PropertyMethod";
import { BarLoader } from "react-spinners";
import Pagination from "../../Pagination";

export default function PropertyTable({ isSearchTable }: any) {
    const { propTableColumn, propTableRows } = useContext(AppContext);
    const { isLoading, data } = GetPropertyList(propTableRows, isSearchTable);
    const PropertyData = data?.data.data;
    const [TablePage, setTablePage] = useState(1);
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
                            <List key={index} itemDetail={itemDetail} />
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
    const { ImgUrl, propTableColumn } = useContext(AppContext);
    const Owner = itemDetail.owner;
    return (
        <tr>
            <td>
                <Link href={`/admin/property/${itemDetail.id}`}>
                    <a className="item">
                        <div>
                            <h2>{itemDetail.id}</h2>
                        </div>
                    </a>
                </Link>
            </td>
            {propTableColumn.map((item: any, index: number) => (
                <td key={index}>
                    <Link href={`/admin/property/${itemDetail.id}`}>
                        <a className="item">
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
                                    <h2 key={index}>
                                        {itemDetail?.owner?.name}
                                    </h2>
                                </div>
                            )}
                        </a>
                    </Link>
                </td>
            ))}
        </tr>
    );
};
