import React from "react";
import style from "../../styles/Popup_Modal.module.scss";

type Props = {
    children: React.ReactNode;
};

export default function ModalTemp({ children }: Props) {
    return (
        <div className={style.container}>
            <section>{children}</section>
        </div>
    );
}
