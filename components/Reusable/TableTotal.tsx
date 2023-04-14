import { TextNumberDisplay } from "./NumberFormat";

type Props = {
    total1: string | number;
    total2: string | number;
};
export const TableTwoTotal = ({ total1, total2 }: Props) => {
    return (
        <div className="flex flex-wrap items-center justify-end py-5 480px:justify-start">
            <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                TOTAL
            </h1>
            <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold mr-10">
                <TextNumberDisplay
                    value={total1}
                    className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                />
            </div>
            <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold">
                <TextNumberDisplay
                    value={total2}
                    className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                />
            </div>
        </div>
    );
};

type Props1 = {
    total: string | number;
    label: string;
    redBG: boolean;
};
export const TableOneTotal = ({ total, label, redBG }: Props1) => {
    return (
        <div className="flex flex-wrap  items-center justify-end py-2 480px:justify-start">
            <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                {label}
            </h1>
            <div
                className={` relative flex items-center font-NHU-bold ${
                    redBG === true
                        ? "bg-ThemeRed text-white withPesoWhite"
                        : "withPeso text-[#757575]"
                }`}
            >
                <TextNumberDisplay
                    value={total}
                    className={
                        "text-end w-full font-NHU-bold text-[18px] 1280px:text-[13px] px-2 py-1 "
                    }
                />
            </div>
        </div>
    );
};

type Props3 = {
    total1: string | number;
    total2: string | number;
    total3: string | number;
    label: string;
    redBG: boolean;
};

export const TableThreeTotal = ({
    total1,
    total2,
    total3,
    label,
    redBG,
}: Props3) => {
    return (
        <div className="flex flex-wrap justify-end items-center py-2 480px:justify-start">
            <h1 className="text-start text-[16px] min-w-[150px] 1280px:text-[13px] text-ThemeRed pb-1">
                {label}
            </h1>
            <div
                className={` relative flex min-w-[150px] mr-5 items-center font-NHU-bold ${
                    redBG === true
                        ? "bg-ThemeRed text-white withPesoWhite"
                        : "withPeso text-[#757575]"
                }`}
            >
                <TextNumberDisplay
                    value={total1}
                    className={
                        "text-end w-full font-NHU-bold text-[18px] 1280px:text-[13px] px-2 py-1 "
                    }
                />
            </div>
            <div
                className={` relative flex min-w-[150px] mr-5 items-center font-NHU-bold ${
                    redBG === true
                        ? "bg-ThemeRed text-white withPesoWhite"
                        : "withPeso text-[#757575]"
                }`}
            >
                <TextNumberDisplay
                    value={total2}
                    className={
                        "text-end w-full font-NHU-bold text-[18px] 1280px:text-[13px] px-2 py-1 "
                    }
                />
            </div>
            <div
                className={` relative flex min-w-[150px] items-center font-NHU-bold ${
                    redBG === true
                        ? "bg-ThemeRed text-white withPesoWhite"
                        : "withPeso text-[#757575]"
                }`}
            >
                <TextNumberDisplay
                    value={total3}
                    className={
                        "text-end w-full font-NHU-bold text-[18px] 1280px:text-[13px] px-2 py-1 "
                    }
                />
            </div>
        </div>
    );
};
