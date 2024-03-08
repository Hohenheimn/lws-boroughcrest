import React, { useEffect, useState, useRef, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";
import { useQueryClient } from "react-query";
import { BarLoader, MoonLoader } from "react-spinners";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippy.js/react";


import AppContext from "../../Context/AppContext";
import {
  DeleteFloor,
  GetFloor,
  PostFloor,
  UpdateFloor,
  GetTower,
} from "../../ReactQuery/PropertyMethod";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";


type Props = {
  set: any;
  update: any;
  is: any;
  isValID: any;
  isObject: any;
  setObject: any;
  tower_id: string;
  tower_name: string;
};

const Floor = ({
  set,
  update,
  is,
  isValID,
  isObject,
  setObject,
  tower_id,
  tower_name,
}: Props) => {
  const modal = useRef<any>();
  // Click out side, remove empty array
  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!modal.current.contains(e.target)) {
        setArray((itemList: any) =>
          itemList.filter((item: any) => item.name !== "")
        );
        setObject({
          ...isObject,
          value: isObject.firstVal,
        });
        set(false);
        setWarning("");
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  const [isArray, setArray] = useState<any>([]);
  const [isWarning, setWarning] = useState("");

  const AddArray = () => {
    setArray([
      ...isArray,
      {
        id: Math.random(),
        displayId: "----",
        name: "",
        tower_id: "",
        tower: "",
      },
    ]);
  };

  const RemoveValue = () => {
    setObject({
      id: "",
      value: "",
      firstVal: "",
      firstID: "",
    });
  };

  const { isLoading, data, isError } = GetFloor(
    isObject.value === null || isObject.value === undefined
      ? ""
      : isObject.value,
    tower_id
  );

  useEffect(() => {
    if (data?.status === 200) {
      const cloneArray = data?.data.map((item: any) => {
        return {
          id: item.id,
          displayId: item.assigned_floor_id,
          name: item.name,
          tower_id: item.tower_id,
          tower: item.tower.name,
        };
      });
      setArray(cloneArray);
    }
  }, [data?.data]);

  return (
    <div className="crud-container" ref={modal}>
      <table className="crud-table wide">
        <thead>
          <tr>
            <th className="text-white">ID</th>
            <th className="text-white">NAME</th>
            <th className="text-white">TOWER</th>
            <th className="text-white">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr></tr>
          ) : (
            <>
              {isArray.map((item: any, index: number) => (
                <List
                  itemDetail={item}
                  key={index}
                  setArray={setArray}
                  isArray={isArray}
                  setWarning={setWarning}
                  set={set}
                  is={is}
                  update={update}
                  isValID={isValID}
                  tower_id={tower_id}
                  tower_name={tower_name}
                  current_id={isObject.id}
                  RemoveValue={RemoveValue}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
      {isError ||
        (data?.data.length <= 0 && (
          <div className="w-full flex justify-center py-2 text-[14px]">
            <p>No Floor found!</p>
          </div>
        ))}
      {isLoading && (
        <div className="w-full flex justify-center py-3">
          <BarLoader
            color={"#8f384d"}
            height="5px"
            width="100px"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {isWarning !== "" && (
        <p className="text-[12px] text-ThemeRed">{isWarning}</p>
      )}

      <aside className="w-full flex justify-between  ">
        <div
          onClick={AddArray}
          className="font-bold cursor-pointer text-ThemeRed text-[12px] inline-block hover:underline"
        >
          ADD FLOOR
        </div>
        <div
          onClick={RemoveValue}
          className="font-bold cursor-pointer text-ThemeRed text-[12px] inline-block hover:underline"
        >
          REMOVE
        </div>
      </aside>
    </div>
  );
};
type List = {
  itemDetail: any;
  setArray: any;
  isArray: any;
  setWarning: any;
  set: any;
  update: any;
  is: any;
  isValID: any;
  tower_id: string;
  tower_name: string;
  current_id: string | number;
  RemoveValue: () => void;
};
const List = ({
  itemDetail,
  setArray,
  isArray,
  setWarning,
  set,
  is,
  update,
  isValID,
  tower_id,
  tower_name,
  RemoveValue,
  current_id,
}: List) => {
  const [isModify, setModify] = useState(false);
  const clientQuery = useQueryClient();
  const [isProjectList, setProjectList] = useState(false);
  const { setPrompt } = useContext(AppContext);

  const [isSaving, setSaving] = useState(false);
  useEffect(() => {
    if (itemDetail.name === "") {
      setModify(true);
    }
  }, [itemDetail.name]);

  // Functions
  const ModifyArray = (event: any, type: string) => {
    const newItems = isArray.map((item: any) => {
      if (itemDetail.id == item.id) {
        if (type === "name") {
          return {
            ...item,
            name: event.target.value,
          };
        }
      }
      return item;
    });
    setArray(newItems);
  };
  const Selected = (e: any) => {
    if (itemDetail.id <= 1 || itemDetail.id === "----") {
      setPrompt({
        message: "Refetching...",
        type: "draft",
        toggle: "true",
      });
      return;
    }
    update(itemDetail.name, itemDetail.id);
    set(false);
  };
  const Edit = () => {
    setModify(!isModify);
  };
  // Second Field Dropdown Update Value base on selected item
  const updateVal = (value: any, id: any) => {
    const newItems = isArray.map((item: any) => {
      if (itemDetail.id == item.id) {
        return {
          ...item,
          tower: value,
          tower_id: id,
        };
      }
      return item;
    });
    setArray(newItems);
  };

  // Mutation
  const onSuccessSave = () => {
    setSaving(false);
    clientQuery.invalidateQueries("get-floor");
    setModify(!isModify);
    setWarning("");
    setPrompt({
      message: "Tower successfully registered!",
      type: "success",
      toggle: true,
    });
  };
  const onSuccessDelete = () => {
    setSaving(false);
    clientQuery.invalidateQueries("get-floor");

    setPrompt({
      message: "Tower successfully deleted!",
      type: "success",
      toggle: true,
    });
  };
  const onSuccessUpdate = () => {
    setSaving(false);
    clientQuery.invalidateQueries("get-floor");
    setModify(!isModify);
    setWarning("");
    setPrompt({
      message: "Tower successfully Updated!",
      type: "success",
      toggle: true,
    });
  };

  const onError = (e: any) => {
    // setArray((item: any[]) =>
    //     item.filter((x: { id: any }) => x.id !== itemDetail.id)
    // );
    ErrorSubmit(e, setPrompt);
  };

  // Save
  const { isLoading: loadingSave, mutate: mutateSave } = PostFloor(
    onSuccessSave,
    onError
  );

  // Delete
  const { isLoading: loadingDelete, mutate: mutateDelete } = DeleteFloor(
    onSuccessDelete,
    onError
  );

  // Update
  const { isLoading: loadingUpdate, mutate: mutateUpdate } = UpdateFloor(
    onSuccessUpdate,
    onError,
    itemDetail.id
  );

  const [isTower, setTower] = useState({
    value: tower_name,
    firstVal: tower_name,
    id: tower_id,
    firstID: tower_id,
  });

  const Save = () => {
    // prevent here the function if field is empty
    if (itemDetail.name === "" && itemDetail.tower === "") {
      setWarning("Cannot save with empty name and project field");
      return;
    }
    const Payload = {
      name: itemDetail.name,
      tower_id: isTower.id,
    };

    if (itemDetail.displayId === "----") {
      setSaving(false);
      mutateSave(Payload);
    } else {
      setSaving(false);
      mutateUpdate(Payload);
    }
  };
  const Delete = () => {
    if (itemDetail.displayId === "----") {
      // Only delete from array
      setArray((item: any[]) =>
        item.filter((x: { id: any }) => x.id !== itemDetail.id)
      );
    } else {
      if (itemDetail.id === current_id) {
        RemoveValue();
      }
      setSaving(false);
      // Delete from API
      mutateDelete(itemDetail.id);
    }
  };
  return (
    <tr
      className={`cursor-pointer ${isSaving && "bg-ThemeRed50"} container ${
        isValID === itemDetail.id ? "active" : ""
      }`}
    >
      <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
        <p>{itemDetail.displayId}</p>
      </td>
      <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
        <input
          type="text"
          className={`${!isModify && "disabled"}`}
          value={itemDetail.name}
          onChange={(e) => ModifyArray(e, "name")}
        />
      </td>
      <td onClick={(e) => !isModify && Selected(e)} className="bg-hover">
        <input type="text" className={`disabled`} value={isTower.value} />
      </td>
      <td className="action">
        <div>
          {loadingSave || loadingUpdate ? (
            <div className="icon">
              <MoonLoader size={10} color="#8f384d" />
            </div>
          ) : (
            <>
              {isModify ? (
                <Tippy content={"Save"} theme="ThemeRed">
                  <div>
                    <MdSaveAlt className="icon" onClick={Save} />
                  </div>
                </Tippy>
              ) : (
                <Tippy content={"Edit"} theme="ThemeRed">
                  <div>
                    <BiEdit className="icon" onClick={Edit} />
                  </div>
                </Tippy>
              )}
            </>
          )}
          {loadingDelete ? (
            <div className="icon">
              <MoonLoader size={10} color="#8f384d" />
            </div>
          ) : (
            <Tippy content={"Delete"} theme="ThemeRed">
              <div>
                <MdDeleteOutline className="icon" onClick={Delete} />
              </div>
            </Tippy>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Floor;

type ListDropdown = {
  set: any;
  updateVal: any;
  isTower: {
    value: string;
    firstVal: string;
    firstID: string;
  };
  setTower: Function;
};

const ListDropdown = ({ set, updateVal, isTower, setTower }: ListDropdown) => {
  const { data, isLoading, isError } = GetTower(isTower.value, "");

  const modal = useRef<any>();

  const reset = () => {
    set(false);
    setTower({
      ...isTower,
      value: isTower.firstVal,
      id: isTower.firstID,
    });
  };

  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!modal.current.contains(e.target)) {
        reset();
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  const select = (e: any) => {
    const id = e.target.getAttribute("data-id");
    const value = e.target.innerHTML;
    updateVal(value, id);
    setTower({
      value: value,
      firstVal: value,
      id: id,
      firstID: id,
    });
    set(false);
  };

  if (isLoading) {
    return (
      <ul ref={modal} className="w-full flex justify-center py-3">
        <BarLoader
          color={"#8f384d"}
          height="5px"
          width="100px"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </ul>
    );
  }

  return (
    <ul ref={modal} className="dropdown-list">
      {data?.data.map((item: any, index: number) => (
        <li data-id={item.id} key={index} onClick={select}>
          {item.name}
        </li>
      ))}
      {isError || (data?.data.length <= 0 && <li>No FLOOR found!</li>)}
    </ul>
  );
};
