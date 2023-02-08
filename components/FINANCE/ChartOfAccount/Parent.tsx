import { getCookie } from "cookies-next";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../util/api";

type ParentProps = {
    setParent: Function;
    isParent: any;
    setChartcode: Function;
    isChartcode: any;
};

const Parent = ({
    setParent,
    isParent,
    setChartcode,
    isChartcode,
}: ParentProps) => {
    const modal = useRef<any>();

    const clickHandler = (e: any) => {
        const code = e.target.getAttribute("data-chartcode");
        const id = e.target.getAttribute("data-id");
        setParent({
            ...isParent,
            toggle: false,
            value: code,
            id: id,
            firstVal: code,
            firstID: id,
        });
        setChartcode({
            ...isChartcode,
            parent: code,
        });
    };

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!modal?.current?.contains(e.target)) {
                setParent({
                    ...isParent,
                    toggle: false,
                    value: isParent.firstVal,
                    id: isParent.firstVal,
                });
                setChartcode({
                    ...isChartcode,
                    parent: isParent.firstVal,
                });
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    const { data, isLoading, isError } = useQuery(
        ["COA-Parent-list", isParent.value],
        () => {
            return api.get(
                `/finance/general-ledger/chart-of-accounts/parent-options?keywords=${isParent.value}`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("user"),
                    },
                }
            );
        }
    );

    if (isLoading) {
        return (
            <ul>
                <div className="w-full flex justify-center py-3">
                    <BarLoader
                        color={"#8f384d"}
                        height="5px"
                        width="100px"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </ul>
        );
    }
    if (isError) {
        return (
            <ul>
                <p className="py-2 px-3 text-center text-[12px]">
                    Something is wrong!
                </p>
            </ul>
        );
    }
    if (data?.data.length <= 0) {
        return (
            <ul>
                <p className="py-2 px-3 text-center text-[12px]">
                    Chart code cannot be found!
                </p>
            </ul>
        );
    }
    return (
        <ul ref={modal} className="dropdown-list w-[300px]">
            {data?.data.map((item: any, index: number) => (
                <li
                    key={index}
                    data-chartcode={item?.chart_code}
                    data-id={item?.id}
                    onClick={clickHandler}
                >
                    <span className=" pointer-events-none">
                        {item?.account_name}
                    </span>
                    <span className=" pointer-events-none">
                        {item?.chart_code}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default Parent;
