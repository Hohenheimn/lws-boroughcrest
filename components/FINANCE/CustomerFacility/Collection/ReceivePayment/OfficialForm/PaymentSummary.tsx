import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import DropDownCharge from "../../../../../Dropdowns/DropDownCharge";
import {
    InputNumberForTable,
    TextNumberDisplay,
    TextNumberDisplayPercent,
} from "../../../../../Reusable/NumberFormat";
import { TableOneTotal } from "../../../../../Reusable/TableTotal";
import { HeaderForm } from "../ReceivePaymentForm";

type Props = {
    Error: () => void;
    headerForm: HeaderForm;
    customer_id: string | number;
};

type isTableItem = {
    base: number;
    vat: number;
    vat_amount: number;
    total: number;
};

export default function PaymentSummary({
    Error,
    headerForm,
    customer_id,
}: Props) {
    const [isTable, setTable] = useState<isTableItem[]>([
        {
            base: 0,
            vat: 0,
            vat_amount: 0,
            total: 0,
        },
    ]);

    return (
        <>
            <h1 className="SectionTitle mb-5 pt-10">Payment Summary</h1>
            <div className="flex">
                <div className="table_container w-[70%]">
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
                            {customer_id !== "" && (
                                <>
                                    {isTable.map((item, index) => (
                                        <List key={index} itemDetail={item} />
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="table_container w-[30%]">
                    <table className="table_list journal">
                        <thead className="textRed">
                            <tr>
                                <th>TOTAL DUE</th>
                                <th>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-RegularColor font-NHU-regular font-normal"
                                        value={564564}
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
                                        value={564564}
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
                                        value={564564}
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
                                        className="withPeso w-full text-RegularColor"
                                        value={564564}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1 className=" text-ThemeRed">VARIANCE</h1>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPesoWhite w-full text-white bg-ThemeRed px-2 pb-[2px]"
                                        value={564564}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

type List = {
    itemDetail: isTableItem;
};

const List = ({ itemDetail }: List) => {
    return (
        <tr>
            <td>
                <TextNumberDisplay className="w-full withPeso" value={1000} />
            </td>
            <td>
                <TextNumberDisplay className="w-full" value={10} suffix="%" />
            </td>
            <td>
                <TextNumberDisplay className="w-full withPeso" value={1000} />
            </td>
            <td>
                {" "}
                <TextNumberDisplay className="w-full withPeso" value={1000} />
            </td>
        </tr>
    );
};
