import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Image from "next/image";

import { useQuery } from "react-query";

import { BarLoader } from "react-spinners";
import Tippy from "@tippy.js/react";

import InvoicePrint from "../../../../../components/FINANCE/CustomerFacility/Billing/InvoicePrint";
import { billingPrintType } from "../../../../../components/FINANCE/CustomerFacility/Billing/InvoicePrint/billingType";
import {
  GetInvoiceList,
  GetInvoicePrint,
} from "../../../../../components/FINANCE/CustomerFacility/Billing/Query";
import { LoginUserInfo } from "../../../../../components/HOC/LoginUser/UserInfo";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import api from "../../../../../util/api";

export default function Print({
  isSearch,
  type,
  TablePage,
  isFilterText,
  dateFrom,
  dateTo,
}: {
  isSearch: string;
  type: string;
  TablePage: string;
  isFilterText: any;
  dateFrom: any;
  dateTo: any;
}) {
  const { data, isLoading } = GetInvoicePrint(
    isSearch,
    type,
    TablePage,
    isFilterText,
    dateFrom,
    dateTo
  );

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

  const invoiceRange = policyData?.data?.finance_reference?.filter(
    (filter: any) => filter.prefix === "INV"
  )[0];

  const billingInvoice: billingPrintType[] = data?.data?.data;

  const [userInfo, setUserInfo] = useState<LoginUserInfo>();
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.userInfo));
  }, []);
  const printhandler = () => {
    print();
  };

  // Page validation
  const PagePermisson = PageAccessValidation("Collection");
  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

  if (isLoading || policyLoading) {
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
        {billingInvoice.map((billing) => (
          <InvoicePrint
            key={billing.id}
            data={billing}
            userInfo={userInfo}
            invoiceRange={invoiceRange}
          />
        ))}
      </div>
    </section>
  );
}

export async function getServerSideProps({ query }: any) {
  const isSearch = query?.isSearch;
  const type = query?.type;
  const TablePage = query?.TablePage;
  const isFilterText = query?.isFilterText;
  const dateFrom = query?.dateFrom;
  const dateTo = query?.dateTo;
  return {
    props: {
      isSearch: isSearch,
      type: type,
      TablePage: TablePage,
      isFilterText: isFilterText,
      dateFrom: dateFrom,
      dateTo: dateTo,
    },
  };
}

Print.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
