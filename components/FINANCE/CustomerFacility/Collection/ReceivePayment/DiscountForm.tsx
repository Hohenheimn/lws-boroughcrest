import React, { useContext, useEffect, useState } from "react";
import { BarLoader, MoonLoader, ScaleLoader } from "react-spinners";
import { TableOneTotal } from "../../../../Reusable/TableTotal";
import Image from "next/image";
import Calendar from "../../../../Reusable/Calendar";
import BankAccountDropDown from "../../../../Reusable/BankAccountDropDown";
import { InputNumberForTable } from "../../../../Reusable/NumberFormat";
import { GetPropertyList } from "../../../../ReactQuery/PropertyMethod";
import TableErrorMessage from "../../../../Reusable/TableErrorMessage";
import { HiMinus } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";
import { HeaderForm } from "./ReceivePaymentForm";
import AppContext from "../../../../Context/AppContext";
import DropDownCharge from "../../../../Dropdowns/DropDownCharge";
import ModalTemp from "../../../../Reusable/ModalTemp";
import { CreateDiscount, DeleteDiscount, GetDiscountList } from "./Query";
import { MinusButtonTable, PlusButtonTable } from "../../../../Reusable/Icons";
import { ErrorSubmit } from "../../../../Reusable/ErrorMessage";

export type isDiscountTable = {
    id: string | number;
    charge: string;
    charge_id: string | number;
    description: string;
    amount: number;
    back_id: string | number;
    isLoading: false;
};
type Props = {
    setDiscountToggle: Function;
    customer_id: number | string;
    isDiscount: {
        value: number;
        toggle: boolean;
    };
};

export default function DiscountForm({
    setDiscountToggle,
    customer_id,
    isDiscount,
}: Props) {
    const { setPrompt } = useContext(AppContext);
    const [isTotal, setTotal] = useState(0);
    const [isTable, setTable] = useState<isDiscountTable[]>([]);

    const onSuccess = () => {
        setPrompt({
            message: "Discounts successfully registered!",
            type: "success",
            toggle: true,
        });
        setDiscountToggle({
            value: isTotal,
            toggle: false,
        });
    };
    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { isLoading: MutateLoading, mutate } = CreateDiscount(
        onSuccess,
        onError,
        customer_id
    );

    const onSuccessDelete = () => {
        setPrompt({
            message: "Discounts successfully deleted!",
            type: "success",
            toggle: true,
        });
    };
    const onErrorDelete = () => {
        setPrompt({
            message: "Something is wrong!",
            type: "error",
            toggle: true,
        });
    };

    const { isLoading: MutateDeleteLoading, mutate: mutateDelete } =
        DeleteDiscount(onSuccessDelete, onErrorDelete);

    const { isLoading, data, isError } = GetDiscountList();

    useEffect(() => {
        setTotal(0);
        isTable.map((item) => {
            setTotal((prevValue) => Number(prevValue) + Number(item.amount));
        });
    }, [isTable]);

    useEffect(() => {
        if (data?.status === 200) {
            const CloneArray = data?.data.map((item: any) => {
                return {
                    id: item.id,
                    back_id: item.id,
                    charge: item.charge,
                    charge_id: item.charge_id,
                    description: item.description,
                    amount: item.amount,
                    isLoading: false,
                };
            });
            if (CloneArray.length <= 0) {
                setTable([
                    ...CloneArray,
                    {
                        id: 1,
                        back_id: "",
                        charge: "",
                        charge_id: "",
                        description: "",
                        amount: 0,
                    },
                ]);
            } else {
                setTable(CloneArray);
            }
        }
    }, [data]);

    const SaveHandler = () => {
        let Validate = true;
        const CloneToPayload = isTable.map((item: isDiscountTable) => {
            if (item.charge_id === "" || item.amount === 0) {
                Validate = false;
            }
            return {
                charge_id: item.charge_id,
                description: item.description,
                amount: item.amount,
            };
        });
        const Payload = {
            discounts: CloneToPayload,
        };

        if (Validate) {
            mutate(Payload);
        } else {
            setPrompt({
                message: "Please fill out all required fields!",
                toggle: true,
                type: "draft",
            });
        }
    };

    return (
        <ModalTemp>
            <div>
                <h1 className="SectionTitle mb-5">Discount</h1>
                <div className="table_container">
                    <table className="table_list miniTable">
                        <thead className="textRed">
                            <tr>
                                <th>Charge</th>
                                <th>Description</th>
                                <th>Amount</th>
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
                                    mutateDelete={mutateDelete}
                                    mutateDeleteLoading={MutateDeleteLoading}
                                />
                            ))}
                        </tbody>
                    </table>
                    {isLoading && (
                        <div className="w-full flex justify-center items-center">
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
                <TableOneTotal
                    total={isTotal}
                    label="Total Discount"
                    redBG={false}
                />
                <div className="DropDownSave">
                    <button
                        className="ddback"
                        onClick={() =>
                            setDiscountToggle({ ...isDiscount, toggle: false })
                        }
                    >
                        CANCEL
                    </button>

                    <button className="buttonRed" onClick={SaveHandler}>
                        {MutateLoading ? (
                            <ScaleLoader
                                color="#fff"
                                height="10px"
                                width="2px"
                            />
                        ) : (
                            "SAVE"
                        )}
                    </button>
                </div>
            </div>
        </ModalTemp>
    );
}

