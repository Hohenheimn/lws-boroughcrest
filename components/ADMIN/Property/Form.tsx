import React, { useState, useContext, useEffect } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import AppContext from "../../Context/AppContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useRouter } from "next/router";
import Floor from "./Floor";
import Tower from "./Tower";
import Project from "./Project";
import { useForm } from "react-hook-form";
import { PropertyDefaultValue } from "../../../types/PropertyList";
import Developer from "./Developer";

type Props = {
    DefaultFormData: PropertyDefaultValue;
};

export default function Form({ DefaultFormData }: Props) {
    const router = useRouter();
    const [isButton, setButton] = useState("");
    const [isProject, setProject] = useState(false);
    const [isTower, setTower] = useState(false);
    const [isFloor, setFloor] = useState(false);
    const [isDev, setDev] = useState(false);
    const { setNewPropToggle } = useContext(AppContext);
    const [isSave, setSave] = useState(false);
    const [FormModify, setFormModify] = useState("New");

    const [isUnitCode, setUnitCode] = useState(DefaultFormData.unit_code);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<PropertyDefaultValue>({
        defaultValues: DefaultFormData,
    });

    const [isProjectVal, setProjectVal] = useState({
        id: DefaultFormData?.project_id,
        value: "",
    });
    const [isTowerVal, setTowerVal] = useState({
        id: DefaultFormData?.tower_id,
        value: "",
    });
    const [isFloorVal, setFloorVal] = useState({
        id: DefaultFormData?.floor_id,
        value: "",
    });
    const [isDevVal, setDevVal] = useState({
        id: DefaultFormData?.developer_id,
        value: "",
    });

    const updateProject = (value: any, id: any) => {
        setValue("project", value, {
            shouldValidate: true,
        });
        setProjectVal({
            id: id,
            value: value,
        });
    };

    const updateTower = (value: any, id: any) => {
        setValue("tower", value, {
            shouldValidate: true,
        });
        setTowerVal({
            id: id,
            value: value,
        });
    };
    const updateFloor = (value: any, id: any) => {
        setValue("floor", value, {
            shouldValidate: true,
        });
        setFloorVal({
            id: id,
            value: value,
        });
    };
    const updateDeveloper = (value: any, id: any) => {
        setValue("developer", value, {
            shouldValidate: true,
        });
        setDevVal({
            id: id,
            value: value,
        });
    };

    useEffect(() => {
        setValue("class", DefaultFormData.class, { shouldValidate: true });
        if (router.query.id !== undefined) {
            setFormModify("Modify");
        }
    }, []);

    const cancel = () => {
        reset();
        setNewPropToggle(false);
    };

    const submit = (data: any) => {
        let Payload = {
            unit_code: data.unit_code,
            address: data.address,
            area: data.area,
            class: data.class,
            type: data.type,
            acceptance_date: data.acceptance_date,
            turnover_date: data.turnover_date,
            status: data.status,
            developer_id: isDevVal.id,
            project_id: isProjectVal.id,
            tower_id: isTowerVal.id,
            floor_id: isFloorVal.id,
        };
        if (isButton === "draft") {
            Payload = {
                ...Payload,
                status: "Draft",
            };
        } else {
            Payload = {
                ...Payload,
                status: "Active",
            };
        }
        console.log(Payload);
    };

    return (
        <form className={style.container} onSubmit={handleSubmit(submit)}>
            <section>
                <p className={style.modal_title}>{FormModify} Property</p>
                <motion.div
                    variants={ModalSideFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <h1 className={style.modal_label_primary}>
                        Primary Information
                    </h1>
                    <ul className={style.ThreeRows}>
                        {FormModify === "Modify" && (
                            <li>
                                <label>ID</label>

                                <p className="rounded-md text-black px-2 py-[2px] outline-none w-[100%] 480px:w-full bg-[#cdb8be]">
                                    {router.query.id}
                                </p>
                            </li>
                        )}
                        <li>
                            <label>*TYPE</label>
                            <select
                                id=""
                                {...register("type", {
                                    required: "Required",
                                })}
                            >
                                <option value="sample">Sample</option>
                                <option value="sample 1">Sample 1</option>
                            </select>
                            {errors.type && (
                                <p className="text-[10px]">
                                    {errors.type.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*UNIT CODE</label>
                            <input
                                type="text"
                                placeholder="---"
                                value={isUnitCode}
                                {...register("unit_code", {
                                    required: "Required",
                                })}
                                onChange={(e: any) =>
                                    e.target.value.length <= 3 &&
                                    setUnitCode(e.target.value)
                                }
                            />
                            {errors.unit_code && (
                                <p className="text-[10px]">
                                    {errors.unit_code.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*CLASS</label>
                            <select
                                id=""
                                {...register("class", {
                                    required: "Required",
                                })}
                            >
                                <option value="sample 1">Sample1</option>
                                <option value="sample 2">Sample2</option>
                                <option value="sample 3">Sample3</option>
                            </select>
                            {errors.class && (
                                <p className="text-[10px]">
                                    {errors.class.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*ADDRESS</label>
                            <input
                                type="text"
                                {...register("address", {
                                    required: "Required",
                                })}
                            />
                            {errors.address && (
                                <p className="text-[10px]">
                                    {errors.address.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*DEVELOPER</label>
                            <Tippy
                                content={
                                    <>
                                        {isDev && (
                                            <Developer
                                                set={setDev}
                                                update={updateDeveloper}
                                                isValID={isDevVal.id}
                                            />
                                        )}
                                    </>
                                }
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={isDev ? true : false}
                                arrow={false}
                            >
                                <input
                                    type="text"
                                    {...register("developer", {
                                        required: "Required",
                                    })}
                                    autoComplete="off"
                                    onFocus={() => setDev(true)}
                                />
                            </Tippy>

                            {errors.developer && (
                                <p className="text-[10px]">
                                    {errors.developer.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*PROJECT</label>
                            <Tippy
                                content={
                                    <>
                                        {isProject && (
                                            <Project
                                                set={setProject}
                                                update={updateProject}
                                                isValID={isProjectVal.id}
                                            />
                                        )}
                                    </>
                                }
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={isProject ? true : false}
                                arrow={false}
                            >
                                <input
                                    type="text"
                                    onFocus={() => setProject(true)}
                                    autoComplete="off"
                                    {...register("project", {
                                        required: "Required",
                                    })}
                                />
                            </Tippy>
                            {errors.project && (
                                <p className="text-[10px]">
                                    {errors.project.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*TOWER</label>
                            <Tippy
                                content={
                                    <>
                                        {isTower && (
                                            <Tower
                                                set={setTower}
                                                is={isTower}
                                                update={updateTower}
                                                isValID={isTowerVal.id}
                                            />
                                        )}
                                    </>
                                }
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={isTower ? true : false}
                                arrow={false}
                            >
                                <input
                                    type="text"
                                    onFocus={() => setTower(true)}
                                    autoComplete="off"
                                    {...register("tower", {
                                        required: "Required",
                                    })}
                                />
                            </Tippy>
                            {errors.tower && (
                                <p className="text-[10px]">
                                    {errors.tower.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*FLOOR</label>
                            <Tippy
                                content={
                                    <>
                                        {isFloor && (
                                            <Floor
                                                set={setFloor}
                                                is={isFloor}
                                                update={updateFloor}
                                                isValID={isFloorVal.id}
                                            />
                                        )}
                                    </>
                                }
                                trigger="click"
                                theme="ThemeWhite"
                                interactive={isFloor ? true : false}
                                arrow={false}
                            >
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onFocus={() => setFloor(true)}
                                    {...register("floor", {
                                        required: "Required",
                                    })}
                                />
                            </Tippy>
                            {errors.floor && (
                                <p className="text-[10px]">
                                    {errors.floor.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*AREA</label>
                            <input
                                type="text"
                                {...register("area", {
                                    required: "Required",
                                })}
                            />
                            {errors.area && (
                                <p className="text-[10px]">
                                    {errors.area.message}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>ACCEPTANCE DATE</label>
                            <input
                                type="date"
                                {...register("acceptance_date")}
                            />
                        </li>
                        <li>
                            <label>TURNOVER DATE</label>
                            <input type="date" {...register("turnover_date")} />
                        </li>
                    </ul>
                    <div className={style.SaveButton}>
                        <aside className={style.back} onClick={cancel}>
                            CANCEL
                        </aside>

                        <button className={style.Save}>
                            <div>
                                <button
                                    type="submit"
                                    name="save"
                                    className={style.save_button}
                                    onClick={() => setButton("save")}
                                >
                                    Save
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
                                        <button
                                            onClick={() => setButton("new")}
                                        >
                                            SAVE & NEW
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setButton("draft")}
                                        >
                                            SAVE AS DRAFT
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </button>
                    </div>
                </motion.div>
            </section>
        </form>
    );
}
