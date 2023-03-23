import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { RiArrowDownSFill } from "react-icons/ri";
import { ScaleLoader } from "react-spinners";
import index from "../../../../../pages/project";
import AppContext from "../../../../Context/AppContext";
import DropDownCharge from "../../../../Dropdowns/DropDownCharge";
import { InputNumberForTable } from "../../../../Reusable/NumberFormat";
import { TableOneTotal } from "../../../../Reusable/TableTotal";
import { CreateCollection } from "./Query";
import { HeaderForm } from "./ReceivePaymentForm";

type Props = {
    DefaultValue: isTableItem[];
    Error: () => void;
    headerForm: HeaderForm;
    ResetField: () => void;
};

type isTableItem = {
    id: string | number;
    charge: string;
    charge_id: string;
    description: string;
    amount: number | string;
};

export default function AcknowledgementForm({
    DefaultValue,
    Error,
    headerForm,
    ResetField,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [isTable, setTable] = useState<isTableItem[]>([]);
    let buttonClicked = "";
    useEffect(() => {
        setTable(DefaultValue);
    }, []);

    const [isSave, setSave] = useState(false);

    const router = useRouter();

    const onSuccess = () => {
        setPrompt({
            message: "Collection successfully registered!",
            type: "success",
            toggle: true,
        });
        if (buttonClicked === "new") {
            ResetField();
            setTable([
                {
                    id: 1,
                    charge: "",
                    charge_id: "",
                    description: "",
                    amount: 0,
                },
            ]);
        } else {
            router.push(
                "/finance/customer-facility/collection/payment-register"
            );
        }
    };
    const onError = () => {
        setPrompt({
            message: "Something is wrong!",
            type: "error",
            toggle: true,
        });
    };

    const { isLoading, mutate } = CreateCollection(onSuccess, onError);

    const SaveHandler = (button: string) => {
        buttonClicked = button;
        let validate = true;
        isTable.map((provItem: isTableItem) => {
            if (
                provItem.amount === "" ||
                provItem.charge === "" ||
                provItem.charge_id === ""
            ) {
                setPrompt({
                    toggle: true,
                    message: "Fill out the fields!",
                    type: "draft",
                });
                validate = false;
                return;
            }
        });
        if (
            headerForm.amount_paid === "" ||
            headerForm.bank_account_id === "" ||
            headerForm.customer_id === "" ||
            headerForm.deposit_date === "" ||
            headerForm.mode_of_payment === "" ||
            headerForm.receipt_date === "" ||
            headerForm.reference_no === ""
        ) {
            setPrompt({
                toggle: true,
                message: "Fill out the fields!",
                type: "draft",
            });
            validate = false;
            return;
        }
        const receipt_date = parse(
            headerForm.receipt_date,
            "MMM dd yyyy",
            new Date()
        );
        const deposit_date = parse(
            headerForm.deposit_date,
            "MMM dd yyyy",
            new Date()
        );

        const Payload = {
            customer_id: headerForm.customer_id,
            receipt_date: isValid(receipt_date)
                ? format(receipt_date, "yyyy-MM-dd")
                : "",
            description: headerForm.description,
            mode_of_payment: headerForm.mode_of_payment,
            deposit_date: isValid(deposit_date)
                ? format(deposit_date, "yyyy-MM-dd")
                : "",
            amount_paid: headerForm.amount_paid,
            bank_account_id: headerForm.bank_account_id,
            reference_no: headerForm.reference_no,
            deposits: isTable.map((item: isTableItem) => {
                return {
                    charge_id: item.charge_id,
                    description: item.description,
                    amount: item.amount,
                };
            }),
        };
        if (validate) mutate(Payload);
    };

    return (
        <>
            <h1 className="SectionTitle mb-5">Deposits</h1>
            <div className="table_container">
                <table className="table_list journal">
                    <thead className="textRed">
                        <tr>
                            <th>CHARGE</th>
                            <th>DESCRIPTION</th>
                            <th>AMOUNT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isTable.map((item, index) => (
                            <List
                                key={index}
                                itemDetail={item}
                                isTable={isTable}
                                setTable={setTable}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <TableOneTotal total={6545646} label="SUB DUE" redBG={false} />
            <TableOneTotal total={6545646} label="VARIANCE" redBG={true} />
            <div className="DropDownSave">
                <button className="ddback">CANCEL</button>
                <div className="ddSave">
                    <div>
                        <button
                            type="submit"
                            name="save"
                            className="ddsave_button"
                            onClick={() => {
                                SaveHandler("save");
                                Error();
                                setSave(false);
                            }}
                        >
                            {isLoading ? (
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
                        <ul>
                            <li>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        SaveHandler("new");
                                        Error();
                                        setSave(false);
                                    }}
                                >
                                    {isLoading ? (
                                        <ScaleLoader
                                            color="#fff"
                                            height="10px"
                                            width="2px"
                                        />
                                    ) : (
                                        "SAVE & NEW"
                                    )}
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
    setTable: Function;
    isTable: isTableItem[];
    itemDetail: isTableItem;
    index: number;
};

const List = ({ setTable, isTable, itemDetail, index }: List) => {
    const AddRow = (e: any) => {
        const random = Math.random();
        setTable([
            ...isTable,
            {
                id: random,
                charge: "",
                charge_id: "",
                description: "",
                amount: 0,
            },
        ]);
    };
    const RemoveRow = () => {
        setTable((item: isTableItem[]) =>
            item.filter((x: isTableItem) => x.id !== itemDetail.id)
        );
    };

    const updateValue = (keyField: string, value: any) => {
        const closeToUpdate = isTable.map((item: isTableItem) => {
            if (item.id === itemDetail.id) {
                if (keyField === "charge") {
                    const charge_id = value.target.getAttribute("data-id");
                    const charge = value.target.innerHTML;
                    const description =
                        value.target.getAttribute("data-description");
                    return {
                        ...item,
                        charge: charge,
                        charge_id: charge_id,
                        description: description,
                    };
                }
                if (keyField === "description") {
                    return {
                        ...item,
                        description: value,
                    };
                }
                if (keyField === "amount") {
                    return {
                        ...item,
                        amount: Number(value),
                    };
                }
            }
            return item;
        });
        setTable(closeToUpdate);
    };

    return (
        <tr>
            <td>
                <DropDownCharge
                    UpdateStateHandler={updateValue}
                    itemDetail={itemDetail}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="field"
                    onChange={(e) => {
                        updateValue("description", e.target.value);
                    }}
                    value={itemDetail?.description}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={"field number text-end"}
                    value={Number(itemDetail?.amount)}
                    onChange={updateValue}
                    type={"amount"}
                />
            </td>
            <td className="actionIcon">
                {isTable.length > 1 && (
                    <div onClick={RemoveRow}>
                        <HiMinus />
                    </div>
                )}
                {isTable.length - 1 === index && (
                    <div
                        className="ml-5 1024px:ml-2"
                        onClick={(e) => AddRow(e)}
                    >
                        <BsPlusLg />
                    </div>
                )}
            </td>
        </tr>
    );
};
