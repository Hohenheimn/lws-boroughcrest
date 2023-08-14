import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import BeatLoader from "react-spinners/BeatLoader";

import { LoginUserInfo } from "../../../components/HOC/LoginUser/UserInfo";
import CorporateDetails from "../../../components/PROJECT/Corporate/CorporateDetails";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import api from "../../../util/api";

export default function CorporateId() {
  const router = useRouter();
  const id = router.query.id;

  const { isLoading, data, isError } = useQuery(
    ["Corporate-detail", id],
    () => {
      return api.get(`/project/corporate/${id}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    }
  );

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
        <h1>Something is wrong</h1>
        <BeatLoader
          color={"#8f384d"}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  const CorporateData = data?.data;

  return (
    <div>
      <CorporateDetails CorporateData={CorporateData} />
    </div>
  );
}
