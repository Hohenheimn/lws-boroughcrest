import React, { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippy.js/react";

import style from "../../../../styles/Project/PropertyDetails.module.scss";
import { PencilButton } from "../../../Reusable/Icons";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";

type JournalDetail = {
  Detail: {
    id: string;
    corporate_id: string;
    date: string;
    particulars: string;
    journal_no: string | null;
    status: string;
    trail: trail[];
    journal_list: journal_list[];
  };
  forPrint?: boolean;
};
type trail = {
  event: string;
  user: string;
  date: string;
  time: string;
  datetime: string;
};

export type journal_list = {
  debit: string;
  credit: string;
  chart_of_account: {
    chart_code: string;
    account_name: string;
  };
};

export default function JournalDetail({ Detail, forPrint }: JournalDetail) {
  const Permission_modify = AccessActionValidation("Journal", "modify");

  const [totalDebit, setTotalDebit] = useState(0);

  const [totalCredit, setTotalCredit] = useState(0);

  useEffect(() => {
    setTotalCredit(0);
    setTotalDebit(0);
    Detail?.journal_list.map((item: journal_list) => {
      setTotalDebit((value) => value + Number(item.debit));
      setTotalCredit((value) => value + Number(item.credit));
    });
  }, [Detail]);

  const date = parse(Detail?.date, "yyyy-MM-dd", new Date());

  return (
    <div>
      {!forPrint && (
        <div className="flex justify-between items-center mb-5">
          <h1 className="pageTitle mb-5">Journal Details</h1>
          <ul className="flex">
            <li className="mr-5">
              <Tippy theme="ThemeRed" content="Print">
                <div className="relative w-8 h-8 transition-all duration-75 hover:scale-[1.1]">
                  <Link
                    href={`/finance/general-ledger/journal/journal-list/print?journal_id=${Detail?.id}`}
                  >
                    <a target="_blank">
                      <Image
                        src="/Images/Print.png"
                        layout="fill"
                        alt="Print"
                      />
                    </a>
                  </Link>
                </div>
              </Tippy>
            </li>
          </ul>
        </div>
      )}
      <ul
        className={`${style.FourRows} ${style.narrow} ${
          forPrint && style.forPrint
        }`}
      >
        {Detail?.status !== "Approved" &&
          Detail?.status !== "In Progress" &&
          !forPrint &&
          Permission_modify && (
            <aside className=" mt-[-15px]">
              <Link
                href={`/finance/general-ledger/journal/modify-journal/${Detail?.id}`}
              >
                <a>
                  <PencilButton FunctionOnClick={() => {}} title={"Modify"} />
                </a>
              </Link>
            </aside>
          )}

        <li className={style.noMb}>
          <div className={style.row}>
            <p className="label_text">DATE</p>
            <h4 className="main_text">
              {isValid(date) ? format(date, "MMM dd yyyy") : ""}
            </h4>
          </div>
          <div className={style.row}>
            <p className="label_text">JOURNAL NO.</p>
            <h4 className="main_text">{Detail?.journal_no}</h4>
          </div>
        </li>
        <li className={style.noMb}>
          <p className="label_text">PARTICULARS</p>
          <h4 className="main_text">{Detail?.particulars}</h4>
        </li>
      </ul>
      <ul
        className={`${style.OneRow} ${style.narrow} ${
          forPrint && style.forPrint
        }`}
      >
        <li className="table-container">
          <table>
            <thead>
              <tr>
                <th className="label_text">CODE</th>
                <th className="label_text">ACCOUNT NAME</th>
                <th className="label_text">DEBIT</th>
                <th className="label_text">CREDIT</th>
              </tr>
            </thead>
            <tbody>
              {Detail?.journal_list.map((item: journal_list, index: number) => (
                <JournalListComp journal_list={item} key={index} />
              ))}

              <tr>
                <td colSpan={2} className={style.total}>
                  <p className="label_text">TOTAL:</p>
                </td>
                <td>
                  <TextNumberDisplay
                    value={totalDebit}
                    className="main_text font-NHU-bold withPeso"
                  />
                </td>
                <td>
                  <TextNumberDisplay
                    value={totalCredit}
                    className="main_text font-NHU-bold withPeso"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul
        className={`${style.Occupants} ${style.narrow} ${
          forPrint && style.forPrint
        }`}
      >
        <li className={style.noMb}>
          <p className="label_text">TRAIL</p>
          {Detail?.trail.map((item: trail, index) => (
            <h4 className="text-[#6b7280] mb-2" key={index}>
              {item?.event} by {item?.user} on {item?.date} |{item?.time}
            </h4>
          ))}
        </li>
      </ul>
    </div>
  );
}

export type JournalListProps = {
  journal_list: journal_list;
};
export const JournalListComp = ({ journal_list }: JournalListProps) => {
  return (
    <tr>
      <td>
        <h4 className="main_text">
          {journal_list?.chart_of_account?.chart_code}
        </h4>
      </td>
      <td>
        <h4 className="main_text">
          {journal_list?.chart_of_account?.account_name}
        </h4>
      </td>
      <td>
        <TextNumberDisplay
          value={journal_list?.debit}
          className={"withPeso main_text font-NHU-bold"}
        />
      </td>
      <td>
        <TextNumberDisplay
          value={journal_list?.credit}
          className={"withPeso main_text font-NHU-bold"}
        />
      </td>
    </tr>
  );
};
