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
import { ScaleLoader } from "react-spinners";
import { useQueryClient } from "react-query";
import Image from "next/image";
import {
    PostDraftProperty,
    PostProperty,
    UpdateDraftProperty,
    UpdateProperty,
} from "../../ReactQuery/PropertyMethod";
import Calendar from "../../Calendar";
import DynamicPopOver from "../../DynamicPopOver";

type Props = {
    DefaultFormData: PropertyDefaultValue;
    isSearchTable?: string;
};

export default function PropertyForm({
    DefaultFormData,
    isSearchTable,
}: Props) {
    const [acceptanceDate, setAcceptanceDate] = useState({
        value: DefaultFormData.acceptance_date,
        toggle: false,
    });
    const [turnoverDate, setTurnoverDate] = useState({
        value: DefaultFormData.turnover_date,
        toggle: false,
    });
    useEffect(() => {
        setValue("acceptance_date", acceptanceDate.value, {
            shouldValidate: true,
        });
        setValue("turnover_date", turnoverDate.value, {
            shouldValidate: true,
        });
    }, [acceptanceDate.value, turnoverDate.value]);

    const router = useRouter();
    const [isButton, setButton] = useState("");
    const ErrorDefault = {
        area: "",
        class: "",
        developer_id: "",
        floor_id: "",
        project_id: "",
        tower_id: "",
        type: "",
        unit_code: "",
        address: "",
    };
    const [isError, setError] = useState({
        ...ErrorDefault,
    });
    const [isProject, setProject] = useState(false);
    const [isTower, setTower] = useState(false);
    const [isFloor, setFloor] = useState(false);
    const [isDev, setDev] = useState(false);
    const [isSave, setSave] = useState(false);
    const { setNewPropToggle, propTableRows, setPrompt } =
        useContext(AppContext);

    const [FormModify, setFormModify] = useState("New");
    const [isUnitCode, setUnitCode] = useState(DefaultFormData.unit_code);

    const [isProjectVal, setProjectVal] = useState({
        id: DefaultFormData?.project_id,
        value: DefaultFormData?.project,
        firstVal: DefaultFormData?.project,
        firstID: DefaultFormData?.project_id,
    });
    const [isTowerVal, setTowerVal] = useState({
        id: DefaultFormData?.tower_id,
        value: DefaultFormData?.tower,
        firstVal: DefaultFormData?.tower,
        firstID: DefaultFormData?.tower_id,
    });
    const [isFloorVal, setFloorVal] = useState({
        id: DefaultFormData?.floor_id,
        value: DefaultFormData?.floor,
        firstVal: DefaultFormData?.floor,
        firstID: DefaultFormData?.floor_id,
    });
    const [isDevVal, setDevVal] = useState({
        id: DefaultFormData?.developer_id,
        value: DefaultFormData?.developer,
        firstVal: DefaultFormData?.developer,
        firstID: DefaultFormData?.developer_id,
    });

    const updateProject = (value: any, id: any) => {
        setValue("project", value, {
            shouldValidate: true,
        });
        setProjectVal({
            id: id,
            value: value,
            firstVal: value,
            firstID: id,
        });
    };

    const updateTower = (value: any, id: any) => {
        setValue("tower", value, {
            shouldValidate: true,
        });
        setTowerVal({
            id: id,
            value: value,
            firstVal: value,
            firstID: id,
        });
    };
    const updateFloor = (value: any, id: any) => {
        setValue("floor", value, {
            shouldValidate: true,
        });
        setFloorVal({
            id: id,
            value: value,
            firstVal: value,
            firstID: id,
        });
    };
    const updateDeveloper = (value: any, id: any) => {
        setValue("developer", value, {
            shouldValidate: true,
        });
        setDevVal({
            id: id,
            value: value,
            firstVal: value,
            firstID: id,
        });
    };

    useEffect(() => {
        if (router.query.id !== undefined) {
            setFormModify("Modify");
        }
    }, []);

    const cancel = () => {
        reset();
        setError({ ...ErrorDefault });
        setNewPropToggle(false);
        if (router.query.draft !== undefined) {
            router.push("");
        }
    };

    // Mutation
    const onSuccess = () => {
        queryClient.invalidateQueries([
            "Property-List",
            propTableRows,
            isSearchTable,
        ]);
        setError({ ...ErrorDefault });
        setUnitCode("");
        reset();
        if (router.query.id !== undefined) {
            // Update
            queryClient.invalidateQueries([
                "get-property-detail",
                `${router.query.id}`,
            ]);
            setPrompt({
                message: `Property Unit successfully ${
                    isButton === "draft" ? "saved as draft" : "updated"
                }!`,
                type: `${isButton === "draft" ? "draft" : "success"}`,
                toggle: true,
            });
        } else {
            // Save
            setPrompt({
                message: `Property Unit successfully ${
                    isButton === "draft" ? "saved as draft" : "saved"
                }!`,
                type: `${isButton === "draft" ? "draft" : "success"}`,
                toggle: true,
            });

            // From draft to save
            if (router.query.draft !== undefined) {
                router.push("");
                if (isButton === "new") {
                    setNewPropToggle(true);
                }
            }
        }
        if (isButton === "save" || isButton === "draft") {
            setNewPropToggle(false);
        }
    };
    const onError = (e: any) => {
        const ErrorField = e.response.data;
        let message: any;
        if (ErrorField > 0 || ErrorField !== null || ErrorField !== undefined) {
            setError({ ...ErrorField });
            message = "Please check all the fields!";
        } else {
            message = "Something is wrong!";
        }
        setPrompt((prev: any) => ({
            ...prev,
            message: message,
            type: "error",
            toggle: true,
        }));
    };

    // Save Mutation
    const { mutate: SaveMutate, isLoading: SaveLoading } = PostProperty(
        onSuccess,
        onError
    );
    const { mutate: SaveDraftMutate, isLoading: SaveDraftLoading } =
        PostDraftProperty(onSuccess, onError);

    // Update Mutation
    const { mutate: UpdateMutate, isLoading: UpdateLoading } = UpdateProperty(
        onSuccess,
        onError,
        router.query.id
    );
    // Update Draft
    const { mutate: UpdateDraft, isLoading: DraftLoading } = UpdateProperty(
        onSuccess,
        onError,
        router.query.draft
    );
    const { mutate: UpdateDraftMutate, isLoading: UpdateDraftLoading } =
        UpdateDraftProperty(onSuccess, onError, router.query.id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<PropertyDefaultValue>({
        defaultValues: DefaultFormData,
    });
    const queryClient = useQueryClient();

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
            // Draft
            Payload = {
                ...Payload,
                status: "Draft",
            };
            if (router.query.id !== undefined) {
                // Update
                UpdateDraftMutate(Payload);
            } else {
                // Save
                SaveDraftMutate(Payload);
            }
        } else {
            // Save
            Payload = {
                ...Payload,
                status: "Active",
            };
            if (router.query.id !== undefined) {
                // Update
                UpdateMutate(Payload);
            } else if (router.query.draft !== undefined) {
                // Update Draft
                Payload = { ...Payload, status: "Active" };
                UpdateDraft(Payload);
            } else if (
                router.query.draft === undefined &&
                router.query.id === undefined
            ) {
                // Save
                SaveMutate(Payload);
            }
        }
        setSave(false);
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
                            <select id="" {...register("type")}>
                                <option value="Parking">Parking</option>
                                <option value="Unit">Unit</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                            {errors.type && (
                                <p className="text-[10px]">
                                    {errors.type.message}
                                </p>
                            )}
                            {isError.type !== "" && (
                                <p className="text-[10px]">{isError.type}</p>
                            )}
                        </li>
                        <li>
                            <label>*UNIT CODE</label>
                            <input
                                type="text"
                                placeholder="---"
                                value={isUnitCode}
                                {...register("unit_code")}
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
                            {isError.unit_code !== "" && (
                                <p className="text-[10px]">
                                    {isError.unit_code}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*CLASS</label>
                            <select id="" {...register("class")}>
                                <option value="Saleable">Saleable</option>
                                <option value="Leaseable">Leaseable</option>
                            </select>
                            {errors.class && (
                                <p className="text-[10px]">
                                    {errors.class.message}
                                </p>
                            )}
                            {isError.class !== "" && (
                                <p className="text-[10px]">{isError.class}</p>
                            )}
                        </li>
                        <li>
                            <label>*ADDRESS</label>
                            <input type="text" {...register("address")} />
                            {errors.address && (
                                <p className="text-[10px]">
                                    {errors.address.message}
                                </p>
                            )}
                            {isError.address !== "" && (
                                <p className="text-[10px]">{isError.address}</p>
                            )}
                        </li>
                        <li>
                            <label>*DEVELOPER</label>
                            <DynamicPopOver
                                className="w-full"
                                samewidth={true}
                                toRef={
                                    <input
                                        type="text"
                                        {...register("developer")}
                                        autoComplete="off"
                                        onFocus={() => setDev(true)}
                                        onClick={() => setDev(true)}
                                        value={isDevVal.value}
                                        onChange={(e: any) =>
                                            setDevVal({
                                                ...isDevVal,
                                                value: e.target.value,
                                            })
                                        }
                                    />
                                }
                                toPop={
                                    <>
                                        {isDev && (
                                            <Developer
                                                set={setDev}
                                                update={updateDeveloper}
                                                isValID={isDevVal.id}
                                                isObject={isDevVal}
                                                setObject={setDevVal}
                                            />
                                        )}
                                    </>
                                }
                            />

                            {errors.developer && (
                                <p className="text-[10px]">
                                    {errors.developer.message}
                                </p>
                            )}
                            {isError.developer_id !== "" && (
                                <p className="text-[10px]">
                                    {isError.developer_id}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*PROJECT</label>
                            <DynamicPopOver
                                className="w-full"
                                samewidth={false}
                                toRef={
                                    <input
                                        type="text"
                                        onFocus={() => setProject(true)}
                                        onClick={() => setProject(true)}
                                        autoComplete="off"
                                        {...register("project")}
                                        value={isProjectVal.value}
                                        onChange={(e: any) =>
                                            setProjectVal({
                                                ...isProjectVal,
                                                value: e.target.value,
                                            })
                                        }
                                    />
                                }
                                toPop={
                                    <>
                                        {isProject && (
                                            <Project
                                                set={setProject}
                                                update={updateProject}
                                                isValID={isProjectVal.id}
                                                isObject={isProjectVal}
                                                setObject={setProjectVal}
                                            />
                                        )}
                                    </>
                                }
                            />

                            {errors.project && (
                                <p className="text-[10px]">
                                    {errors.project.message}
                                </p>
                            )}
                            {isError.project_id !== "" && (
                                <p className="text-[10px]">
                                    {isError.project_id}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*TOWER</label>
                            <DynamicPopOver
                                className="w-full"
                                samewidth={false}
                                toRef={
                                    <input
                                        type="text"
                                        onFocus={() => setTower(true)}
                                        onClick={() => setTower(true)}
                                        autoComplete="off"
                                        {...register("tower")}
                                        value={isTowerVal.value}
                                        onChange={(e: any) =>
                                            setTowerVal({
                                                ...isTowerVal,
                                                value: e.target.value,
                                            })
                                        }
                                    />
                                }
                                toPop={
                                    <>
                                        {isTower && (
                                            <Tower
                                                set={setTower}
                                                is={isTower}
                                                update={updateTower}
                                                isValID={isTowerVal.id}
                                                isObject={isTowerVal}
                                                setObject={setTowerVal}
                                            />
                                        )}
                                    </>
                                }
                            />

                            {errors.tower && (
                                <p className="text-[10px]">
                                    {errors.tower.message}
                                </p>
                            )}
                            {isError.tower_id !== "" && (
                                <p className="text-[10px]">
                                    {isError.tower_id}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*FLOOR</label>
                            <DynamicPopOver
                                className="w-full"
                                samewidth={false}
                                toRef={
                                    <input
                                        type="text"
                                        onFocus={() => setFloor(true)}
                                        {...register("floor")}
                                        autoComplete="off"
                                        onClick={() => setFloor(true)}
                                        value={isFloorVal.value}
                                        onChange={(e: any) =>
                                            setFloorVal({
                                                ...isFloorVal,
                                                value: e.target.value,
                                            })
                                        }
                                    />
                                }
                                toPop={
                                    <>
                                        {isFloor && (
                                            <Floor
                                                set={setFloor}
                                                is={isFloor}
                                                update={updateFloor}
                                                isValID={isFloorVal.id}
                                                isObject={isFloorVal}
                                                setObject={setFloorVal}
                                            />
                                        )}
                                    </>
                                }
                            />

                            {errors.floor && (
                                <p className="text-[10px]">
                                    {errors.floor.message}
                                </p>
                            )}
                            {isError.floor_id !== "" && (
                                <p className="text-[10px]">
                                    {isError.floor_id}
                                </p>
                            )}
                        </li>
                        <li>
                            <label>*AREA</label>
                            <input type="text" {...register("area")} />
                            {errors.area && (
                                <p className="text-[10px]">
                                    {errors.area.message}
                                </p>
                            )}
                            {isError.area !== "" && (
                                <p className="text-[10px]">{isError.area}</p>
                            )}
                        </li>
                        <li>
                            <label>ACCEPTANCE DATE</label>

                            <div className="calendar">
                                <span className="cal">
                                    <Image
                                        src="/Images/CalendarMini.png"
                                        width={15}
                                        height={15}
                                        alt=""
                                    />
                                </span>
                                <input
                                    type="text"
                                    {...register("acceptance_date")}
                                    autoComplete="off"
                                    placeholder="dd/mm/yyyy"
                                    onClick={() =>
                                        setAcceptanceDate({
                                            ...acceptanceDate,
                                            toggle: true,
                                        })
                                    }
                                    className="p-2 outline-none rounded-md shadow-md"
                                />
                                {acceptanceDate.toggle && (
                                    <Calendar
                                        value={acceptanceDate}
                                        setValue={setAcceptanceDate}
                                    />
                                )}
                            </div>
                        </li>
                        <li>
                            <label>TURNOVER DATE</label>
                            <div className="calendar">
                                <span className="cal">
                                    <Image
                                        src="/Images/CalendarMini.png"
                                        width={15}
                                        height={15}
                                        alt=""
                                    />
                                </span>
                                <input
                                    type="text"
                                    {...register("turnover_date")}
                                    placeholder="dd/mm/yyyy"
                                    autoComplete="off"
                                    onClick={() =>
                                        setTurnoverDate({
                                            ...turnoverDate,
                                            toggle: true,
                                        })
                                    }
                                    className="p-2 outline-none rounded-md shadow-md"
                                />
                                {turnoverDate.toggle && (
                                    <Calendar
                                        value={turnoverDate}
                                        setValue={setTurnoverDate}
                                    />
                                )}
                            </div>
                        </li>
                    </ul>
                    <div className={style.SaveButton}>
                        <aside className={style.back} onClick={cancel}>
                            CANCEL
                        </aside>

                        <aside className={style.Save}>
                            <div>
                                <button
                                    type="submit"
                                    name="save"
                                    className={style.save_button}
                                    onClick={() => setButton("save")}
                                >
                                    {SaveDraftLoading ||
                                    SaveLoading ||
                                    UpdateLoading ||
                                    DraftLoading ||
                                    UpdateDraftLoading ? (
                                        <ScaleLoader
                                            color="#fff"
                                            height="10px"
                                            width="2px"
                                        />
                                    ) : (
                                        "SAVE"
                                    )}
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
                                    {router.query.draft === undefined && (
                                        <li>
                                            <button
                                                onClick={() =>
                                                    setButton("draft")
                                                }
                                            >
                                                SAVE AS DRAFT
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </aside>
                    </div>
                </motion.div>
            </section>
        </form>
    );
}
function setPrompt(arg0: { message: string; type: string; toggle: boolean }) {
    throw new Error("Function not implemented.");
}
