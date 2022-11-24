import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import style from "../../../styles/Popup_Modal.module.scss";

type Props = {
    setCreate: Function;
};

export default function COAForm({ setCreate }: Props) {
    const [isSave, setSave] = useState(false);
    const cancel = () => {
        setCreate(false);
    };
    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Create Account</p>
                <h1 className={style.modal_label_primaryRed}>
                    Primary Information
                </h1>
                <ul className={style.FinanceTwoRows}>
                    <li className={style.twoField}>
                        <li>
                            <label>PARENT</label>
                            <select name="" id="">
                                <option value="">00100101</option>
                                <option value="">00100101</option>
                                <option value="">00100101</option>
                            </select>
                        </li>
                        <li>
                            <label>CODE SUFFIX</label>
                            <input type="text" />
                        </li>
                    </li>
                    <li>
                        <label htmlFor="">ACCOUNT NAME</label>
                        <input type="text" />
                    </li>
                    <li>
                        <label htmlFor="">DESCRIPTION</label>
                        <input type="text" />
                    </li>
                    <li>
                        <label htmlFor="">DEFAULT ACCOUNT</label>
                        <select name="" id="">
                            <option value="">sample</option>
                            <option value="">sample 1</option>
                            <option value="">sample 2</option>
                        </select>
                    </li>
                    <li className={style.status}>
                        <label htmlFor="status">APPLY TO SUB-ACCOUNT</label>
                        <div className={`statusCircle active`}></div>
                    </li>
                    <li>
                        <label htmlFor="">BANK ACCOUNT NO.</label>
                        <input type="text" />
                    </li>
                    <li>
                        <label htmlFor="">BANK AND BRANCH</label>
                        <input type="text" />
                    </li>
                </ul>
                <div className={style.SaveButton}>
                    <aside className={style.back} onClick={cancel}>
                        CANCEL
                    </aside>

                    <div className={style.Save}>
                        <div>
                            <button
                                type="submit"
                                name="save"
                                className={style.save_button}
                            >
                                SAVE
                            </button>
                            <aside className={style.Arrow}>
                                <RiArrowDownSFill
                                    onClick={() => setSave(!isSave)}
                                />
                            </aside>
                        </div>
                        {isSave && (
                            <ul>
                                <li>
                                    <button>SAVE & NEW</button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
