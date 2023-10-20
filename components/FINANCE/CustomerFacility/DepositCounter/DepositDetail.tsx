import React, { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import Link from "next/link";
import { HiPencil } from "react-icons/hi";
import { BeatLoader } from "react-spinners";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippy.js/react";

import styleModal from "../../../../styles/Popup_Modal.module.scss";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { ShowDeposit } from "./Query";

type Props = {
  id?: any;
};

type childrenCashReceipt = {
  deposit_date: string;
  depositor: {
    id: string | number;
    name: string;
  };
  receipt_no: number | string;
  amount_paid: number;
};

export default function DepositDetail({ id }: Props) {
  const { isLoading, data } = ShowDeposit(id);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(0);
    data?.data.children.map((item: childrenCashReceipt) => {
      setTotal((prev) => Number(prev) + item.amount_paid);
    });
  }, [data]);
  const date = parse(data?.data.receipt_date, "yyyy-MM-dd", new Date());

  return (
    <div className={styleModal.container}>
      <section>
        <div>
          <div className="mb-5 flex justify-between items-center">
            <h3 className="text-ThemeRed">Deposit Details</h3>
            <Tippy content="Modify" theme="ThemeRed">
              <div>
                <Link
                  href={`/finance/customer-facility/deposit-counter/modify?deposit_id=${id}`}
                >
                  <a>
                    <HiPencil className="text-[20px] cursor-pointer" />
                  </a>
                </Link>
              </div>
            </Tippy>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-5">
              <BeatLoader
                color={"#8f384d"}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <>
              <ul className="flex flex-wrap mb-5">
                <li className="text-[13px] mr-2">
                  <span className="text-[#545454]">Deposit Date:</span>{" "}
                  {isValid(date) ? format(date, "MMM dd yyyy") : ""}
                </li>
                <li className="text-[13px] mr-2">
                  <span className="text-[#545454]">Reference No:</span>{" "}
                  {data?.data.reference_no}
                </li>
                <li className="text-[13px] mr-2">
                  <span className="text-[#545454]">Bank & Account No:</span>
                  {data?.data?.bank_account?.bank_branch}-
                  {data?.data?.bank_account?.bank_acc_no}
                </li>
              </ul>
              <div className="w-full overflow-auto max-h-[50vh]">
                <table className="table_list miniTable">
                  <thead className="textRed">
                    <tr>
                      <th className="text-start">Doc Date</th>
                      <th>Depositor</th>
                      <th>Receipt No.</th>
                      <th>Deposit Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.children.map(
                      (item: childrenCashReceipt, index: number) => (
                        <TableList key={index} item={item} />
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end items-center mt-5">
                <h3 className="text-[14px] mr-2">Total Amount: </h3>
                <TextNumberDisplay
                  className="withPeso text-[14px] text-[#545454]"
                  value={total}
                />
              </div>
            </>
          )}
          <div className="flex justify-end py-5 mt-10">
            <Link href="">
              <a className="buttonRed">DONE</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

type TableList = {
  item: childrenCashReceipt;
};
const TableList = ({ item }: TableList) => {
  const date = parse(item.deposit_date, "yyyy-MM-dd", new Date());
  return (
    <tr>
      <td> {isValid(date) ? format(date, "MMM dd yyyy") : ""}</td>
      <td>{item.depositor.name}</td>
      <td>{item.receipt_no}</td>
      <td>
        <TextNumberDisplay className="withPeso" value={item.amount_paid} />
      </td>
    </tr>
  );
};
