import React, { useRef, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { RiArrowDownSFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";

import style from "../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import AppContext from "../../Context/AppContext";
import { UpdateProperties } from "../../ReactQuery/CustomerMethod";
import { GetUnitCode } from "../../ReactQuery/CustomerMethod";
import DynamicPopOver from "../../Reusable/DynamicPopOver";
import CustomerUnitCodeForm, {
  CustomerUnitCodes,
} from "./CustomerForm/CustomerUnitCodeForm";

type ModifyRolesPermission = {
  setToggle: Function;
  properties: any;
  classType: string;
};

export default function ModifyProperty({
  setToggle,
  properties,
  classType,
}: ModifyRolesPermission) {
  const [isProperty, setProperty] = useState<CustomerUnitCodes[]>([
    {
      id: 1,
      unit_code: "",
      name: "",
    },
  ]);

  useEffect(() => {
    if (properties.length !== 0) {
      const existedProperties: CustomerUnitCodes[] = properties.map(
        (item: any) => {
          return {
            id: item?.id,
            unit_code: item?.unit_code,
            name: item?.project?.name,
          };
        }
      );
      setProperty(existedProperties);
    }
  }, [properties]);

  return (
    <div className={style.container}>
      <section className=" p-10 bg-[#e2e3e4ef] rounded-lg w-[90%] max-w-[700px] text-ThemeRed shadow-lg">
        <p className=" text-[16px] mb-3">Modify Customer</p>

        <motion.div
          variants={ModalSideFade}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h1 className=" w-full text-[24px] mb-3">Property Information</h1>

          <CustomerUnitCodeForm
            setToggle={setToggle}
            isProperty={isProperty}
            setProperty={setProperty}
            classType={classType}
            CreateHandler={() => {}}
          />
        </motion.div>
      </section>
    </div>
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

  const [searchUnitCode, setSearchUnitCode] = useState("");

  const updateValue = (event: any) => {
    const unit_code = event.target.innerHTML;
    let validate = true;
    isProperty.map((item: any) => {
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
      const newItems = isProperty.map((item: any) => {
        if (detail.id == item.id) {
          return {
            ...item,
            project: event.target.getAttribute("data-projname"),
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

  return (
    <tr>
      <td className=" pr-2 ">
        <div className=" relative w-full">
          <DynamicPopOver
            samewidth={true}
            toRef={
              <input
                type="text"
                value={searchUnitCode}
                onChange={(e) => setSearchUnitCode(e.target.value)}
                className="field w-full"
                onFocus={() => setSelect(true)}
              />
            }
            toPop={
              <>
                {isSelect && (
                  <Select
                    setSelect={setSelect}
                    updateValue={updateValue}
                    classType={classType}
                    searchUnitCode={searchUnitCode}
                    setSearchUnitCode={setSearchUnitCode}
                    detail={detail}
                  />
                )}
              </>
            }
            className={""}
          />
        </div>
      </td>
      <td className="pr-2">
        <input
          type="text"
          className="field w-full disabled"
          value={detail.project}
          readOnly
        />
      </td>
      <td className=" flex justify-center">
        <div className="flex justify-between w-10">
          {isProperty.length > 1 && (
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
          )}
          {isProperty.length - 1 === id && (
            <button
              className=" text-[32px] text-ThemeRed"
              onClick={() =>
                setProperty((item: any) => [
                  ...item,
                  {
                    id: newID,
                    unit_code: "",
                    project: "",
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
  const Menu = useRef<any>();

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
  const { isLoading, data, isError } = GetUnitCode(classType);

  useEffect(() => {
    const clickOutSide = (e: any) => {
      if (!Menu.current.contains(e.target)) {
        setSelect(false);
        setSearchUnitCode("");
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  return (
    <ul ref={Menu} className="dropdown-list">
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
      {data?.data.length <= 0 && (
        <li className="flex justify-center ">
          <h1>No Available Unit Code for {classType}</h1>
        </li>
      )}
      {data?.data.map((item: any, index: number) => (
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
