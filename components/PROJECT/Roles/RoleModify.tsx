import React from "react";
import RoleForm from "./RoleForm";

type Props = {
    closeFunc: Function;
};

export default function RoleModify({ closeFunc }: Props) {
    return <RoleForm closeFunc={closeFunc} type="modify" />;
}
