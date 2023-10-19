import React, { useContext, useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { ScaleLoader } from "react-spinners";

import AppContext from "../../../../Context/AppContext";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";
import {
  InputNumberForForm,
  InputNumberForTable,
} from "../../../../Reusable/NumberFormat";
import PeriodCalendar from "../../../../Reusable/PeriodCalendar";
import {
  CreateRecordMeter,
  GetRecordMeterByProperty,
  UpdateRecordMeter,
} from "./Query";

export type isTableForm = {
  id?: number;
  property: string;
  property_unit_id: number;
  previous_reading: number;
  current_reading: number;
  consumption: number;
  modifiable: boolean;
  previousReadingModifiable?: boolean;
};

type Props = {
  formActive: boolean[];
  setFormActive: Function;
  toggle: Function;
  DefaultValue: DefaultValuePropertyReadingForm;
  setDefaultValue: Function;
};

export type DefaultValuePropertyReadingForm = {
  reading_id: number;
  charge: {
    rate: number;
    charge: string;
    id: string | number;
  };
  period: {
    from: string;
    to: string;
  };
  properties: isTableForm[];
};

export default function ReadingPropertyForm({
  formActive,
  setFormActive,
  toggle,
  DefaultValue,
  setDefaultValue,
}: Props) {
  const router = useRouter();

  const { setPrompt } = useContext(AppContext);

  const [periodProperty, setPeriodProperty] = useState({
    from: "",
    to: "",
  });

  const [ValidateModify, setValidateModify] = useState(true);

  const { data, isLoading, isError } = GetRecordMeterByProperty(
    DefaultValue.reading_id,
    DefaultValue.properties.map((item) => item.property_unit_id)
  );

  useEffect(() => {
    const clone = DefaultValue.properties.map((item) => {
      if (
        data?.data?.records.some(
          (some: any) => some.property_unit_id === item.property_unit_id
        )
      ) {
        const filterClone = data?.data?.records.filter(
          (filter: any) => filter.property_unit_id === item.property_unit_id
        );
        return {
          ...item,
          previous_reading: filterClone[0]?.current_reading,
          previousReadingModifiable: false,
        };
      }
      return {
        ...item,
        previousReadingModifiable: true,
      };
    });
    setDefaultValue({
      ...DefaultValue,
      properties: clone,
    });
  }, [data?.data]);

  useEffect(() => {
    if (router.query.modify !== undefined) {
      DefaultValue.properties.map((item) => {
        if (item.modifiable === false) {
          setValidateModify(false);
        }
      });
    }
  }, [DefaultValue]);

  useEffect(() => {
    setPeriodProperty({
      from: DefaultValue.period.from,
      to: DefaultValue.period.to,
    });
  }, [DefaultValue.period]);

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries(["record-meter-list"]);
    queryClient.invalidateQueries(["reading-show", `${router.query.modify}`]);

    setPrompt({
      message: `Reading successfully ${
        router.query.modify === undefined ? "registered" : "updated"
      }!`,
      type: "success",
      toggle: true,
    });
    toggle(false);
    if (router.query.modify !== undefined) {
      router.push("");
    }
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };

  const { isLoading: createloading, mutate: createMutate } = CreateRecordMeter(
    onSuccess,
    onError
  );

  const { isLoading: updateloading, mutate: updateMutate } = UpdateRecordMeter(
    onSuccess,
    onError,
    router.query.modify
  );

  const SaveHandler = () => {
    let validate = true;
    if (
      DefaultValue.charge.id === "" ||
      isNaN(DefaultValue.charge.rate) ||
      periodProperty.from === "" ||
      periodProperty.to === ""
    ) {
      setPrompt({
        message: "Fill out all field",
        type: "draft",
        toggle: true,
      });
      return;
    }

    DefaultValue.properties.map((item) => {
      if (item.current_reading <= 0) {
        setPrompt({
          message: "Fill out Current Reading",
          type: "draft",
          toggle: true,
        });
        validate = false;
        return;
      }
    });

    if (!validate) return;

    const dateFrom = parse(periodProperty.from, "MMM dd yyyy", new Date());
    const dateTo = parse(periodProperty.to, "MMM dd yyyy", new Date());
    const Payload = {
      billing_readings_name_id: DefaultValue.reading_id,
      rate: DefaultValue.charge.rate,
      charge_id: DefaultValue.charge.id,
      period_from: isValid(dateFrom) ? format(dateFrom, "yyyy-MM-dd") : "",
      period_to: isValid(dateTo) ? format(dateTo, "yyyy-MM-dd") : "",
      readings: DefaultValue.properties.map((item) => {
        return {
          id: item.id,
          property_unit_id: item.property_unit_id,
          previous_reading: item.previous_reading,
          current_reading: item.current_reading,
          consumption: item.consumption,
        };
      }),
    };
    if (router.query.modify === undefined) {
      createMutate(Payload);
    } else {
      updateMutate(Payload);
    }
  };

  return (
    <div className={formActive[1] ? "" : "hidden"}>
      <h3 className="mb-5 text-ThemeRed">
        {router.query.modify !== undefined ? "Edit" : "New"} Reading
      </h3>
      <button
        className="buttonRed mb-5"
        onClick={() => {
          setFormActive([true, false]);
        }}
      >
        PROPERTY
      </button>
      <ul className="flex flex-wrap mb-5">
        <li className=" flex items-center mr-5 mb-5 1024px:mb-2">
          <p className=" labelField">CHARGE:</p>
          <input
            type="text"
            readOnly
            value={DefaultValue.charge.charge}
            className="field disabled min-w-[150px]"
          />
        </li>
        <li className=" flex items-center mr-5 mb-5 1024px:mb-2">
          <p className=" labelField">RATE:</p>
          <InputNumberForForm
            noPeso={true}
            className={`field number ${!ValidateModify && "disabled"}`}
            isValue={DefaultValue.charge.rate}
            setValue={(key, value) => {
              setDefaultValue({
                ...DefaultValue,
                charge: {
                  ...DefaultValue.charge,
                  rate: value,
                },
              });
            }}
            keyField={""}
          />
        </li>
        <li className=" flex items-center mb-5 1024px:mb-2">
          <PeriodCalendar
            disabled={router.query.modify === undefined ? false : true}
            value={periodProperty}
            setValue={setPeriodProperty}
          />
        </li>
      </ul>
      <div className="w-full overflow-auto max-h-[50vh]">
        <table className="table_list forCrud miniTable">
          <thead className="textRed">
            <tr>
              <th>PROPERTY</th>
              <th>PREVIOUS READING</th>
              <th>CURRENT READING</th>
              <th>CONSUMPTION</th>
            </tr>
          </thead>
          <tbody>
            {DefaultValue.properties.map((item, index) => (
              <List
                itemDetail={item}
                DefaultValue={DefaultValue}
                setDefaultValue={setDefaultValue}
                key={index}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end py-5 mt-10">
        <button
          className="button_cancel"
          onClick={() => {
            toggle(false);
            router.push("");
          }}
        >
          CANCEL
        </button>
        <button className="buttonRed" onClick={SaveHandler}>
          {updateloading || createloading ? (
            <ScaleLoader color="#fff" height="10px" width="2px" />
          ) : (
            "SAVE"
          )}
        </button>
      </div>
    </div>
  );
}

type ListProps = {
  itemDetail: isTableForm;
  DefaultValue: DefaultValuePropertyReadingForm;
  setDefaultValue: Function;
};

const List = ({ itemDetail, DefaultValue, setDefaultValue }: ListProps) => {
  const updateValue = (key: string, value: string | number) => {
    const newItems = DefaultValue.properties.map((item: any) => {
      if (itemDetail.property_unit_id == item.property_unit_id) {
        if (key === "previous_reading") {
          return {
            ...item,
            previous_reading: Number(value),
          };
        }
        if (key === "current_reading") {
          return {
            ...item,
            current_reading: Number(value),
          };
        }
        if (key === "consumption") {
          return {
            ...item,
            consumption: Number(value) <= 0 ? 0 : Number(value),
          };
        }
      }
      return item;
    });
    setDefaultValue({
      ...DefaultValue,
      properties: newItems,
    });
  };

  useEffect(() => {
    const consumption =
      Number(itemDetail.current_reading) - Number(itemDetail.previous_reading);

    updateValue("consumption", consumption);
  }, [itemDetail.previous_reading, itemDetail.current_reading]);

  return (
    <tr>
      <td>
        <input
          type="text"
          value={itemDetail.property}
          readOnly
          className="field disabled w-full"
        />
      </td>
      <td>
        <InputNumberForTable
          className={`field number ${!itemDetail.modifiable && "disabled"} ${
            !itemDetail.previousReadingModifiable && "disabled"
          }`}
          value={itemDetail.previous_reading}
          onChange={updateValue}
          type={"previous_reading"}
        />
      </td>
      <td>
        <InputNumberForTable
          className={`field number ${!itemDetail.modifiable && "disabled"}`}
          value={itemDetail.current_reading}
          onChange={updateValue}
          type={"current_reading"}
        />
      </td>
      <td>
        <InputNumberForTable
          className={"field number disabled"}
          value={itemDetail.consumption}
          onChange={updateValue}
          type={""}
        />
      </td>
    </tr>
  );
};
