import React, { useEffect, useState } from "react";

import { addYears, format, startOfDay } from "date-fns";

import numberToWords from "number-to-words";

import { CollectionItem } from "../../../../../pages/finance/customer-facility/collection/payment-register";
import { LoginUserInfo } from "../../../../HOC/LoginUser/UserInfo";
import { TextNumberDisplay } from "../../../../Reusable/NumberFormat";

type Props = {
  userInfo?: LoginUserInfo;
  data: CollectionItem;
  receiptType: string;
  arRange: { serial_from: string; serial_to: string };
  prRange: { serial_from: string; serial_to: string };
  orRange: { serial_from: string; serial_to: string };
};

const ReceiptPrint = ({
  userInfo,
  data,
  receiptType,
  arRange,
  prRange,
  orRange,
}: Props) => {
  const date = new Date();
  let today = startOfDay(date);
  const dateIn5Years = addYears(today, 5);
  console.log(data);
  console.log(userInfo);
  const cashAmount = data?.mode_of_payment === "Cash" ? data?.amount_paid : 0;
  const [depositsAmountTotal, setDepositsAmountTotal] = useState(0);
  const [checkWarehouseTotal, setCheckWarehouseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setDepositsAmountTotal(0);
    data?.deposits.map((item) => {
      setDepositsAmountTotal((prev) => prev + Number(item.amount));
    });
    setCheckWarehouseTotal(0);
    data?.check_warehouses.map((item) => {
      setCheckWarehouseTotal((prev) => prev + Number(item.amount));
    });
  }, [data]);

  useEffect(() => {
    setTotal(
      Number(depositsAmountTotal) +
        Number(checkWarehouseTotal) +
        Number(cashAmount)
    );
  }, [depositsAmountTotal, checkWarehouseTotal]);

  const textLgBold =
    " text-[1.5rem] print:text-[1rem] font-bold text-start leading-[2rem] print:leading-[1rem]";
  return (
    <div>
      <table className=" w-full text-[#545454]">
        <thead>
          <tr>
            <th>
              <ul className=" flex justify-between items-end uppercase">
                <li className=" flex items-start gap-2 w-[70%]">
                  <aside className=" border border-[#545454] w-[8rem] aspect-square flex justify-center items-center">
                    <p>LOGO</p>
                  </aside>
                  <aside className=" text-start pr-10">
                    <h1 className={`${textLgBold}`}>
                      {userInfo?.corporate?.name}
                    </h1>
                    <p>
                      {userInfo?.corporate?.address_building},{" "}
                      {userInfo?.corporate?.address_district},{" "}
                      {userInfo?.corporate?.address_municipal_city},{" "}
                      {userInfo?.corporate?.address_province},{" "}
                      {userInfo?.corporate?.address_street},{" "}
                      {userInfo?.corporate?.address_unit_floor},{" "}
                      {userInfo?.corporate?.address_zip_code}
                    </p>

                    <p>
                      {userInfo?.corporate_gst_type} REG. TIN:{" "}
                      <span>{userInfo?.corporate?.tin}</span>
                    </p>
                    <p>
                      CONTACT NO.: {userInfo?.corporate?.contact_no} EMAIL:{" "}
                      {userInfo?.corporate?.email}
                    </p>
                  </aside>
                </li>
                <li className=" text-start w-[30%]">
                  <ul className=" flex flex-wrap w-full">
                    <li className=" w-full text-center">
                      <h1 className={` text-[1.3rem]`}>
                        <span className={` italic mr-1`}>ORIGINAL</span>
                        CUSTOMER&apos;S COPY
                      </h1>
                    </li>
                    <li className=" w-2/4  border border-[#545454] text-center p-2">
                      <h1>
                        {receiptType === "Official" && "OR"}
                        {receiptType === "Acknowledgement" && "AR"}
                        {receiptType === "Provisional" && "PR"} NO.
                      </h1>
                      <h1 className=" text-[1.2rem] font-bold">
                        {data?.receipt_no}
                      </h1>
                    </li>
                    <li className=" w-2/4 border-r border-t border-b border-[#545454] text-center p-2">
                      <h1>DATE</h1>
                      <h1 className=" text-[1.2rem] font-bold">
                        {format(today, "MMM dd yyyy")}
                      </h1>
                    </li>
                  </ul>
                </li>
              </ul>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-5">
              <main className=" w-full">
                <h1 className=" text-center text-[2rem] pb-5 uppercase">
                  {receiptType} RECEIPT
                </h1>
                <ul className=" flex items-end gap-2">
                  <li className="w-1/4 border border-[#545454] ">
                    {/* {receiptType === "Official" && (
                      <>
                        <aside className=" px-3 flex justify-between bg-[#545454] w-full text-center text-white print:text-[#545454] py-1">
                          <p>PARTICULARS</p>
                          <p>AMOUNT</p>
                        </aside>
                        <article className=" p-3 w-full flex flex-col gap-y-2">
                          <ul className=" w-full flex justify-between">
                            <li>Total Sales {`(Net of VAT)`}</li>
                            <li className=" text-end">xx</li>
                          </ul>
                          <ul className=" w-full flex justify-between">
                            <li>Add: VAT Amount</li>
                            <li className=" text-end">xx</li>
                          </ul>
                          <ul className=" w-full flex justify-between">
                            <li>Total Due</li>
                            <li className=" text-end">xx</li>
                          </ul>
                          <ul className=" w-full flex justify-between">
                            <li>Less: Withholding Tax</li>
                            <li className=" text-end">xx</li>
                          </ul>
                          <ul className=" w-full flex justify-between mb-10">
                            <li>Amount Due</li>
                            <li className=" text-end">xx</li>
                          </ul>

                          <ul className=" w-full flex justify-between">
                            <li>VAT-able Sales</li>
                            <li className=" text-end">xx</li>
                          </ul>

                          <ul className=" w-full flex justify-between">
                            <li>VAT Amount</li>
                            <li className=" text-end">xx</li>
                          </ul>

                          <ul className=" w-full flex justify-between">
                            <li>VAT-Exempt Sales</li>
                            <li className=" text-end">xx</li>
                          </ul>

                          <ul className=" w-full flex justify-between">
                            <li>Zero-rated Sales</li>
                            <li className=" text-end">xx</li>
                          </ul>

                          <ul className=" w-full flex justify-between">
                            <li>Total Sales</li>
                            <li className=" text-end">xx</li>
                          </ul>
                        </article>
                      </>
                    )} */}
                    <FormPayment
                      cashAmount={cashAmount}
                      data={data}
                      checkWarehouseTotal={checkWarehouseTotal}
                      depositsAmountTotal={depositsAmountTotal}
                      total={total}
                    />
                    {/* {(receiptType === "Acknowledgement" ||
                      receiptType === "Provisional") && (
                      <FormPayment
                        cashAmount={cashAmount}
                        data={data}
                        checkWarehouseTotal={checkWarehouseTotal}
                        depositsAmountTotal={depositsAmountTotal}
                        total={total}
                      />
                    )} */}
                  </li>
                  <li className="w-3/4 flex flex-col gap-2">
                    <ul className=" w-full flex justify-between gap-2">
                      <li>Received from</li>
                      <li className="border-b border-[#545454] flex-1 text-center">
                        {data?.customer?.name}
                      </li>
                    </ul>
                    <ul className=" w-full flex justify-between gap-2">
                      <li>with TIN {data?.customer?.tin} and address at</li>
                      <li className="border-b border-[#545454] flex-1 text-center">
                        {data?.customer?.registered_address_building},{" "}
                        {data?.customer?.registered_address_district},{" "}
                        {data?.customer?.registered_address_municipal_city},{" "}
                        {data?.customer?.registered_address_province},{" "}
                        {data?.customer?.registered_address_street},{" "}
                        {data?.customer?.registered_address_unit_floor},{" "}
                        {data?.customer?.registered_address_zip_code}
                      </li>
                    </ul>
                    <ul className=" w-full flex justify-between gap-2">
                      <li>egaged in the business style of</li>
                      <li className="border-b border-[#545454] flex-1"></li>
                    </ul>
                    <ul className=" w-full flex justify-between gap-2">
                      <li>the sum of</li>
                      <li className="border-b border-[#545454] flex-1 text-center capitalize">
                        {numberToWords.toWords(total)} Pesos
                      </li>
                      <li>
                        (Php <TextNumberDisplay value={total} className={""} />)
                      </li>
                    </ul>

                    <ul className=" w-full flex justify-between gap-2">
                      <li>
                        In partial/full payment of account described below.
                      </li>
                    </ul>

                    <div>
                      <aside className="w-full border-l border-r border-t border-[#545454] py-1 text-center italic font-medium">
                        <h1 className=" italic">
                          {receiptType === "Official" && "Outstanding Balances"}
                          {receiptType === "Acknowledgement" && "Deposits"}
                          {receiptType === "Provisional" && "Checkwarehouse"}
                        </h1>
                      </aside>
                      <div className="border border-[#545454] p-5">
                        {receiptType === "Official" && (
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className=" text-center">REFERENCE</th>
                                <th className=" text-center">CHARGE</th>
                                <th className=" text-center">DESCRIPTION</th>
                                <th className=" text-center">AMOUNT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.outstanding_balances.map((item, indx) => (
                                <tr key={indx}>
                                  <td>{item?.reference_no}</td>
                                  <td>{item?.charge_name}</td>
                                  <td>{item?.charge_description}</td>
                                  <td className=" text-end">
                                    <TextNumberDisplay
                                      value={item?.payment_amount}
                                      className={"withPeso"}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {receiptType === "Acknowledgement" && (
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className=" text-center">CHARGE</th>
                                <th className=" text-center">DESCRIPTION</th>
                                <th className=" text-center">AMOUNT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.deposits.map((item, indx) => (
                                <tr key={indx}>
                                  <td>{item?.charge_name}</td>
                                  <td>{item?.description}</td>
                                  <td className=" text-end">
                                    <TextNumberDisplay
                                      value={item?.amount}
                                      className={"withPeso"}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}

                        {receiptType === "Provisional" && (
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className=" text-center">BRANCH</th>
                                <th className=" text-center">CHECK DATE</th>
                                <th className=" text-center">CHECK NO.</th>

                                <th className=" text-center">CHECK AMOUNT</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.check_warehouses.map((item, indx) => (
                                <tr key={indx}>
                                  <td>{item?.bank_branch_name}</td>
                                  <td>{item?.check_date}</td>
                                  <td>{item?.check_no}</td>
                                  <td className=" text-end">
                                    <TextNumberDisplay
                                      value={item?.amount}
                                      className={"withPeso"}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </main>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className=" flex gap-2 items-end">
              {/* {receiptType === "Official" && (
                <div className=" w-1/4">
                  <FormPayment
                    cashAmount={cashAmount}
                    data={data}
                    depositsAmountTotal={depositsAmountTotal}
                    checkWarehouseTotal={checkWarehouseTotal}
                    total={total}
                  />
                </div>
              )} */}
              {/* receiptType === "Official" ? "w-3/4" : "w-full" */}
              <div className={`w-full`}>
                <ul className=" w-full flex justify-between items-center">
                  <li>
                    <p>ACKNOWLEDGEMENT CERTIFICATE NO.:</p>
                    <p>
                      DATE ISSUED: {format(today, "MM/dd/yyyy")} VALID UNTIL:{" "}
                      {format(dateIn5Years, "MM/dd/yyyy")}
                    </p>
                    <p>
                      SERIES RANGE:{" "}
                      {receiptType === "Official" && orRange.serial_from}
                      {receiptType === "Acknowledgement" && arRange.serial_from}
                      {receiptType === "Provisional" &&
                        prRange.serial_from} to{" "}
                      {receiptType === "Official" && orRange.serial_to}
                      {receiptType === "Acknowledgement" && arRange.serial_to}
                      {receiptType === "Provisional" && prRange.serial_to}
                    </p>
                  </li>
                  <li className="flex flex-col items-center">
                    <aside className=" flex">
                      <p>By:</p>
                      <div className="w-[20rem] border-b border-[#545454]"></div>
                    </aside>
                    <p>Cashier / Authorized Representative</p>
                  </li>
                </ul>

                {receiptType === "Acknowledgement" && (
                  <figure className=" w-full flex flex-col items-center my-10">
                    <h1>
                      {`"THIS ACKNOWLEDGEMENT RECIEPT SHALL BE VALID FOR FIVE (5) YEARS FROM THE DATE OF ACKNOWLEDGEMENT CERTIFICATE."`}
                    </h1>
                    <h1>{`THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX"`}</h1>
                  </figure>
                )}
                {receiptType === "Official" && (
                  <figure className=" w-full flex flex-col items-center my-10 text-center">
                    <h1>
                      {`"THIS OFFICIAL RECEIPT SHALL BE VALID FOR FIVE (5) YEARS FROM THE DATE OF ACKNOWLEDGEMENT CERTIFICATE"`}
                    </h1>
                    <h1>{`THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX"`}</h1>
                  </figure>
                )}

                {receiptType === "Provisional" && (
                  <figure className=" w-full flex flex-col items-center my-10 text-center">
                    <h1>
                      {`"THIS PROVISIONAL RECEIPT SHALL BE VALID FOR FIVE (5) YEARS FROM THE DATE OF ACKNOWLEDGEMENT CERTIFICATE"`}
                    </h1>
                    <h1>{`THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX"`}</h1>
                  </figure>
                )}

                <ul className=" w-full flex justify-between ">
                  <li>
                    <p>SOFTWARE PROVIDER:</p>
                    <p>VAT REG. TIN:</p>
                    <p>ADDRESS:</p>
                  </li>
                  <li className=" text-end">
                    <p>DATEBASE NAME/VERSION</p>
                    <p>REV NO. 01/01/19</p>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ReceiptPrint;

const FormPayment = ({
  data,
  depositsAmountTotal,
  checkWarehouseTotal,
  total,
  cashAmount,
}: {
  data: CollectionItem;
  depositsAmountTotal: number;
  checkWarehouseTotal: number;
  total: number;
  cashAmount: number;
}) => {
  return (
    <div className=" w-full">
      <p className=" bg-[#545454] w-full text-center text-white print:text-[#545454] py-1">
        FORM OF PAYMENT
      </p>
      <article className=" p-2 w-full flex flex-col gap-y-2">
        <ul className=" w-full flex justify-between">
          <li>Cash</li>
          <li className=" text-end">
            <TextNumberDisplay value={cashAmount} className={"withPeso"} />
          </li>
        </ul>
        <ul className=" w-full flex justify-between">
          <li>Check</li>
          <li className=" text-end ">
            <TextNumberDisplay
              value={checkWarehouseTotal}
              className={"withPeso"}
            />
          </li>
        </ul>

        <ul className=" w-full flex justify-between pl-5 gap-2">
          <li>Bank & Branch:</li>
          <li>{data?.bank_account?.bank_branch}</li>
        </ul>
        <ul className=" w-full flex justify-between pl-5 gap-2">
          <li>Check&nbsp;No.:</li>

          <li className=" text-end">
            {data?.check_warehouses?.map((item) => item.check_no).join(", ")}
          </li>
        </ul>
        <ul className=" w-full flex justify-between pl-5 gap-2">
          <li>Check&nbsp;Date:</li>
          <li className=" text-end">
            {data?.check_warehouses?.map((item) => item.check_date).join(", ")}
          </li>
        </ul>
        <ul className=" w-full flex justify-between gap-2">
          <li>Deposits</li>
          <li>
            <TextNumberDisplay
              value={depositsAmountTotal}
              className={"withPeso"}
            />
          </li>
        </ul>
        <ul className=" w-full flex justify-between pl-5 gap-2">
          <li>Date of Deposit:</li>
          <li>
            {data?.receipt_type === "Aknowledgement" && data?.receipt_date}
          </li>
        </ul>
        {/* <ul className=" w-full flex justify-between pl-5 gap-2">
          <li>Date Posted:</li>
          <li className="border-b border-red-500 flex-1"></li>
        </ul> */}
        <ul className=" w-full flex justify-between gap-2">
          <li>Total:</li>
          <li className=" text-end">
            <TextNumberDisplay value={total} className={"withPeso"} />
          </li>
        </ul>
      </article>
    </div>
  );
};
