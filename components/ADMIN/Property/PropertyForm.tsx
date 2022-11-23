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
import {
    PostDraftProperty,
    PostProperty,
    UpdateDraftProperty,
    UpdateProperty,
} from "../../ReactQuery/PropertyMethod";

type Props = {
    DefaultFormData: PropertyDefaultValue;
    isSearchTable?: string;
};

export default function PropertyForm({
    DefaultFormData,
    isSearchTable,
}: Props) {
    const router = useRouter();
    const [isButton, setButton] = useState("");
    const [isError, setError] = useState("");
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
        if (router.query.id !== undefined) {
            setFormModify("Modify");
        }
    }, []);

    const cancel = () => {
        reset();
        setNewPropToggle(false);
        if (router.query.draft !== undefined) {
            router.push("");
        }
    };

    // Mutation
    const onSuccess = () => {
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
        queryClient.invalidateQueries([
            "Property-List",
            propTableRows,
            isSearchTable,
        ]);
        setUnitCode("");
        reset();
        if (isButton === "save" || isButton === "draft") {
            setNewPropToggle(false);
        }
    };
    const onError = (e: any) => {
        if (e?.response?.data?.registered_email) {
            setError("Unit code has already been registered!");
        } else {
            setError("Please fill out all required field!");
        }

        setPrompt({
            message: isError === "" ? "Something is wrong!" : isError,
            type: "error",
            toggle: true,
        });
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
                        </li>
                        <li>
                            <label>*ADDRESS</label>
                            <input type="text" {...register("address")} />
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
                                    {...register("developer")}
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
                                    {...register("project")}
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
                                    {...register("tower")}
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
                                    {...register("floor")}
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
                            <input type="text" {...register("area")} />
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
                    {isError !== "" && <p>{isError}</p>}
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
