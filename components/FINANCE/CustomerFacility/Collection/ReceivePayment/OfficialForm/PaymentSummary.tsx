import React, { useEffect, useState } from "react";
import { TextNumberDisplay } from "../../../../../Reusable/NumberFormat";
import {
    CollectionItem,
    PaymentSummaryHistories,
} from "../../../../../../pages/finance/customer-facility/collection/payment-register";
import { TableTwoTotal } from "../../../../../Reusable/TableTotal";

export type SummaryItem = {
    credit_tax: number;
    amount_paid: number;
};

type Props = {
    SummaryItems: SummaryItem[];
    CreditTax: number;
    TotalDue: number;
    triggerID: number;
    LessDiscount: number;
};

export default function PaymentSummaryTable({
    SummaryItems,
    CreditTax,
    TotalDue,
    triggerID,
    LessDiscount,
}: Props) {
    // TOTAL
    // Payment Summary
    const [PStotal, setPStotal] = useState<number>(0);
    const [PSVatTotal, setPSVatTotal] = useState<number>(0);
    const [Total, setTotal] = useState<number>(0);

    useEffect(() => {
        const total =
            Number(TotalDue) - Number(LessDiscount) - Number(CreditTax);
        setTotal(total);
    }, [LessDiscount, CreditTax, TotalDue]);

    useEffect(() => {
        setPSVatTotal(0);
        setPStotal(0);
        SummaryItems.map((item) => {
            setPStotal((temp) => Number(temp) + Number(item.amount_paid));
            setPSVatTotal((temp) => Number(temp) + Number(item.credit_tax));
        });
    }, [SummaryItems]);

    return (
        <>
            <h1 className="SectionTitle mb-5">Payment Summary</h1>
            <div className="flex flex-wrap justify-between">
                <div className="  w-[69%]  640px:w-full">
                    <div className="table_container min-zero noMB">
                        <table className="table_list journal">
                            <thead className="textRed">
                                <tr>
                                    <th>BASE</th>
                                    <th>VAT%</th>
                                    <th>VAT AMOUNT</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {triggerID !== 0 && (
                                    <>
                                        {SummaryItems?.map((item, index) => (
                                            <PaymentSummaryListItem
                                                key={index}
                                                item={item}
                                            />
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <TableTwoTotal
                        total1={triggerID !== 0 ? PSVatTotal : 0}
                        total2={triggerID !== 0 ? PStotal : 0}
                    />
                </div>
                <div className="table_container min-zero  noMB w-[29%] 640px:w-full 640px:mt-5">
                    <table className="table_list journal">
                        <thead className="textRed">
                            <tr>
                                <th>TOTAL DUE</th>
                                <th>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-RegularColor font-NHU-regular font-normal"
                                        value={TotalDue}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h1 className=" text-ThemeRed">
                                        LESS: CREDIT TAX
                                    </h1>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-RegularColor"
                                        value={CreditTax}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1 className=" text-ThemeRed">
                                        LESS: DISCOUNT
                                    </h1>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-RegularColor"
                                        value={LessDiscount}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1 className=" text-ThemeRed">
                                        TOTAL PAID
                                    </h1>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPesoWhite w-full text-white bg-ThemeRed px-2 pb-[2px]"
                                        value={Total}
                                    />
                                </td>
                            </tr>
                            {/* <tr>
                            <td>
                                <h1 className=" text-ThemeRed">
                                    VARIANCE
                                </h1>
                            </td>
                            <td>
                                <TextNumberDisplay
                                    className="withPesoWhite w-full text-white bg-ThemeRed px-2 pb-[2px]"
                                    value={564564}
                                />
                            </td>
                        </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

type PaymentSummaryList = {
    item: SummaryItem;
};
const PaymentSummaryListItem = ({ item }: PaymentSummaryList) => {
    const vatAmount = item.credit_tax;
    const base = item.amount_paid;
    const vatPercentage = (Number(vatAmount) / Number(base)) * 100;
    const total = Number(base) + Number(vatAmount);

    return (
        <tr>
            <td>
                <TextNumberDisplay className="w-full withPeso" value={base} />
            </td>
            <td>
                <TextNumberDisplay
                    className="w-full"
                    value={vatPercentage}
                    suffix="%"
                />
            </td>
            <td>
                <TextNumberDisplay
                    className="w-full withPeso"
                    value={vatAmount}
                />
            </td>
            <td>
                <TextNumberDisplay className="w-full withPeso" value={total} />
            </td>
        </tr>
    );
};
