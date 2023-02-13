import React from "react";

type TableDropdownProps = {
    toRef: React.ReactNode;
    toPop: React.ReactNode;
};

export default function TableDropdown({ toRef, toPop }: TableDropdownProps) {
    return (
        <div className="relative">
            {toRef}
            <div className="fixed z-[99]">{toPop}</div>
        </div>
    );
}
