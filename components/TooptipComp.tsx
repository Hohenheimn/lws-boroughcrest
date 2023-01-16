import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

type Props = {
    children: any;
    content: string;
};

export default function TooptipComp({ children, content }: Props) {
    return (
        <>
            <Tippy theme="ThemeRed" content={content}>
                {children}
            </Tippy>
        </>
    );
}
