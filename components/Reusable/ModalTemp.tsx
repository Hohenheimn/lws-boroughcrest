import React from "react";
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
    return (
        <div className={`${style.container} ${alignStart && style.start}`}>
            <section
                className={`${narrow && style.narrow} ${wide && style.wide}`}
            >
                {children}
            </section>
        </div>
    );
}
