import React from "react";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "./TableErrorMessage";

type Props = {
    isLoading: boolean;
    isError: boolean;
};

export default function TableLoadingNError({ isLoading, isError }: Props) {
    return (
        <>
            {isLoading && (
                <div className="w-full flex justify-center items-center">
                    <aside className="text-center flex justify-center py-5">
                        <BarLoader
                            color={"#8f384d"}
                            height="10px"
                            width="200px"
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </aside>
                </div>
            )}
            {isError && <TableErrorMessage />}
        </>
    );
}
