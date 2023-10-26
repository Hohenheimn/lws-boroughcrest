import React, { useContext, useEffect, useState } from "react";

import AppContext from "../../../../components/Context/AppContext";
import BankCredit, {
  isTableBankCredit,
  isTableItemObjBC,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/BankCreditComp";
import { SaveTagging } from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Query";
import Receiptsbook, {
  isReceiptBookData,
  isTableItemObjRB,
} from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Receiptsbook";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

type Payload = {
  id: number;
  type_of_id: string;
  tag_ids: number[];
};

export default function DepositCounter() {
  // use to trigger refresh of table of bank credit and receipt book
  const [isTriggerRefresh, setTriggerRefresh] = useState(false);

  const { setPrompt } = useContext(AppContext);

  const [changeData, setChangeData] = useState({
    dataThatChangeID: "",
    fromWhere: "",
    parentID: "",
    childreID: "",
  });

  const [ReceiptBookData, setReceiptBookData] = useState<isReceiptBookData>({
    selectAll: false,
    itemArray: [],
  });

  const [isBankCredit, setBankCredit] = useState<isTableBankCredit>({
    itemArray: [],
    selectAll: false,
  });

  // Compute Pairing of Receipt Book and Bank Credit
  useEffect(() => {
    if (changeData.dataThatChangeID === "") return;
    // // Receipt book's Index to Bank Credit
    if (changeData.fromWhere === "receipt book") {
      const cloneReceiptBook = ReceiptBookData.itemArray.map(
        (parentitem: isTableItemObjRB) => {
          if (Number(changeData.parentID) === Number(parentitem?.id)) {
            let variance =
              Number(parentitem?.deposit_amount) -
              Number(parentitem?.indexAmount);
            const children = parentitem?.childrenRB?.map((item) => {
              variance = Number(variance) - Number(item?.amount);
              return {
                ...item,
                variance: variance,
              };
            });
            return { ...parentitem, childrenRB: children };
          }
          return parentitem;
        }
      );
      setReceiptBookData({
        selectAll: false,
        itemArray: cloneReceiptBook,
      });
      setChangeData({
        dataThatChangeID: "",
        fromWhere: "",
        parentID: "",
        childreID: "",
      });
    }
    // Bank Credit's Reference no and receipt no to Receipt Book
    if (changeData.fromWhere === "bank credit") {
      const cloneBankCredit = isBankCredit.itemArray.map(
        (item: isTableItemObjBC) => {
          if (Number(changeData.parentID) === Number(item?.id)) {
            let variance: number =
              Number(item?.credit_amount) - Number(item?.rec_ref_amount);
            const children = item?.childrenBC?.map((item) => {
              variance = Number(variance) - Number(item?.amount);
              return {
                ...item,
                variance: variance,
              };
            });
            return { ...item, childrenBC: children };
          }
          return item;
        }
      );

      setBankCredit({
        selectAll: false,
        itemArray: cloneBankCredit,
      });

      setChangeData({
        dataThatChangeID: "",
        fromWhere: "",
        parentID: "",
        childreID: "",
      });
    }
    return;
  }, [ReceiptBookData.itemArray, isBankCredit.itemArray]);

  const onSuccess = () => {
    setPrompt({
      message: `Items successfully updated tagging!`,
      type: "success",
      toggle: true,
    });
  };
  const onError = () => {
    setPrompt({
      message: `Something is wrong!`,
      type: "error",
      toggle: true,
    });
  };

  const { mutate, isLoading } = SaveTagging(onSuccess, onError);

  const SaveHandler = () => {
    const filterReceipt = ReceiptBookData.itemArray.filter(
      (items) => items.indexID !== "" && items.indexID !== undefined
    );
    const filterBankCredit = isBankCredit.itemArray.filter(
      (items) => items.rec_ref_id !== undefined
    );
    const PayloadRB = filterReceipt.map((itemRB) => {
      const childrenID = itemRB.childrenRB.map((childItem) => {
        return childItem?.indexID;
      });
      return {
        id: itemRB.id,
        type_of_id: "receipt_book",
        tag_ids: [...childrenID, itemRB.indexID],
        variance:
          itemRB.childrenRB.length <= 0
            ? Number(itemRB.deposit_amount) - Number(itemRB.indexAmount)
            : itemRB.childrenRB[Number(itemRB.childrenRB.length) - 1].variance,
      };
    });
    const PayloadBC = filterBankCredit.map((itemBC) => {
      const childrenID = itemBC.childrenBC.map((childItem) => {
        return childItem?.receipt_id;
      });
      return {
        id: itemBC.id,
        type_of_id: "bank_credit",
        tag_ids: [...childrenID, itemBC.rec_ref_id],
        variance:
          itemBC.childrenBC.length <= 0
            ? Number(itemBC.credit_amount) - Number(itemBC.rec_ref_amount)
            : itemBC.childrenBC[Number(itemBC.childrenBC.length) - 1].variance,
      };
    });

    const Payload: any = [...PayloadRB, ...PayloadBC];

    if (Payload.some((someItem: any) => someItem.variance < 0)) {
      setPrompt({
        message: `Some of item has a invalid variance!`,
        type: "draft",
        toggle: true,
      });
      return;
    }

    if (Payload.length > 0) {
      mutate(Payload);
    } else {
      setPrompt({
        message: `No tagging happens!`,
        type: "draft",
        toggle: true,
      });
    }
  };

  const PagePermisson = PageAccessValidation("Deposit Counter");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

  return (
    <>
      <Receiptsbook
        type="unmatched"
        setChangeData={setChangeData}
        isReceiptBookData={ReceiptBookData}
        setReceiptBookData={setReceiptBookData}
        isBankCredit={isBankCredit}
        setBankCredit={setBankCredit}
        SaveHandler={SaveHandler}
        isLoadingSave={isLoading}
      />
      <div className="my-10 h-[1px] bg-gray-300 w-full"></div>
      <BankCredit
        type=""
        setChangeData={setChangeData}
        isReceiptBookData={ReceiptBookData}
        setReceiptBookData={setReceiptBookData}
        isBankCredit={isBankCredit}
        setBankCredit={setBankCredit}
      />
    </>
  );
}
``;
