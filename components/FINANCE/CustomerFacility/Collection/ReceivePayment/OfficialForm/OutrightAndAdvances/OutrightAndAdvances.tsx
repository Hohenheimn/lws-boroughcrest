import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Advances from "./Advances";
import OutRight from "./OutRight";

type Props = {
    Error: () => void;
};

export default function OutrightAndAdvances({ Error }: Props) {
    const [toggleForm, setToggleForm] = useState(false);
    return (
        <div className=" border-b border-ThemeRed50 py-10">
            <h1 className="SectionTitle mb-3">Outright & Advances</h1>

            {!toggleForm && <OutRight key={1} Error={Error} />}
            {toggleForm && <Advances key={2} Error={Error} />}

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
