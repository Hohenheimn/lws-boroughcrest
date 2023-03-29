import Tippy from "@tippy.js/react";
import React from "react";
import Image from "next/image";

type Props = {
    FunctionOnClick: () => void;
    title: string;
};

export function PencilButton({ FunctionOnClick, title }: Props) {
    return (
        <div>
            <Tippy content={title} theme="ThemeRed">
                <div onClick={FunctionOnClick}>
                    <Image
                        src="/Images/big_pencil.png"
                        width={22}
                        height={18}
                        alt="Modify"
                    />
                </div>
            </Tippy>
        </div>
    );
}

export function PlusButtonTable() {
    return (
        <Tippy
            theme="ThemeRed"
            content={<span className="text-[12px]">Add row</span>}
        >
            <div className=" inline-block">
                <Image
                    src="/Images/f_plus.png"
                    width={12}
                    height={12}
                    alt="Add"
                />
            </div>
        </Tippy>
    );
}

export function MinusButtonTable() {
    return (
        <Tippy
            theme="ThemeRed"
            content={<span className="text-[12px]">Remove row</span>}
        >
            <div className=" inline-block translate-y-[-3px]">
                <Image
                    src="/Images/f_minus.png"
                    width={12}
                    height={5}
                    alt="Remove"
                />
            </div>
        </Tippy>
    );
}

export function CopyButtonTable() {
    return (
        <Tippy
            theme="ThemeRed"
            content={<span className="text-[12px]">Copy</span>}
        >
            <div className=" inline-block">
                <Image
                    src="/Images/f_modify.png"
                    width={15}
                    height={15}
                    alt="Copy"
                />
            </div>
        </Tippy>
    );
}

export function EyeButton() {
    return (
        <Tippy
            theme="ThemeRed"
            content={<span className="text-[12px]">View</span>}
        >
            <div className=" inline-block">
                <Image
                    src="/Images/f_eye.png"
                    width={15}
                    height={12}
                    alt="View"
                />
            </div>
        </Tippy>
    );
}

export function DeleteButton() {
    return (
        <Tippy
            theme="ThemeRed"
            content={<span className="text-[12px]">Delete</span>}
        >
            <div className=" inline-block cursor-pointer">
                <Image
                    src="/Images/f_delete.png"
                    width={13}
                    height={15}
                    alt="Delete"
                />
            </div>
        </Tippy>
    );
}

export function PencilButtonTable() {
    return (
        <Tippy
            theme="ThemeRed"
            content={<span className="text-[12px]">Modify</span>}
        >
            <div className=" inline-block">
                <Image
                    src="/Images/f_pencil.png"
                    width={12}
                    height={12}
                    alt="Modify"
                />
            </div>
        </Tippy>
    );
}
