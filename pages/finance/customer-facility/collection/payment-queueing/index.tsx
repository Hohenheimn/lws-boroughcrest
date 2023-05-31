import Tippy from "@tippy.js/react";
import { format, isValid, parse } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BarLoader, ScaleLoader } from "react-spinners";
import HeaderCollection from "../../../../../components/FINANCE/CustomerFacility/Collection/HeaderCollection";
import {
    GetCollectionList,
    UpdateStatusQueueing,
} from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import { GetCustomer } from "../../../../../components/ReactQuery/CustomerMethod";
import ModalTemp from "../../../../../components/Reusable/ModalTemp";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";
import Pagination from "../../../../../components/Reusable/Pagination";
import TableErrorMessage from "../../../../../components/Reusable/TableErrorMessage";
import { customer } from "../../../../../types/customerList";
import { CollectionItem } from "../payment-register";
import { AiOutlineClose } from "react-icons/ai";
import { ErrorSubmit } from "../../../../../components/Reusable/ErrorMessage";
import AppContext from "../../../../../components/Context/AppContext";
import { TextFieldValidation } from "../../../../../components/Reusable/InputField";

export default function PaymentQueueing() {
    const { setPrompt } = useContext(AppContext);
    const router = useRouter();
    const [isFilterText, setFilterText] = useState<string[]>([]);
    const [isSearch, setSearch] = useState("");
    const [isPeriod, setPeriod] = useState({
        from: "",
        to: "",
    });

    const [TablePage, setTablePage] = useState(1);

    const { isLoading, data, isError } = GetCollectionList(
        isSearch,
        "",
        "",
        TablePage,
        [],
        "Queued"
    );

    const [isID, setID] = useState<number>(0);

    const [isRemark, setRemark] = useState("");

    const [isProofPayment, setProofPayment] = useState(
        "/Images/sample_coming.png"
    );

    useEffect(() => {
        setRemark("");
        if (router.query.reject !== undefined) {
            setID(Number(router.query.reject));
        }
        if (router.query.remark !== undefined) {
            setID(Number(router.query.remark));
        }
        if (router.query.view_proof_of_payment !== undefined) {
            setID(Number(router.query.view_proof_of_payment));
        }
    }, [router.query.reject, router.query.remark]);

    const onSuccess = () => {
        setPrompt({
            message: "Succuessfully Updated!",
            toggle: true,
            type: "success",
        });
        router.push("");
    };

    const onError = (e: any) => {
        ErrorSubmit(e, setPrompt);
    };

    const { mutate, isLoading: mutateLoading } = UpdateStatusQueueing(
        onSuccess,
        onError,
        isID
    );

    const RemarksHandler = (status: string) => {
        if (isRemark === "") {
            setPrompt({
                message: "Fill out remark!",
                toggle: true,
                type: "draft",
            });
        }
        const Payload = {
            status: status,
            remarks: isRemark,
        };
        mutate(Payload);
    };

    return (
        <>
            {router.query.remark !== undefined && (
                <ModalTemp narrow={true}>
                    <h1 className="text-ThemeRed mb-2">Remarks</h1>
                    <textarea
                        name=""
                        id=""
                        className="field w-full mb-5"
                        value={isRemark}
                        onChange={(e) => {
                            if (!TextFieldValidation(e, 200)) return;
                            setRemark(e.target.value);
                        }}
                    ></textarea>
                    <div className="flex justify-end items-center w-full">
                        <Link href="">
                            <a className="button_cancel">CANCEL</a>
                        </Link>
                        <button
                            className="buttonRed"
                            onClick={() => RemarksHandler("Archived")}
                        >
                            {mutateLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "ARCHIVED"
                            )}
                        </button>
                    </div>
                </ModalTemp>
            )}
            {router.query.reject !== undefined && (
                <ModalTemp narrow={true}>
                    <h1 className="text-ThemeRed mb-2">Remarks</h1>
                    <textarea
                        name=""
                        id=""
                        className="field w-full mb-5"
                        value={isRemark}
                        onChange={(e) => {
                            if (!TextFieldValidation(e, 200)) return;
                            setRemark(e.target.value);
                        }}
                    ></textarea>
                    <div className="flex justify-end items-center w-full">
                        <Link href="">
                            <a className="button_cancel">CANCEL</a>
                        </Link>
                        <button
                            className="buttonRed"
                            onClick={() => RemarksHandler("Rejected")}
                        >
                            {mutateLoading ? (
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            ) : (
                                "REJECT"
                            )}
                        </button>
                    </div>
                </ModalTemp>
            )}
            {router.query.view_proof_of_payment !== undefined && (
                <ModalTemp narrow={true}>
                    <div className="relative w-full">
                        <Image
                            src={isProofPayment}
                            height={500}
                            width={500}
                            objectFit="contain"
                            alt="alt"
                        />
                    </div>
                    <Link href="">
                        <a className="buttonRed">CLOSE</a>
                    </Link>
                </ModalTemp>
            )}
            <HeaderCollection
                setFilterText={setFilterText}
                isSearch={isSearch}
                setSearch={setSearch}
                FilterEndpoint="/finance/general-ledger/journal/filter-options"
                page="payment-queueing"
                isPeriod={isPeriod}
                setPeriod={setPeriod}
            />
            <div className="table_container">
                <table className="table_list journal">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Class</th>
                            <th>Property</th>
                            <th>Amount Received</th>
                            <th>Deposit Date</th>
                            <th>Reference No.</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.data.map(
                            (item: CollectionItem, index: number) => (
                                <List key={index} itemDetail={item} />
                            )
                        )}
                    </tbody>
                </table>

                {isLoading && (
                    <div className="w-full flex justify-center items-center">
                        <aside className="text-center flex justify-center py-5">
                            <BarLoader
                                color={"#8f384d"}
                                height="6px"
                                width="200px"
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </aside>
                    </div>
                )}
                {isError && <TableErrorMessage />}
            </div>
            <Pagination
                setTablePage={setTablePage}
                TablePage={TablePage}
                PageNumber={data?.data.meta.last_page}
                CurrentPage={data?.data.meta.current_page}
            />
        </>
    );
}

