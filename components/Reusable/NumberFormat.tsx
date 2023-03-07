import { NumericFormat } from "react-number-format";

type InputNumber = {
    className: string;
    value: string | number;
    onChange: (type: string, value: string | number) => void;
    type: string;
    prefix?: string;
};

export const InputNumberForTable = ({
    className,
    value,
    type,
    onChange,
    prefix,
}: InputNumber) => {
    return (
        <div className="withPesoField">
            <NumericFormat
                className={className + " max-w-[400px]"}
                prefix={prefix}
                placeholder="-"
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
    suffix?: string;
};
export const TextNumberDisplay = ({
    value,
    className,
    suffix,
}: TextNumberDisplay) => {
    return (
        <NumericFormat
            placeholder="-"
            suffix={suffix}
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

export const TextNumberDisplayPercent = ({
    value,
    className,
    suffix,
}: TextNumberDisplay) => {
    return (
        <NumericFormat
            placeholder="-"
            suffix={suffix}
            className={className}
            value={value}
            thousandSeparator={true}
        />
    );
};
