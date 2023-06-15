import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/Popup_Modal.module.scss";

type Props = {
    children: React.ReactNode;
    narrow?: boolean;
    wide?: boolean;
    alignStart?: boolean;
};

export default function ModalTemp({
    children,
    narrow,
    wide,
    alignStart,
}: Props) {
    const elementRef: any = useRef(null);
    const [isSameHeight, setIsSameHeight] = useState(false);

    useEffect(() => {
        const windowHeight = window.innerHeight;
        const elementHeight = elementRef?.current?.offsetHeight;
        const HandlerResize = () => {
            if (windowHeight - 50 <= elementHeight) {
                setIsSameHeight(true);
            } else {
                setIsSameHeight(false);
            }
        };
        window.addEventListener("resize", HandlerResize);
        HandlerResize();
        return () => {
            window.removeEventListener("resize", HandlerResize);
        };
    });
    return (
        <div className={`${style.container} ${isSameHeight && style.start}`}>
            <section
                ref={elementRef}
                className={`${narrow && style.narrow} ${wide && style.wide}`}
            >
                {children}
            </section>
        </div>
    );
}
