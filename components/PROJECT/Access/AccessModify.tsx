import React, { useState } from "react";
import AccessForm from "./AccessForm";
import ModalTemp from "../../Reusable/ModalTemp";
import { BeatLoader } from "react-spinners";

export default function AccessModify() {
    const [isToggleForm, setToggleForm] = useState(false);

    // return (
    //     <ModalTemp>
    //         <p className=" text-[16px] mb-3 font-bold capitalize">
    //             Modify Role
    //         </p>

    //         <div className="w-full flex justify-center">
    //             <BeatLoader
    //                 color={"#8f384d"}
    //                 size={20}
    //                 aria-label="Loading Spinner"
    //                 data-testid="loader"
    //             />
    //         </div>
    //     </ModalTemp>
    // );

    return (
        <AccessForm
            type={"modify"}
            RoleName={"Admin Staff"}
            DefaultValue={[
                {
                    menu: "Customer",
                    role: ["modify", "create"],
                    duration: 10,
                },
                {
                    menu: "Chart of Accounts",
                    role: ["modify"],
                    duration: 10,
                },
                {
                    menu: "Charges",
                    role: ["approve", "view"],
                    duration: 50,
                },
            ]}
            setToggleForm={setToggleForm}
        />
    );
}
