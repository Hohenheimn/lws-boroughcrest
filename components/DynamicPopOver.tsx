import React, { useState } from "react";
import { usePopper } from "react-popper";

type Props = {
    toRef: React.ReactNode;
    toPop: React.ReactNode;
};

// For Dynamic Positioning only, its your command to toggle it

export default function DynamicPopOver({ toRef, toPop }: Props) {
    const [referenceElement, setReferenceElement] = useState<any>();
    const [popperElement, setPopperElement] = useState<any>();
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "bottom-start",
    });
    return (
        <>
            <aside ref={referenceElement}>
                <div ref={setReferenceElement}>{toRef}</div>
            </aside>
            <div
                className="bg-white z-50 shadow-md"
                // style={{"width": `${referenceElement?.current?.offsetWidth}px`}}
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
            >
                {toPop}
            </div>
        </>
    );
}
