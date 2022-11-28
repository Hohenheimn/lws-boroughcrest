import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import style from "../../../../styles/Popup_Modal.module.scss";
import { ModalSideFade } from "../../../Animation/SimpleAnimation";
type Props = {
    setCreate: Function;
};
export default function ChargeForm({ setCreate }: Props) {
    const router = useRouter();
    const [isForm, setForm] = useState([true, false]);

    const cancel = () => {
        router.push("");
        setCreate(false);
    };
    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Create Charge</p>
                <motion.div
                    variants={ModalSideFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {isForm[0] && <Primary cancel={cancel} setForm={setForm} />}
                    {isForm[1] && <SecondForm setForm={setForm} />}
                </motion.div>
            </section>
        </div>
    );
}
type Primary = {
    cancel: () => void;
    setForm: Function;
};
const Primary = ({ cancel, setForm }: Primary) => {
    const next = () => {
        setForm([false, true]);
    };
    return (
        <>
            <h1 className={style.modal_label_primaryRed}>
                Primary Information
            </h1>
            <ul className={style.ThreeRows}>
                <li>
                    <label>DISCOUNTS</label>
                    <input type="text" />
                </li>
                <li>
                    <label>REVENUE</label>
                    <select id="">
                        <option value="sample">sample</option>
                        <option value="sample 1">sample 1</option>
                    </select>
                </li>
                <li>
                    <label>ADVANCES</label>
                    <input type="text" />
                </li>
                <li>
                    <label>MINIMUM</label>
                    <input type="text" />
                </li>
                <li>
                    <label>INTEREST</label>
                    <input type="text" />
                </li>
                <li>
                    <label>PAYMENT HEIRARCHY</label>
                    <input type="text" />
                </li>
                <li>
                    <label>SOA SORT ORDER</label>
                    <input type="text" />
                </li>
            </ul>

            <div className={style.SaveButton}>
                <aside className={style.back} onClick={cancel}>
                    CANCEL
                </aside>
                <button className={style.next} onClick={next}>
                    NEXT
                </button>
            </div>
        </>
    );
};
type SecondProps = {
    setForm: Function;
};
const SecondForm = ({ setForm }: SecondProps) => {
    const [isSave, setSave] = useState(false);
    const back = () => {
        setForm([true, false]);
    };
    return (
        <>
            <h1 className={style.modal_label_primaryRed}>Lorem Ipsum</h1>
            <ul className={style.ThreeRows}>
                <li>
                    <label>CODE</label>
                    <input type="text" />
                </li>
                <li>
                    <label>TYPE</label>
                    <select id="">
                        <option value="sample">sample</option>
                        <option value="sample 1">sample 1</option>
                    </select>
                </li>
                <li>
                    <label>NAME</label>
                    <input type="text" />
                </li>
                <li>
                    <label>DESCRIPTION</label>
                    <input type="text" />
                </li>
                <li>
                    <label>BASE RATE</label>
                    <input type="text" />
                </li>
                <li>
                    <label>UOM</label>
                    <input type="text" />
                </li>
                <li>
                    <label>VAT%</label>
                    <input type="text" />
                </li>
                <li>
                    <label>RECEIVABLE</label>
                    <input type="text" />
                </li>
            </ul>

            <div className={style.SaveButton}>
                <aside className={style.back} onClick={back}>
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
        </>
    );
};
