import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../styles/Popup_Modal.module.scss";
import DefaultAccount from "./DefaultAccount";
import Parent from "./Parent";

type Props = {
    setCreate: Function;
};

export default function COAForm({ setCreate }: Props) {
    const router = useRouter();
    const [isSave, setSave] = useState(false);
    const [isStatus, setStatus] = useState(true);
    const [isParent, setParent] = useState({
        toggle: false,
        value: "",
    });
    const [isDefaultAccount, setDefaultAccount] = useState({
        toggle: false,
        value: "",
        id: 0,
    });
    const cancel = () => {
        setCreate(false);
        router.push("");
    };
    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Create Account</p>
                <h1 className={style.modal_label_primaryRed}>
                    Primary Information
                </h1>
                <ul className={style.FinanceTwoRows}>
                    <li>
                        <label htmlFor="">*CHART CODE</label>
                        <input type="number" className=" bg-ThemeRed50" />
                    </li>
                    <li className={style.twoField}>
                        <li>
                            <label>PARENT</label>
                            <div className={style.Dropdown}>
                                <input
                                    type="number"
                                    value={isParent.value}
                                    onChange={(e: any) =>
                                        setParent({
                                            ...isParent,
                                            value: e.target.value,
                                        })
                                    }
                                    onFocus={() =>
                                        setParent({
                                            ...isParent,
                                            toggle: true,
                                        })
                                    }
                                />
                                {isParent.toggle && (
                                    <Parent
                                        setParent={setParent}
                                        isParent={isParent}
                                    />
                                )}
                            </div>
                        </li>
                        <li>
                            <label>*CODE SUFFIX</label>
                            <input type="text" />
                        </li>
                    </li>
                    <li>
                        <label htmlFor="">*ACCOUNT NAME</label>
                        <input type="text" />
                    </li>
                    <li>
                        <label htmlFor="">DESCRIPTION</label>
                        <input type="text" />
                    </li>
                    <li>
                        <label htmlFor="">*DEFAULT ACCOUNT</label>
                        <div className={style.Dropdown}>
                            <input
                                type="text"
                                value={isDefaultAccount.value}
                                onChange={(e: any) =>
                                    setDefaultAccount({
                                        ...isDefaultAccount,
                                        value: e.target.value,
                                    })
                                }
                                onFocus={() =>
                                    setDefaultAccount({
                                        ...isDefaultAccount,
                                        toggle: true,
                                    })
                                }
                            />
                            {isDefaultAccount.toggle && (
                                <DefaultAccount
                                    setValue={setDefaultAccount}
                                    isValue={isDefaultAccount}
                                />
                            )}
                        </div>
                    </li>
                    <li className={style.status}>
                        <label htmlFor="status">*APPLY TO SUB-ACCOUNT</label>
                        <div
                            className={`statusCircle ${
                                isStatus ? "active" : "inactive"
                            }`}
                            onClick={() => setStatus(!isStatus)}
                        ></div>
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
