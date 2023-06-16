import { getCookie } from "cookies-next";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../util/api";
import DynamicPopOver from "../Reusable/DynamicPopOver";
import { customerDD } from "../FINANCE/CustomerFacility/Billing/BillingForm";

type Props = {
    isCorporate: isCorporate;
    setCorporate: Function;
    register: any;
};
type isCorporate = {
    id: number | string;
    value: string;
};

export default function CorporateDropDown({
    isCorporate,
    setCorporate,
    register,
}: Props) {
    const [isToggle, setToggle] = useState(false);
    const [isSearchTemp, setSearchTemp] = useState(isCorporate.value);
    const selectedItem = (Corporate: any) => {
        setCorporate({
            id: Corporate.id,
            value: Corporate.name,
        });
        setSearchTemp(Corporate.name);
        setToggle(false);
    };
    useEffect(() => {
        setSearchTemp(isCorporate.value);
    }, [isCorporate]);
    return (
        <>
            <DynamicPopOver
                className="w-full max-w-[300px]"
                samewidth={true}
                toRef={
                    <input
                        type="text"
                        className="field w-full"
                        autoComplete="off"
                        onClick={() => setToggle(true)}
                        value={isSearchTemp}
                        {...register}
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
                                isCorporate={isCorporate}
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
    isCorporate: isCorporate;
    isSearchTemp: string;
    selectedItem: (CustomerObject: any) => void;
};

const List = ({
    setToggle,
    setSearchTemp,
    isSearchTemp,
    isCorporate,
    selectedItem,
}: List) => {
    // Reset show item when open
    const [showItemAll, setshowItemAll] = useState(true);
    const keywordSearch = showItemAll ? "" : isSearchTemp;
    useEffect(() => {
        if (isCorporate.value !== isSearchTemp) {
            setshowItemAll(false);
        }
    }, [isSearchTemp]);
    // end
    const { data, isLoading, isError } = useQuery(
        ["corporate-dd-list", isSearchTemp],
        () => {
            return api.get(
                `/project/corporate?keywords=${
                    keywordSearch === null ? "" : keywordSearch
                }`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    const PopOver = useRef<any>();

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!PopOver.current.contains(e.target)) {
                setToggle(false);
                setSearchTemp(isCorporate.value);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });
    return (
        <ul className="dropdown-list" ref={PopOver}>
            {data?.data.map((item: customerDD, index: number) => (
                <li key={index} onClick={() => selectedItem(item)}>
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
                        <h1>Corporate cannot be found!</h1>
                    </li>
                ))}
        </ul>
    );
};
