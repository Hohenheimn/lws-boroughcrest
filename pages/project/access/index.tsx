import React, { useEffect, useState } from "react";

import { LoginUserInfo } from "../../../components/HOC/LoginUser/UserInfo";
import AccessTable from "../../../components/PROJECT/Access/AccessTable";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";

export default function Access() {
  return (
    <>
      <AccessTable />
    </>
  );
}
