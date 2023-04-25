import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiArrowDownSFill } from "react-icons/ri";
import CustomerDropdown from "../../../Dropdowns/CustomerDropdown";
import DropDownCharge from "../../../Dropdowns/DropDownCharge";
import {
    InputNumberForTable,
    TextNumberDisplay,
    TextNumberDisplayPercent,
} from "../../../Reusable/NumberFormat";
import { MinusButtonTable, PlusButtonTable } from "../../../Reusable/Icons";
import AppContext from "../../../Context/AppContext";
import { useRouter } from "next/router";
import {
    CreateInvoiceBilling,
    DeleteInvoice,
    GetInvoiceListByCustomer,
    ModifyInvoiceBilling,
} from "./Query";
import { BarLoader, ScaleLoader } from "react-spinners";
import ModalTemp from "../../../Reusable/ModalTemp";
import { ErrorSubmit } from "../../../Reusable/ErrorMessage";
import DynamicPopOver from "../../../Reusable/DynamicPopOver";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";
import {
    NumberBlockInvalidKey,
    TextFieldValidation,
} from "../../../Reusable/InputField";

export type customerDD = {
    id: string | number;
    name: string;
    class: string;
    property: string[];
    properties?: any;
};

type billingArray = billingObject[];
type billingObject = {
    id: number | string;
    charge_id: string | number;
    charge: any;
    charge_vat: string | number;
    description: string;
    unit_price: number | string;
    quantity: number | string;
    uom: any;
    vat: number | string;
    amount: number | string;
    property_unit_code: string;
    property_id: string;
    billing_batch_list_id: string | null;
    billing_readings_list_id: string | null;
};
type Props = {
    DefaultValue: billingArray;
    formType: string;
    DefaultCustomer: customerDD;
};
export default function JournalForm({
    DefaultValue,
    DefaultCustomer,
    formType,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [deleteToggle, setDeleteToggle] = useState(false);
    const router = useRouter();
    let buttonClicked = "";
    const [totalAmount, setTotalAmount] = useState<number | string>("");
    const [isSave, setSave] = useState(false);
    const [isBilling, setBilling] = useState<billingArray>(DefaultValue);
    const [isBillingFromReading, setBillingFromReading] =
        useState<billingArray>([]);
    const [isCustomer, setCustomer] = useState<customerDD>({
        id: DefaultCustomer?.id,
        name: DefaultCustomer?.name,
        class: DefaultCustomer?.class,
        property: DefaultCustomer?.property,
        properties: DefaultCustomer?.properties,
    });

    const [isUnitCodes, setUnitCodes] = useState<any>([]);

    useEffect(() => {
        setTotalAmount("");
        let total = 0;
        isBilling.map((item) => {
            total = Number(total) + Number(item.amount);
        });
        isBillingFromReading.map((item) => {
            total = Number(total) + Number(item.amount);
        });
        setTotalAmount(total);
    }, [isBilling]);

    useEffect(() => {
        if (isCustomer.id !== "") {
            setUnitCodes(isCustomer?.properties);
        }
    }, [isCustomer]);

    const { data, isLoading, isError } = GetInvoiceListByCustomer(
        isCustomer.id
    );

    useEffect(() => {
        if (isCustomer.id !== "") {
            // billing_batch_list_id
            // Pass only the key of billing_readings_list_id is not equal to null
            const GetInvoiceFromReading = data?.data?.invoice_list.filter(
                (item: any) => item?.billing_readings_list_id !== null
            );
            if (GetInvoiceFromReading !== undefined) {
                const InvoiceListFromReading = GetInvoiceFromReading.map(
                    (item: any) => {
                        return {
                            id: -1,
                            charge: item?.charge?.name,
                            charge_id: item.charge_id,
                            charge_vat: item.vat,
                            description: item.description,
                            unit_price: item.unit_price,
                            quantity: item.quantity,
                            uom: item.charge?.uom?.name,
                            vat: item.vat,
                            amount: item.amount,
                            property_unit_code: item.property.unit_code,
                            property_id: item.property_unit_id,
                            billing_batch_list_id:
                                item.billing_batch_list_id === undefined
                                    ? null
                                    : item.billing_batch_list_id,
                            billing_readings_list_id:
                                item.billing_readings_list_id === undefined
                                    ? null
                                    : item.billing_readings_list_id,
                        };
                    }
                );
                if (InvoiceListFromReading !== undefined) {
                    setBillingFromReading(InvoiceListFromReading);
                } else {
                    setBillingFromReading([]);
                }
            }
            const GetInvoiceFromBatch = data?.data?.invoice_list.filter(
                (item: any) => item?.billing_batch_list_id !== null
            );
            if (GetInvoiceFromBatch !== undefined) {
                const InvoiceListFromBatch = GetInvoiceFromBatch.map(
                    (item: any) => {
                        return {
                            id: item.billing_batch_list_id,
                            charge: item?.charge?.name,
                            charge_id: item.charge_id,
                            charge_vat: item.vat,
                            description: item.description,
                            unit_price: item.unit_price,
                            quantity: item.quantity,
                            uom: item.charge?.uom?.name,
                            vat: item.vat,
                            amount: item.amount,
                            property_unit_code: item.property.unit_code,
                            property_id: item.property_unit_id,
                            billing_batch_list_id:
                                item.billing_batch_list_id === undefined
                                    ? null
                                    : item.billing_batch_list_id,
                            billing_readings_list_id:
                                item.billing_readings_list_id === undefined
                                    ? null
                                    : item.billing_readings_list_id,
                        };
                    }
                );
                if (InvoiceListFromBatch !== undefined) {
                    if (InvoiceListFromBatch.length <= 0) {
                        setBilling([
                            {
                                id: 0,
                                charge: "",
                                charge_id: "",
                                charge_vat: "",
                                description: "",
                                unit_price: "",
                                quantity: "",
                                uom: "",
                                vat: "",
                                amount: "",
                                property_unit_code: "",
                                property_id: "",
                                billing_readings_list_id: null,
                                billing_batch_list_id: null,
                            },
                        ]);
                    } else {
                        setBilling(InvoiceListFromBatch);
                    }
                } else {
                    setBilling([
                        {
                            id: 0,
                            charge: "",
                            charge_id: "",
                            charge_vat: "",
                            description: "",
                            unit_price: "",
                            quantity: "",
                            uom: "",
                            vat: "",
                            amount: "",
                            property_unit_code: "",
                            property_id: "",
                            billing_readings_list_id: null,
                            billing_batch_list_id: null,
                        },
                    ]);
                }
            }
        }
    }, [isCustomer, data?.status]);

    const onSuccess = () => {
        setPrompt({
            message: `Invoice successfully ${
                formType === "create" ? "registered" : "updated"
            }`,
            type: "success",
            toggle: true,
        });
        if (buttonClicked === "save") {
            router.push("/finance/customer-facility/billing/invoice-list");
        } else {
            if (formType === "create") {
                setCustomer({
                    id: "",
                    name: "",
                    class: "",
                    property: [],
                });
                setBillingFromReading([]);
                setBilling([
                    {
                        id: 0,
                        charge: "",
                        charge_id: "",
                        charge_vat: "",
                        description: "",
                        unit_price: "",
                        quantity: "",
                        uom: "",
                        vat: "",
                        amount: "",
                        property_unit_code: "",
                        property_id: "",
                        billing_batch_list_id: null,
                        billing_readings_list_id: null,
                    },
                ]);
            } else if (formType === "modify") {
                router.push("/finance/customer-facility/billing/invoice-list");
            }
        }
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: isLoadingSave, mutate: mutateSave } =
        CreateInvoiceBilling(onSuccess, onError);

    const Submit = (button: string) => {
        setSave(false);
        let validate = true;
        buttonClicked = button;

        const InvoiceListInputed = isBilling.map((item: billingObject) => {
            return {
                charge_id: Number(item.charge_id),

                description: item.description,
                unit_price: Number(item.unit_price),
                quantity: Number(item.quantity),
                vat: Number(item.vat),
                amount: Number(item.amount),
                property_unit_id: item.property_id,
                billing_batch_list_id:
                    item.billing_batch_list_id === undefined
                        ? null
                        : item.billing_batch_list_id,
                billing_readings_list_id:
                    item.billing_readings_list_id === undefined
                        ? null
                        : item.billing_readings_list_id,
            };
        });
        const InvoiceListFromCustomer = isBillingFromReading.map(
            (item: billingObject) => {
                return {
                    charge_id: Number(item.charge_id),
                    description: item.description,
                    unit_price: Number(item.unit_price),
                    quantity: Number(item.quantity),
                    vat: Number(item.vat),
                    amount: Number(item.amount),
                    property_unit_id: item.property_id,
                    billing_batch_list_id:
                        item.billing_batch_list_id === undefined
                            ? null
                            : item.billing_batch_list_id,
                    billing_readings_list_id:
                        item.billing_readings_list_id === undefined
                            ? null
                            : item.billing_readings_list_id,
                };
            }
        );

        const Payload = {
            invoice_id: data?.data?.id === undefined ? null : data?.data?.id,
            customer_id: isCustomer.id,
            due_amount: Number(totalAmount),
            invoice_list: [...InvoiceListInputed, ...InvoiceListFromCustomer],
        };

        if (isCustomer.id === "") {
            setPrompt({
                message: "Fill out all fields",
                type: "draft",
                toggle: true,
            });
            return;
        }
        isBilling.map((item: billingObject) => {
            if (item.charge_id === "") {
                validate = false;
                setPrompt({
                    message: "Fill out all fields",
                    type: "draft",
                    toggle: true,
                });
            }
        });
        if (validate) {
            mutateSave(Payload);
        }
    };

    const onSuccessDelete = () => {
        router.push("/finance/customer-facility/billing/invoice-list");
    };

    const { isLoading: deleteLoading, mutate: mutateDelete } = DeleteInvoice(
        onSuccessDelete,
        onError
    );
    const deleteID: any = router.query.modify;
    const DeleteHandler = () => {
        mutateDelete(deleteID);
    };

    return (
        <>
            {deleteToggle && (
                <ModalTemp narrow={true}>
                    <h1 className="text-center mb-5">
                        Invoice will be deleted and changes is not reversible.
                        Are you sure of this action?
                    </h1>
                    <div className="flex justify-end items-center w-full">
                        <button
                            className="button_cancel"
                            onClick={() => setDeleteToggle(false)}
                        >
                            CANCEL
                        </button>
                        <button
                            className="buttonRed"
                            onClick={() => DeleteHandler()}
                        >
                            {deleteLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "CONFIRM"
                            )}
                        </button>
                    </div>
                </ModalTemp>
            )}
            <div>
                <ul className="flex flex-wrap justify-between pb-8 mb-8 border-b border-gray-300">
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2 480px:w-full">
                        <p className="labelField">CUSTOMER</p>
                        <CustomerDropdown
                            setCustomer={setCustomer}
                            isCustomer={isCustomer}
                        />
                    </li>
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2">
                        <p className=" labelField">CLASS</p>
                        <h1>{isCustomer.class}</h1>
                    </li>
                    <li className="w-[32%] 820px:w-2/4 820px:mb-2">
                        <p className=" labelField">PROPERTY</p>
                        <h1>
                            {isCustomer.property.toString().replace(",", ", ")}
                        </h1>
                    </li>
                </ul>
                <div className="table_container">
                    <table className="table_list forCrud">
                        <thead className="textRed">
                            <tr>
                                <th>CHARGE</th>
                                <th>PROPERTY</th>
                                <th>DESCRIPTION</th>
                                <th>UNIT PRICE</th>
                                <th>QUANTITY</th>
                                <th>UOM</th>
                                <th>VAT</th>
                                <th>AMOUNT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isBillingFromReading?.map(
                                (item: billingObject, index: number) => (
                                    <List
                                        key={index}
                                        index={index}
                                        setState={setBilling}
                                        itemList={item}
                                        isState={isBilling}
                                        isUnitCodes={isUnitCodes}
                                    />
                                )
                            )}
                            {isBilling?.map(
                                (item: billingObject, index: number) => (
                                    <List
                                        key={index}
                                        index={index}
                                        setState={setBilling}
                                        itemList={item}
                                        isState={isBilling}
                                        isUnitCodes={isUnitCodes}
                                    />
                                )
                            )}
                        </tbody>
                    </table>
                    {isLoading && (
                        <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
                            <aside className="text-center flex justify-center py-5">
                                <BarLoader
                                    color={"#8f384d"}
                                    height="10px"
                                    width="200px"
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </aside>
                        </div>
                    )}
                    {isError && <TableErrorMessage />}
                </div>
                <div className="mt-10 border-b border-ThemeRed"></div>
                <div className="flex flex-wrap justify-end py-5 480px:justify-start">
                    <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                        TOTAL
                    </h1>

                    <div className=" relative flex items-center text-[#757575] font-NHU-bold w-[200px] ">
                        <aside className=" content-['₱'] absolute top-[0%] h-full flex items-center left-2 z-10">
                            <Image
                                src="/Images/peso.png"
                                height={13}
                                width={10}
                                alt=""
                            />
                        </aside>

                        <TextNumberDisplay
                            value={totalAmount}
                            className={
                                "text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-end items-center mt-14 480px:mt-10 ">
                <button className="button_cancel">CANCEL</button>

                {formType === "modify" && (
                    <button
                        className="buttonRed mr-5"
                        onClick={() => setDeleteToggle(true)}
                    >
                        DELETE
                    </button>
                )}

                <div className="ddSave">
                    <div>
                        <button
                            type="submit"
                            name="save"
                            className="ddsave_button"
                            onClick={() => {
                                Submit("save");
                            }}
                        >
                            {isLoadingSave ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "SAVE"
                            )}
                        </button>
                        <aside className="ddArrow">
                            <RiArrowDownSFill
                                onClick={() => setSave(!isSave)}
                            />
                        </aside>
                    </div>
                    {isSave && (
                        <ul className="bottomSide">
                            <li>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        Submit("new");
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

type List = {
    index: number;
    itemList: billingObject;
    setState: Function;
    isState: billingArray;
    isUnitCodes: any;
};

const List = ({ itemList, setState, isState, index, isUnitCodes }: List) => {
    const { setPrompt } = useContext(AppContext);

    // Computation of Amount and Vat
    useEffect(() => {
        const Vat =
            Number(itemList.unit_price) *
            Number(itemList.quantity) *
            (Number(itemList.charge_vat) / 100);
        const Amount =
            Number(itemList.unit_price) * Number(itemList.quantity) +
            Number(Vat);

        const CloneToUpdate = isState.map((item) => {
            if (item.id === itemList.id) {
                return {
                    ...item,
                    amount: Amount,
                    vat: Vat,
                };
            }
            return item;
        });
        setState(CloneToUpdate);
    }, [itemList.charge_vat, itemList.quantity, itemList.unit_price]);

    const AddJournal = () => {
        const random = Math.random();
        setState((temp: any) => [
            ...temp,
            {
                id: random,
                charge_id: "",
                charge: "",
                charge_vat: "",
                description: "",
                unit_price: "",
                quantity: "",
                uom: "",
                vat: "",
                amount: "",
                property_unit_code: "",
                property_id: "",
                billing_batch_list_id: null,
                billing_readings_list_id: null,
            },
        ]);
    };
    const RemoveJournal = () => {
        setState((item: any[]) =>
            item.filter((x: any) => x.id !== itemList.id)
        );
    };
    const updateValue = (key: string, e: any) => {
        const newItems = isState.map((item: any) => {
            if (itemList.id == item.id) {
                if (key === "charge") {
                    return {
                        ...item,
                        charge: e.target.innerHTML,
                        charge_id: e.target.getAttribute("data-id"),
                        description: e.target.getAttribute("data-description"),
                        uom: e.target.getAttribute("data-uom"),
                        charge_vat: e.target.getAttribute("data-vat"),
                    };
                } else if (key === "description") {
                    return {
                        ...item,
                        description: e.target.value,
                    };
                } else if (key === "unit_price") {
                    return {
                        ...item,
                        unit_price: e,
                    };
                } else if (key === "quantity") {
                    return {
                        ...item,
                        quantity: e.target.value,
                    };
                } else if (key === "unit_code") {
                    return {
                        ...item,
                        quantity: e.target.value,
                    };
                }
            }
            return item;
        });
        setState(newItems);
    };
    const UpdateUnitCode = (unit_code: string, id: string) => {
        const newItems = isState.map((item: any) => {
            if (itemList.id == item.id) {
                return {
                    ...item,
                    property_unit_code: unit_code,
                    property_id: id,
                };
            }
            return item;
        });
        setState(newItems);
    };
    const [toggleUC, setToggleUC] = useState(false);
    return (
        <tr>
            <td>
                {itemList.billing_readings_list_id !== null ? (
                    <input
                        type="text"
                        readOnly
                        value={itemList.charge}
                        className="field w-full disabled"
                    />
                ) : (
                    <DropDownCharge
                        UpdateStateHandler={updateValue}
                        itemDetail={itemList}
                    />
                )}
            </td>
            <td>
                <DynamicPopOver
                    className="w-full"
                    samewidth={true}
                    toRef={
                        <input
                            type="text"
                            value={itemList.property_unit_code}
                            className={`field ${
                                itemList.billing_readings_list_id !== null &&
                                "disabled"
                            }`}
                            readOnly
                            onClick={() => setToggleUC(true)}
                        />
                    }
                    toPop={
                        <>
                            {toggleUC && (
                                <UnitCodeDropdownList
                                    isUnitCodes={isUnitCodes}
                                    setToggle={setToggleUC}
                                    UpdateUnitCode={UpdateUnitCode}
                                />
                            )}
                        </>
                    }
                />
            </td>
            <td>
                <input
                    className={`field ${
                        itemList.billing_readings_list_id !== null && "disabled"
                    }`}
                    type="text"
                    value={itemList.description}
                    onChange={(e) => {
                        if (!TextFieldValidation(e, 50)) return;
                        updateValue("description", e);
                    }}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={`field number ${
                        itemList.billing_readings_list_id !== null && "disabled"
                    }`}
                    value={Number(itemList.unit_price)}
                    onChange={updateValue}
                    type={"unit_price"}
                />
            </td>
            <td>
                <input
                    className={`field ${
                        itemList.billing_readings_list_id !== null && "disabled"
                    }`}
                    type="number"
                    onKeyDown={NumberBlockInvalidKey}
                    value={itemList.quantity}
                    onChange={(e) => {
                        updateValue("quantity", e);
                    }}
                />
            </td>
            <td>
                <input
                    className="field disabled"
                    type="text"
                    readOnly
                    value={itemList.uom}
                />
            </td>
            <td>
                <TextNumberDisplayPercent
                    className="field disabled w-[500px]"
                    value={itemList.vat}
                />
            </td>
            <td>
                <InputNumberForTable
                    value={itemList.amount}
                    className={`number field inline-block w-full disabled`}
                    onChange={() => {}}
                    type={""}
                />
            </td>
            <td className="actionIcon">
                {itemList.billing_readings_list_id === null && (
                    <>
                        {isState.length > 1 && (
                            <div onClick={RemoveJournal}>
                                <MinusButtonTable />
                            </div>
                        )}
                        {isState.length - 1 === index && (
                            <div
                                className="ml-5 1024px:ml-2"
                                onClick={AddJournal}
                            >
                                <PlusButtonTable />
                            </div>
                        )}
                    </>
                )}
            </td>
        </tr>
    );
};

type UnitCodeDropdown = {
    isUnitCodes: any;
    setToggle: Function;
    UpdateUnitCode: (unit_code: string, id: string) => void;
};

const UnitCodeDropdownList = ({
    isUnitCodes,
    setToggle,
    UpdateUnitCode,
}: UnitCodeDropdown) => {
    const modal = useRef<any>();
    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal.current.contains(e.target)) {
                setToggle(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <ul className="dropdown-list w-full" ref={modal}>
            {isUnitCodes.map((item: any, index: number) => (
                <li
                    key={index}
                    onClick={() => {
                        UpdateUnitCode(item.unit_code, item.id);
                        setToggle(false);
                    }}
                >
                    {item.unit_code}
                </li>
            ))}
            {isUnitCodes.length <= 0 && <li>Customer have no Property</li>}
        </ul>
    );
};
