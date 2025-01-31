import React, { useRef, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { RiArrowDownSFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";

import style from "../../../../styles/Popup_Modal.module.scss";
import AppContext from "../../../Context/AppContext";
import {
  GetUnitCodeDropdown,
  UpdateProperties,
} from "../../../ReactQuery/CustomerMethod";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";

type ModifyRolesPermission = {
  setToggle: Function;
  isProperty: CustomerUnitCodes[];
  setProperty: Function;
  classType: string;
  CreateHandler: (button: string) => void;
  MutateLoadingDraft?: boolean;
  MutateLoadingCreate?: boolean;
};

export type CustomerUnitCodes = {
  id: number | string;
  unit_code: string;
  name: string;
};

export default function CustomerUnitCodeForm({
  setToggle,
  isProperty,
  setProperty,
  classType,
  MutateLoadingDraft,
  MutateLoadingCreate,
  CreateHandler,
}: ModifyRolesPermission) {
  const queryClient = useQueryClient();

  const { setPrompt } = useContext(AppContext);
  let buttonClick = "";
  const router = useRouter();
  const id = router.query.id;

  const onError = (res: any) => {
    ErrorSubmit(res, setPrompt);
  };

  const OnSuccess = () => {
    setPrompt({
      message: "Property Successfully updated!",
      type: "success",
      toggle: true,
    });
    if (buttonClick === "save") {
      queryClient.invalidateQueries(["get-customer-detail", `${id}`]);
      setToggle(false);
    }
    if (buttonClick === "saveNew") {
      router.push("/admin/customer?new");
    }
    queryClient.invalidateQueries("get-unitcode");
  };

  // MUTATION START HERE
  const { mutate: UpdateProperty, isLoading: LoadingProperty } =
    UpdateProperties(id, OnSuccess, onError);
  const [isSave, setSave] = useState(false);

  // Modify Property
  const mutateHandler = () => {
    const ArrayPropertyID = isProperty?.map((item: any) => {
      return item.unit_code;
    });

    const stringify = JSON.stringify(ArrayPropertyID);
    const Payload = {
      unit_codes: stringify,
      _method: "PUT",
    };
    UpdateProperty(Payload);
  };
  const save = () => {
    buttonClick = "save";
    if (router.query.id !== undefined) {
      mutateHandler();
    } else {
      CreateHandler("save");
    }
  };

  const saveNew = () => {
    buttonClick = "saveNew";
    if (router.query.id !== undefined) {
      mutateHandler();
    } else {
      CreateHandler("new");
    }
  };

  const Draft = () => {
    CreateHandler("draft");
  };

  useEffect(() => {
    if (isProperty?.length <= 0) {
      setProperty([
        {
          id: 1,
          unit_code: "",
          name: "",
        },
      ]);
    }
  }, [isProperty]);

  return (
    <>
      <table className="w-full mb-20">
        <thead>
          <tr>
            <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
              UNIT CODE
            </th>
            <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
              PROJECT
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isProperty?.map((item, index) => (
            <List
              detail={item}
              setProperty={setProperty}
              key={index}
              isProperty={isProperty}
              id={index}
              classType={classType}
            />
          ))}
        </tbody>
      </table>
      <div className={style.SaveButton}>
        <button
          className={style.back}
          onClick={() => {
            router.query.id !== undefined
              ? setToggle(false)
              : setToggle("contact-information");
          }}
        >
          {router.query.id !== undefined ? "Cancel" : "Back"}
        </button>

        <div className={style.Save}>
          <div>
            <button
              type="submit"
              name="save"
              onClick={save}
              className={style.save_button}
            >
              {router.query.id === undefined ? (
                <>
                  {MutateLoadingDraft || MutateLoadingCreate ? (
                    <ScaleLoader color="#fff" height="10px" width="2px" />
                  ) : (
                    "SAVE"
                  )}
                </>
              ) : (
                <>
                  {LoadingProperty ? (
                    <ScaleLoader color="#fff" height="10px" width="2px" />
                  ) : (
                    "SAVE"
                  )}
                </>
              )}
            </button>
            <aside className={style.Arrow}>
              <RiArrowDownSFill onClick={() => setSave(!isSave)} />
            </aside>
          </div>
          {isSave && (
            <ul>
              {router.query.draft === undefined &&
                router.query.id === undefined && (
                  <li>
                    <button type="submit" onClick={Draft}>
                      SAVE AS DRAFT
                    </button>
                  </li>
                )}
              <li>
                <button type="submit" onClick={saveNew}>
                  SAVE & NEW
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
type List = {
  detail: any;
  setProperty: Function;
  isProperty: {}[];
  id: number;
  classType: string;
};
const List = ({ detail, setProperty, isProperty, id, classType }: List) => {
  const newID = Math.random();
  const [isSelect, setSelect] = useState(false);
  const { setPrompt } = useContext(AppContext);

  const menuRef = useRef<any>();

  const [searchUnitCode, setSearchUnitCode] = useState(detail?.unit_code);

  useEffect(() => {
    setSearchUnitCode(detail?.unit_code);
  }, [detail?.unit_code]);

  const updateValue = (event: any) => {
    const unit_code = event.target.innerHTML;
    let validate = true;
    isProperty?.map((item: any) => {
      if (item.unit_code === unit_code) {
        setPrompt({
          message: "Selected Unit Code already in the list!",
          type: "error",
          toggle: true,
        });
        validate = false;
        return;
      }
    });
    if (validate === true) {
      const newItems = isProperty?.map((item: any) => {
        if (detail.id == item.id) {
          return {
            ...item,
            name: event.target.getAttribute("data-projname"),
            unit_code: unit_code,
          };
        }
        return item;
      });
      setSearchUnitCode(unit_code);
      setProperty(newItems);
      setSelect(false);
    }
  };

  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        setSelect(false);
        setSearchUnitCode(detail.unit_code);
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  return (
    <tr>
      <td className=" pr-2 ">
        <div className=" relative w-full" ref={menuRef}>
          <input
            type="text"
            value={searchUnitCode}
            onChange={(e) => setSearchUnitCode(e.target.value)}
            className="field w-full"
            onFocus={() => setSelect(true)}
          />
          {isSelect && (
            <div className=" absolute top-full left-0 w-full bg-white z-[999]">
              <Select
                setSelect={setSelect}
                updateValue={updateValue}
                classType={classType}
                searchUnitCode={searchUnitCode}
                setSearchUnitCode={setSearchUnitCode}
                detail={detail}
              />
            </div>
          )}
        </div>
      </td>
      <td className="pr-2">
        <input
          type="text"
          className="field disabled w-full"
          value={detail.name}
          readOnly
        />
      </td>
      <td className=" flex justify-center">
        <div className="flex justify-between w-10">
          <button
            className=" text-[32px] text-ThemeRed mr-2"
            onClick={() =>
              setProperty((item: any[]) =>
                item.filter((x: { id: any }) => x.id !== detail.id)
              )
            }
          >
            -
          </button>

          {isProperty?.length - 1 === id && (
            <button
              className=" text-[32px] text-ThemeRed"
              onClick={() =>
                setProperty((item: any) => [
                  ...item,
                  {
                    id: newID,
                    unit_code: "",
                    name: "",
                  },
                ])
              }
            >
              +
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const Select = ({
  setSelect,
  updateValue,
  classType,
  searchUnitCode,
  setSearchUnitCode,
  detail,
}: any) => {
  // Reset show item when open
  const [showItemAll, setshowItemAll] = useState(true);
  const keywordSearch = showItemAll ? "" : searchUnitCode;
  useEffect(() => {
    if (detail.unit_code !== searchUnitCode) {
      setshowItemAll(false);
    }
  }, [searchUnitCode]);
  // end

  // Get unit codes to display
  const { isLoading, data, isError } = GetUnitCodeDropdown(
    classType,
    keywordSearch
  );

  const removeDraft = data?.data.filter(
    (fitlerItem: any) => fitlerItem.status !== "Draft"
  );

  return (
    <ul className="dropdown-list">
      {isLoading && (
        <li className="flex justify-center">
          <ScaleLoader color="#8f384d" height="10px" width="2px" />
        </li>
      )}
      {isError && (
        <li className="flex justify-center ">
          <h1>Something went wrong!</h1>
        </li>
      )}
      {removeDraft?.length <= 0 && (
        <li className="flex justify-center ">
          <h1>
            No Available Unit Code{" "}
            {classType === "" || classType === "Tenant"
              ? ""
              : "for " + classType}
          </h1>
        </li>
      )}
      {removeDraft?.map((item: any, index: number) => (
        <li
          key={index}
          data-projname={item?.project?.name}
          onClick={updateValue}
          className="cursor-pointer"
        >
          {item?.unit_code}
        </li>
      ))}
    </ul>
  );
};
