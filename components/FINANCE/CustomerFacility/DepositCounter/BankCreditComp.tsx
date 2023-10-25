import React, { useContext, useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BarLoader, MoonLoader } from "react-spinners";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippy.js/react";

import styleSearch from "../../../../styles/SearchFilter.module.scss";
import AppContext from "../../../Context/AppContext";
import { DynamicExportHandler } from "../../../Reusable/DynamicExport";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { MinusButtonTable, PlusButtonTable } from "../../../Reusable/Icons";
import {
  InputNumberForTable,
  TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import Pagination from "../../../Reusable/Pagination";
import PeriodCalendar from "../../../Reusable/PeriodCalendar";
import { AccessActionValidation } from "../../../Reusable/PermissionValidation/ActionAccessValidation";
import SelectBankAccount from "../../../Reusable/SelectBankAccount";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import DropdownReceipt_Reference from "./DropdownReceipt_Reference";
import { GetBankCredit, MultipleUpdateBankCredit } from "./Query";
import { isReceiptBookData } from "./Receiptsbook";

export type isTableBankCredit = {
  itemArray: isTableItemObjBC[];
  selectAll: boolean;
};

export type isTableItemObjBC = {
  id: string | number;
  index: string;
  bank_account_no: string;
  credit_date: string;
  credit_amount: number | string;
  remarks: string;
  status: string;
  select: boolean;
  receipt_no: string;
  rec_ref_id: string;
  reference_no: string;
  rec_ref_amount: string | number;
  variance: number | string;
  childrenBC: childType[];
  receipt_book: receipt_book[];
};

type receipt_book = {
  receipt_no: number | null | Text;
  reference_no: number | null | Text;
};

type childType = {
  receipt_id: string | number;
  receipt_no: string | number;
  reference_no: string | number;
  id: string | number;
  amount: number;
  variance: number;
};

type Props = {
  type: string;
  isReceiptBookData: isReceiptBookData;
  setReceiptBookData: Function;
  isBankCredit: isTableBankCredit;
  setBankCredit: Function;
  setChangeData: Function;
};

export default function BankCreditComp({
  type,
  isBankCredit,
  setBankCredit,
  setChangeData,
}: Props) {
  const Permission_modify = AccessActionValidation("Deposit Counter", "modify");

  const Permission_approve = AccessActionValidation(
    "Deposit Counter",
    "approve"
  );

  const [isSelectedBankCreditIDs, setSelectedBankCreditIDs] = useState<
    number[]
  >([]);

  const [isPeriod, setPeriod] = useState({
    from: "",
    to: "",
  });

  const [TablePage, setTablePage] = useState(1);

  const [isSelectBankIDS, setSelectBankIDS] = useState<any[]>([]);

  const displayStatus = type === "bank-credit" ? "matched" : "unmatched";

  const dateFrom = parse(isPeriod.from, "MMM dd yyyy", new Date());

  const dateTo = parse(isPeriod.to, "MMM dd yyyy", new Date());

  const [isSearch, setSearch] = useState("");

  const [isPaginate, setPaginate] = useState(10);

  const { data, isLoading, isError } = GetBankCredit(
    displayStatus,
    isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
    isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
    isSelectBankIDS,
    TablePage,
    isSearch,
    isPaginate
  );

  useEffect(() => {
    let selectAll = false;
    const clone = data?.data?.data.map((parentMap: any) => {
      let select = false;
      if (isSelectedBankCreditIDs.includes(parentMap.id)) {
        select = true;
      }
      let variance =
        Number(parentMap?.credit) -
        Number(parentMap?.receipt_book[0]?.amount_paid);
      return {
        id: parentMap.id,
        index: parentMap?.index,
        bank_account_no: parentMap?.bank_account?.bank_acc_no,
        credit_date: parentMap?.date,
        credit_amount: parentMap?.credit,
        remarks: parentMap?.remarks,
        variance: parentMap?.credit,
        status: parentMap?.status,
        receipt_no: parentMap?.receipt_book[0]?.receipt_no
          ? parentMap?.receipt_book[0]?.receipt_no
          : ``,
        reference_no: parentMap?.receipt_book[0]?.reference_no
          ? parentMap?.receipt_book[0]?.reference_no
          : ``,
        rec_ref_id: parentMap?.receipt_book[0]?.id,
        rec_ref_amount: parentMap?.receipt_book[0]?.amount_paid,
        select: select,
        childrenBC: parentMap?.receipt_book
          ?.filter((_: any, indx: number) => indx > 0)
          .map((itemChild: any) => {
            variance = Number(variance) - Number(itemChild?.amount_paid);
            return {
              id: itemChild?.id,
              receipt_no: itemChild?.receipt_no,
              reference_no: itemChild?.reference_no,
              amount: itemChild?.amount_paid,
              variance: variance,
            };
          }),
      };
    });

    if (
      clone?.length !== 0 &&
      clone?.every((val: any) => isSelectedBankCreditIDs.includes(val.id))
    ) {
      selectAll = true;
    } else {
      selectAll = false;
    }

    setBankCredit({
      selectAll: selectAll,
      itemArray: clone,
    });
  }, [data?.data?.data]);
  const { setPrompt } = useContext(AppContext);

  const [isSelectBank, setSelectBank] = useState<any>([]);

  useEffect(() => {
    const selectbandIDS = isSelectBank.map((item: any) => {
      return item.id;
    });
    setSelectBankIDS(selectbandIDS);
  }, [isSelectBank]);

  // GET SELECTED Reference no and receipt no FOR FILTERING DROPDOWN
  const [OverallSelectedReceipt, setOverallSelectedReceipt] = useState<
    string[]
  >([]);
  const [OverallSelectedReference, setOverallSelectedReference] = useState<
    string[]
  >([]);

  useEffect(() => {
    let ReceiptParent: string[] = [];
    let ReceiptChildren: string[] = [];
    isBankCredit.itemArray?.map((item: isTableItemObjBC) => {
      if (item.receipt_no !== null) {
      }
      ReceiptParent = [...ReceiptParent, item.receipt_no];
    });
    isBankCredit.itemArray?.map((item: isTableItemObjBC) => {
      item.childrenBC.map((item2) => {
        if (item2.receipt_no !== null) {
          ReceiptChildren = [
            ...ReceiptChildren,
            `${item2.receipt_no}`,
            `${item2.reference_no}`,
          ];
        }
      });
    });

    let ReferenceParent: string[] = [];
    let ReferenceChildren: string[] = [];
    isBankCredit.itemArray?.map((item: isTableItemObjBC) => {
      if (item.receipt_no === null) {
        ReferenceParent = [...ReferenceParent, item.reference_no];
      }
    });
    isBankCredit.itemArray?.map((item: isTableItemObjBC) => {
      item.childrenBC.map((item2) => {
        if (item.receipt_no === null) {
          ReferenceChildren = [...ReferenceChildren, `${item2.reference_no}`];
        }
      });
    });

    const OverallSelectedReceipt = [
      ...ReceiptParent,
      ...ReceiptChildren,
    ].filter((filterItem) => filterItem !== "");
    const OverallSelectedReference = [
      ...ReferenceParent,
      ...ReferenceChildren,
    ].filter((filterItem) => filterItem !== "");

    setOverallSelectedReceipt(OverallSelectedReceipt);
    setOverallSelectedReference(OverallSelectedReference);
  }, [isBankCredit.itemArray]);

  const selectAll = () => {
    if (isBankCredit.selectAll) {
      // remove
      setSelectedBankCreditIDs([]);
    } else {
      // add
      const BankCreditIDs = isBankCredit.itemArray?.map((item) => {
        return Number(item.id);
      });
      setSelectedBankCreditIDs(BankCreditIDs);
    }
    const newItems = isBankCredit?.itemArray?.map((item: any) => {
      return {
        ...item,
        select: !isBankCredit.selectAll,
      };
    });
    setBankCredit({
      itemArray: newItems,
      selectAll: !isBankCredit.selectAll,
    });
  };

  const AddHandler = (id: string | number) => {
    const cloneToAdd = isBankCredit.itemArray?.map((item: isTableItemObjBC) => {
      if (item.id === id) {
        return {
          ...item,
          childrenBC: [
            ...item.childrenBC,
            {
              id: Math.random(),
              receipt_no: "",
              reference_no: "",
              amount: "",
              receipt_id: "",
            },
          ],
        };
      }
      return item;
    });
    setBankCredit({
      ...isBankCredit,
      itemArray: cloneToAdd,
    });
  };

  const DeleteHandler = (id: string | number) => {
    const cloneToDelete = isBankCredit.itemArray?.filter(
      (item) => item.id !== id
    );
    setBankCredit({
      ...isBankCredit,
      itemArray: cloneToDelete,
    });
  };
  const DeleteHandlerChildren = (
    parentID: string | number,
    selectedID: string | number
  ) => {
    const cloneToDelete = isBankCredit.itemArray?.map(
      (item: isTableItemObjBC) => {
        if (item.id === parentID) {
          const clonetoFilter = item.childrenBC.filter(
            (filterItem) => filterItem.id !== selectedID
          );
          return {
            ...item,
            childrenBC: clonetoFilter,
          };
        }
        return item;
      }
    );

    setChangeData({
      dataThatChangeID: parentID,
      parentID: parentID,
      fromWhere: "bank credit",
    });

    setBankCredit({
      ...isBankCredit,
      itemArray: cloneToDelete,
    });
  };

  const [isExportLoading, setExportLoading] = useState(false);

  const ExportHandler = () => {
    const endPoint = `/finance/customer-facility/bank-credit/export?status=${displayStatus}&date_from=${
      isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : ""
    }&date_to=${
      isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : ""
    }&bank_account_ids=${
      isSelectBankIDS.length <= 0 ? "" : `[${isSelectBankIDS}]`
    }&keywords=${isSearch}`;
    DynamicExportHandler(
      endPoint,
      "bank_credit-deposit_counter",
      setPrompt,
      setExportLoading
    );
  };

  let buttonClicked = "";

  const onSuccess = () => {
    setPrompt({
      message: `Items successfully updated status`,
      type: "success",
      toggle: true,
    });
    buttonClicked = "";
    setSelectedBankCreditIDs([]);
  };
  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
    buttonClicked = "";
  };
  const { isLoading: updateLoading, mutate: updateMutate } =
    MultipleUpdateBankCredit(onSuccess, onError);

  const UpdateStatus = (status: string) => {
    buttonClicked = status;
    const Payload = {
      bank_credit_ids: isSelectedBankCreditIDs,
      status: status,
    };
    if (isSelectedBankCreditIDs.length > 0) {
      updateMutate(Payload);
    } else {
      setPrompt({
        message: "Select a Bank Credit!",
        type: "draft",
        toggle: true,
      });
    }
  };
  return (
    <>
      <section className={`${styleSearch.container}`}>
        <div className={styleSearch.period}>
          <h1 className="SectionTitle">
            Bank Credit{" "}
            {type !== "bank-credit" && (
              <Link href="/finance/customer-facility/deposit-counter/bank-credit">
                <a>
                  <GoEye className=" text-ThemeRed ml-2 text-[16px]" />
                </a>
              </Link>
            )}
          </h1>
        </div>
      </section>
      <section className={styleSearch.container}>
        {type === "bank-credit" && (
          <div className={styleSearch.searchBar}>
            <input
              type="text"
              placeholder="Search"
              value={isSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
            <BsSearch className={styleSearch.searchIcon} />
          </div>
        )}

        <div className={styleSearch.period}>
          {type !== "bank-credit" && (
            <PeriodCalendar value={isPeriod} setValue={setPeriod} />
          )}

          <div className="flex items-center ml-5">
            <p className="labelField">BANK&nbsp;&&nbsp;ACCOUNT&nbsp;NO.</p>

            <SelectBankAccount
              isArrayBA={isSelectBank}
              setArrayBA={setSelectBank}
            />
          </div>
        </div>

        {type === "bank-credit" && (
          <ul className={styleSearch.navigation}>
            {isExportLoading ? (
              <li className=" mr-5 mb-1">
                <MoonLoader color="#8f384d" size={20} />
              </li>
            ) : (
              <li className={styleSearch.importExportPrint}>
                <Tippy theme="ThemeRed" content="Export">
                  <div
                    className={`${styleSearch.noFill} mr-5`}
                    onClick={ExportHandler}
                  >
                    <Image
                      src="/Images/Export.png"
                      height={30}
                      width={30}
                      alt="Return"
                    />
                  </div>
                </Tippy>
              </li>
            )}

            <li className={styleSearch.importExportPrint}>
              <Tippy theme="ThemeRed" content="Return">
                <div
                  className={`${styleSearch.noFill} mr-5`}
                  onClick={() => UpdateStatus("In Process")}
                >
                  <Image
                    src="/Images/f_back.png"
                    height={25}
                    width={30}
                    alt="Return"
                  />
                </div>
              </Tippy>
            </li>
            {Permission_approve && (
              <li className={styleSearch.importExportPrint}>
                <Tippy theme="ThemeRed" content="Approved">
                  <div
                    className={`${styleSearch.noFill} mr-5`}
                    onClick={() => UpdateStatus("Posted")}
                  >
                    <Image
                      src="/Images/f_check.png"
                      height={25}
                      width={30}
                      alt="Approved"
                    />
                  </div>
                </Tippy>
              </li>
            )}
          </ul>
        )}
      </section>
      <div
        className={`table_container ${type !== "bank-credit" && "max-half"}`}
      >
        <table className="table_list">
          <thead className="textRed">
            <tr>
              {type === "bank-credit" && (
                <th className="checkbox">
                  <div className="item">
                    <input
                      type="checkbox"
                      checked={isBankCredit.selectAll}
                      onChange={selectAll}
                    />
                  </div>
                </th>
              )}
              <th>INDEX</th>
              <th>BANK & ACCOUNT NO.</th>
              <th>CREDIT DATE</th>
              <th>CREDIT AMOUNT</th>
              <th>REMARKS</th>
              <th>RECEIPT NO. / REFERENCE NO.</th>
              {type === "bank-credit" && <th>DEBIT</th>}
              <th>{type === "bank-credit" ? "STATUS" : "VARIANCE"}</th>
              {type !== "bank-credit" && <th></th>}
            </tr>
          </thead>
          <tbody>
            {isBankCredit?.itemArray?.map(
              (item: isTableItemObjBC, index: number) => (
                <List
                  key={index}
                  index={index}
                  itemDetail={item}
                  isTableItem={isBankCredit}
                  setTableItem={setBankCredit}
                  type={type}
                  setChangeData={setChangeData}
                  AddHandler={AddHandler}
                  DeleteHandler={DeleteHandler}
                  DeleteHandlerChildren={DeleteHandlerChildren}
                  isSelectedBankCreditIDs={isSelectedBankCreditIDs}
                  setSelectedBankCreditIDs={setSelectedBankCreditIDs}
                  SelectedReceipt={OverallSelectedReceipt}
                  SelectedReference={OverallSelectedReference}
                  Permission_modify={Permission_modify}
                />
              )
            )}
          </tbody>
        </table>
        {Number(isPaginate) === Number(isBankCredit?.itemArray?.length) &&
          type !== "bank-credit" && (
            <div className=" h-[40px] w-full flex justify-center items-center">
              <button
                className=" text-ThemeRed hover:underline font-NHU-bold"
                onClick={() => setPaginate((prev) => Number(prev) + 10)}
              >
                Load more...
              </button>
            </div>
          )}
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
      {type === "bank-credit" && (
        <Pagination
          setTablePage={setTablePage}
          TablePage={TablePage}
          PageNumber={data?.data.last_page}
          CurrentPage={data?.data.current_page}
        />
      )}
    </>
  );
}

type ListProps = {
  itemDetail: isTableItemObjBC;
  isTableItem: isTableBankCredit;
  setTableItem: Function;
  type: string;
  index: number;
  setChangeData: Function;
  AddHandler: (id: string | number) => void;
  DeleteHandler: (id: number | string) => void;
  DeleteHandlerChildren: (
    parentID: string | number,
    selectedID: string | number
  ) => void;
  isSelectedBankCreditIDs: number[];
  setSelectedBankCreditIDs: Function;
  SelectedReceipt: string[];
  SelectedReference: string[];
  Permission_modify: boolean;
};

const List = ({
  itemDetail,
  isTableItem,
  setTableItem,
  type,
  index,
  setChangeData,
  AddHandler,
  DeleteHandler,
  DeleteHandlerChildren,
  isSelectedBankCreditIDs,
  setSelectedBankCreditIDs,
  SelectedReceipt,
  SelectedReference,
  Permission_modify,
}: ListProps) => {
  const [isSelect, setSelect] = useState({
    toggle: false,
    rec_ref: "",
  });

  useEffect(() => {
    if (isSelect.rec_ref !== "") {
      const newItems = isTableItem?.itemArray?.map((item: any) => {
        if (itemDetail.id == item.id) {
          return {
            ...item,
            reference_no: itemDetail?.reference_no,
            receipt_no: itemDetail?.receipt_no,
          };
        }
        return item;
      });
      setTableItem({
        ...isTableItem,
        itemArray: newItems,
      });
    }
  }, [isSelect]);

  const SelectField = (value: string) => {
    setSelect({
      rec_ref: value,
      toggle: false,
    });
  };
  const SelectHandler = (e: any) => {
    updateValue("rec_ref", e);
    setChangeData({
      dataThatChange: itemDetail.id,
      fromWhere: "bank credit",
      parentID: itemDetail.id,
      childreID: "",
    });
  };

  const SelectHandlerChildDD = (e: any) => {
    const ChildRowID = e.target.getAttribute("data-rowID");
    updateValue("rec_ref_Child", e);
    setChangeData({
      dataThatChangeID: itemDetail.id,
      fromWhere: "bank credit",
      parentID: itemDetail.id,
      childreID: ChildRowID,
    });
  };

  const updateValue = (key: string, e: any) => {
    const rec_ref_id = e.target.getAttribute("data-ref_ref_id");
    const receiptno = e.target.getAttribute("data-receiptno");
    const reference_no = e.target.getAttribute("data-referenceno");
    const amount = e.target.getAttribute("data-amount");
    const ChildRowID = e.target.getAttribute("data-rowid");

    const newItems = isTableItem?.itemArray?.map((item: any) => {
      if (itemDetail.id == item.id) {
        if (key === "select") {
          if (item.select) {
            // remove
            const filterSelectedBCIDs = isSelectedBankCreditIDs.filter(
              (itemFilt) => Number(item.id) !== itemFilt
            );
            setSelectedBankCreditIDs(filterSelectedBCIDs);
          } else {
            // add
            setSelectedBankCreditIDs([...isSelectedBankCreditIDs, item.id]);
          }
          return {
            ...item,
            select: !item.select,
          };
        }
        if (key === "rec_ref") {
          return {
            ...item,
            receipt_no: receiptno,
            reference_no: reference_no,
            rec_ref_amount: amount,
            rec_ref_id: rec_ref_id,
          };
        }
        if (key === "rec_ref_Child") {
          const childArray = item.childrenBC.map((childItem: childType) => {
            if (Number(childItem.id) === Number(ChildRowID)) {
              return {
                ...childItem,
                receipt_id: rec_ref_id,
                receipt_no: receiptno,
                reference_no: reference_no,
                id: rec_ref_id,
                amount: amount,
                variance: Number(itemDetail.variance) - Number(amount),
              };
            }
            return childItem;
          });
          return {
            ...item,
            childrenBC: childArray,
          };
        }
      }
      return item;
    });
    setTableItem({
      ...isTableItem,
      itemArray: newItems,
    });
  };

  let credit_date: any = parse(
    itemDetail.credit_date,
    "yyyy-MM-dd",
    new Date()
  );
  credit_date = isValid(credit_date) ? format(credit_date, "MMM dd yyyy") : "";

  const remainingVariance: number =
    Number(itemDetail.credit_amount) - Number(itemDetail.rec_ref_amount);

  return (
    <>
      <tr className={`${itemDetail.childrenBC.length > 0 && "noBorder"}`}>
        {type === "bank-credit" && (
          <td className="checkbox">
            <div className="item">
              {itemDetail.status !== "Posted" && (
                <input
                  type="checkbox"
                  onChange={(e: any) => updateValue("select", e)}
                  checked={itemDetail.select}
                />
              )}
            </div>
          </td>
        )}
        <td>
          <h4 className="field disabled ">{itemDetail.index}</h4>
        </td>
        <td>{itemDetail.bank_account_no}</td>
        <td>{credit_date}</td>
        <td>
          <TextNumberDisplay
            value={itemDetail.credit_amount}
            className="withPeso"
          />
        </td>
        <td>{itemDetail.remarks}</td>
        {type === "bank-credit" && (
          <td>
            {itemDetail.receipt_no
              ? itemDetail.receipt_no
              : itemDetail.reference_no}
          </td>
        )}
        {type !== "bank-credit" && (
          <td className="maxlarge">
            {isSelect.rec_ref === "" ? (
              <div className="select">
                <span>
                  <MdOutlineKeyboardArrowDown />
                </span>
                <DynamicPopOver
                  toRef={
                    <input
                      type="text"
                      autoComplete="off"
                      className="field w-full"
                      readOnly
                      value={
                        itemDetail.receipt_no
                          ? itemDetail.receipt_no
                          : itemDetail.reference_no
                          ? itemDetail.reference_no
                          : ""
                      }
                      onClick={() =>
                        setSelect({
                          ...isSelect,
                          toggle: !isSelect.toggle,
                        })
                      }
                    />
                  }
                  samewidth={true}
                  toPop={
                    <>
                      {isSelect.toggle && (
                        <ul>
                          <li onClick={() => SelectField("receipt")}>
                            Receipt No.
                          </li>
                          <li onClick={() => SelectField("reference")}>
                            Reference No.
                          </li>
                        </ul>
                      )}
                    </>
                  }
                  className=""
                />
              </div>
            ) : (
              <>
                {Permission_modify ? (
                  <DropdownReceipt_Reference
                    setSelectField={SelectField}
                    name="index"
                    value={
                      isSelect.rec_ref === "receipt"
                        ? itemDetail.receipt_no
                        : itemDetail.reference_no
                    }
                    selectHandler={SelectHandler}
                    keyTypeOutSide={isSelect.rec_ref}
                    rowID={1}
                    selecteRef={SelectedReference}
                    selecteRec={SelectedReceipt}
                  />
                ) : (
                  <input type="text" className="field disabled" />
                )}
              </>
            )}
          </td>
        )}
        {type === "bank-credit" && (
          <td>
            {" "}
            <TextNumberDisplay
              value={itemDetail.rec_ref_amount}
              className="withPeso"
            />
          </td>
        )}
        <td>
          {type === "bank-credit" ? (
            <div className="item w-[100px]">
              <div className="finance_status">
                <div
                  className={`status ${
                    itemDetail.status === "Pending"
                      ? "PendingDC"
                      : itemDetail.status
                  }`}
                >
                  <div>
                    {itemDetail.status === "Pending" && (
                      <Image
                        src="/Images/f_pending.png"
                        width={15}
                        height={15}
                        alt="Pending"
                      />
                    )}
                    {itemDetail.status === "Posted" && (
                      <Image
                        src="/Images/f_posted.png"
                        width={25}
                        height={25}
                        alt="Posted"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <InputNumberForTable
              onChange={() => {}}
              value={remainingVariance}
              className={"field disabled w-full text-end"}
              type={""}
            />
          )}
        </td>

        {type !== "bank-credit" && (
          <td className="actionIcon">
            {itemDetail?.variance !== 0 &&
              itemDetail?.childrenBC?.length <= 0 &&
              Permission_modify && (
                <div
                  className={`ml-5 1024px:ml-2 ${
                    (remainingVariance === undefined ||
                      remainingVariance <= 0 ||
                      isNaN(remainingVariance)) &&
                    "pointer-events-none opacity-[.5]"
                  }`}
                  onClick={() => AddHandler(itemDetail?.id)}
                >
                  <PlusButtonTable />
                </div>
              )}
          </td>
        )}
      </tr>

      {itemDetail.childrenBC.map((itemChildren, index) => (
        <ChildList
          key={index}
          itemChildren={itemChildren}
          SelectHandlerChildDD={SelectHandlerChildDD}
          itemDetail={itemDetail}
          type={type}
          index={index}
          DeleteHandler={DeleteHandler}
          AddHandler={AddHandler}
          DeleteHandlerChildren={DeleteHandlerChildren}
          SelectedReceipt={SelectedReference}
          SelectedReference={SelectedReceipt}
        />
      ))}
    </>
  );
};

type ChildList = {
  itemChildren: childType;
  SelectHandlerChildDD: (e: any) => void;
  itemDetail: isTableItemObjBC;
  type: string;
  index: number;
  DeleteHandler: (id: string | number) => void;
  AddHandler: (id: string | number) => void;
  DeleteHandlerChildren: (
    parentID: string | number,
    selectedID: string | number
  ) => void;
  SelectedReceipt: string[];
  SelectedReference: string[];
};

const ChildList = ({
  itemChildren,
  SelectHandlerChildDD,
  itemDetail,
  DeleteHandlerChildren,
  AddHandler,
  type,
  index,
  SelectedReceipt,
  SelectedReference,
}: ChildList) => {
  const [isSelect, setSelect] = useState({
    toggle: false,
    rec_ref: "",
  });

  const SelectField = (value: string) => {
    setSelect({
      rec_ref: value,
      toggle: false,
    });
  };

  return (
    <tr
      className={`${itemDetail.childrenBC.length - 1 !== index && "noBorder"}`}
    >
      <td colSpan={type === "bank-credit" ? 6 : 4}></td>
      {type === "bank-credit" && (
        <td>
          {itemChildren.receipt_no
            ? itemChildren.receipt_no
            : itemChildren.reference_no}
        </td>
      )}
      <td>
        {type === "bank-credit" && (
          <TextNumberDisplay value={itemChildren.amount} className="withPeso" />
        )}
      </td>
      {type !== "bank-credit" && (
        <>
          <td className="maxlarge">
            {isSelect.rec_ref === "" ? (
              <div className="select">
                <span>
                  <MdOutlineKeyboardArrowDown />
                </span>
                <DynamicPopOver
                  toRef={
                    <input
                      type="text"
                      autoComplete="off"
                      className="field w-full"
                      readOnly
                      value={
                        itemChildren.receipt_no
                          ? itemChildren.receipt_no
                          : itemChildren.reference_no
                          ? itemChildren.reference_no
                          : ""
                      }
                      onClick={() =>
                        setSelect({
                          ...isSelect,
                          toggle: !isSelect.toggle,
                        })
                      }
                    />
                  }
                  samewidth={true}
                  toPop={
                    <>
                      {isSelect.toggle && (
                        <ul>
                          <li
                            onClick={() =>
                              setSelect({
                                rec_ref: "receipt",
                                toggle: false,
                              })
                            }
                          >
                            Receipt No.
                          </li>
                          <li
                            onClick={() =>
                              setSelect({
                                rec_ref: "reference",
                                toggle: false,
                              })
                            }
                          >
                            Reference No.
                          </li>
                        </ul>
                      )}
                    </>
                  }
                  className=""
                />
              </div>
            ) : (
              <DropdownReceipt_Reference
                setSelectField={SelectField}
                name="index"
                value={
                  isSelect.rec_ref.replace("-first", "") === "receipt"
                    ? itemChildren.receipt_no
                    : itemChildren.reference_no
                }
                selectHandler={SelectHandlerChildDD}
                keyTypeOutSide={isSelect.rec_ref}
                rowID={itemChildren.id}
                selecteRef={SelectedReference}
                selecteRec={SelectedReceipt}
              />
            )}
          </td>
          <td>
            <InputNumberForTable
              onChange={() => {}}
              value={itemChildren.variance}
              className={"field disabled w-full text-end"}
              type={""}
            />
          </td>
          <td className="actionIcon">
            <div
              onClick={() =>
                DeleteHandlerChildren(itemDetail.id, itemChildren.id)
              }
            >
              <MinusButtonTable />
            </div>

            {itemDetail.variance !== 0 &&
              itemDetail.childrenBC.length - 1 === index && (
                <div
                  className={`ml-5 1024px:ml-2 ${
                    Number(itemChildren.variance) <= 0 &&
                    "pointer-events-none opacity-[.5]"
                  }`}
                >
                  <div onClick={() => AddHandler(itemDetail.id)}>
                    <PlusButtonTable />
                  </div>
                </div>
              )}
          </td>
        </>
      )}
    </tr>
  );
};
