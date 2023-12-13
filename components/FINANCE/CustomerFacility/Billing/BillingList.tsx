import React, { useContext, useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { BarLoader, MoonLoader, ScaleLoader } from "react-spinners";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippy.js/react";

import style from "../../../../styles/SearchFilter.module.scss";
import AppContext from "../../../Context/AppContext";
import { Advancefilter, AdvanceFilter } from "../../../Reusable/AdvanceFilter";
import Calendar from "../../../Reusable/Calendar";
import { DynamicExportHandler } from "../../../Reusable/DynamicExport";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { PencilButtonTable } from "../../../Reusable/Icons";
import ModalTemp from "../../../Reusable/ModalTemp";
import { TextNumberDisplay } from "../../../Reusable/NumberFormat";
import Pagination from "../../../Reusable/Pagination";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import { GetInvoiceList, MultipleUpdateBillingList, SendPortal } from "./Query";

type isTable = {
  itemArray: isTableItemObj[];
  selectAll: boolean;
};

type isTableItemObj = {
  id: number;
  status: string;
  invoice_no: number;
  customer: {
    name: string;
    properties: string[];
  };
  due_amount: number;
  applied_advances: number | null;
  billing_date: string;
  due_date: string;
  date: string;
  post_to_portal: number;
  select: boolean;
};

export default function BillingList() {
  const Permission_approve = AccessActionValidation("Billing", "approve");
  const [type, setType] = useState("unposted");
  const [isPeriod, setPeriod] = useState({
    from: "",
    to: "",
  });
  let ButtonClicked = "";
  const [buttonLoading, setButtonLoading] = useState("");
  const { setPrompt } = useContext(AppContext);
  const [isSearch, setSearch] = useState("");
  const [TablePage, setTablePage] = useState(1);
  const [isTableItem, setTableItem] = useState<isTable>({
    itemArray: [],
    selectAll: false,
  });

  const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);

  useEffect(() => {
    setSelectedIDs([]);
  }, [type]);

  const [updateDueDate, setUpdateDueDate] = useState({
    value: "",
    toggle: false,
  });

  // ADVANCE FILTER
  const [isAdvFilter, setAdvFilter] = useState<Advancefilter>([]);

  const [isFilterText, setFilterText] = useState<string>("");

  useEffect(() => {
    const cloneArray = isAdvFilter.map((item) => {
      return `${item.key}:${item.value}`;
    });
    setFilterText(cloneArray.toString());
  }, [isAdvFilter]);

  const removeItemFromFilter = (value: string) => {
    const cloneFilter = isAdvFilter.filter((item) => item.value !== value);
    setAdvFilter(cloneFilter);
  };

  let dateFrom: any = parse(isPeriod.from, "MMM dd yyyy", new Date());
  let dateTo: any = parse(isPeriod.to, "MMM dd yyyy", new Date());
  dateFrom = isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "";
  dateTo = isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "";
  const { data, isLoading, isError } = GetInvoiceList(
    isSearch,
    type,
    TablePage,
    isFilterText,
    dateFrom,
    dateTo
  );

  useEffect(() => {
    let selectAll = false;
    if (data?.data?.data?.length > 0) {
      let CloneArray = data?.data?.data.map((item: isTableItemObj) => {
        let select = false;
        if (isSelectedIDs.includes(item.id)) {
          select = true;
        }
        const due_date = parse(item.due_date, "yyyy-MM-dd", new Date());
        const billing_date = parse(item.billing_date, "yyyy-MM-dd", new Date());
        const date = parse(item?.date, "yyyy-MM-dd", new Date());
        return {
          id: item.id,
          status: item.status,
          invoice_no: item.invoice_no,
          customer: {
            name: item.customer.name,
            properties: item.customer.properties.map((itemProperty: any) => {
              return itemProperty.unit_code;
            }),
          },
          due_amount: item.due_amount,
          applied_advances: item.applied_advances,
          date: isValid(date) ? format(date, "MMM dd yyyy") : "",
          billing_date: isValid(billing_date)
            ? format(billing_date, "MMM dd yyyy")
            : "",
          due_date: isValid(due_date) ? format(due_date, "MMM dd yyyy") : "",
          post_to_portal: item.post_to_portal,
          select: select,
        };
      });

      if (
        CloneArray.length !== 0 &&
        CloneArray.every((val: any) => isSelectedIDs.includes(val.id))
      ) {
        selectAll = true;
      } else {
        selectAll = false;
      }

      setTableItem({
        itemArray: CloneArray,
        selectAll: selectAll,
      });
    } else {
      setTableItem({
        itemArray: [],
        selectAll: false,
      });
    }
  }, [data, type, isSelectedIDs]);

  const selectAll = () => {
    if (isTableItem.selectAll) {
      // remove
      setSelectedIDs([]);
    } else {
      // add
      const ReceiptBookIDs = isTableItem.itemArray.map((item) => {
        return Number(item.id);
      });
      setSelectedIDs(ReceiptBookIDs);
    }
    const newItems = isTableItem?.itemArray.map((item: any) => {
      return {
        ...item,
        select: !isTableItem.selectAll,
      };
    });
    setTableItem({
      itemArray: newItems,
      selectAll: !isTableItem.selectAll,
    });
  };

  const onSuccess = () => {
    const tableArray = isTableItem.itemArray.map((item) => {
      return {
        ...item,
        select: false,
      };
    });
    setInProcesNoticeToggle(false);
    setTableItem({
      itemArray: tableArray,
      selectAll: false,
    });
    setSelectedIDs([]);

    let message = `Items successfully`;

    if (ButtonClicked === "" || ButtonClicked === "Rejected") {
      message = `Items successfully rejected`;
    }
    if (ButtonClicked === "Pending") {
      message = `Items successfully return to pending`;
    }
    if (ButtonClicked === "In Process") {
      message = `Items successfully moved to process`;
    }
    if (ButtonClicked === "Posted") {
      message = `Items successfully posted`;
    }

    if (ButtonClicked === "Post to Portal") {
      message = `Items successfully posted to portal`;
    }

    setPrompt({
      message: message,
      type: "success",
      toggle: true,
    });
    ButtonClicked = "";
    setButtonLoading("");
    setUpdateDueDate({
      value: "",
      toggle: false,
    });
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
    ButtonClicked = "";
    setButtonLoading("");
  };

  const { isLoading: updateLoading, mutate: updateMutate } =
    MultipleUpdateBillingList(onSuccess, onError);

  const { isLoading: sendPortalLoading, mutate: SendPortalMutate } = SendPortal(
    onSuccess,
    onError
  );

  const [isInProcesNoticeToggle, setInProcesNoticeToggle] = useState(false);

  const UpdateStatus = (button: string) => {
    ButtonClicked = button;
    setButtonLoading(button);

    if (isSelectedIDs.length > 0) {
      if (button === "In Process") {
        setInProcesNoticeToggle(true);
      } else {
        Confirm(button);
      }
    } else {
      setPrompt({
        message: "Select a Invoice!",
        type: "draft",
        toggle: true,
      });
    }
  };
  const Confirm = (button: string) => {
    ButtonClicked = button;
    setButtonLoading(button);
    const dueDate = parse(updateDueDate.value, "MMM dd yyyy", new Date());
    if (button !== "Post to Portal") {
      const Payload = {
        invoice_ids: isSelectedIDs,
        status: button,
        due_date: isValid(dueDate) ? format(dueDate, "yyyy-MM-dd") : null,
      };
      updateMutate(Payload);
    } else {
      //   post to portal
      const Payload = {
        invoice_ids: isSelectedIDs,
      };
      SendPortalMutate(Payload);
    }
  };

  const [isExportLoading, setExportLoading] = useState(false);

  const ExportHandler = () => {
    const endPoint = `/finance/customer-facility/billing/export?list_type=${type}&paginate=10&keywords=${isSearch}&page=${
      isSearch === "" ? TablePage : 1
    }&filters=${isFilterText}&date_from=${dateFrom}&date_to=${dateTo}`;
    DynamicExportHandler(
      endPoint,
      "Posted-invoices-list",
      setPrompt,
      setExportLoading
    );
  };

  return (
    <>
      {isInProcesNoticeToggle && (
        <ModalTemp narrow={true}>
          <h1 className="text-start mb-5">Enter Due Date</h1>
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
              value={updateDueDate.value}
              onChange={() => {}}
              placeholder="mm dd yyyy"
              onClick={() =>
                setUpdateDueDate({
                  ...updateDueDate,
                  toggle: true,
                })
              }
              className="px-2 h-10 1550px:h-8 outline-none w-full rounded-md shadow-md"
            />
            {updateDueDate.toggle && (
              <Calendar value={updateDueDate} setValue={setUpdateDueDate} />
            )}
          </div>
          <div className="flex justify-end items-center w-full">
            <button
              className="button_cancel"
              onClick={() => setInProcesNoticeToggle(false)}
            >
              CANCEL
            </button>
            <button className="buttonRed" onClick={() => Confirm("In Process")}>
              {updateLoading ? (
                <ScaleLoader color="#fff" height="10px" width="2px" />
              ) : (
                "PROCESS"
              )}
            </button>
          </div>
        </ModalTemp>
      )}

      <ul className="SimpleTab">
        <li
          className={`${type === "unposted" && "Active"}`}
          onClick={() => {
            setType("unposted");
            setPeriod({ from: "", to: "" });
          }}
        >
          Unposted Invoices
        </li>
        <li
          className={`${type === "posted" && "Active"}`}
          onClick={() => {
            setPeriod({ from: "", to: "" });
            setType("posted");
          }}
        >
          Posted Invoices
        </li>
      </ul>

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
          <AdvanceFilter
            endpoint={`/finance/customer-facility/billing/filter-options?list_type=${type}&date_from=${dateFrom}&date_to=${dateTo}&keywords=`}
            setAdvFilter={setAdvFilter}
            isAdvFilter={isAdvFilter}
          />
        </div>

        <ul className={style.navigation}>
          {type === "unposted" ? (
            <>
              {Permission_approve && (
                <li className={style.importExportPrint}>
                  <Tippy theme="ThemeRed" content="Post">
                    <div
                      className={`${style.noFill} mr-5`}
                      onClick={() => UpdateStatus("Posted")}
                    >
                      {updateLoading && buttonLoading === "Posted" ? (
                        <MoonLoader
                          className="text-ThemeRed mr-2"
                          color="#8f384d"
                          size={16}
                        />
                      ) : (
                        <Image
                          src="/Images/f_check.png"
                          height={25}
                          width={30}
                          alt="Posted"
                        />
                      )}
                    </div>
                  </Tippy>
                </li>
              )}

              <li className={style.importExportPrint}>
                <Tippy theme="ThemeRed" content="In Process">
                  <div
                    className={`${style.noFill} mr-5`}
                    onClick={() => UpdateStatus("In Process")}
                  >
                    {updateLoading && buttonLoading === "In Process" ? (
                      <MoonLoader
                        className="text-ThemeRed mr-2"
                        color="#8f384d"
                        size={16}
                      />
                    ) : (
                      <Image
                        src="/Images/f_refresh.png"
                        height={30}
                        width={30}
                        alt="In Process"
                      />
                    )}
                  </div>
                </Tippy>
              </li>
              <li className={style.importExportPrint}>
                <Tippy theme="ThemeRed" content="Return">
                  <div
                    className={`${style.noFill}`}
                    onClick={() => UpdateStatus("Pending")}
                  >
                    {updateLoading && buttonLoading === "Pending" ? (
                      <MoonLoader
                        className="text-ThemeRed mr-2"
                        color="#8f384d"
                        size={16}
                      />
                    ) : (
                      <Image
                        src="/Images/f_back.png"
                        height={25}
                        width={30}
                        alt="Return"
                      />
                    )}
                  </div>
                </Tippy>
              </li>
            </>
          ) : (
            <>
              <li className={style.importExportPrint}>
                <Tippy theme="ThemeRed" content="Print">
                  <div className={`${style.noFill} mr-5`}>
                    <Link
                      href={`/finance/customer-facility/billing/invoice-list/print?isSearch=${isSearch}&type=${type}&TablePage=${TablePage}&isFilterText=${isFilterText}&dateFrom=${dateFrom}&dateTo=${dateTo}`}
                    >
                      <a target="_blank">
                        <Image
                          src="/Images/Print.png"
                          height={30}
                          width={30}
                          alt="Export"
                        />
                      </a>
                    </Link>
                  </div>
                </Tippy>
              </li>
              <li className={style.importExportPrint}>
                {isExportLoading ? (
                  <div className={style.icon}>
                    <MoonLoader color="#8f384d" size={20} />
                  </div>
                ) : (
                  <div>
                    <Tippy theme="ThemeRed" content="Export">
                      <div className={style.icon} onClick={ExportHandler}>
                        <Image
                          src="/Images/Export.png"
                          layout="fill"
                          alt="Export"
                        />
                      </div>
                    </Tippy>
                  </div>
                )}
              </li>
              <li className={style.new}>
                <button
                  className="buttonRed"
                  onClick={() => UpdateStatus("Post to Portal")}
                >
                  {sendPortalLoading ? (
                    <ScaleLoader color="#fff" height="10px" width="2px" />
                  ) : (
                    "  POST TO PORTAL"
                  )}
                </button>
              </li>
            </>
          )}
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

      {type === "posted" && (
        <>
          <div className="flex items-center mb-5 480px:mb-2 480px:flex-wrap">
            <PeriodCalendar value={isPeriod} setValue={setPeriod} />
          </div>
        </>
      )}

      <div className="table_container">
        <table className="table_list">
          <thead>
            <tr>
              <th className="checkbox">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={isTableItem.selectAll}
                    onChange={selectAll}
                  />
                </div>
              </th>
              {type === "unposted" ? (
                <>
                  <th></th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Property</th>
                  <th>Due Amount</th>
                  <th>Applied Advances</th>
                </>
              ) : (
                <>
                  <th>Billing Date</th>
                  <th>Invoice No.</th>
                  <th>Customer</th>
                  <th>Property</th>
                  <th>Due Amount</th>
                  <th>Due Date</th>
                  <th></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {isTableItem?.itemArray.map((item: any, index: number) => (
              <List
                key={index}
                itemDetail={item}
                type={type}
                isTableItem={isTableItem}
                setTableItem={setTableItem}
                setSelectedIDs={setSelectedIDs}
                isSelectedIDs={isSelectedIDs}
              />
            ))}
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
        TablePage={TablePage}
        PageNumber={data?.data.meta.last_page}
        CurrentPage={data?.data.meta.current_page}
      />
    </>
  );
}

type ListProps = {
  itemDetail: isTableItemObj;
  isTableItem: isTable;
  type: string;
  setTableItem: Function;
  isSelectedIDs: number[];
  setSelectedIDs: Function;
};

const List = ({
  itemDetail,
  type,
  isTableItem,
  setTableItem,
  isSelectedIDs,
  setSelectedIDs,
}: ListProps) => {
  const updateValue = (e: any) => {
    const newItems = isTableItem?.itemArray.map((item: any) => {
      if (itemDetail.id == item.id) {
        if (item.select) {
          // remove
          const filterSelected = isSelectedIDs.filter(
            (itemFilt) => Number(item.id) !== itemFilt
          );
          setSelectedIDs(filterSelected);
        } else {
          // add
          setSelectedIDs([...isSelectedIDs, item.id]);
        }
        return {
          ...item,
          select: !item.select,
        };
      }
      return item;
    });
    setTableItem({
      itemArray: newItems,
      selectAll: false,
    });
  };

  return (
    <tr className="hoverEffect">
      <td className="checkbox">
        <div className="item">
          <input
            type="checkbox"
            onChange={(e: any) => updateValue(e)}
            checked={itemDetail.select}
          />
        </div>
      </td>
      {type !== "posted" && (
        <td className="iconHidden flex justify-center">
          <Link
            href={`/finance/customer-facility/billing/modify/${itemDetail.id}`}
          >
            <a>
              <PencilButtonTable />
            </a>
          </Link>
        </td>
      )}

      <td>
        <Link
          href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
        >
          <a className="item">
            {type !== "posted" ? (
              <div className="finance_status">
                <div
                  className={`status ${
                    itemDetail.status === "In Process"
                      ? "InProcess"
                      : itemDetail.status
                  }`}
                >
                  <div>
                    {itemDetail.status === "Pending" && (
                      <Image
                        src={`/Images/f_pending.png`}
                        width={15}
                        height={15}
                        alt={itemDetail.status}
                      />
                    )}
                    {itemDetail.status === "In Process" && (
                      <Image
                        src={`/Images/f_InProcess.png`}
                        width={15}
                        height={15}
                        alt={itemDetail.status}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2>{itemDetail.billing_date}</h2>
              </div>
            )}
          </a>
        </Link>
      </td>
      <td>
        <Link
          href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
        >
          <a className="item">
            <div>
              <h2>
                {type === "unposted" ? itemDetail.date : itemDetail.invoice_no}
              </h2>
            </div>
          </a>
        </Link>
      </td>
      <td>
        <Link
          href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
        >
          <a className="item">
            <div>
              <h2>{itemDetail.customer.name}</h2>
            </div>
          </a>
        </Link>
      </td>
      <td>
        <Link
          href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
        >
          <a className="item">
            <div>
              <h2>
                {itemDetail.customer.properties.map((item, index) =>
                  itemDetail.customer.properties.length - 1 === index
                    ? item
                    : item + ", "
                )}
              </h2>
            </div>
          </a>
        </Link>
      </td>
      <td>
        <Link
          href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
        >
          <a className="item">
            <div>
              <h2>
                <TextNumberDisplay
                  value={itemDetail.due_amount}
                  className="withPeso w-full text-end"
                />
              </h2>
            </div>
          </a>
        </Link>
      </td>
      <td>
        <Link
          href={`/finance/customer-facility/billing/invoice-list/${itemDetail.id}`}
        >
          <a className="item">
            <div>
              <h2>
                {type === "unposted" ? (
                  <TextNumberDisplay
                    value={
                      itemDetail.applied_advances === null
                        ? ""
                        : itemDetail.applied_advances
                    }
                    className="withPeso w-full text-end"
                  />
                ) : (
                  itemDetail.due_date
                )}
              </h2>
            </div>
          </a>
        </Link>
      </td>

      {type !== "unposted" && itemDetail.post_to_portal === 1 && (
        <td>
          <div className="item w-[50px]">
            <div className="finance_status">
              <div className="status Sent">
                <div>
                  <Image
                    src="/Images/f_sent.png"
                    width={15}
                    height={15}
                    alt="Draft"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      )}
    </tr>
  );
};