type ListProps = {
    itemDetail: CollectionItem;
};

const List = ({ itemDetail }: ListProps) => {
    const router = useRouter();

    const date = parse(itemDetail.deposit_date, "yyyy-MM-dd", new Date());

    const [isHover, setHover] = useState(false);

    return (
        <tr
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <td>{itemDetail.customer?.name}</td>
            <td>{itemDetail.customer?.class}</td>
            <td>
                {itemDetail.customer?.properties.map(
                    (item: any, index: number) =>
                        itemDetail.customer?.properties.length - 1 === index
                            ? item.unit_code
                            : item.unit_code + ", "
                )}
            </td>
            <td>
                <TextNumberDisplay
                    className="withPeso w-full"
                    value={itemDetail.amount_paid}
                />
            </td>
            <td>{isValid(date) ? format(date, "MMM dd yyyy") : ""}</td>
            <td>{itemDetail?.reference_no}</td>
            <td>
                {itemDetail.remarks.map((item, index: number) =>
                    itemDetail.customer?.properties.length - 1 === index
                        ? item.remarks
                        : item.remarks + ", "
                )}
            </td>
            <td className="">
                <ul
                    className={`${
                        isHover ? "opacity-1" : "opacity-0"
                    } flex items-center justify-around`}
                >
                    <Tippy content={"Archived"} theme="ThemeRed">
                        <li>
                            <Link href={`?remark=${itemDetail.id}`}>
                                <a>
                                    <Image
                                        src="/Images/f_remark.png"
                                        width={20}
                                        height={20}
                                        alt="Remark"
                                    />
                                </a>
                            </Link>
                        </li>
                    </Tippy>

                    <Tippy content={"Reject"} theme="ThemeRed">
                        <li>
                            <Link href={`?reject=${itemDetail.id}`}>
                                <a>
                                    <AiOutlineClose className="text-ThemeRed text-[24px]" />
                                </a>
                            </Link>
                        </li>
                    </Tippy>

                    <Tippy content={"Modify"} theme="ThemeRed">
                        <li>
                            <Link
                                href={`/finance/customer-facility/collection/receive-payment/${itemDetail.id}?from=payment_queueing`}
                            >
                                <a>
                                    <Image
                                        src="/Images/f_opposite_arrow.png"
                                        width={22}
                                        height={18}
                                        alt="Modify"
                                    />
                                </a>
                            </Link>
                        </li>
                    </Tippy>

                    <Tippy content={"View Proof of Payment"} theme="ThemeRed">
                        <li>
                            <Link
                                href={`?view_proof_of_payment=${itemDetail.id}`}
                            >
                                <a>
                                    <Image
                                        src="/Images/f_attach.png"
                                        width={20}
                                        height={20}
                                        alt="Attach"
                                    />
                                </a>
                            </Link>
                        </li>
                    </Tippy>
                </ul>
            </td>
        </tr>
    );
};
