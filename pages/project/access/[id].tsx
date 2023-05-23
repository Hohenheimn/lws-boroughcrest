import React from "react";
import { BeatLoader } from "react-spinners";
import AccessDetail from "../../../components/PROJECT/Access/AccessDetail";
import { ShowRole } from "../../../components/PROJECT/Access/Query";

type Props = {
    id: number;
};

export default function AccessDetailPage({ id }: Props) {
    const { isLoading, data, isError } = ShowRole(id);

    if (isLoading) {
        return (
            <div className="pageDetail">
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="pageDetail">
                <h1>Something went wrong!</h1>
            </div>
        );
    }
    return <AccessDetail data={data} />;
}

export async function getServerSideProps({ query }: any) {
    const id = query.id;
    return {
        props: {
            id: id,
        },
    };
}
