import React from "react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

import AdjustmentDetail from "../../../../../components/FINANCE/CustomerFacility/Adjustment/AdjusmentDetail";
import { GetAdjustmentDetail } from "../../../../../components/FINANCE/CustomerFacility/Adjustment/Query";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function Id() {
  const router = useRouter();

  const id: any = router.query.id;

  const { isLoading, data, isError } = GetAdjustmentDetail(id);

  const PagePermisson = PageAccessValidation("Adjustment");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

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

  return <AdjustmentDetail Detail={data?.data} />;
}
