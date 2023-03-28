import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { ShowRecordMeter } from "./Query";
import Readingform from "./Readingform";

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

    const dateFrom = parse(data?.data.period_from, "yyyy-MM-dd", new Date());
    const dateTo = parse(data?.data.period_to, "yyyy-MM-dd", new Date());

    return (
        <Readingform
            toggle={toggle}
            formType="modify"
            externalDefaultValue={{
                charge: {
                    charge: data?.data.charge.name,
                    rate: data?.data.charge.base_rate,
                    id: data?.data.charge.id,
                },
                period: {
                    from: isValid(dateFrom)
                        ? format(dateFrom, "MMM dd yyyy")
                        : "",
                    to: isValid(dateTo) ? format(dateFrom, "MMM dd yyyy") : "",
                },
                properties: [
                    {
                        property: "sample",
                        property_unit_id: 4,
                        previous_reading: 0,
                        current_reading: 0,
                        consumption: 0,
                    },
                ],
            }}
        />
    );
}
