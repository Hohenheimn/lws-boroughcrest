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
    const reference = useRef<any>();
    const [referenceElement, setReferenceElement] = useState<any>();
    const [popperElement, setPopperElement] = useState<any>();
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "bottom-start",
    });
    const refWidth = reference?.current?.offsetWidth;
    const extendStyle = {
        ...styles.popper,
        width: `${refWidth}px`,
    };
    return (
        <>
            <aside ref={reference} className={className}>
                <div ref={setReferenceElement}>{toRef}</div>
            </aside>
            <div
                className="bg-white z-50 shadow-md"
                ref={setPopperElement}
                style={samewidth ? extendStyle : styles.popper}
                {...attributes.popper}
            >
                {toPop}
            </div>
        </>
    );
}
