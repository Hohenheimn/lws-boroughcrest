import React, { useState } from "react";
import Calendar from "../../../../components/Calendar";
import Header from "../../../../components/FINANCE/OpeningBalance/Header";
import TableForm from "../../../../components/FINANCE/OpeningBalance/TableForm";

export default function Index() {
    const [isDate, setDate] = useState("");
    return (
        <div>
            <Header />
            <TableForm />
            {/* <Calendar Value={isDate} setValue={setDate} /> */}
        </div>
    );
}
