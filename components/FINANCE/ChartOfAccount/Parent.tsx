import { getCookie } from "cookies-next";
import { useRef } from "react";
import { useQuery } from "react-query";
import { BarLoader } from "react-spinners";
import api from "../../../util/api";

type ParentProps = {
    setParent: Function;
    isParent: any;
};

const Parent = ({ setParent, isParent }: ParentProps) => {
    const modal = useRef<any>();

    const clickHandler = (e: any) => {
        const code = e.target.getAttribute("data-ChartCode");
        setParent({
            toggle: false,
            value: code,
        });
    };

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
    if (data?.data.length <= 0) {
        return (
            <ul>
                <p className="py-2 px-3 text-center text-[12px]">
                    Chard code cannot be found!
                </p>
            </ul>
        );
    }
    return (
        <ul ref={modal}>
            {data?.data.map((item: any, index: number) => (
                <li
                    key={index}
                    data-ChartCode={item?.chart_code}
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
