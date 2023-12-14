import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { startOfDay, format } from "date-fns";
import Image from "next/image";

import { useQuery } from "react-query";

import { BarLoader } from "react-spinners";
import Tippy from "@tippy.js/react";

import { CollectionItem } from ".";
import ReceiptPrint from "../../../../../components/FINANCE/CustomerFacility/Collection/Print/ReceiptPrint";
import { GetCollectionDetail } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import { LoginUserInfo } from "../../../../../components/HOC/LoginUser/UserInfo";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import api from "../../../../../util/api";

export default function Print({
  payment_register_id,
  type,
  receipt_type,
}: any) {
  const [userInfo, setUserInfo] = useState<LoginUserInfo>();
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.userInfo));
  }, []);
  const printhandler = () => {
    print();
  };

  const { isLoading: collectionLoading, data: collectionData } =
    GetCollectionDetail(payment_register_id);

  const { data: policyData, isLoading: policyLoading } = useQuery(
    ["policy"],
    () => {
      return api.get(`/finance/policy`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const collection: CollectionItem = collectionData?.data;

  const arRange = policyData?.data?.finance_reference?.filter(
    (filter: any) => filter.prefix === "AR"
  )[0];
  const orRange = policyData?.data?.finance_reference?.filter(
    (filter: any) => filter.prefix === "OR"
  )[0];
  const prRange = policyData?.data?.finance_reference?.filter(
    (filter: any) => filter.prefix === "PR"
  )[0];

  const acknowledgementCertificate =
    policyData?.data?.finance_reference?.filter(
      (filter: any) => filter.document === "Acknowledgement Certificate No."
    )[0];

  //   Page validation
  const PagePermisson = PageAccessValidation("Collection");
  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }
  if (collectionLoading || policyLoading) {
    return (
      <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
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
    );
  }

  return (
    <section className=" flex justify-center text-start">
      <div className={` w-11/12 max-w-[1366px] printThis print:h-full top-0 `}>
        <aside className="w-full py-5 flex justify-end px-5 hidePrint print:hidden">
          <Tippy theme="ThemeRed" content="Print">
            <div
              className="relative h-[35px] w-[35px] hover:scale-[1.1] transition-all duration-75"
              onClick={printhandler}
            >
              <Image src="/Images/Print.png" alt="" layout="fill" />
            </div>
          </Tippy>
        </aside>

        <ReceiptPrint
          userInfo={userInfo}
          data={collection}
          receiptType={receipt_type}
          arRange={arRange}
          orRange={orRange}
          prRange={prRange}
          acknowledgementCertificate={acknowledgementCertificate?.prefix}
        />
      </div>
    </section>
  );
}

export async function getServerSideProps({ query }: any) {
  const type = query?.type;
  const payment_register_id = query?.payment_register_id;
  const receipt_type = query?.receipt_type;
  const collection = query?.collection;
  return {
    props: {
      type: type,
      payment_register_id:
        payment_register_id !== undefined ? payment_register_id : "",
      receipt_type: receipt_type ? receipt_type : "",
      collection: collection ? collection : "",
    },
  };
}

Print.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
