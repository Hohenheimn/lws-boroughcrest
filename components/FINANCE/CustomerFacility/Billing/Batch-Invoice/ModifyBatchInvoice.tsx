import React, { useEffect, useState } from "react";
import BatchForm from "./BatchForm";
import { ShowBatchInvoice } from "./Query";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";

export default function ModifyBatchInvoice() {
    const router = useRouter();
    const id: any = router.query.modify;
    const { data, isLoading, isError } = ShowBatchInvoice(id);

    const isDefault = [
        {
            id: data?.data.id,
            backend_id: data?.data.id,
            charge: data?.data?.charge?.name,
            charge_id: data?.data?.charge?.id,
            description: data?.data?.description,
            application: data?.data?.billing_groups?.map(
                (BillingGroupsItem: any) => {
                    return {
                        id: BillingGroupsItem?.id,
                        name: BillingGroupsItem?.name,
                    };
                }
            ),
        },
    ];

    if (isLoading || isError) {
        return (
            <>
                <table className="table_list forCrud">
                    <thead className="textRed">
                        <tr>
                            {/* <th className="checkbox">
                                <input type="checkbox" />
                            </th> */}
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>APPLICATION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                {isLoading && (
                    <div className="w-full h-[200px] flex justify-center items-center">
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
            </>
        );
    }

    return <BatchForm DefaultValue={isDefault} />;
}
