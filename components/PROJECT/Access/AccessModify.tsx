import React, { useState } from "react";
import AccessForm from "./AccessForm";
import ModalTemp from "../../Reusable/ModalTemp";
import { BeatLoader } from "react-spinners";
import { ShowRole } from "./Query";
import { useRouter } from "next/router";

export default function AccessModify() {
    const [isToggleForm, setToggleForm] = useState(false);

    const router = useRouter();

    const id: any = router.query.modify;

    const { isLoading, data, isError } = ShowRole(id);

    if (isLoading) {
        return (
            <ModalTemp>
                <p className=" text-[16px] mb-3 font-bold capitalize">
                    Modify Role
                </p>

                <div className="w-full flex justify-center">
                    <BeatLoader
                        color={"#8f384d"}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </ModalTemp>
        );
    }
    if (isError) {
        return (
            <ModalTemp>
                <p className=" text-[16px] mb-3 font-bold capitalize">
                    Modify Role
                </p>
                <h1 className="text-center">Something went wrong</h1>
            </ModalTemp>
        );
    }

    return (
        <AccessForm
            type={"modify"}
            RoleName={data?.data.name}
            DefaultValue={data?.data.permissions.map((item: any) => {
                return {
                    menu: item.menu,
                    role: item.access,
                    duration: 0,
                };
            })}
            id={id}
            setToggleForm={setToggleForm}
        />
    );
}
