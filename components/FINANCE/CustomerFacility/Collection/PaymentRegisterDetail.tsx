import React, { useEffect, useState } from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Image from "next/image";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { TableOneTotal, TableTwoTotal } from "../../../Reusable/TableTotal";
import Authorization from "./Authorization";
import { CollectionItem } from "../../../../pages/finance/customer-facility/collection/payment-register";
import { GetCustomer } from "../../../ReactQuery/CustomerMethod";
import { customer } from "../../../../types/customerList";
import { format, isValid, parse } from "date-fns";

type Props = {
    CollectionDetail: CollectionItem;
};

export default function PaymentRegisterDetail({ CollectionDetail }: Props) {
    const { data } = GetCustomer(CollectionDetail.customer_id);

    const CustomerDetail: customer = data?.data;

    const [isToggleID, setToggle] = useState<number | string>("");

    const receipt_date = parse(
        CollectionDetail.receipt_date,
        "yyyy-MM-dd",
        new Date()
    );

    const deposit_date = parse(
        CollectionDetail.deposit_date,
        "yyyy-MM-dd",
        new Date()
    );

    const [isDepositsTotal, setDepositsTotal] = useState(0);
    const [isCheckwareHouseTotal, setCheckwareHouseTotal] = useState(0);

    useEffect(() => {
        setDepositsTotal(0);
        CollectionDetail?.deposits?.map((item) => {
            setDepositsTotal((prev) => Number(prev) + Number(item.amount));
        });
    }, [CollectionDetail?.deposits]);

    useEffect(() => {
        setCheckwareHouseTotal(0);
        CollectionDetail?.check_warehouses?.map((item) => {
            setCheckwareHouseTotal(
                (prev) => Number(prev) + Number(item.amount)
            );
        });
    }, [CollectionDetail?.check_warehouses]);

    return (
        <div>
            {isToggleID !== "" && (
                <Authorization id={isToggleID} setState={setToggle} />
            )}
            <div>
                <div className="flex justify-between flex-wrap">
                    <h1 className="pageTitle mb-5">Payment Details</h1>
                    <ul className="flex">
                        <li className="mr-5">
                            <Tippy theme="ThemeRed" content="Remove">
                                <div
                                    onClick={() => setToggle(1)}
                                    className="relative w-8 h-8 transition-all duration-75 hover:scale-[1.1]"
                                >
                                    <Image
                                        src="/Images/circle_remove.png"
                                        layout="fill"
                                        alt="Print"
                                    />
                                </div>
                            </Tippy>
                        </li>
                        <li className="mr-5">
                            <Tippy theme="ThemeRed" content="Print">
                                <div className="relative w-8 h-8 transition-all duration-75 hover:scale-[1.1]">
                                    <Image
                                        src="/Images/Print.png"
                                        layout="fill"
                                        alt="Print"
                                    />
                                </div>
                            </Tippy>
                        </li>
                    </ul>
                </div>

                <ul className=" flex justify-between relative w-full mb-10 640px:mb-5 flex-wrap">
                    <li className="w-[25%] 640px:w-full 640px:mb-5 640px:flex justify-between rounded-2xl p-10 480px:p-8 bg-white  shadow-lg">
                        <div className=" 640px:w-[32%]">
                            <p className="label_text">CUSTOMER</p>
                            <h4 className="main_text">
                                {CustomerDetail?.name}
                            </h4>
                        </div>
                        <div className=" 640px:w-[32%]">
                            <p className="label_text">CLASS</p>
                            <h4 className="main_text">
                                {CustomerDetail?.class}
                            </h4>
                        </div>
                        <div className=" 640px:w-[32%]">
                            <p className="label_text">PROPERTY</p>
                            <h4 className="main_text">
                                {CustomerDetail?.properties.map(
                                    (item: any, index: number) =>
                                        CustomerDetail?.properties.length -
                                            1 ===
                                        index
                                            ? item.unit_code
                                            : item.unit_code + ", "
                                )}
                            </h4>
                        </div>
                    </li>
                    <li className="w-[70%] 640px:w-full rounded-2xl p-10 480px:p-8 bg-white  shadow-lg">
                        <ul className="flex flex-wrap">
                            <li className="w-[32%]">
                                <p className="label_text">RECEIPT DATE</p>
                                <h4 className="main_text">
                                    {isValid(receipt_date)
                                        ? format(receipt_date, "MMM dd yyyy")
                                        : ""}
                                </h4>
                            </li>
                            <li className="w-[32%]">
                                <p className="label_text">RECEIPT NO.</p>
                                <h4 className="main_text">
                                    {CollectionDetail.receipt_no}
                                </h4>
                            </li>
                        </ul>
                        <ul className="flex flex-wrap">
                            <li className="w-full">
                                <p className="label_text">DESCRIPTION</p>
                                <h4 className="main_text">
                                    {CollectionDetail.description}
                                </h4>
                            </li>
                        </ul>
                        <ul className="flex justify-between flex-wrap">
                            <li className="w-[32%]">
                                <p className="label_text">MODE OF PAYMENT</p>
                                <h4 className="main_text">
                                    {CollectionDetail.mode_of_payment}
                                </h4>
                            </li>
                            <li className="w-[32%]">
                                <p className="label_text">DEPOSIT DATE</p>
                                <h4 className="main_text">
                                    {isValid(deposit_date)
                                        ? format(deposit_date, "MMM dd yyyy")
                                        : ""}
                                </h4>
                            </li>
                            <li className="w-[32%]">
                                <p className="label_text">PAID AMOUNT</p>

                                <TextNumberDisplay
                                    className="main_text font-NHU-bold"
                                    value={CollectionDetail.amount_paid}
                                />
                            </li>
                            <li className="w-[32%]">
                                <p className="label_text">CASH ACCOUNT</p>
                                <h4 className="main_text">Sample</h4>
                            </li>
                            <li className="w-[32%]">
                                <p className="label_text">REFERENCE NO</p>
                                <h4 className="main_text">
                                    {CollectionDetail.reference_no}
                                </h4>
                            </li>
                            <li className="w-[32%]">
                                <p className="label_text">CREDIT TAX</p>

                                <TextNumberDisplay
                                    className="main_text font-NHU-bold"
                                    value={CollectionDetail.credit_tax}
                                />
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className=" flex justify-between relative w-full mb-10 flex-wrap">
                    {CollectionDetail.receipt_type === "Official" && (
                        <li className="w-full rounded-2xl p-10 480px:p-8 bg-white  shadow-lg mb-10 640px:mb-5">
                            <h1 className="SectionTitle mb-5">
                                Outstanding Balance
                            </h1>
                            <div className="table_container min-zero border-b border-ThemeRed50 pb-10">
                                <table className="table_list ">
                                    <thead className="textRed ">
                                        <tr>
                                            <th>CHARGE</th>
                                            <th>DESCRIPTION</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Water</td>
                                            <td>Lorem, ipsum.</td>
                                            <td>
                                                <TextNumberDisplay
                                                    className="withPeso w-full text-end"
                                                    value={1000}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Electricity</td>
                                            <td>Lorem, ipsum.</td>
                                            <td>
                                                <TextNumberDisplay
                                                    className="withPeso w-full text-end"
                                                    value={2000}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <TableOneTotal
                                total={3000}
                                label={"SUBTOTAL"}
                                redBG={false}
                            />
                            <h1 className="SectionTitle mb-5">Advances</h1>
                            <div className="table_container min-zero border-b border-ThemeRed50 pb-10">
                                <table className="table_list ">
                                    <thead className="textRed ">
                                        <tr>
                                            <th>CHARGE</th>
                                            <th>DESCRIPTION</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Water</td>
                                            <td>Lorem, ipsum.</td>
                                            <td>
                                                <TextNumberDisplay
                                                    className="withPeso w-full text-end"
                                                    value={1000}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Electricity</td>
                                            <td>Lorem, ipsum.</td>
                                            <td>
                                                <TextNumberDisplay
                                                    className="withPeso w-full text-end"
                                                    value={2000}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <TableOneTotal
                                total={3000}
                                label={"SUBTOTAL"}
                                redBG={false}
                            />
                        </li>
                    )}
                    {CollectionDetail.receipt_type === "Acknowledgement" && (
                        <li className="w-full rounded-2xl p-10 480px:p-8 bg-white  shadow-lg mb-10 640px:mb-5">
                            <h1 className="SectionTitle mb-5">Deposit</h1>
                            <div className="table_container min-zero border-b border-ThemeRed50 pb-10">
                                <table className="table_list ">
                                    <thead className="textRed ">
                                        <tr>
                                            <th>CHARGE</th>
                                            <th>DESCRIPTION</th>
                                            <th>AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CollectionDetail?.deposits.map(
                                            (item, index) => (
                                                <tr key={index}>
                                                    <td>{item.charge_name}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <TextNumberDisplay
                                                            className="withPeso w-full text-end"
                                                            value={item.amount}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <TableOneTotal
                                total={isDepositsTotal}
                                label={"SUBTOTAL"}
                                redBG={false}
                            />
                        </li>
                    )}
                    {CollectionDetail.receipt_type === "Provisional" && (
                        <li className="w-full rounded-2xl p-10 480px:p-8 bg-white  shadow-lg mb-10 640px:mb-5">
                            <h1 className="SectionTitle mb-5">
                                Check Warehouse
                            </h1>
                            <div className="table_container min-zero border-b border-ThemeRed50 pb-10">
                                <table className="table_list ">
                                    <thead className="textRed ">
                                        <tr>
                                            <th>Check No.</th>
                                            <th>Check Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CollectionDetail.check_warehouses.map(
                                            (item, index) => (
                                                <tr key={index}>
                                                    <td>{item.check_no}</td>
                                                    <td>{item.check_date}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <TextNumberDisplay
                                                            className="withPeso w-full text-end"
                                                            value={item.amount}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <TableOneTotal
                                total={isCheckwareHouseTotal}
                                label={"SUBTOTAL"}
                                redBG={false}
                            />
                        </li>
                    )}
                    <li className="w-full rounded-2xl p-10 480px:p-8 bg-white mb-10 640px:mb-5 shadow-lg">
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
                                            <tr>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="w-full withPeso"
                                                        value={1000}
                                                    />
                                                </td>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="w-full"
                                                        value={10}
                                                        suffix="%"
                                                    />
                                                </td>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="w-full withPeso"
                                                        value={1000}
                                                    />
                                                </td>
                                                <td>
                                                    {" "}
                                                    <TextNumberDisplay
                                                        className="w-full withPeso"
                                                        value={1000}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="w-full withPeso"
                                                        value={1000}
                                                    />
                                                </td>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="w-full"
                                                        value={10}
                                                        suffix="%"
                                                    />
                                                </td>
                                                <td>
                                                    <TextNumberDisplay
                                                        className="w-full withPeso"
                                                        value={1000}
                                                    />
                                                </td>
                                                <td>
                                                    {" "}
                                                    <TextNumberDisplay
                                                        className="w-full withPeso"
                                                        value={1000}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <TableTwoTotal total1={2000} total2={2000} />
                            </div>
                            <div className="table_container min-zero  noMB w-[29%] 640px:w-full 640px:mt-5">
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
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </li>
                    <li className="w-full rounded-2xl p-10 480px:p-8 bg-white  shadow-lg">
                        <p className="label_text">TRAIL</p>
                        <h1 className="main_text noMB">
                            {CollectionDetail.created_at}
                        </h1>
                        <h1 className="main_text noMB">
                            {CollectionDetail.updated_at}
                        </h1>
                    </li>
                </ul>
            </div>
        </div>
    );
}
