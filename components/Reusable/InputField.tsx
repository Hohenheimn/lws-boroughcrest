import React, { useState } from "react";

type Input = {
    className: string;
    register?: any;
    defaultValue: string | number;
    limitation: number;
};

export const NumberBlockInvalidKey = (e: any) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
};

export const TextFieldValidation = (e: any, limitation: number) => {
    if (
        !/^[A-Za-z0-9 ]*$/.test(e.target.value) ||
        e.target.value.length > limitation
    ) {
        return false;
    } else {
        return true;
    }
};

export const InputTextForm = ({
    className,
    register,
    defaultValue,
    limitation,
}: Input) => {
    const [isValue, setValue] = useState(defaultValue);
    return (
        <input
            type="text"
            {...register}
            value={isValue}
            onChange={(e) => {
                if (!TextFieldValidation(e, limitation)) return;
                setValue(e.target.value);
            }}
            className={className}
        />
    );
};

export const InputNumberForm = ({
    className,
    register,
    defaultValue,
    limitation,
}: Input) => {
    const [isValue, setValue] = useState(defaultValue);
    return (
        <input
            type="number"
            {...register}
            value={isValue}
            onKeyDown={NumberBlockInvalidKey}
            onChange={(e) => {
                if (e.target.value.length > limitation) return;
                setValue(e.target.value);
            }}
            className={className}
        />
    );
};
