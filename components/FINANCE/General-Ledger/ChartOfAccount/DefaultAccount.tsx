import { getCookie } from "cookies-next";
import { useEffect, useRef } from "react";
import { isError, useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../../util/api";

type DefaultAccountProps = {
    setValue: Function;
    isValue: any;
};

const DefaultAccount = ({ setValue, isValue }: DefaultAccountProps) => {
    const modal = useRef<any>();

    const clickHandler = (e: any) => {
        const code = e.target.getAttribute("data-chartcode");
        const id = e.target.getAttribute("data-id");
        setValue({
            toggle: false,
            value: code,
            id: id,
            firstVal: code,
            firstID: id,
        });
    };

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal?.current?.contains(e.target)) {
                setValue({
                    ...isValue,
                    toggle: false,
                    value: isValue.firstVal,
                    id: isValue.firstVal,
                });
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    const { data, isLoading, isError } = useQuery(
        ["COA-DefaultAccount-list", isValue.value],
        () => {
            return api.get(
                `/finance/general-ledger/chart-of-accounts/default-account-options?keywords=${isValue.value}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    if (data?.data.length <= 0) {
        return (
            <ul>
                <li>Default Account cannot be found!</li>
            </ul>
        );
    }
    if (isError) {
        return (
            <ul>
                <li>Something is wrong!</li>
            </ul>
        );
    }
    return (
        <ul ref={modal} className="dropdown-list">
            {data?.data.map((item: any, index: number) => (
                <li
                    key={index}
                    data-chartcode={item?.name}
                    data-id={item?.id}
                    onClick={clickHandler}
                >
                    {item?.name}
                </li>
            ))}
            {isLoading && (
                <li className="w-full flex justify-center py-3">
                    <BarLoader
                        color={"#8f384d"}
                        height="5px"
                        width="100px"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </li>
            )}
        </ul>
    );
};

export default DefaultAccount;
