import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import DynamicPopOver from "../Reusable/DynamicPopOver";
import { customerDD } from "../FINANCE/CustomerFacility/Billing/BillingForm";

type Props = {
    isCustomer: customerDD;
    setCustomer: Function;
};

export default function CustomerDropdown({ isCustomer, setCustomer }: Props) {
    const [isToggle, setToggle] = useState(false);
    const [isSearchTemp, setSearchTemp] = useState(isCustomer.name);
    useEffect(() => {
        setSearchTemp(isCustomer.name);
    }, [isCustomer]);
    const selectedItem = (CustomerObject: any) => {
        const cloneToGetProperties = CustomerObject?.properties.map(
            (item: any) => {
                return item[0].unit_code;
            }
        );
        setCustomer({
            id: CustomerObject.id,
            name: CustomerObject.name,
            class: CustomerObject.class,
            property: cloneToGetProperties,
        });
        setSearchTemp(CustomerObject.name);
        setToggle(false);
    };
    return (
        <>
            <DynamicPopOver
                className="w-full max-w-[300px]"
                samewidth={true}
                toRef={
                    <input
                        type="text"
                        className="field w-full"
                        onClick={() => setToggle(true)}
                        value={isSearchTemp}
                        onChange={(e) => {
                            setSearchTemp(e.target.value);
                        }}
                    />
                }
                toPop={
                    <>
                        {isToggle && (
                            <List
                                setToggle={setToggle}
                                setSearchTemp={setSearchTemp}
                                isSearchTemp={isSearchTemp}
                                isCustomer={isCustomer}
                                selectedItem={selectedItem}
                            />
                        )}
                    </>
                }
            />
        </>
    );
}

type List = {
    setToggle: Function;
    setSearchTemp: Function;
    isCustomer: customerDD;
    isSearchTemp: string;
    selectedItem: (CustomerObject: any) => void;
};

const List = ({
    setToggle,
    setSearchTemp,
    isSearchTemp,
    isCustomer,
    selectedItem,
}: List) => {
    const { data, isLoading, isError } = useQuery(
        ["customer-dd-list", isSearchTemp],
        () => {
            return api.get(`/admin/customer?keywords=${isSearchTemp}`, {
                headers: {
                    Authorization: "Bearer " + getCookie("user"),
                },
            });
        }
    );

    const PopOver = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!PopOver.current.contains(e.target)) {
                setToggle(false);
                setSearchTemp(isCustomer.name);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <ul className="dropdown-list" ref={PopOver}>
            {!isLoading && (
                <>
                    {data?.data.map((item: customerDD, index: number) => (
                        <li key={index} onClick={() => selectedItem(item)}>
                            {item.name}
                        </li>
                    ))}
                </>
            )}
            {isLoading && (
                <li>
                    <div>
                        <BarLoader
                            color={"#8f384d"}
                            height="5px"
                            width="100px"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </li>
            )}
            {isError ||
                (data?.data.length <= 0 && (
                    <li>
                        <h1>Customer name cannot be found!</h1>
                    </li>
                ))}
        </ul>
    );
};
