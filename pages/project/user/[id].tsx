import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

import { LoginUserInfo } from "../../../components/HOC/LoginUser/UserInfo";
import { GetUserDetail } from "../../../components/PROJECT/user/Query";
import UserDetails from "../../../components/PROJECT/user/UserDetails";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function UserId() {
  const router = useRouter();
  const id: any = router.query.id;
  const { data, isLoading, isError } = GetUserDetail(id);
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

  return (
    <div>
      <UserDetails UserDetail={data?.data} />
    </div>
  );
}
