import React, { useEffect, useState } from "react";

import {
  CollectionItem,
  PaymentSummaryHistories,
} from "../../../../../../pages/finance/customer-facility/collection/payment-register";
import { TextNumberDisplay } from "../../../../../Reusable/NumberFormat";
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
  AmoundPaid: number;
  setVarianceValidation?: Function;
};

export default function PaymentSummaryTable({
  SummaryItems,
  CreditTax,
  TotalDue,
  triggerID,
  LessDiscount,
  AmoundPaid,
  setVarianceValidation,
}: Props) {
  // TOTAL
  // Payment Summary
  const [PStotal, setPStotal] = useState<number>(0);
  const [PSVatTotal, setPSVatTotal] = useState<number>(0);
  const [TotalPaid, setTotalPaid] = useState<number>(0);
  const [Variance, setvariance] = useState<Number>(0);

  useEffect(() => {
    const computeVariance = Number(AmoundPaid) - Number(TotalPaid);
    setvariance(computeVariance);
    if (setVarianceValidation !== undefined) {
      if (computeVariance === 0) {
        setVarianceValidation(true);
      } else {
        setVarianceValidation(false);
      }
    }
  }, [AmoundPaid, TotalPaid]);

  useEffect(() => {
    const total = Number(TotalDue) - Number(CreditTax) - Number(LessDiscount);
    setTotalPaid(total);
  }, [LessDiscount, CreditTax, TotalDue]);

  useEffect(() => {
    setPSVatTotal(0);
    setPStotal(0);
    if (SummaryItems !== undefined) {
      SummaryItems?.map((item) => {
        setPStotal((temp) => Number(temp) + Number(item.amount_paid));
        setPSVatTotal((temp) => Number(temp) + Number(item.credit_tax));
      });
    }
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
                      <PaymentSummaryListItem key={index} item={item} />
                    ))}
                  </>
                )}
                <tr className=" noBorder">
                  <td></td>
                  <td>
                    <h1 className=" w-full text-end text-[16px]1280px:text-[13px] text-ThemeRed  pt-10">
                      SUB TOTAL
                    </h1>
                  </td>
                  <td>
                    <div className="flex justify-end pt-10">
                      <TextNumberDisplay
                        value={triggerID !== 0 ? PSVatTotal : 0}
                        className="text-end withPeso w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end pt-10">
                      <TextNumberDisplay
                        value={triggerID !== 0 ? PStotal : 0}
                        className="text-end withPeso w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <TableTwoTotal
                        total1={triggerID !== 0 ? PSVatTotal : 0}
                        total2={triggerID !== 0 ? PStotal : 0}
                    /> */}
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
                  <h1 className=" text-ThemeRed">LESS: CREDIT TAX</h1>
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
                  <h1 className=" text-ThemeRed">LESS: DISCOUNT</h1>
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
                  <h1 className=" text-ThemeRed">TOTAL PAID</h1>
                </td>
                <td>
                  <TextNumberDisplay
                    className="withPeso w-full"
                    value={TotalPaid}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className=" text-ThemeRed">VARIANCE</h1>
                </td>
                <td>
                  <div className=" text-white bg-ThemeRed  inline-block px-2 py-1">
                    <TextNumberDisplay
                      className="withPesoWhite  w-full"
                      value={Number(Variance)}
                      allowNegative={true}
                    />
                  </div>
                </td>
              </tr>
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
          className="w-full  text-end"
          value={vatPercentage}
          suffix="%"
        />
      </td>
      <td>
        <div className=" w-full flex justify-end">
          <TextNumberDisplay
            className="w-full text-end withPeso"
            value={vatAmount}
          />
        </div>
      </td>
      <td>
        <div className=" w-full flex justify-end">
          <TextNumberDisplay
            className="w-full text-end withPeso"
            value={total}
          />
        </div>
      </td>
    </tr>
  );
};
