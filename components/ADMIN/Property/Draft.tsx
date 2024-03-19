import React from "react";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";

import { BeatLoader } from "react-spinners";

import style from "../../../styles/Popup_Modal.module.scss";
import { PropertyDefaultValue } from "../../../types/PropertyList";
import { GetPropertyDetail } from "../../ReactQuery/PropertyMethod";
import PropertyForm from "./PropertyForm";

type Props = {
  isSearchTable: string;
};

export default function Draft({ isSearchTable }: Props) {
  const router = useRouter();
  const id = router.query.draft;
  const { isLoading, data: getData, isError } = GetPropertyDetail(id);
  const data = getData?.data;
  if (isLoading) {
    return (
      <div className={style.container}>
        <section>
          <p className={style.modal_title}>Draft Property</p>
          <div className="flex justify-center">
            <BeatLoader
              color={"#8f384d"}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </section>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={style.container}>
        <section>
          <p className={style.modal_title}>Draft Property</p>
          <h1>Something is wrong!</h1>
          <div className="flex justify-center">
            <BeatLoader
              color={"#8f384d"}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </section>
      </div>
    );
  }

  const acceptance_date = parse(
    data?.acceptance_date,
    "yyyy-MM-dd",
    new Date()
  );
  const turnover_date = parse(data?.turnover_date, "yyyy-MM-dd", new Date());
  const DefaultFormData: PropertyDefaultValue = {
    unit_code: data?.unit_code,
    address: data?.address,
    area: data?.area,
    class: data?.class,
    type: data?.type,

    acceptance_date: isValid(acceptance_date)
      ? format(acceptance_date, "MMM dd yyyy")
      : "",
    turnover_date: isValid(turnover_date)
      ? format(turnover_date, "MMM dd yyyy")
      : "",
    status: data?.status,
    developer_id: data?.developer?.id,
    project_id: data?.project?.id,
    tower_id: data?.tower?.id,
    floor_id: data?.floor?.id,
    project: data?.project?.name,
    tower: data?.tower?.name,
    floor: data?.floor?.name,
    developer: data?.developer?.name,
  };
  return (
    <>
      <PropertyForm
        DefaultFormData={DefaultFormData}
        isSearchTable={isSearchTable}
      />
    </>
  );
}
