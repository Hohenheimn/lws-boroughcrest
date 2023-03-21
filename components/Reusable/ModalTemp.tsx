import React from "react";
import style from "../../styles/Popup_Modal.module.scss";

type Props = {
    children: React.ReactNode;
    narrow?: boolean;
};

export default function ModalTemp({ children, narrow }: Props) {
    return (
        <div className={`${style.container}`}>
            <section className={`${narrow && style.narrow}`}>
                {children}
            </section>
        </div>
    );
}
