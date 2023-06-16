import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import DynamicPopOver from "../Reusable/DynamicPopOver";
import { customerDD } from "../FINANCE/CustomerFacility/Billing/BillingForm";
import { customer } from "../../types/customerList";

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
    const selectedItem = (CustomerObject: any, properties: any) => {
        if (properties.length > 0) {
            let cloneToGetProperties: string[] = [];
            let cloneToGetPropertiesObject: string[] = [];
            properties.map((item: any) => {
                item.map((itemInner: any) => {
                    cloneToGetProperties = [
                        ...cloneToGetProperties,
                        itemInner.unit_code,
                    ];
                    cloneToGetPropertiesObject = [
                        ...cloneToGetPropertiesObject,
                        itemInner,
                    ];
                });
            });
            setCustomer({
                id: CustomerObject.id,
                name: CustomerObject.name,
                class: CustomerObject.class,
                property: cloneToGetProperties,
                properties: cloneToGetPropertiesObject,
            });
        } else {
            setCustomer({
                id: CustomerObject.id,
                name: CustomerObject.name,
                class: CustomerObject.class,
                property: [],
                properties: properties[0],
            });
        }
        setSearchTemp(CustomerObject.name);
        setToggle(false);
    };
    return (
        <>
            <DynamicPopOver
                className="w-full max-w-[300px]"
                rightPosition={true}
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
    selectedItem: (CustomerObject: any, e: any) => void;
};

const List = ({
    setToggle,
    setSearchTemp,
    isSearchTemp,
    isCustomer,
    selectedItem,
}: List) => {
    // Reset show item when open
    const [showItemAll, setshowItemAll] = useState(true);
    const keywordSearch = showItemAll ? "" : isSearchTemp;
    useEffect(() => {
        if (isCustomer.name !== isSearchTemp) {
            setshowItemAll(false);
        }
    }, [isSearchTemp]);
    // end
    const { data, isLoading, isError } = useQuery(
        ["customer-dd-list", keywordSearch],
        () => {
            return api.get(
                `/admin/customer?keywords=${keywordSearch}&owner_tenant_class=1`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const removeDraft = data?.data.filter(
        (item: customer) => item.status !== "Draft"
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
            {removeDraft?.map((item: customer, index: number) => (
                <li
                    key={index}
                    onClick={() => selectedItem(item, item.properties)}
                >
                    {item.name}
                </li>
            ))}

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
