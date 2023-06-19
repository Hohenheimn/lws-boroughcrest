import React from "react";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import PrintTemplate from "../../../../../components/Reusable/PrintTemplate";
import PrintCollectionList from "../../../../../components/FINANCE/CustomerFacility/Collection/PaymentRegister/PrintList";
import PrintCollectionDetail from "../../../../../components/FINANCE/CustomerFacility/Collection/PaymentRegister/PrintDetail";

export default function Print({ payment_register_id, type }: any) {
    const PagePermisson = PageAccessValidation("Collection");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    return (
        <>
            <div className="flex items-center flex-col">
                <PrintTemplate title={type}>
                    {type !== "payment register list" &&
                        type !== "payment register detail" && (
                            <div className="flex justify-center">
                                <h1>Wrong route</h1>
                            </div>
                        )}
                    {type === "payment register list" && (
                        <>
                            <PrintCollectionList />
                        </>
                    )}
                    {type === "payment register detail" && (
                        <>
                            <PrintCollectionDetail id={payment_register_id} />
                        </>
                    )}
                </PrintTemplate>
            </div>
        </>
    );
}

export async function getServerSideProps({ query }: any) {
    const type = query?.type;
    const payment_register_id = query?.payment_register_id;
    return {
        props: {
            type: type,
            payment_register_id:
                payment_register_id !== undefined ? payment_register_id : "",
        },
    };
}

Print.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
