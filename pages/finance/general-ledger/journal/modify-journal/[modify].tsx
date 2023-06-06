import { format, isValid, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import JournalForm from "../../../../../components/FINANCE/General-Ledger/Journal/JournalForm";
import { GetJournalDetail } from "../../../../../components/FINANCE/General-Ledger/Journal/Query";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { AccessActionValidation } from "../../../../../components/Reusable/PermissionValidation/ActionAccessValidation";
import { FaLock } from "react-icons/fa";

export default function Modify({ id }: any) {
    const { isLoading, data, isError } = GetJournalDetail(id);
    const [isJournalList, setJournalList] = useState([]);
    const date = parse(data?.data.date, "yyyy-MM-dd", new Date());

    useEffect(() => {
        if (data?.status === 200) {
            const cloneArray = data?.data.journal_list.map((item: any) => {
                return {
                    id: item?.id,
                    account_id: item?.chart_of_account_id,
                    accountCode: item?.chart_of_account?.chart_code,
                    accountName: item?.chart_of_account?.account_name,
                    debit: `${item.debit}`,
                    credit: `${item.credit}`,
                };
            });
            setJournalList(cloneArray);
        }
    }, [data?.status]);

    const PagePermisson = PageAccessValidation("Journal");

    const Permission_modify = AccessActionValidation("Journal", "modify");

    if (!PagePermisson && PagePermisson !== undefined) {
        return <NoPermissionComp />;
    }

    if (!Permission_modify) {
        return (
            <div className="w-full h-full z-[9999999] bg-[#f8f9f9] flex justify-center items-center">
                <div className="flex flex-col items-center ">
                    <h1>
                        <FaLock className=" text-ThemeRed text-[45px] mb-3" />
                    </h1>
                    <h1 className=" text-ThemeRed text-[16px]">
                        You do not have permission to Modify Journal
                    </h1>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="pageDetail">
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="pageDetail">
                <h1>Something is wrong!</h1>
            </div>
        );
    }
    return (
        <>
            <JournalForm
                id={id}
                JournalList={isJournalList}
                DefaultParticulars={data?.data.particulars}
                DefaultDateValue={
                    isValid(date) ? format(date, "MMM dd yyyy") : ""
                }
                DefaultStatus={data?.data.status}
                type="modify"
            />
        </>
    );
}

export async function getServerSideProps({ query }: any) {
    const id = query.modify;
    return {
        props: {
            id: id,
        },
    };
}
