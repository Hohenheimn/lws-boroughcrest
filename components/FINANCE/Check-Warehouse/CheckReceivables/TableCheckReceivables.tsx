import React, { useContext, useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { BarLoader, MoonLoader, ScaleLoader } from "react-spinners";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippy.js/react";

import { BookedCheckType } from "../../../../pages/finance/check-warehouse/check-receivables/booked-check";
import { CheckScheduleType } from "../../../../pages/finance/check-warehouse/check-receivables/check-schedule";
import { CollectionItem } from "../../../../pages/finance/customer-facility/collection/payment-register";
import style from "../../../../styles/SearchFilter.module.scss";

import AppContext from "../../../Context/AppContext";
import { Advancefilter, AdvanceFilter } from "../../../Reusable/AdvanceFilter";
import Calendar from "../../../Reusable/Calendar";
import { DynamicExportHandler } from "../../../Reusable/DynamicExport";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { BookedCheck, OppositeArrow } from "../../../Reusable/Icons";
import { TextFieldValidation } from "../../../Reusable/InputField";
import ModalTemp from "../../../Reusable/ModalTemp";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import Pagination from "../../../Reusable/Pagination";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import { BookedCheckPost, CheckScheduleList } from "./Query";

type Props = {
  isSearch: string;
  setSearch: Function;
  TablePage: number;
  setTablePage: Function;
  isAdvFilter: Advancefilter;
  setAdvFilter: Function;
  isFilterText: string;
  setFilterText: Function;
  isPeriod: {
    from: string;
    to: string;
  };
  setPeriod: Function;
  page: string;
  EndPointList: string;
  EndPointAdvFilter: string;
  EndPointExport: string;
  ExportName: string;
};

export default function TableCheckReceivables({
  EndPointList,
  EndPointAdvFilter,
  EndPointExport,
  isSearch,
  setSearch,
  TablePage,
  setTablePage,
  isAdvFilter,
  setAdvFilter,
  isFilterText,
  setFilterText,
  isPeriod,
  setPeriod,
  page,
  ExportName,
}: Props) {
  const { setPrompt } = useContext(AppContext);

  const router = useRouter();

  const removeItemFromFilter = (value: string) => {
    const cloneFilter = isAdvFilter.filter((item) => item.value !== value);
    setAdvFilter(cloneFilter);
  };

  const { data, isLoading, isError } = CheckScheduleList(EndPointList);

  const [isReference, setReference] = useState("");

  const [isRemarks, setRemarks] = useState("");

  const [depositDate, setDepositDate] = useState({
    value: "",
    toggle: false,
  });

  let buttonClicked = "";

  const [isStatus, setStatus] = useState("");

  const onSuccess = () => {
    setPrompt({
      message: `Check Schedule successfully ${buttonClicked}`,
      type: "success",
      toggle: true,
    });
    router.push("");
    setRemarks("");
    setDepositDate({
      value: "",
      toggle: false,
    });
    setReference("");
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };

  const { mutate, isLoading: BookCheckMutateLoading } = BookedCheckPost(
    onSuccess,
    onError,
    router.query.book
  );

  const depositDateConvert = parse(
    depositDate.value,
    "MMM dd yyyy",
    new Date()
  );

  const BookedHandler = (status: string) => {
    setStatus(status);
    buttonClicked = status;
    const Payload = {
      status: status,
      deposit_date: isValid(depositDateConvert)
        ? format(depositDateConvert, "yyyy-MM-dd")
        : "",
      reference_no: isReference,
      remarks: isRemarks,
    };
    mutate(Payload);
  };
  const CancelBookedCheckHandler = () => {
    router.push("");
    setRemarks("");
    setDepositDate({
      value: "",
      toggle: false,
    });
    setReference("");
  };

  const [isExportLoading, setExportLoading] = useState(false);
  const ExportHandler = () => {
    DynamicExportHandler(
      EndPointExport,
      ExportName,
      setPrompt,
      setExportLoading
    );
  };

  return (
    <>
      {router.query.book !== undefined && (
        <ModalTemp narrow={true}>
          <h1 className="text-start text-ThemeRed mb-5">Booked Check</h1>
          <ul className="flex justify-between flex-wrap">
            <li className="w-[48%]">
              <h1 className="text-[12px] text-ThemeRed">DEPOSIT DATE</h1>
              <div className="calendar w-full mb-5 border">
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
                  value={depositDate.value}
                  onChange={() => {}}
                  placeholder="mm dd yyyy"
                  onClick={() =>
                    setDepositDate({
                      ...depositDate,
                      toggle: true,
                    })
                  }
                  className="px-2 h-10 1550px:h-8 outline-none w-full rounded-md shadow-md"
                />
                {depositDate.toggle && (
                  <Calendar value={depositDate} setValue={setDepositDate} />
                )}
              </div>
            </li>
            <li className="w-[48%]">
              <h1 className="text-[12px] text-ThemeRed">REFERENCE NO.</h1>
              <input
                type="text"
                className="field w-full"
                value={isReference}
                onChange={(e) => {
                  if (TextFieldValidation(e, 50)) {
                    setReference(e.target.value);
                  }
                }}
              />
            </li>
            <li className="w-full mb-5">
              <h1 className="text-[12px] text-ThemeRed">REMARKS</h1>
              <textarea
                name=""
                className="field w-full"
                id=""
                value={isRemarks}
                onChange={(e) => {
                  if (TextFieldValidation(e, 355)) {
                    setRemarks(e.target.value);
                  }
                }}
              ></textarea>
            </li>
          </ul>
          <div className="flex justify-end items-center w-full">
            <button
              className="button_cancel"
              onClick={CancelBookedCheckHandler}
            >
              CANCEL
            </button>
            <button
              className="buttonBorder mr-2"
              onClick={() => BookedHandler("Rejected")}
            >
              {BookCheckMutateLoading && isStatus === "Rejected" ? (
                <ScaleLoader color="#fff" height="10px" width="2px" />
              ) : (
                "REJECT"
              )}
            </button>
            <button
              className="buttonRed"
              onClick={() => BookedHandler("Deposited")}
            >
              {BookCheckMutateLoading && isStatus === "Deposited" ? (
                <ScaleLoader color="#fff" height="10px" width="2px" />
              ) : (
                "PROCESS"
              )}
            </button>
          </div>
        </ModalTemp>
      )}

      <section className={style.container}>
        <div className={style.searchBarAdvF}>
          <div className={style.searchBar}>
            <input
              type="text"
              placeholder="Search"
              value={isSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
            <BsSearch className={style.searchIcon} />
          </div>
          {/* ?date_from=${dateFrom}&date_to=${dateTo} */}
          <AdvanceFilter
            endpoint={`${EndPointAdvFilter}`}
            setAdvFilter={setAdvFilter}
            isAdvFilter={isAdvFilter}
          />
        </div>

        <ul className={style.navigation}>
          <li className={style.importExportPrint}>
            {isExportLoading ? (
              <MoonLoader color="#8f384d" size={20} />
            ) : (
              <div>
                <Tippy theme="ThemeRed" content="Export">
                  <div
                    className=" hover:scale-125 duration-100 cursor-pointer"
                    onClick={ExportHandler}
                  >
                    <Image
                      src="/Images/Export.png"
                      height={33}
                      width={33}
                      alt="export"
                    />
                  </div>
                </Tippy>
              </div>
            )}
          </li>
        </ul>
      </section>
      {/* Advance filter */}
      <ul className=" flex flex-wrap">
        {isAdvFilter.map((item, index) => (
          <li
            key={index}
            className="px-3 text-[14px] text-ThemeRed py-1 bg-[#d9d9d9] mb-5 mr-3 rounded-[50px] relative pr-[25px]"
          >
            {item.value} -{" "}
            <span className="text-ThemeRed50">{item.display}</span>
            <span
              onClick={() => removeItemFromFilter(item.value)}
              className="text-[28px] hover:text-ThemeRed50 cursor-pointer rotate-45 absolute right-1 top-[48%] translate-y-[-50%]"
            >
              +
            </span>
          </li>
        ))}
      </ul>

      {page === "check-payment-list" && (
        <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
          <PeriodCalendar value={isPeriod} setValue={setPeriod} />
        </div>
      )}

      <div className="table_container">
        <table className="table_list">
          <thead>
            {page === "check-schedule" && (
              <tr>
                <th></th>
                <th>Status</th>
                <th>Receipt No.</th>
                <th>Payor</th>
                <th>Check Date</th>
                <th>Check No.</th>
                <th>Bank & Branch</th>
                <th>Check Amount</th>
                <th>Maturity</th>
              </tr>
            )}
            {page === "check-payment-list" && (
              <tr>
                <th>Receipt Date</th>
                <th>Receipt No.</th>
                <th>Customer</th>
                <th>Property</th>
                <th>Amount Received</th>
              </tr>
            )}
            {page === "booked-check" && (
              <tr>
                <th></th>
                <th>Status</th>
                <th>Receipt No.</th>
                <th>Payor</th>
                <th>Check Date</th>
                <th>Check No.</th>
                <th>Bank & Branch</th>
                <th>Check Amount</th>
                <th>Deposit Date</th>
                <th>Reference No.</th>
              </tr>
            )}
          </thead>
          <tbody>
            <>
              {page === "check-schedule" && (
                <>
                  {data?.data.data.map((item: any, index: number) => (
                    <ListSchedule key={index} itemDetail={item} />
                  ))}
                </>
              )}

              {page === "check-payment-list" && (
                <>
                  {data?.data.data.map((item: any, index: number) => (
                    <ListPaymentList key={index} itemDetail={item} />
                  ))}
                </>
              )}
              {page === "booked-check" && (
                <>
                  {data?.data.data.map((item: any, index: number) => (
                    <ListBookedCheck key={index} itemDetail={item} />
                  ))}
                </>
              )}
            </>
          </tbody>
        </table>
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
      </div>
      <Pagination
        setTablePage={setTablePage}
        tablePage={TablePage}
        totalPage={data?.data.meta.last_page}
      />
    </>
  );
}

type CheckScheduleListProps = {
  itemDetail: CheckScheduleType;
};

const ListSchedule = ({ itemDetail }: CheckScheduleListProps) => {
  const router = useRouter();

  const check_date = parse(itemDetail.check_date, "yyyy-MM-dd", new Date());

  return (
    <tr className="hoverEffect">
      <td className="icon">
        <div
          className=" cursor-pointer"
          onClick={() => {
            router.push(`?book=${itemDetail.id}`);
          }}
        >
          <BookedCheck />
        </div>
      </td>
      <td>
        <div className="finance_status">
          <div
            className={`status cw ${
              itemDetail.is_matured ? "Matured" : "Pending"
            }`}
          >
            <div>
              {itemDetail.is_matured && (
                <Image
                  src={`/Images/f_matured.png`}
                  width={4}
                  height={15}
                  alt={itemDetail.status}
                />
              )}
              {!itemDetail.is_matured && (
                <Image
                  src={`/Images/f_cw_pending.png`}
                  width={15}
                  height={4}
                  alt={itemDetail.status}
                />
              )}
            </div>
          </div>
        </div>
      </td>
      <td>{itemDetail.receipt_no}</td>
      <td>{itemDetail.payor}</td>
      <td>{isValid(check_date) ? format(check_date, "MMM dd yyyy") : ""}</td>
      <td>{itemDetail.check_no}</td>
      <td>{itemDetail.bank_branch}</td>
      <td>
        <div>
          <h2>
            <TextNumberDisplay
              value={itemDetail.amount}
              className="withPeso w-full text-end"
            />
          </h2>
        </div>
      </td>
      <td>{itemDetail.maturity}</td>
    </tr>
  );
};

type ListProps = {
  itemDetail: CollectionItem;
};

const ListPaymentList = ({ itemDetail }: ListProps) => {
  const router = useRouter();

  const receipt_date = parse(itemDetail.receipt_date, "yyyy-MM-dd", new Date());

  return (
    <tr
      className=" cursor-pointer"
      onClick={() =>
        router.push(
          `/finance/check-warehouse/check-receivables/check-payment-list/${itemDetail.id}`
        )
      }
    >
      <td>
        {isValid(receipt_date) ? format(receipt_date, "MMM dd yyyy") : ""}
      </td>

      <td>{itemDetail.receipt_no}</td>

      <td>{itemDetail.customer.name}</td>

      <td>
        {itemDetail?.customer?.properties?.map((item: any, index: number) =>
          itemDetail?.customer?.properties?.length - 1 === index
            ? item.unit_code
            : item.unit_code + ", "
        )}
      </td>

      <td>
        <div>
          <h2>
            <TextNumberDisplay
              value={itemDetail.amount_paid}
              className="withPeso w-full text-end"
            />
          </h2>
        </div>
      </td>
    </tr>
  );
};

type BookedListProps = {
  itemDetail: BookedCheckType;
};

const ListBookedCheck = ({ itemDetail }: BookedListProps) => {
  const Permission_create = AccessActionValidation("Collection", "create");

  const check_date = parse(itemDetail.check_date, "yyyy-MM-dd", new Date());

  const deposit_date = parse(itemDetail.deposit_date, "yyyy-MM-dd", new Date());

  return (
    <tr className="hoverEffect">
      <td className="icon">
        {Permission_create &&
          itemDetail.status !== "Rejected" &&
          !itemDetail.acknowledge && (
            <div className={` cursor-pointer`}>
              <Link
                href={`/finance/customer-facility/collection/receive-payment/${itemDetail.id}?from=check_warehouse`}
              >
                <a>
                  <OppositeArrow />
                </a>
              </Link>
            </div>
          )}
      </td>
      <td>
        <div className="finance_status">
          <div className={`status cw ${itemDetail.status}`}>
            <div>
              {itemDetail.status === "Deposited" && <HiCheck />}
              {itemDetail.status === "Rejected" && <IoCloseSharp />}
            </div>
          </div>
        </div>
      </td>
      <td>{itemDetail.receipt_no}</td>
      <td>{itemDetail.payor}</td>
      <td>{isValid(check_date) ? format(check_date, "MMM dd yyyy") : ""}</td>
      <td>{itemDetail.check_no}</td>
      <td>{itemDetail.bank_branch}</td>
      <td>
        <div>
          <h2>
            <TextNumberDisplay
              value={itemDetail.amount}
              className="withPeso w-full text-end"
            />
          </h2>
        </div>
      </td>
      <td>
        {isValid(deposit_date) ? format(deposit_date, "MMM dd yyyy") : ""}
      </td>
      <td>{itemDetail.reference_no}</td>
    </tr>
  );
};
