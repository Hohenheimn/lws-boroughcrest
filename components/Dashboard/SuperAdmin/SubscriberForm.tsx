import React, { useContext, useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

import { ScaleLoader } from "react-spinners";

import AppContext from "../../Context/AppContext";
import Calendar from "../../Reusable/Calendar";
import { ErrorSubmit } from "../../Reusable/ErrorMessage";
import { NumberBlockInvalidKey } from "../../Reusable/InputField";
import ModalTemp from "../../Reusable/ModalTemp";
import SelectDropdown from "../../Reusable/SelectDropdown";
import { PostSubscriber, UpdateSubscriber } from "./Query";
import { subscriber } from "./SuperAdminDashboard";

type Props = {
  onClose: () => void;
  formData: subscriber;
};

export default function SubscriberForm({ onClose, formData }: Props) {
  const { setPrompt } = useContext(AppContext);

  const [isDate, setDate] = useState({
    value: "",
    toggle: false,
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<subscriber>({
    defaultValues: formData,
  });

  const onSuccess = () => {
    setPrompt({
      toggle: true,
      type: "success",
      message: id
        ? "Subscriber Sucessfully updated"
        : "Subscriber Sucessfully registered",
    });
    onClose();
  };

  const onError = (e: any) => {
    ErrorSubmit(e, setPrompt);
  };

  const id: any = formData?.id;

  useEffect(() => {
    const date = parse(formData.validity_duration, "yyyy-MM-dd", new Date());
    setValue(
      "validity_duration",
      isValid(date) ? format(date, "MMM dd yyyy") : ""
    );
  }, [formData]);

  const { mutate: add, isLoading: isAddLoading } = PostSubscriber(
    onSuccess,
    onError
  );

  const { mutate: update, isLoading: isAUpdateLoading } = UpdateSubscriber(
    onSuccess,
    onError,
    id
  );

  const onSubmit = (data: subscriber) => {
    const date = parse(data.validity_duration, "MMM dd yyyy", new Date());
    delete data.id;
    delete data?.corporate_admin;
    delete data?.account_usage;
    delete data?.corporate_usage;
    delete data?.subscriber_id;
    data.validity_duration = isValid(date) ? format(date, "yyyy-MM-dd") : "";
    if (id) {
      update(data);
    } else {
      add(data);
    }
  };

  return (
    <ModalTemp>
      <h1 className=" text-lg mb-5">{id ? "Edit" : "Add"} Subscriber</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="grid grid-cols-3 gap-3 w-full">
          <li>
            <p className=" text-ThemeRed text-[12px] font-semibold">NAME</p>
            <Controller
              name="name"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <input type="text" {...field} className="field w-full" />
              )}
            />
            <span className=" text-[12px]">
              {errors.name && errors.name.message}
            </span>
          </li>

          <li>
            <p className=" text-ThemeRed text-[12px] font-semibold">
              CONTACT NO.
            </p>
            <Controller
              name="contact_no"
              control={control}
              rules={{
                required: "required",
                minLength: {
                  value: 10,
                  message: "Must be 10 Numbers",
                },
                maxLength: {
                  value: 10,
                  message: "Must be 10 Number",
                },
                pattern: {
                  value: /^(9)\d{9}$/,
                  message: "Invalid Contact Number",
                },
              }}
              render={({ field }) => (
                <div className="contact_no">
                  <input
                    type="number"
                    onKeyDown={NumberBlockInvalidKey}
                    {...field}
                    className="field w-full"
                  />
                </div>
              )}
            />
            <span className=" text-[12px]">
              {errors.contact_no && errors.contact_no.message}
            </span>
          </li>

          <li>
            <p className=" text-ThemeRed text-[12px] font-semibold">EMAIL</p>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid Email",
                },
              }}
              render={({ field }) => (
                <input type="text" {...field} className="field w-full" />
              )}
            />
            <span className=" text-[12px]">
              {errors.email && errors.email.message}
            </span>
          </li>

          <li>
            <p className=" text-ThemeRed text-[12px] font-semibold">STATUS</p>
            <Controller
              name="status"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <SelectDropdown
                  selectHandler={(value: string) => {
                    setValue("status", value);
                  }}
                  className=""
                  inputElement={
                    <input
                      className="w-full field"
                      {...field}
                      readOnly
                      autoComplete="off"
                    />
                  }
                  listArray={["Active", "Inactive", "Expired"]}
                />
              )}
            />
            <span className=" text-[12px]">
              {errors.status && errors.status.message}
            </span>
          </li>

          <li>
            <p className=" text-ThemeRed text-[12px] font-semibold">VALIDITY</p>
            <Controller
              name="validity_duration"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <div className="calendar">
                  <span className="cal">
                    <Image
                      src="/Images/CalendarMini.png"
                      width={15}
                      height={15}
                      alt="calendar"
                    />
                  </span>
                  <input
                    autoComplete="off"
                    type="text"
                    readOnly
                    {...field}
                    placeholder="MMM dd yyyy"
                    onClick={() =>
                      setDate({
                        ...isDate,
                        toggle: true,
                      })
                    }
                    className="field w-full"
                  />
                  {isDate.toggle && (
                    <Calendar
                      value={isDate}
                      setValue={setDate}
                      onChange={(value) => {
                        setValue("validity_duration", value);
                      }}
                    />
                  )}
                </div>
              )}
            />
            <span className=" text-[12px]">
              {errors.validity_duration && errors.validity_duration.message}
            </span>
          </li>
        </ul>
        <div className="flex w-full justify-end items-center mt-5">
          <aside className="button_cancel" onClick={onClose}>
            CANCEL
          </aside>
          <button className="buttonRed">
            {isAddLoading || isAUpdateLoading ? (
              <ScaleLoader color="#fff" height="10px" width="2px" />
            ) : (
              "SAVE"
            )}
          </button>
        </div>
      </form>
    </ModalTemp>
  );
}
