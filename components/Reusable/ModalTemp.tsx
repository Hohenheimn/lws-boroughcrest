import React from "react";
import style from "../../styles/Popup_Modal.module.scss";

type Props = {
    children: React.ReactNode;
    narrow?: boolean;
    wide?: boolean;
};

export default function ModalTemp({ children, narrow, wide }: Props) {
    return (
        <div className={`${style.container}`}>
            <section
                className={`${narrow && style.narrow} ${wide && style.wide}`}
            >
                {children}
            </section>
        </div>
    );
}
