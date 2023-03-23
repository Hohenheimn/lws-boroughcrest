import { format, isValid, parse } from "date-fns";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import JournalForm from "./JournalForm";
import { GetJournalDetail } from "./Query";

export default function JournalCopy() {
    const router = useRouter();
    const id: any = router.query.copy;
    const { isLoading, data, isError } = GetJournalDetail(id);
    const [isJournalList, setJournalList] = useState([]);
    const date = parse(data?.data.date, "yyyy-MM-dd", new Date());

    useEffect(() => {
        if (data?.status === 200) {
            const cloneArray = data?.data.journal_list.map((item: any) => {
                return {
                    id: 1,
                    account_id: item?.chart_of_account_id,
                    accountCode: item?.chart_of_account?.chart_code,
                    accountName: item?.chart_of_account?.account_name,
                    debit: item.debit,
                    credit: item.credit,
                };
            });
            setJournalList(cloneArray);
        }
    }, [data?.status]);

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
                setJournalList={setJournalList}
                DefaultParticulars={data?.data.particulars}
                DefaultDateValue={
                    isValid(date) ? format(date, "MMM dd yyyy") : ""
                }
                DefaultStatus={data?.data.status}
                type="create"
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
