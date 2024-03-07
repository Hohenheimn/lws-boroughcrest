import React, { useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";
import { useQuery, useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";

import api from "../../../util/api";
import AppContext from "../../Context/AppContext";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import ModalTemp from "../../Reusable/ModalTemp";
import Pagination from "../../Reusable/Pagination";
import TableLoadingNError from "../../Reusable/TableLoadingNError";
import { GetUser, GetUseradd } from "../user/Query";
import { UserDetail, UserList } from "../user/UserTable";
import { AddUser } from "./Query";

type isTable = {
  itemArray: userGroup[];
  role_name: string;
  selectAll: boolean;
};

export type userGroup = {
  select: boolean;
  id: number;
  name: string;
  position: string;
  department: string;
};

type Props = {
  externalDefaultValue: number[];
  setToggleUser: Function;
  roleName: string;
};

export default function AddUserForm({
  roleName,
  externalDefaultValue,
  setToggleUser,
}: Props) {
  const { setPrompt } = useContext(AppContext);

  const router = useRouter();

  const [isSearch, setSearch] = useState("");

  const [TablePage, setTablePage] = useState(1);

  const { data, isLoading, isError } = GetUseradd(isSearch, TablePage);

  const [isTableItem, setTableItem] = useState<isTable>({
    itemArray: [],
    role_name: "",
    selectAll: false,
  });

  const [isSelectedIDs, setSelectedIDs] =
    useState<number[]>(externalDefaultValue);

  useEffect(() => {
    if (!isLoading && !isError) {
      let selectAll = false;
      let CloneArray = data?.data?.data.map((item: any) => {
        let select = false;
        if (isSelectedIDs?.some((someIDs) => someIDs === item.id)) {
          select = true;
        }
        return {
          id: item.id,
          name: item.name,
          position: item.position,
          department: item.department_name,
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
        ...isTableItem,
        itemArray: CloneArray,
        selectAll: selectAll,
      });
    }
  }, [data?.data?.data, isSelectedIDs]);

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

  const queryClient = useQueryClient();

  const id = router.query.id;

  const onSuccess = () => {
    queryClient.invalidateQueries("get-roles");
    queryClient.invalidateQueries(["show-role", `${id}`]);

    let message = `User successfully added to role ${roleName}`;

    setPrompt({
      message: message,
      type: "success",
      toggle: true,
    });

    setToggleUser(false);
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };

  const { mutate, isLoading: loadingMutate } = AddUser(
    onSuccess,
    onError,
    Number(id)
  );

  const SaveHandler = () => {
    if (isSelectedIDs.length <= 0) {
      setPrompt({
        message: "Select a user!",
        type: "draft",
        toggle: true,
      });
      return;
    }
    const Payload = {
      user_ids: isSelectedIDs,
    };
    mutate(Payload);
  };

  return (
    <ModalTemp>
      <div className="pb-5 border-b border-gray-100 mb-5">
        <h3 className="mb-5 text-ThemeRed">Add User</h3>
        <div className="mb-5 flex items-center shadow-lg px-2 h-8 1550px:h-8 bg-white flex-1 max-w-[300px] 640px:max-w-[unset] rounded-lg">
          <input
            type="text"
            placeholder="Search"
            value={isSearch}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-[#545454] text-[12px] shadow-none"
            style={{ boxShadow: "none" }}
          />
          <BiSearch className="text-[16px] text-gray-400" />
        </div>
        <p className=" text-ThemeRed text-[14px] font-NHU-bold mr-3">
          ROLE NAME:
        </p>
        <p className=" text-RegularColor text-[14px]">{roleName}</p>
      </div>
      <div className="w-full overflow-auto max-h-[50vh]">
        <table className="table_list miniTable">
          <thead className="textRed">
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
              <th className="text-start">ID</th>
              <th>NAME</th>
              <th>POSITION</th>
              <th>DEPARTMENT</th>
            </tr>
          </thead>
          <tbody>
            {isTableItem?.itemArray.map((item: userGroup, index: number) => (
              <TableList
                key={index}
                itemDetail={item}
                isTableItem={isTableItem}
                setTableItem={setTableItem}
                setSelectedIDs={setSelectedIDs}
                isSelectedIDs={isSelectedIDs}
              />
            ))}
          </tbody>
        </table>
        <div className="mb-5 480px:mb-3"></div>
        <TableLoadingNError isLoading={isLoading} isError={isError} />

        <Pagination
          setTablePage={setTablePage}
          tablePage={TablePage}
          totalPage={data?.data.meta.last_page}
        />

        <div className="w-full flex items-center justify-end mt-10">
          <button
            className="button_cancel"
            onClick={() => setToggleUser(false)}
          >
            CLOSE
          </button>
          <button className="buttonRed" onClick={SaveHandler}>
            {loadingMutate ? (
              <ScaleLoader color="#fff" height="10px" width="2px" />
            ) : (
              "SAVE"
            )}
          </button>
        </div>
      </div>
    </ModalTemp>
  );
}

type ListProps = {
  itemDetail: userGroup;
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
      ...isTableItem,
      itemArray: newItems,
      selectAll: false,
    });
  };
  return (
    <tr>
      <td className="checkbox">
        <div className="item">
          <input
            type="checkbox"
            onChange={(e: any) => updateValue(e)}
            checked={itemDetail.select}
          />
        </div>
      </td>

      <td>{itemDetail.id}</td>
      <td>{itemDetail.name}</td>
      <td>{itemDetail.position}</td>
      <td>{itemDetail.department}</td>
    </tr>
  );
};
