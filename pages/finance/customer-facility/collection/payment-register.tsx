import React, { useState } from "react";
import HeaderCollection from "../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import { TextNumberDisplay } from "../../../../components/Reusable/NumberFormat";

export default function PaymentRegister() {
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    return (
        <>
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint=""
                page="payment-register"
            />
            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            <th>Receipt Date</th>
                            <th>Receipt No.</th>
                            <th>Customer</th>
                            <th>Property</th>
                            <th>Amount Received</th>
                            <th>Mode of Payment</th>
                            <th>Cash Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sept 28 2022</td>
                            <td>000000</td>
                            <td>Juan Dela Cruz</td>
                            <td>Lorem ipsum</td>
                            <td>
                                <TextNumberDisplay
                                    className="withPeso w-full"
                                    value={2500}
                                />
                            </td>
                            <td>Cash</td>
                            <td>InBound Default</td>
                        </tr>
                        <tr>
                            <td>Sept 28 2022</td>
                            <td>000000</td>
                            <td>Juan Dela Cruz</td>
                            <td>Lorem ipsum</td>
                            <td>
                                <TextNumberDisplay
                                    className="withPeso w-full"
                                    value={2500}
                                />
                            </td>
                            <td>Cash</td>
                            <td>InBound Default</td>
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
