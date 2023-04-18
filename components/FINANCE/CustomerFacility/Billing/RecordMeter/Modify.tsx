import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { ShowRecordMeter } from "./Query";
import SelectProperty from "./SelectProperty";

export default function Modify() {
    const [isToggle, toggle] = useState();
    const router = useRouter();
    const id: any = router.query.modify;
    const { isLoading, data, isError } = ShowRecordMeter(id);
    if (isError) {
        return (
            <div className="pageDetail">
                <h1>Something is wrong</h1>
            </div>
        );
    }
    if (isLoading) {
        return (
            <ModalTemp>
                <h3 className="mb-5 text-ThemeRed">Edit Reading</h3>
                <button className="buttonRed mb-5">PROPERTY</button>
                <div className="pageDetail">
                    <BeatLoader
                        color={"#8f384d"}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </ModalTemp>
        );
    }

    const dateFrom = parse(
        data?.data.record.period_from,
        "yyyy-MM-dd",
        new Date()
    );
    const dateTo = parse(data?.data.record.period_to, "yyyy-MM-dd", new Date());

    return (
        <SelectProperty
            toggle={toggle}
            formType="modify"
            externalDefaultValue={{
                reading_id: 1,
                charge: {
                    charge: data?.data?.record.charge?.name,
                    rate: data?.data?.record?.rate,
                    id: data?.data?.record?.charge_id,
                },
                period: {
                    from: isValid(dateFrom)
                        ? format(dateFrom, "MMM dd yyyy")
                        : "",
                    to: isValid(dateTo) ? format(dateFrom, "MMM dd yyyy") : "",
                },
                properties: data?.data?.readings.map((item: any) => {
                    return {
                        id: item.id,
                        property: item.property.unit_code,
                        property_unit_id: item.property_unit_id,
                        previous_reading: item.previous_reading,
                        current_reading: item.current_reading,
                        consumption: item.consumption,
                        modifiable: item.modifiable,
                    };
                }),
            }}
        />
    );
}
