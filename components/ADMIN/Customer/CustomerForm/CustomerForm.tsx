import React, { useContext, useState } from "react";
import style from "../../../../styles/Popup_Modal.module.scss";
import Image from "next/image";
import { AiFillCamera } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ModalTemp from "../../../Reusable/ModalTemp";
import SelectDropdown from "../../../Reusable/SelectDropdown";
import IndividualCompanyForm from "./IndividualCompanyForm";
import AppContext from "../../../Context/AppContext";
import { useRouter } from "next/router";
import CustomerUnitCodeForm, {
    CustomerUnitCodes,
} from "./CustomerUnitCodeForm";
import {
    PostCustomerDraft,
    PostCustomerSave,
    PutCustomer,
    UpdateDraft,
} from "../../../ReactQuery/CustomerMethod";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import { format, isValid, parse } from "date-fns";
import { useQueryClient } from "react-query";

type Props = {
    DefaultValue: CustomerFormDefaultValue;
};
export type CustomerFormDefaultValue = {
    class: string;
    type: string;
    name: string;
    individual_co_owner: string;
    individual_citizenship: string;
    individual_birth_date: string;
    company_contact_person: string;
    tin: string;
    branch_code: string;
    portal_id: string;
    registered_address_unit_floor: string;
    registered_address_building: string;
    registered_address_street: string;
    registered_address_district: string;
    registered_address_municipal_city: string;
    registered_address_province: string;
    registered_address_zip_code: string;
    mailing_address_unit_floor: string;
    mailing_address_building: string;
    mailing_address_street: string;
    mailing_address_district: string;
    mailing_address_municipal_city: string;
    mailing_address_province: string;
    mailing_address_zip_code: string;
    image_photo: File | null;
    image_photo_url?: string;
    image_valid_id: File | null;
    image_valid_id_url?: string;
    image_signature: File | null;
    image_signature_url?: string;
    contact_no: string | number;
    registered_email: string;
    preferred_email: string;
    status: boolean | string;
    unit_codes?: CustomerUnitCodes[];
};

