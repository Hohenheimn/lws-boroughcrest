import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Advances, { AdvancesType } from "./Advances";
import OutRight, { Outright } from "./OutRight";

type Props = {
    DefaultOutright: Outright[];
    DefaultAdvances: AdvancesType[];
    Error: () => void;
    setDefaultOutright: Function;
    setDefaultAdvances: Function;
};

export default function OutrightAndAdvances({
    Error,
    DefaultOutright,
    DefaultAdvances,
    setDefaultOutright,
    setDefaultAdvances,
}: Props) {
    const [toggleForm, setToggleForm] = useState(false);
    return (
        <div className=" border-b border-ThemeRed50 py-10">
            <h1 className="SectionTitle mb-3">Outright & Advances</h1>

            {!toggleForm && (
                <OutRight
                    key={1}
                    Error={Error}
                    DefaultOutRight={DefaultOutright}
                    setDefaultValue={setDefaultOutright}
                />
            )}
            {toggleForm && (
                <Advances
                    key={2}
                    Error={Error}
                    DefaultAdvances={DefaultAdvances}
                    setDefaultValue={setDefaultAdvances}
                />
            )}

            <div className="flex justify-center mt-5">
                <ul className="switchButton">
                    <li
                        className={`${!toggleForm && "active"}`}
                        onClick={() => setToggleForm(false)}
                    ></li>
                    <li
                        className={`${toggleForm && "active"}`}
                        onClick={() => setToggleForm(true)}
                    ></li>
                </ul>
            </div>
        </div>
    );
}
