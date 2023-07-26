import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { NumberBlockInvalidKey } from "./InputField";

type InputNumber = {
    className: string;
    value: string | number;
    onChange: (type: string, value: string | number) => void;
    type: string;
    prefix?: string;
    valueLimit?: number;
};

export const InputNumberForTable = ({
    className,
    value,
    type,
    onChange,
    prefix,
    valueLimit,
}: InputNumber) => {
    const InputValue = value;
    return (
        <div className="withPesoField">
            <NumericFormat
                className={className + ""}
                prefix={prefix}
                placeholder="-"
                value={Number(InputValue) === 0 ? "" : InputValue}
                isAllowed={(values) => {
                    const { floatValue } = values;
                    if (Number(floatValue) > Number(valueLimit)) {
                        return false;
                    } else {
                        return true;
                    }
                }}
                fixedDecimalScale
                decimalSeparator="."
                decimalScale={2}
                allowNegative={true}
                thousandSeparator={true}
                onValueChange={(values) => {
                    // formattedValue = $2,223z
                    const { formattedValue, value } = values;

                    onChange(type, value);
                }}
            />
        </div>
    );
};
type InputNumberField = {
    className: string;
    prefix?: string;
    suffix?: string;
    isValue: string | number;
    setValue: (key: string, value: number) => void;
    keyField: string;
    noPeso?: boolean;
    register?: any;
};
export const InputNumberForForm = ({
    className,
    prefix,
    suffix,
    isValue,
    setValue,
    keyField,
    noPeso,
    register,
}: InputNumberField) => {
    return (
        <div className={noPeso ? "" : "withPesoField"}>
            <NumericFormat
                className={className + " max-w-[400px]"}
                prefix={prefix}
                {...register}
                suffix={suffix}
                value={isValue === 0 ? "" : isValue}
                fixedDecimalScale
                decimalScale={2}
                decimalSeparator="."
                allowNegative={false}
                thousandSeparator={true}
                onValueChange={(values) => {
                    // formattedValue = $2,223
                    // value ie, 2223
                    const { formattedValue, value } = values;
                    setValue(keyField, Number(value));
                }}
            />
        </div>
    );
};

export const InputContactForForm = ({
    className,
    prefix,
    suffix,
    isValue,
    setValue,
    keyField,
}: InputNumberField) => {
    return (
        <div>
            <NumericFormat
                className={className + " max-w-[400px]"}
                prefix={prefix}
                suffix={suffix}
                value={isValue === 0 ? "" : isValue}
                placeholder="-"
                fixedDecimalScale
                decimalScale={2}
                decimalSeparator="."
                allowNegative={false}
                thousandSeparator={true}
                onValueChange={(values) => {
                    // formattedValue = $2,223
                    // value ie, 2223
                    const { formattedValue, value } = values;
                    setValue(keyField, Number(value));
                }}
            />
        </div>
    );
};

type TextNumberDisplay = {
    value: number | string;
    className: string;
    suffix?: string;
    allowNegative?: boolean;
};
export const TextNumberDisplay = ({
    value,
    className,
    suffix,
    allowNegative,
}: TextNumberDisplay) => {
    return (
        <NumericFormat
            placeholder="-"
            suffix={suffix}
            className={" min-h-[12px] " + className}
            fixedDecimalScale
            value={value === "" || value === null ? 0 : value}
            displayType="text"
            decimalScale={2}
            decimalSeparator="."
            allowNegative={allowNegative === undefined ? false : allowNegative}
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
            value={value === "" || value === null ? 0 : value}
            thousandSeparator={true}
        />
    );
};

export const TINNumberFormat = ({
    setValue,
    value,
    register,
    ElevenDigit,
}: {
    setValue: (value: string) => void;
    value: string;
    register?: any;
    ElevenDigit?: boolean;
}) => {
    const handleInput = (value: any) => {
        const formattedTIN = ElevenDigit
            ? formatTIN11(value)
            : formatTIN14(value);
        setValue(formattedTIN);
    };
    useEffect(() => {
        handleInput(value);
    }, [value]);
    return (
        <input
            type="text"
            className="field"
            {...register}
            onChange={(e: any) => handleInput(e.target.value)}
            value={value}
        />
    );
};

const formatTIN14 = (value: string) => {
    if (!value) return value;
    const TINNumber = value.replace(/[^\d]/g, "");
    const TINNumberLength = TINNumber.length;
    if (TINNumberLength < 4) return TINNumber;
    if (TINNumberLength < 7) {
        return `${TINNumber.slice(0, 3)}-${TINNumber.slice(3)}`;
    }
    if (TINNumberLength < 10) {
        return `${TINNumber.slice(0, 3)}-${TINNumber.slice(
            3,
            6
        )}-${TINNumber.slice(6)}`;
    }
    return `${TINNumber.slice(0, 3)}-${TINNumber.slice(3, 6)}-${TINNumber.slice(
        6,
        9
    )}-${TINNumber.slice(9, 14)}`;
};
const formatTIN11 = (value: string) => {
    if (!value) return value;
    const TINNumber = value.replace(/[^\d]/g, "");
    const TINNumberLength = TINNumber.length;
    if (TINNumberLength < 4) return TINNumber;
    if (TINNumberLength < 7) {
        return `${TINNumber.slice(0, 3)}-${TINNumber.slice(3)}`;
    }
    if (TINNumberLength < 10) {
        return `${TINNumber.slice(0, 3)}-${TINNumber.slice(
            3,
            6
        )}-${TINNumber.slice(6)}`;
    }
    return `${TINNumber.slice(0, 3)}-${TINNumber.slice(3, 6)}-${TINNumber.slice(
        6,
        9
    )}-${TINNumber.slice(9, 11)}`;
};

export const ContactNumberFormat = ({
    register,
    value,
    className,
}: {
    register: any;
    value: any;
    className?: string;
}) => {
    return (
        <div className="contact_no">
            <input
                className={"field " + className}
                type="number"
                onKeyDown={NumberBlockInvalidKey}
                value={value}
                {...register}
            />
        </div>
    );
};
