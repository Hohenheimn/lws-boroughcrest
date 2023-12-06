import React, { useEffect, useState } from "react";
import { startOfDay, format } from "date-fns";
import Image from "next/image";
import { BarLoader } from "react-spinners";

import Tippy from "@tippy.js/react";

import { CollectionItem } from ".";
import ReceiptPrint from "../../../../../components/FINANCE/CustomerFacility/Collection/Print/ReceiptPrint";
import { GetCollectionDetail } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import { LoginUserInfo } from "../../../../../components/HOC/LoginUser/UserInfo";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";

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

  const { isLoading, data } = GetCollectionDetail(payment_register_id);
  const collection: CollectionItem = data?.data;

  //   Page validation
  const PagePermisson = PageAccessValidation("Collection");
  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }
  if (isLoading) {
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
        />
      </div>
    </section>
  );
}

export async function getServerSideProps({ query }: any) {
  const type = query?.type;
  const payment_register_id = query?.payment_register_id;
  const receipt_type = query?.receipt_type;
  return {
    props: {
      type: type,
      payment_register_id:
        payment_register_id !== undefined ? payment_register_id : "",
      receipt_type: receipt_type ? receipt_type : "",
    },
  };
}

Print.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
