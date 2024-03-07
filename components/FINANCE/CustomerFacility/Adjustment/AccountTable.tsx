import React, { useEffect, useState } from "react";

import DropDownCOA from "../../../Dropdowns/DropdownCOA";
import { MinusButtonTable, PlusButtonTable } from "../../../Reusable/Icons";
import {
  InputNumberForTable,
  TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import TableLoadingNError from "../../../Reusable/TableLoadingNError";
import { TableTwoTotal } from "../../../Reusable/TableTotal";
import { validateCreditDebitField } from "../../General-Ledger/OpeningBalance/ValidateCreditDebitField";
import { AdjustmentAccounts } from "./AdjustmentForm";

type Props = {
  toggle: boolean;
  isAccounts: AdjustmentAccounts[];
  DefaultAccount: AdjustmentAccounts[];
  setAccounts: Function;
  isLoading: boolean;
  isError: boolean;
  AdjustmentTotal: number;
};

export default function AccountTable({
  toggle,
  isAccounts,
  setAccounts,
  DefaultAccount,
  isLoading,
  isError,
  AdjustmentTotal,
}: Props) {
  useEffect(() => {
    // Back to the first value if advances if off
    if (!toggle) {
      setAccounts(DefaultAccount);
    }
  }, [toggle]);

  const [TotalDebit, setTotalDebit] = useState(0);
  const [TotalCredit, setTotalCredit] = useState(0);
  useEffect(() => {
    setTotalDebit(0);
    setTotalCredit(0);
    isAccounts?.map((item) => {
      setTotalDebit((prev) => Number(prev) + item.debit);
      setTotalCredit((prev) => Number(prev) + item.credit);
    });
  }, [isAccounts]);

  return (
    <div className="py-10 1550px:py-5">
      <h1 className=" text-RegularColor text-[22px] 1550px:text-[20px] mb-5 1550px:mb-3">
        Account
      </h1>
      <div className="table_container hAuto">
        <table className="table_list ">
          <thead className="textRed">
            <tr>
              <th>CHART CODE</th>
              <th>ACCOUNT NAME</th>
              <th>DEBIT ACCOUNT</th>
              <th>CREDIT ACCOUNT</th>
              {toggle && <th></th>}
            </tr>
          </thead>
          <tbody className="textBlack">
            {isAccounts?.map((item: AdjustmentAccounts, index) => (
              <List
                itemDetail={item}
                key={index}
                index={index}
                isAccounts={isAccounts}
                setAccounts={setAccounts}
                toggle={toggle}
              />
            ))}
            <tr className=" noBorder">
              <td></td>

              <td>
                <h1 className=" w-full text-end text-[16px]1280px:text-[13px] text-ThemeRed  pt-10">
                  TOTAL
                </h1>
              </td>
              <td>
                <div className="flex justify-end pt-10">
                  <TextNumberDisplay
                    value={TotalDebit}
                    className="text-end withPeso w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                  />
                </div>
              </td>
              <td>
                <div className="flex justify-end pt-10">
                  <TextNumberDisplay
                    value={TotalCredit}
                    className="text-end withPeso w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <TableLoadingNError isLoading={isLoading} isError={isError} />
      </div>
      {/* <TableTwoTotal total1={TotalDebit} total2={TotalCredit} /> */}
    </div>
  );
}

type ListProps = {
  itemDetail: AdjustmentAccounts;
  index: number;
  isAccounts: AdjustmentAccounts[];
  setAccounts: Function;
  toggle: boolean;
};

const List = ({
  itemDetail,
  index,
  isAccounts,
  setAccounts,
  toggle,
}: ListProps) => {
  const [isAccountName, setAccountName] = useState({
    accountName: itemDetail.account_name,
  });
  const [debitValidate, setDebitValidate] = useState("");
  const [creditValidate, setcreditValidate] = useState("");
  useEffect(() => {
    validateCreditDebitField(
      itemDetail.debit,
      itemDetail.credit,
      setDebitValidate,
      setcreditValidate
    );
  }, [itemDetail.debit, itemDetail.credit]);

  const UpdateStateHandler = (key: string, value: any) => {
    const newItems = isAccounts.map((item: any) => {
      if (itemDetail.id == item.id) {
        if (key === "debit") {
          return {
            ...item,
            credit: "",
            debit: Number(value),
          };
        }
        if (key === "credit") {
          return {
            ...item,
            credit: Number(value),
            debit: "",
          };
        }
      }
      return item;
    });
    setAccounts(newItems);
  };

  const RemoveAccount = () => {
    setAccounts((item: AdjustmentAccounts[]) =>
      item.filter((x: any) => x.id !== itemDetail.id)
    );
  };

  const AddAccount = (e: any) => {
    const random = Math.random();
    setAccounts([
      ...isAccounts,
      {
        id: random,
        coa_id: 1,
        chart_code: "",
        account_name: "",
        debit: 0,
        credit: 0,
      },
    ]);
  };
  return (
    <tr>
      <td>
        {toggle ? (
          <input
            type="text"
            className="field disabled"
            readOnly
            value={itemDetail.chart_code}
          />
        ) : (
          itemDetail.chart_code
        )}
      </td>
      <td>
        {toggle ? (
          <DropDownCOA
            UpdateStateHandler={(key: string, e: any) => {
              const newItems = isAccounts.map((item: AdjustmentAccounts) => {
                if (itemDetail.id == item.id) {
                  return {
                    ...item,
                    coa_id: e.target.getAttribute("data-id"),
                    chart_code: e.target.getAttribute("data-code"),
                    account_name: e.target.innerHTML,
                  };
                }
                return item;
              });
              setAccounts(newItems);
            }}
            itemDetail={isAccountName}
          />
        ) : (
          itemDetail.account_name
        )}
      </td>
      <td>
        {toggle ? (
          <InputNumberForTable
            className={`number field text-end inline-block w-full bg-white ${debitValidate} `}
            value={itemDetail.debit}
            onChange={UpdateStateHandler}
            type={"debit"}
          />
        ) : (
          <div className="w-full flex justify-end">
            <TextNumberDisplay
              className="withPeso w-full text-end"
              value={itemDetail.debit}
            />
          </div>
        )}
      </td>
      <td>
        {toggle ? (
          <InputNumberForTable
            className={`number field inline-block text-end w-full bg-white ${creditValidate} `}
            value={itemDetail.credit}
            onChange={UpdateStateHandler}
            type={"credit"}
          />
        ) : (
          <div className="w-full flex justify-end">
            <TextNumberDisplay
              className="withPeso w-full text-end"
              value={itemDetail.credit}
            />
          </div>
        )}
      </td>

      {toggle && (
        <td className="actionIcon flex items-center">
          {isAccounts.length > 1 && (
            <div onClick={RemoveAccount}>
              <MinusButtonTable />
            </div>
          )}
          {isAccounts.length - 1 === index && (
            <div className="ml-5 1024px:ml-2" onClick={(e) => AddAccount(e)}>
              <PlusButtonTable />
            </div>
          )}
        </td>
      )}
    </tr>
  );
};
