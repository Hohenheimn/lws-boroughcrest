import React, { useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { HeaderForm } from "../ReceivePaymentForm";
import OutrightAndAdvances from "./OutrightAndAdvances/OutrightAndAdvances";
import OutStandingBalance from "./OutStandingBalance";
import PaymentSummary from "./PaymentSummary";

type Props = {
    Error: () => void;
    headerForm: HeaderForm;
};

type isTableItem = {
    id: string | number;
    charge: string;
    charge_id: string;
    description: string;
    amount: number | string;
};

export default function OfficialForm({ Error, headerForm }: Props) {
    const [isTable, setTable] = useState<isTableItem[]>([
        {
            id: 1,
            charge: "",
            charge_id: "",
            description: "",
            amount: 0,
        },
    ]);

    const [isSave, setSave] = useState(false);

    const SaveHandler = (button: string) => {};

    return (
        <>
            <OutStandingBalance Error={Error} />
            <OutrightAndAdvances Error={Error} />
            <PaymentSummary Error={Error} headerForm={headerForm} />
            <div className="DropDownSave">
                <button className="ddback">CANCEL</button>
                <div className="ddSave">
                    <div>
                        <button
                            type="submit"
                            name="save"
                            className="ddsave_button"
                            onClick={() => {
                                SaveHandler("save");
                                Error();
                                setSave(false);
                            }}
                        >
                            SAVE
                        </button>
                        <aside className="ddArrow">
                            <RiArrowDownSFill
                                onClick={() => setSave(!isSave)}
                            />
                        </aside>
                    </div>
                    {isSave && (
                        <ul>
                            <li>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        SaveHandler("new");
                                        Error();
                                        setSave(false);
                                    }}
                                >
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
