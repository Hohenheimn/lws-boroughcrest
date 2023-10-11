import React, { useContext, useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { BarLoader, ScaleLoader } from "react-spinners";

import AppContext from "../../../Context/AppContext";
import BankAccountDropDown from "../../../Reusable/BankAccountDropDown";
import Calendar from "../../../Reusable/Calendar";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import {
  CreateDepositCounter,
  GetCashReceipt,
  UpdateDepositCounter,
} from "./Query";

type Props = {
  id?: number;
  defDate: string;
  defReferenceNo: string;
  defBank: {
    id: string | number;
    value: string;
  };
  defCashReceipt: CashReceiptsObj[];
};

type CashReceiptsTable = {
  selectAll: boolean;
  itemArray: CashReceiptsObj[];
};
type CashReceiptsObj = {
  deposit_date: string;
  customer: string;
  receipt_no: string;
  amount: number | string;
  id: number;
  select: false;
};

export default function DepositForm({
  id,
  defDate,
  defReferenceNo,
  defBank,
  defCashReceipt,
}: Props) {
  const router = useRouter();
  const { setPrompt } = useContext(AppContext);
  const [isReferenceNo, setReferenceNo] = useState(defReferenceNo);
  const [isDate, setDate] = useState({
    toggle: false,
    value: defDate,
  });
  const [isBankAccount, setBankAccount] = useState({
    id: defBank.id,
    value: defBank.value,
  });

  const [isCashReceipt, setCashReceipt] = useState<CashReceiptsTable>({
    selectAll: false,
    itemArray: [],
  });

  const { data, isLoading, isError } = GetCashReceipt();

  const onSuccessMutate = () => {
    setPrompt({
      message: "Deposit successfully registered",
      toggle: true,
      type: "success",
    });
    router.push("/finance/customer-facility/deposit-counter");
  };

  const onErrorMutate = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };
  const { mutate: SaveMutate, isLoading: SaveLoading } = CreateDepositCounter(
    onSuccessMutate,
    onErrorMutate
  );

  const { mutate: UpdateMutate, isLoading: UpdateLoading } =
    UpdateDepositCounter(onSuccessMutate, onErrorMutate, id);

  const [isAmount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(0);
    isCashReceipt.itemArray.map((item: CashReceiptsObj) => {
      if (item.select) {
        setAmount((prev) => Number(prev) + Number(item.amount));
      }
    });
  }, [isCashReceipt]);

  useEffect(() => {
    if (data?.status === 200) {
      const CloneArray = data?.data.map((item: any) => {
        let select = false;
        isCashReceipt.itemArray.map((itemSelect: CashReceiptsObj) => {
          if (itemSelect.id === item.id) {
            select = itemSelect.select;
          }
        });
        const date = parse(item.receipt_date, "yyyy-MM-dd", new Date());
        return {
          deposit_date: isValid(date) ? format(date, "MMM dd yyyy") : "",
          customer: item?.depositor?.name,
          receipt_no: item?.receipt_no,
          amount: item?.amount_paid,
          id: item?.id,
          select: select,
        };
      });
      setCashReceipt({
        itemArray: [...CloneArray, ...defCashReceipt],
        selectAll: false,
      });
    }
  }, [data?.status]);

  const selectAll = () => {
    const newItems = isCashReceipt?.itemArray.map((item: any) => {
      return {
        ...item,
        select: !isCashReceipt.selectAll,
      };
    });
    setCashReceipt({
      itemArray: newItems,
      selectAll: !isCashReceipt.selectAll,
    });
  };

  const SubmitHandler = () => {
    const date = parse(isDate.value, "MMM dd yyyy", new Date());
    const receiptFilter = isCashReceipt.itemArray.filter((item) => item.select);
    const ids = receiptFilter.map((item) => {
      return item.id;
    });

    const Payload = {
      deposit_date: isValid(date) ? format(date, "yyyy-MM-dd") : "",
      reference_no: isReferenceNo,
      amount_paid: isAmount,
      bank_account_id: isBankAccount.id,
      cash_receipt_ids: ids,
    };
    if (
      Payload.deposit_date === "" ||
      Payload.reference_no === "" ||
      Payload.amount_paid === 0 ||
      Payload.bank_account_id === "" ||
      ids.length <= 0
    ) {
      setPrompt({
        message: "Please fill out all the field and select a cash receipts",
        toggle: true,
        type: "draft",
      });
    } else {
      if (id !== undefined) {
        UpdateMutate(Payload);
      } else {
        SaveMutate(Payload);
      }
    }
  };

  return (
    <>
      <h1 className=" text-[24px] 1550px:text-[20px] mb-5 480px:mb-2 flex items-center">
        {id !== undefined ? "Modify Deposit" : "Create Deposit"}
      </h1>
      <ul className="flex flex-wrap justify-between pb-8 mb-8">
        <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
          <p className="labelField">DEPOSIT DATE</p>
          <div className="calendar">
            <span className="cal">
              <Image
                src="/Images/CalendarMini.png"
                width={15}
                height={15}
                alt=""
              />
            </span>
            <input
              type="text"
              value={isDate.value}
              onChange={() => {}}
              placeholder="MM dd yyyy"
              onClick={() => setDate({ ...isDate, toggle: true })}
            />
            {isDate.toggle && <Calendar value={isDate} setValue={setDate} />}
          </div>
        </li>
        <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
          <p className=" labelField">REFERENCE NO.</p>
          <input
            type="text"
            className="field"
            value={isReferenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />
        </li>
        <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
          <p className=" labelField">BANK</p>
          <BankAccountDropDown
            isObject={isBankAccount}
            setObject={setBankAccount}
          />
        </li>
        <li className="w-[24%] flex items-center 1366px:w-2/4 1366px:mb-2 640px:w-full">
          <p className=" labelField">AMOUNT</p>
          <h1>
            <TextNumberDisplay
              className="withPeso font-NHU-medium"
              value={isAmount}
            />
          </h1>
        </li>
      </ul>
      <h1 className=" text-[20px] 1550px:text-[17px] mb-5 480px:mb-2 flex items-center lowGray">
        Cash Receipts
      </h1>
      <div className="table_container min-zero">
        <table className="table_list">
          <thead className="textRed">
            <tr>
              <th className="checkbox">
                <div className="item">
                  <input
                    type="checkbox"
                    onChange={selectAll}
                    checked={isCashReceipt.selectAll}
                  />
                </div>
              </th>
              <th>DOCUMENT DATE</th>
              <th>CUSTOMER</th>
              <th>RECEIPT NO.</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {isCashReceipt.itemArray.map((item, index) => (
              <List
                key={index}
                itemDetail={item}
                tableArray={isCashReceipt}
                setCashReceipt={setCashReceipt}
                listOfSelected={true}
              />
            ))}
            <tr className=" h-10"></tr>
            {isCashReceipt.itemArray.map((item, index) => (
              <List
                key={index}
                itemDetail={item}
                tableArray={isCashReceipt}
                setCashReceipt={setCashReceipt}
                listOfSelected={false}
              />
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <aside className="text-center flex justify-center py-5">
            <BarLoader
              color={"#8f384d"}
              height="10px"
              width="200px"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </aside>
        </div>
      )}
      {isError && <TableErrorMessage />}
      <div className="flex justify-end">
        <button className="buttonRed" onClick={() => SubmitHandler()}>
          {SaveLoading || UpdateLoading ? (
            <ScaleLoader color="#fff" height="10px" width="2px" />
          ) : (
            "SAVE"
          )}
        </button>
      </div>
    </>
  );
}

type ListProps = {
  itemDetail: CashReceiptsObj;
  tableArray: CashReceiptsTable;
  setCashReceipt: Function;
  listOfSelected: boolean;
};

const List = ({
  itemDetail,
  tableArray,
  setCashReceipt,
  listOfSelected,
}: ListProps) => {
  return (
    <tr className="noBorder">
      {listOfSelected
        ? itemDetail.select && (
            <>
              <td className="checkbox">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={itemDetail.select}
                    onChange={() => {
                      const newItems = tableArray?.itemArray.map(
                        (item: any) => {
                          if (itemDetail.id == item.id) {
                            return {
                              ...item,
                              select: !item.select,
                            };
                          }
                          return item;
                        }
                      );
                      setCashReceipt({
                        itemArray: newItems,
                        selectAll: false,
                      });
                    }}
                  />
                </div>
              </td>
              <td>{itemDetail.deposit_date}</td>
              <td>{itemDetail.customer}</td>
              <td>{itemDetail.receipt_no}</td>
              <td>
                <TextNumberDisplay
                  className="withPeso"
                  value={itemDetail.amount}
                />
              </td>
            </>
          )
        : !itemDetail.select && (
            <>
              <td className="checkbox">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={itemDetail.select}
                    onChange={() => {
                      const newItems = tableArray?.itemArray.map(
                        (item: any) => {
                          if (itemDetail.id == item.id) {
                            return {
                              ...item,
                              select: !item.select,
                            };
                          }
                          return item;
                        }
                      );
                      setCashReceipt({
                        itemArray: newItems,
                        selectAll: false,
                      });
                    }}
                  />
                </div>
              </td>
              <td>{itemDetail.deposit_date}</td>
              <td>{itemDetail.customer}</td>
              <td>{itemDetail.receipt_no}</td>
              <td>
                <TextNumberDisplay
                  className="withPeso"
                  value={itemDetail.amount}
                />
              </td>
            </>
          )}
    </tr>
  );
};
