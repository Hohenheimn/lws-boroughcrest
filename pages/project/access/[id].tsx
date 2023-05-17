import React from "react";
import { BeatLoader } from "react-spinners";
import AccessDetail from "../../../components/PROJECT/Access/AccessDetail";

type Props = {
    id: number | undefined;
};

export default function AccessDetailPage({ id }: Props) {
    // const { isLoading, data, isError } = GetAdjustmentDetail(id);

    // if (isLoading) {
    //     return (
    //         <div className="pageDetail">
    //             <BeatLoader
    //                 color={"#8f384d"}
    //                 size={20}
    //                 aria-label="Loading Spinner"
    //                 data-testid="loader"
    //             />
    //         </div>
    //     );
    // }

    // if (isError) {
    //     return (
    //         <div className="pageDetail">
    //             <h1>Something went wrong!</h1>
    //         </div>
    //     );
    // }
    return <AccessDetail />;
}