export default function CustomerForm({ DefaultValue }: Props) {
    const { setPrompt, setCusError, DefaultCustomerFormValue, setCusToggle } =
        useContext(AppContext);

    const [isButtonClicked, setButtonClicked] = useState("");

    const [isCustomerForm, setCustomerForm] =
        useState<CustomerFormDefaultValue>(DefaultValue);

    const router = useRouter();

    const [FormPage, setFormPage] = useState("primary");

    const [isUnitCode, setUnitCode] = useState<CustomerUnitCodes[]>(
        DefaultValue?.unit_codes === undefined
            ? []
            : DefaultValue?.unit_codes.length <= 0
            ? [
                  {
                      name: "",
                      unit_code: "",
                      id: 1,
                  },
              ]
            : DefaultValue?.unit_codes
    );

    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["get-customer-list"]);
        if (router.query.id !== undefined) {
            queryClient.invalidateQueries([
                "get-customer-detail",
                `${router.query.id}`,
            ]);
        }

        setPrompt((prev: any) => ({
            ...prev,
            message: `Customer successfully ${
                isButtonClicked === "draft" ? "saved as draft" : "registered"
            }!`,
            type: isButtonClicked === "draft" ? "draft" : "success",
            toggle: true,
        }));

        setCustomerForm(DefaultCustomerFormValue);

        setFormPage("primary");
        if (isButtonClicked === "save") {
            setCusToggle(false);
            if (router.query.draft !== undefined) {
                router.push("");
            }
        }

        if (router.query.id !== undefined && isButtonClicked === "new") {
            router.push("/admin/customer/");
            setCusToggle(true);
        }
    };
    const onError = (res: any) => {
        const ErrorField = res.response.data;

        if (ErrorField > 0 || ErrorField !== null || ErrorField !== undefined) {
            setCusError({ ...ErrorField });
        }

        ErrorSubmit(res, setPrompt);
    };

    const { isLoading: MutateLoading, mutate: CreateSave } = PostCustomerSave(
        onSuccess,
        onError
    );

    const { isLoading: MutateDraftLoading, mutate: DraftSave } =
        PostCustomerDraft(onSuccess);

    const { isLoading: loadingDraft, mutate: mutateDraft } = UpdateDraft(
        onSuccess,
        onError,
        router.query.draft
    );

    const { isLoading: loadingUpdate, mutate: mutateUpdate } = PutCustomer(
        onSuccess,
        onError,
        router.query.id
    );

    const CreateHandler = async (button: string) => {
        setButtonClicked(button);

        let validate = true;

        const UnitCodesFilter = isUnitCode.filter(
            (item: CustomerUnitCodes) => item.unit_code !== ""
        );

        const UnitCodes = UnitCodesFilter.map((item) => {
            return item.unit_code;
        });

        const date = parse(
            isCustomerForm.individual_birth_date,
            "MMM dd yyyy",
            new Date()
        );

        let Payload: any = {
            ...isCustomerForm,
            status:
                button === "draft"
                    ? "Draft"
                    : isCustomerForm.status
                    ? "Active"
                    : "Inactive",
            unit_codes: UnitCodes,
            individual_birth_date: isValid(date)
                ? format(date, "yyyy-MM-dd")
                : "",
            image_photo:
                isCustomerForm.image_photo === null
                    ? ""
                    : isCustomerForm.image_photo,
            image_valid_id:
                isCustomerForm.image_valid_id === null
                    ? ""
                    : isCustomerForm.image_valid_id,
            image_signature:
                isCustomerForm.image_signature === null
                    ? ""
                    : isCustomerForm.image_signature,
        };
        // Remove Keys
        delete Payload.image_photo_url;

        delete Payload.image_signature_url;

        delete Payload.image_valid_id_url;

        if (router.query.id !== undefined) {
            delete Payload.unit_codes;
        }

        // Mutation after validation
        if (!validate) return;
        // if Type is company, empty the field of not for company
        if (Payload.type === "Company" || Payload.type === "company") {
            Payload = {
                ...Payload,
                individual_birth_date: "",
                individual_citizenship: "",
                individual_co_owner: "",
            };
        }
        // if Type is individual, empty the field of not for individual
        if (Payload.type === "individual" || Payload.type === "Individual") {
            Payload = { ...Payload, company_contact_person: "" };
        }
        if (router.query.draft !== undefined || router.query.id !== undefined) {
            Payload = {
                ...Payload,
                _method: "PUT",
            };
        }
        const formData = new FormData();
        const arrayData: any = [];
        const keys = Object.keys(Payload);
        await keys.forEach((key) => {
            if (
                key === "image_photo" ||
                key === "image_valid_id" ||
                key === "image_signature"
            ) {
                if (Payload[key] === undefined) {
                    arrayData.push({
                        key: key,
                        keyData: "",
                    });
                } else {
                    arrayData.push({
                        key: key,
                        keyData: Payload[key],
                    });
                }
            } else {
                arrayData.push({
                    key: key,
                    keyData: Payload[key],
                });
            }
        });
        arrayData.map(({ key, keyData }: any) => {
            if (key === "unit_codes") {
                const stringify = JSON.stringify(keyData);
                if (router.query.id === undefined) {
                    formData.append("unit_codes", stringify);
                }
            } else {
                formData.append(key, keyData);
            }
        });

        if (
            button === "draft" &&
            router.query.id === undefined &&
            router.query.draft === undefined
        ) {
            DraftSave(formData);
        }
        if (
            router.query.draft === undefined &&
            router.query.id === undefined &&
            button !== "draft"
        )
            CreateSave(formData);
        if (
            router.query.draft !== undefined &&
            (button === "save" || button === "new")
        )
            mutateDraft(formData);

        if (router.query.id !== undefined) mutateUpdate(formData);
    };

    return (
        <ModalTemp>
            <div>
                {router.query.draft !== undefined
                    ? "Modify Draft"
                    : router.query.id !== undefined
                    ? "Modify"
                    : "Create"}{" "}
                Customer
            </div>
            {FormPage === "primary" && (
                <h1 className={style.modal_label_primary}>
                    Primary Informations
                </h1>
            )}
            {FormPage === "contact-information" && (
                <h1 className={style.modal_label_primary}>
                    Contact Informations
                </h1>
            )}
            {FormPage === "property" && (
                <h1 className={style.modal_label_primary}>
                    Property Informations
                </h1>
            )}
            {FormPage === "primary" && (
                <div className=" w-[95%] text-[12px] flex items-center justify-between mb-5">
                    <aside className=" w-4/12 480px:w-2/4">
                        <p className=" text-[12px] font-semibold mb-1 w-[90%]">
                            TYPE
                        </p>
                        <SelectDropdown
                            selectHandler={(value: string) => {
                                setCustomerForm({
                                    ...isCustomerForm,
                                    type: value,
                                });
                            }}
                            className=""
                            inputElement={
                                <input
                                    className="w-full field"
                                    value={isCustomerForm.type}
                                    readOnly
                                    autoComplete="off"
                                />
                            }
                            listArray={["Individual", "Company"]}
                        />

                        {isCustomerForm.type === "" && (
                            <label className=" font-NHU-bold">
                                Please Select a Type
                            </label>
                        )}
                    </aside>
                    <aside className=" flex w-4/12 justify-end 480px:w-2/5">
                        <span className="mr-2 font-bold">STATUS</span>
                        <div
                            onClick={() =>
                                setCustomerForm({
                                    ...isCustomerForm,
                                    status: !isCustomerForm.status,
                                })
                            }
                            className={`statusCircle ${
                                isCustomerForm.status ? "active" : "inactive"
                            }`}
                        ></div>
                    </aside>
                </div>
            )}
            {isCustomerForm.type === "" && <DefaultDisplayForm />}
            {isCustomerForm.type !== "" &&
                (FormPage === "primary" ||
                    FormPage === "contact-information") && (
                    <IndividualCompanyForm
                        isCustomerForm={isCustomerForm}
                        setCustomerForm={setCustomerForm}
                        FormPage={FormPage}
                        MutateHandler={CreateHandler}
                        setFormPage={setFormPage}
                        loadingUpdate={loadingUpdate}
                    />
                )}

            <div className={`${FormPage !== "property" && "hidden"}`}>
                <CustomerUnitCodeForm
                    setToggle={setFormPage}
                    isProperty={isUnitCode}
                    setProperty={setUnitCode}
                    classType={isCustomerForm.class}
                    CreateHandler={CreateHandler}
                    MutateLoadingDraft={
                        router.query.draft === undefined
                            ? MutateDraftLoading
                            : loadingDraft
                    }
                    MutateLoadingCreate={MutateLoading}
                />
            </div>
        </ModalTemp>
    );
}

