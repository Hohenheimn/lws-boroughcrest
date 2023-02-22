import { NumericFormat } from "react-number-format";

type InputNumber = {
    className: string;
    value: string | number;
    onChange: (type: string, value: string | number) => void;
    type: string;
};

export const InputNumberForTable = ({
    className,
    value,
    type,
    onChange,
}: InputNumber) => {
    return (
        <div className="withPesoField">
            <NumericFormat
                className={className + " max-w-[400px]"}
                value={value}
                fixedDecimalScale
                decimalScale={2}
                decimalSeparator="."
                allowNegative={false}
                thousandSeparator={true}
                onValueChange={(values) => {
                    // formattedValue = $2,223
                    // value ie, 2223
                    const { formattedValue, value } = values;
                    onChange(type, value);
                }}
            />
        </div>
    );
};

type TextNumberDisplay = {
    value: number | string;
    className: string;
};
export const TextNumberDisplay = ({ value, className }: TextNumberDisplay) => {
    return (
        <NumericFormat
            className={className}
            fixedDecimalScale
            value={value}
            displayType="text"
            decimalScale={2}
            decimalSeparator="."
            allowNegative={false}
            thousandSeparator={true}
        />
    );
};
