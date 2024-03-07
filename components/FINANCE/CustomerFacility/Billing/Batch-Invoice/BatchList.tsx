import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { BarLoader, MoonLoader, ScaleLoader } from "react-spinners";

import AppContext from "../../../../Context/AppContext";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";
import {
  MinusButtonTable,
  PencilButtonTable,
} from "../../../../Reusable/Icons";
import Pagination from "../../../../Reusable/Pagination";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import {
  DeleteBatchInvoice,
  GetBatchInvoiceList,
  UpdateBatchInvoice,
} from "./Query";

type isTable = {
  itemArray: BatchInvoiceDetail[];
  selectAll: boolean;
};
export type BatchInvoiceDetail = {
  id: number;
  batch_no: string;
  charge: {
    name: string;
    id: number;
  };
  description: string;
  billing_groups: {
    id: number;
    name: string;
  }[];
  select: boolean;
  modifiable: boolean;
};

export default function BatchList() {
  const { setPrompt } = useContext(AppContext);
  const [TablePage, setTablePage] = useState(1);
  const [isSelectedIDs, setSelectedIDs] = useState<number[]>([]);
  const router = useRouter();

  const [isTableItem, setTableItem] = useState<isTable>({
    itemArray: [],
    selectAll: false,
  });

  // select all checkbox
  useEffect(() => {
    if (
      isTableItem.itemArray.length === isSelectedIDs.length &&
      isTableItem.itemArray.length > 0
    ) {
      setTableItem({
        ...isTableItem,
        selectAll: true,
      });
    } else {
      setTableItem({
        ...isTableItem,
        selectAll: false,
      });
    }
  }, [isSelectedIDs]);

  const selectAll = () => {
    if (isTableItem.selectAll) {
      // get ids need to remove
      const toRemove = isTableItem.itemArray.map((mapItem) => {
        return mapItem.id;
      });
      // remove those ids from selectedIDS
      const remove = isSelectedIDs.filter((filter) => {
        return !toRemove.includes(filter);
      });
      setSelectedIDs(remove);
    } else {
      // get those ids that not in the selectedIDS
      const cloneToUpdateValue = isTableItem.itemArray.filter(
        (item) => !isSelectedIDs.includes(item.id)
      );
      // convert to ids array
      const newSelectAll = cloneToUpdateValue.map((item) => {
        return item.id;
      });
      // add selectedids
      setSelectedIDs([...newSelectAll, ...isSelectedIDs]);
    }
    const newItems = isTableItem?.itemArray.map((item: any) => {
      return {
        ...item,
        select: !isTableItem.selectAll,
      };
    });
    setTableItem({
      ...isTableItem,
      itemArray: newItems,
      selectAll: !isTableItem.selectAll,
    });
  };

  const { isLoading, isError, data } = GetBatchInvoiceList(TablePage);

  useEffect(() => {
    if (data?.status === 200) {
      let selectAll = false;
      const CloneArray = data?.data.data.map((item: BatchInvoiceDetail) => {
        let select = false;
        // check if item has a id in selectedids
        if (isSelectedIDs.includes(item.id)) {
          select = true;
        }
        return {
          id: item.id,
          batch_no: item.batch_no,
          charge: {
            name: item.charge.name,
            id: item.charge.id,
          },
          description: item.description,
          billing_groups: item.billing_groups,
          select: select,
          modifiable: item.modifiable,
        };
      });
      if (
        CloneArray.length <= isSelectedIDs.length &&
        CloneArray.length !== 0
      ) {
        selectAll = true;
      }

      setTableItem({
        itemArray: CloneArray,
        selectAll: selectAll,
      });
    }
  }, [data?.data.data, isSelectedIDs]);

  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(["batch-invoice-list"]);
    setPrompt({
      message: `Batch invoice successfully applied`,
      type: "success",
      toggle: true,
    });
    router.push("/finance/customer-facility/billing/invoice-list");
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };

  const { isLoading: updateLoading, mutate } = UpdateBatchInvoice(
    onSuccess,
    onError
  );

  const UpdateHandler = () => {
    if (isSelectedIDs.length <= 0) {
      setPrompt({
        message: "Select a Batch",
        type: "draft",
        toggle: true,
      });
      return;
    }
    const Payload = {
      batch_ids: isSelectedIDs,
    };
    mutate(Payload);
  };

  return (
    <>
      <h1 className=" text-[24px] 1366px:text-[20px] mb-5 480px:mb-2">
        Batch List
      </h1>
      <div className="table_container hAuto">
        <table className="table_list">
          <thead className="textRed">
            <tr>
              {/* <th className="checkbox">
                                <div className="item">
                                    <input
                                        type="checkbox"
                                        checked={isTableItem.selectAll}
                                        onChange={selectAll}
                                    />
                                </div>
                            </th> */}
              <th className="text-start">BATCH NO</th>
              <th>CHARGE</th>
              <th>DESCRIPTION</th>
              <th>APPLICATIONS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isTableItem?.itemArray.map(
              (item: BatchInvoiceDetail, index: number) => (
                <TableList
                  key={index}
                  itemDetail={item}
                  isTableItem={isTableItem}
                  setTableItem={setTableItem}
                  setSelectedIDs={setSelectedIDs}
                  isSelectedIDs={isSelectedIDs}
                />
              )
            )}
          </tbody>
        </table>

        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
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

      <div className="mb-5"></div>
      <Pagination
        setTablePage={setTablePage}
        tablePage={TablePage}
        totalPage={data?.data.last_page}
      />
    </>
  );
}

type ListProps = {
  itemDetail: BatchInvoiceDetail;
  isTableItem: isTable;
  setTableItem: Function;
  isSelectedIDs: number[];
  setSelectedIDs: Function;
};
const TableList = ({
  itemDetail,
  isTableItem,
  setTableItem,
  isSelectedIDs,
  setSelectedIDs,
}: ListProps) => {
  const { setPrompt } = useContext(AppContext);
  const router = useRouter();
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

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries(["batch-invoice-list"]);
    setPrompt({
      message: `Batch invoice successfully deleted`,
      type: "success",
      toggle: true,
    });
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };

  const { isLoading, mutate } = DeleteBatchInvoice(onSuccess, onError);

  const groupsName = itemDetail?.billing_groups?.map((item, index) => {
    return itemDetail?.billing_groups.length - 1 === index
      ? item.name
      : item.name + ", ";
  });

  const DeleteHandler = () => {
    mutate(itemDetail.id);
  };

  return (
    <tr>
      {/* <td className="checkbox">
                <div className="item">
                    <input
                        type="checkbox"
                        onChange={(e: any) => updateValue(e)}
                        checked={itemDetail.select}
                    />
                </div>
            </td> */}
      <td className=" text-DarkBlue">{itemDetail.batch_no}</td>
      <td className=" text-DarkBlue">{itemDetail.charge.name}</td>
      <td className=" text-DarkBlue">{itemDetail.description}</td>
      <td className=" text-DarkBlue">{groupsName}</td>
      <td className="action">
        {itemDetail?.modifiable && (
          <div className="item w-full flex justify-center">
            <div onClick={DeleteHandler}>
              {isLoading ? <MoonLoader size={12} /> : <MinusButtonTable />}
            </div>

            <div
              className="ml-5 1024px:ml-2"
              onClick={() => {
                router.push(
                  `/finance/customer-facility/billing/batch-invoice?modify=${itemDetail.id}`
                );
              }}
            >
              <PencilButtonTable />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};
