import React from "react";

export default function Error() {
    return <div>404</div>;
}

Error.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};
