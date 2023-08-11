import React from "react";
import { useForm, Controller } from "react-hook-form";

import { NumericFormat } from "react-number-format";

import ModalTemp from "../../Reusable/ModalTemp";
import SelectDropdown from "../../Reusable/SelectDropdown";
import { subscriber } from "./SuperAdminDashboard";

type Props = {
  onClose: () => void;
  formData: subscriber;
};

export default function SubscriberForm({ onClose, formData }: Props) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<subscriber>({
    defaultValues: formData,
  });

  const id = formData?.id;

  const onSubmit = (data: subscriber) => {
    console.log(data);
  };

  return (
    <ModalTemp>
      <h1 className=" text-lg mb-5">{id ? "Edit" : "Add"} Subscriber</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="grid grid-cols-3 gap-3 w-full">
          <li>
            <p className=" text-ThemeRed text-[12px] font-semibold">ID</p>
            <Controller
              name="id"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <input type="text" {...field} className="field" />
              )}
            />
            <span className=" text-[12px]">
              {errors.id && errors.id.message}
            </span>
          </li>
          <li>
            <p className=" text-ThemeRed text-[12px] font-semibold">NAME</p>
            <Controller
              name="name"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <input type="text" {...field} className="field" />
              )}
            />
            <span className=" text-[12px]">
              {errors.name && errors.name.message}
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
                <input type="text" {...field} className="field" />
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
                <input type="text" {...field} className="field" />
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
          <button type="submit" className="buttonRed">
            NEXT
          </button>
        </div>
      </form>
    </ModalTemp>
  );
}
