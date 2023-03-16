import React, { useState } from "react";
import HeaderCollection from "../../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";

export default function PaymentQueueing() {
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    return (
        <>
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint="/finance/general-ledger/journal/filter-options"
                page="payment-queueing"
            />
            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Class</th>
                            <th>Property</th>
                            <th>Amount Received</th>
                            <th>Deposit Date</th>
                            <th>Reference No.</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Juan Dela Cruz</td>
                            <td>Owner</td>
                            <td>0001, 0002, 0003</td>
                            <td>
                                <TextNumberDisplay
                                    className="withPeso w-full"
                                    value={2500}
                                />
                            </td>
                            <td>Sep 28 2022</td>
                            <td>RN00000001</td>
                            <td>Inbound Default</td>
                        </tr>
                        <tr>
                            <td>Juan Dela Cruz</td>
                            <td>Owner</td>
                            <td>0001, 0002, 0003</td>
                            <td>
                                <TextNumberDisplay
                                    className="withPeso w-full"
                                    value={2500}
                                />
                            </td>
                            <td>Sep 28 2022</td>
                            <td>RN00000001</td>
                            <td>Inbound Default</td>
                        </tr>
                    </tbody>
                </table>
                {/* {isLoading && (
                    <div className="w-full flex justify-center items-center">
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
                {isError && <TableErrorMessage />} */}
            </div>
        </>
    );
}