type ListProps = {
    itemDetail: isDiscountTable;
    isTable: isDiscountTable[];
    setTable: Function;
    index: number;
    mutateDelete: any;
    mutateDeleteLoading: any;
};

const List = ({
    itemDetail,
    isTable,
    setTable,
    index,
    mutateDelete,
    mutateDeleteLoading,
}: ListProps) => {
    const AddRow = (e: any) => {
        const random = Math.random();
        setTable([
            ...isTable,
            {
                id: random,
                back_id: "",
                charge: "",
                charge_id: "",
                description: "",
                amount: 0,
                isLoading: false,
            },
        ]);
    };
    const RemoveRow = () => {
        updateValue("isLoading", "");
        if (itemDetail.back_id === "") {
            setTable((item: isDiscountTable[]) =>
                item.filter((x: isDiscountTable) => x.id !== itemDetail.id)
            );
        } else {
            mutateDelete(itemDetail.back_id);
        }
    };

    const updateValue = (keyField: string, value: any) => {
        const closeToUpdate = isTable.map((item: isDiscountTable) => {
            if (item.id === itemDetail.id) {
                if (keyField === "description") {
                    return {
                        ...item,
                        description: value,
                    };
                }
                if (keyField === "charge") {
                    const charge_id = value.target.getAttribute("data-id");
                    const charge = value.target.innerHTML;
                    const description =
                        value.target.getAttribute("data-description");
                    return {
                        ...item,
                        charge_id: charge_id,
                        charge: charge,
                        description: description,
                    };
                }

                if (keyField === "amount") {
                    return {
                        ...item,
                        amount: Number(value),
                    };
                }

                if (keyField === "isLoading") {
                    return {
                        ...item,
                        isLoading: true,
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
                    className="field mini"
                />
            </td>
            <td>
                <input
                    type="text"
                    className="field mini"
                    onChange={(e) => {
                        updateValue("description", e.target.value);
                    }}
                    value={itemDetail?.description}
                />
            </td>
            <td>
                <InputNumberForTable
                    className={"field mini number text-end"}
                    value={Number(itemDetail?.amount)}
                    onChange={updateValue}
                    type={"amount"}
                />
            </td>
            <td className="actionIcon">
                {itemDetail.isLoading ? (
                    <div>
                        <MoonLoader size={12} className="text-ThemeRed" />
                    </div>
                ) : (
                    <>
                        {isTable.length > 1 && (
                            <div onClick={RemoveRow}>
                                <MinusButtonTable />
                            </div>
                        )}
                    </>
                )}

                {isTable.length - 1 === index && (
                    <div
                        className="ml-5 1024px:ml-2"
                        onClick={(e) => AddRow(e)}
                    >
                        <PlusButtonTable />
                    </div>
                )}
            </td>
        </tr>
    );
};