const DefaultDisplayForm = () => {
    const router = useRouter();
    const { setCusToggle } = useContext(AppContext);
    const isProfileUrl = "/Images/sampleProfile.png";
    const isValidIDUrl = "/Images/id-sample.png";
    return (
        <>
            <ul className=" flex mb-5 flex-wrap 480px:mb-2">
                <li className=" border flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <aside className="w-20 h-20 relative flex mr-4">
                        <aside className=" bg-white h-full w-full rounded-full object-cover shadow-lg relative overflow-hidden">
                            <Image
                                src={`${isProfileUrl}`}
                                alt=""
                                layout="fill"
                                objectFit="cover"
                            />
                        </aside>
                        <input
                            type="file"
                            id="image"
                            className="hidden pointer-events-none"
                            data-type="profile"
                        />
                        <label
                            htmlFor="image"
                            className=" pointer-events-none  cursor-pointer hover:bg-ThemeRed50 p-1 rounded-full text-white bg-ThemeRed absolute text-[12px] right-[5px] bottom-[5px]"
                        >
                            <AiFillCamera />
                        </label>
                    </aside>
                </li>
                <li className="  flex items-center w-4/12 820px:w-2/4 480px:w-full mb-5">
                    <input
                        type="file"
                        id="validid"
                        className="hidden pointer-events-none"
                        data-type="validID"
                    />
                    <label
                        htmlFor="validid"
                        className="text-[12px] pointer-events-none text-ThemeRed font-NHU-medium cursor-pointer flex items-center"
                    >
                        <aside className=" w-24 mr-2 h-16 relative">
                            <Image
                                src={`${isValidIDUrl}`}
                                alt=""
                                layout="fill"
                                objectFit="contain"
                            />
                        </aside>
                        UPLOAD VALID ID
                    </label>
                </li>
                <li className="  flex flex-col  w-4/12 820px:w-2/4 480px:w-full mb-5 justify-center items-end">
                    <label
                        className=" pointer-events-none text-[12px] font-NHU-medium uppercase cursor-pointer w-[90%] 480px:w-full"
                        htmlFor="file"
                    >
                        Upload Signature
                    </label>
                    <input id="file" type="file" className="hidden" />
                </li>
            </ul>
            <ul className={style.ThreeRows}>
                <li>
                    <label>CLASS</label>
                    <div className="select">
                        <input
                            type="text"
                            autoComplete="off"
                            className=" pointer-events-none w-full"
                            readOnly
                        />
                        <span>
                            <MdOutlineKeyboardArrowDown />
                        </span>
                    </div>
                </li>
                <li>
                    <label>NAME</label>
                    <input type="text" className="field pointer-events-none" />
                </li>
                <li>
                    <label>SPOUSE / CO-OWNER</label>
                    <input type="email" className="field pointer-events-none" />
                </li>

                <li>
                    <label>CITIZENSHIP</label>
                    <input
                        type="number"
                        className="field pointer-events-none"
                    />
                </li>
                <li>
                    <label>BIRTH DATE</label>
                    <input
                        type="number"
                        className="field pointer-events-none"
                    />
                </li>
                <li>
                    <label>COMPANY NAME</label>
                    <input type="text" className="field pointer-events-none" />
                </li>
                <li>
                    <label>CONTACT PERSON</label>
                    <input type="text" className="field pointer-events-none" />
                </li>
                <li>
                    <label>TIN</label>
                    <input type="text" className="field pointer-events-none" />
                </li>
                <li>
                    <label>BRANCH CODE</label>
                    <input type="text" className="field pointer-events-none" />
                </li>
                <li>
                    <label>PORTAL ID</label>
                    <input type="text" className="field pointer-events-none" />
                </li>
            </ul>

            <div className=" w-full flex justify-end items-center">
                <aside
                    onClick={() => {
                        setCusToggle(false);
                        if (router.query.draft !== undefined) {
                            router.push("");
                        }
                    }}
                    className=" text-ThemeRed font-semibold text-[14px] mr-5 cursor-pointer"
                >
                    CANCEL
                </aside>
            </div>
        </>
    );
};
