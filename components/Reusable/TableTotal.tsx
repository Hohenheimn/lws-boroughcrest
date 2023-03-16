import { TextNumberDisplay } from "./NumberFormat";

type Props = {
    total1: string | number;
    total2: string | number;
};
export const TableTwoTotal = ({ total1, total2 }: Props) => {
    return (
        <div className="flex flex-wrap justify-end py-5 480px:justify-start">
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
                    value={total1}
                    className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                />
            </div>
        </div>
    );
};

type Props1 = {
    total: string | number;
};
export const TableOneTotal = ({ total }: Props1) => {
    return (
        <div className="flex flex-wrap justify-end py-5 480px:justify-start">
            <h1 className="text-start text-[16px] min-w-[200px] 1280px:text-[13px] text-ThemeRed pb-1">
                TOTAL
            </h1>
            <div className="withPeso relative flex items-center text-[#757575] font-NHU-bold">
                <TextNumberDisplay
                    value={total}
                    className="text-end w-full text-[#757575] font-NHU-bold text-[18px] 1280px:text-[13px]"
                />
            </div>
        </div>
    );
};
