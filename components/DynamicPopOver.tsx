import React, { useRef, useState } from "react";
import { usePopper } from "react-popper";

type Props = {
    toRef: React.ReactNode;
    toPop: React.ReactNode;
    samewidth?: boolean;
    className: string;
};

// For Dynamic Positioning only, its your command to toggle it

export default function DynamicPopOver({
    toRef,
    toPop,
    samewidth,
    className,
}: Props) {
    const inputField = useRef<any>();
    const toPopOver = useRef<any>();

    const { styles, attributes } = usePopper(
        inputField.current,
        toPopOver.current,
        {
            placement: "bottom-start",
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 5],
                    },
                },
                {
                    name: "flip",
                    options: {
                        fallbackPlacements: ["top-start"],
                    },
                },
            ],
        }
    );
    const refWidth = inputField?.current?.offsetWidth;
    const extendStyle = {
        ...styles.popper,
        width: `${refWidth}px`,
    };
    return (
        <>
            <div ref={inputField} className={className}>
                {toRef}
            </div>

            <div
                className="bg-white z-50 shadow-md"
                ref={toPopOver}
                style={samewidth ? extendStyle : styles.popper}
                {...attributes.popper}
            >
                {toPop}
            </div>
        </>
    );
}
