import React, { useEffect, useState } from "react";

import { LoginUserInfo } from "../../../../HOC/LoginUser/UserInfo";
import { TextNumberDisplay } from "../../../../Reusable/NumberFormat";
import { InvoiceListType, billingPrintType } from "./billingType";

type Props = {
  userInfo?: LoginUserInfo;
  data: billingPrintType;
  invoiceRange: { serial_from: string; serial_to: string; prefix: string };
  acknowledgementCertificate: string;
};

const InvoicePrint = ({
  userInfo,
  data,
  invoiceRange,
  acknowledgementCertificate,
}: Props) => {
  const [beginningBalance, setBeginningBalance] = useState(0);
  const [payTotal, setPayTotal] = useState(0);
  const [amountStillDue, setAmountStillDue] = useState(0);
  const [remainingAdvances, setRemainingAdvances] = useState(0);
  const [totalAppliedAdvances, setTotalAppliedAdvances] = useState(0);

  useEffect(() => {
    let inBeginningBalances = 0;
    setBeginningBalance(0);
    setPayTotal(0);
    setAmountStillDue(0);
    setTotalAppliedAdvances(0);
    // computation for beginning balance
    data?.billing_invoices.slice(1).map((billing) => {
      const balance =
        Number(billing.due_amount) -
        Number(billing.payment_amount) -
        Number(billing.applied_advances);
      setBeginningBalance((value: number) => value + Number(balance));
      inBeginningBalances = inBeginningBalances + Number(balance);
    });

    // computation for pay total and amount still due
    let inPayTotal = 0;
    let inAmountStillDue = 0;
    let inTotalAppliedAdvances = 0;
    data?.billing_invoices[0].invoice_list.map((invoice) => {
      const balance =
        Number(invoice.amount) -
        Number(invoice.amount_paid) -
        Number(invoice.adjustment_amount);
      inPayTotal = inPayTotal + Number(balance);
      inAmountStillDue = inAmountStillDue + Number(balance);
      inTotalAppliedAdvances =
        inTotalAppliedAdvances + Number(invoice.adjustment_amount);
    });
    setPayTotal(Number(inPayTotal) + Number(inBeginningBalances));
    setAmountStillDue(Number(inAmountStillDue) + Number(inBeginningBalances));
    setTotalAppliedAdvances(inTotalAppliedAdvances);
  }, []);

  // amount still due = add all balance from table and beginning balance
  // remaining balance = amount - amount paid - appled advances
  //  applied advance =  total of applied advances

  return (
    <main className=" p-[2rem] page-break">
      <ul className=" flex justify-between items-start list-none">
        <li>
          <aside className=" w-[10rem] aspect-square border border-black"></aside>
        </li>
        <li className=" text-center uppercase">
          <h2>{userInfo?.corporate?.name}</h2>
          <h2 className=" w-[35rem] text-center">
            {userInfo?.corporate?.address_building},{" "}
            {userInfo?.corporate?.address_district},{" "}
            {userInfo?.corporate?.address_municipal_city},{" "}
            {userInfo?.corporate?.address_province},{" "}
            {userInfo?.corporate?.address_street},{" "}
            {userInfo?.corporate?.address_unit_floor},{" "}
            {userInfo?.corporate?.address_zip_code}
          </h2>
          <p>
            {userInfo?.corporate_gst_type} REG. TIN:{userInfo?.corporate?.tin}
          </p>

          <p>
            TEL. NO.: {userInfo?.corporate?.contact_no} EMAIL:{" "}
            {userInfo?.corporate?.email}
          </p>
        </li>
        <li>
          <aside className=" w-[10rem] aspect-square"></aside>
        </li>
      </ul>
      <h1 className=" text-center mb-[20px] text-2xl">STATEMENT OF ACCOUNT</h1>
      <ul className=" flex justify-between">
        <li>
          <aside className=" flex mb-[10px]">
            <div>BILL&nbsp;TO:</div>
            <div className=" ml-[5px]">
              <h3>{data?.name}</h3>
              <p className=" text-[.9rem] w-96">
                {data?.registered_address_building}{" "}
                {data?.registered_address_district}{" "}
                {data?.registered_address_municipal_city}{" "}
                {data?.registered_address_province}{" "}
                {data?.registered_address_street}{" "}
                {data?.registered_address_unit_floor}{" "}
                {data?.registered_address_zip_code}
              </p>
              <p className=" text-[.9rem] ">CONTACT NO.: {data?.contact_no}</p>
            </div>
          </aside>
          {/* <aside className=" flex  text-red-500">
            <div>BILL TO:</div>
            <div className=" ml-[5px]">
              <p>MT-301C, 2P-1240</p>
            </div>
          </aside> */}
        </li>
        <li>
          <aside className="flex justify-between w-full">
            <p>
              <span className=" font-bold italic">ORIGINAL</span>
              CUSTOMER&apos;S COPY
            </p>
          </aside>
          <ul className=" flex justify-end w-full">
            <li className=" p-[1rem] text-center border border-black">
              <p>INV NO.</p>
              <h4>{data?.billing_invoices[0].invoice_no}</h4>
            </li>
          </ul>
        </li>
      </ul>
      <ul className="border-t border-black mt-[10px] pt-[5px] pb-[5px] flex items-center justify-between w-full">
        <li>
          <h3 className="">APPLIED ADVANCES</h3>
        </li>
        <li>
          <p>
            <TextNumberDisplay
              value={totalAppliedAdvances}
              className={"withPeso"}
            />
          </p>
        </li>
        <li>
          <p>BEGINNING BALANCE</p>
        </li>
        <li>
          <p>
            <TextNumberDisplay
              value={beginningBalance}
              className={"withPeso"}
            />
          </p>
        </li>
      </ul>
      <table className=" w-full">
        <thead>
          <tr>
            <th className=" border border-black">CODE</th>
            <th className=" border border-black">DESCRIPTION</th>
            <th className=" border border-black">AMOUNT DUE</th>
            <th className=" border border-black">AMOUNT PAID</th>
            <th className=" border border-black">APPLIED ADVANCE</th>
            <th className=" border border-black">REMAINING BAL</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td colSpan={5} className=" py-2">
              <h3>
                CREDIT MEMO NO.: <span className=" text-red-500">CM00021</span>
              </h3>
            </td>
          </tr> */}
          {data?.billing_invoices[0]?.invoice_list.map((inv, indx) => (
            <tr key={indx}>
              <td>{inv.charge.code}</td>
              <td>{inv.charge.description}</td>
              <td className=" text-end ">
                <TextNumberDisplay
                  value={Number(inv.amount)}
                  className={"withPeso"}
                />
              </td>
              <td className=" text-end ">
                <TextNumberDisplay
                  value={Number(inv.amount_paid)}
                  className={"withPeso"}
                />
              </td>
              <td className=" text-end">
                {" "}
                <TextNumberDisplay
                  value={Number(inv.adjustment_amount)}
                  className={"withPeso"}
                />
              </td>
              <td className=" text-end">
                <TextNumberDisplay
                  value={
                    Number(inv.amount) -
                    Number(inv.amount_paid) -
                    Number(inv.adjustment_amount)
                  }
                  className={"withPeso"}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={6} className=" border-t border-black"></td>
          </tr>
          <tr>
            <td colSpan={5} className=" text-end font-bold py-2">
              <p>REMAINING ADVANCES</p>
            </td>
            <td className=" text-end font-bold py-2">
              <TextNumberDisplay
                value={remainingAdvances}
                className={"withPeso "}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={5} className=" text-end font-bold py-2 pb-20">
              <p>AMOUNT STILL DUE</p>
            </td>
            <td className=" text-end font-bold py-2  pb-20">
              <TextNumberDisplay
                value={amountStillDue}
                className={"withPeso "}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <ul className=" flex justify-end border-t border-black py-5 w-full">
        <li className=" w-[20rem] space-y-1">
          <h5 className=" text-center">SUMMARY</h5>
          {data?.billing_invoices.map((item, indx) => (
            <div key={indx}>
              {Number(item.due_amount) - Number(item.payment_amount) <= 0 ? (
                <div />
              ) : (
                <ul className=" flex justify-between gap-2">
                  <li>{item.invoice_no}</li>
                  <li>
                    <TextNumberDisplay
                      value={
                        Number(item.due_amount) - Number(item.payment_amount)
                      }
                      className={"withPeso "}
                    />
                  </li>
                </ul>
              )}
            </div>
          ))}
        </li>
      </ul>

      <ul className=" flex justify-between border-t border-black py-5">
        <li>
          <h5>TERMS & CONDITIONS</h5>
          <p className=" text-[.9rem]">
            PLEASE MAKE CHECK PAYABLE to
            <span>CONDOMINIUM ASSOCIATION, INC.</span>
          </p>
          <p className=" text-[.9rem]">
            MAKE DEPOSITS on <span>METROBANK ACCOUNT 095155687</span>
          </p>
          <p className=" text-[.9rem]">
            LATE PAYMENTS WILL ILLCUR 2% INTEREST CHARGE
          </p>
          {/* <p className=" text-[.9rem] text-red-500">LLINE 4</p>
          <p className=" text-[.9rem] text-red-500">LLINE 4</p>
          <p className=" text-[.9rem] text-red-500">LLINE 4</p>
          <p className=" text-[.9rem] text-red-500">LLINE 4</p> */}
        </li>
        <li>
          <ul className=" border-4 border-black ">
            <li className=" bg-black text-white py-[5px] px-[10px] text-center">
              PLEASE PAY TOTAL AMOUNT
            </li>
            <li className=" flex justify-between py-[5px] px-[10px] items-center">
              <h2 className=" text-2xl text-black">PHP</h2>
              <h2 className=" text-xl ">
                <TextNumberDisplay value={payTotal} className={"withPeso"} />
              </h2>
            </li>
          </ul>
        </li>
      </ul>
      <table className=" border border-black w-full">
        <tr>
          <th className=" border border-black">PREPARED BY:</th>
          <th className=" border border-black">NOTED BY:</th>
          <th className=" border border-black">RECEIVED BY:</th>
        </tr>
        <tr>
          <td className=" text-center py-10">
            <h3>JUAN MERCADO</h3>
            <p>BILLING OFFICER</p>
          </td>
          <td className=" text-center py-10">
            <h3>JUAN TORRES</h3>
            <p>PROPERTY ACCOUNTANT</p>
          </td>
          <td className=" text-center py-10">
            <h3>{data?.name}</h3>
            <p>SIGNATURE OVER PRINTED NAME & DATE</p>
          </td>
        </tr>
      </table>
      <p className=" text-center py-5">
        **THIS IS A COMPUTER GENERATED DOCUMENT. NO SIGNATURE REQUIRED**
      </p>
      <ul className=" flex justify-between py-[10px]">
        <li>
          <p className=" text-[.9rem]">
            ACKNOWLEDGEMENT CERTIFICATE NO.: {acknowledgementCertificate}
          </p>
          <p className=" text-[.9rem]">
            DATE ISSUED: Jan 15 2023 VALID UNTIL Jan 31 2028
          </p>
          <p className=" text-[.9rem]">
            SERIES RANGE: {invoiceRange?.prefix}
            {invoiceRange?.serial_from} to {invoiceRange?.prefix}
            {invoiceRange?.serial_to}
          </p>
        </li>
        <li>
          <p className=" text-[.9rem]  text-end">DATABASE NAME/VERSION</p>
          <p className=" text-[.9rem]  text-end">REV NO. 01/01/19</p>
        </li>
      </ul>
      <h3 className=" text-center mt-[10px]">
        {
          "**THIS DOCUMENT SHALL BE VALID FOR FIVE (5) YEARS FROM THE DATE OF ACKNOWLEDGEMENT CERTIFICATE**"
        }
      </h3>
      <h3 className=" text-center mb-[10px]">
        {`"THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX"`}
      </h3>
      <ul className=" flex justify-between py-[10px]">
        <li>
          <p className=" text-[.9rem]">SOFTWARE PROVIDER:</p>
          <p className=" text-[.9rem]">VAT REG. TIN:</p>
          <p className=" text-[.9rem]">ADDRESS:</p>
        </li>
        <li>
          <p className=" text-[.9rem]">USER NAME/ID</p>
          <p className=" text-[.9rem]">DATE & TIME STAMP</p>
          <p className=" text-[.9rem]">DEUS ARCHITECTURE 2021</p>
        </li>
      </ul>
    </main>
  );
};

export default InvoicePrint;

{
  /* // <div>
    //   <table className=" w-full text-[#545454]">
    //     <thead>
    //       <tr>
    //         <th></th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td className="py-5">
    //           <main className=" w-full"></main>
    //         </td>
    //       </tr>
    //     </tbody>
    //     <tfoot>
    //       <tr>
    //         <td className=" flex gap-2 items-end"></td>
    //       </tr>
    //     </tfoot>
    //   </table>
    // </div> */
}
