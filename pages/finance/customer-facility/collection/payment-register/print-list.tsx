import React from "react";
import { getCookie } from "cookies-next";
import { format, isValid, parse } from "date-fns";
import { useRouter } from "next/router";

import { BarLoader } from "react-spinners";

import "tippy.js/dist/tippy.css";

import { CollectionItem } from ".";
import { GetCollectionList } from "../../../../../components/FINANCE/CustomerFacility/Collection/ReceivePayment/Query";
import { GetCustomerList } from "../../../../../components/ReactQuery/CustomerMethod";
import { TextNumberDisplay } from "../../../../../components/Reusable/NumberFormat";
import NoPermissionComp from "../../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../../components/Reusable/PermissionValidation/PageAccessValidation";
import PrintTemplate from "../../../../../components/Reusable/PrintTemplate";
import { customerItemDetail } from "../../../../../types/customerList";

type Props = {
  Keyword: string;
  PageNumber: number;
  RowNumber: number;
  Columns: string;
};

export default function PrintList({
  search,
  date_from,
  date_to,
  paginate,
  page,
  filters,
  status,
}: any) {
  // Getting column from parameter
  const { isLoading, data, isError } = GetCollectionList(
    search,
    isValid(date_from) ? format(date_from, "yyyy-MM-dd") : "",
    isValid(date_to) ? format(date_to, "yyyy-MM-dd") : "",
    page,
    filters,
    status
  );

  const PagePermisson = PageAccessValidation("Customer");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

  return (
    <>
      <div className="flex items-center flex-col">
        <PrintTemplate title="Collection" narrow>
          <table className="w-full">
            <thead className="text-[#545454] text-[14pr] text-start">
              <tr>
                <th className=" text-start">Receipt Date</th>
                <th className=" text-start">Receipt No.</th>
                <th className=" text-start">Customer</th>
                <th className=" text-start">Property</th>
                <th className=" text-start">Amount Received</th>
                <th className=" text-start">Mode of Payment</th>
                <th className=" text-start">Cash Account</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.data.map((item: CollectionItem, index: number) => (
                <CollectionList key={index} itemDetail={item} />
              ))}
            </tbody>
          </table>
        </PrintTemplate>
        {isLoading && (
          <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
            <aside className="text-center flex justify-center py-5">
              <BarLoader
                color={"#8f384d"}
                height="10pr"
                width="200pr"
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </aside>
          </div>
        )}
        <button></button>
      </div>
    </>
  );
}

const CollectionList = ({ itemDetail }: any) => {
  const date = parse(itemDetail?.receipt_date, "yyyy-MM-dd", new Date());

  const router = useRouter();

  return (
    <tr
      className="cursor-pointer"
      onClick={() => {
        router.push(
          `/finance/customer-facility/collection/payment-register/${itemDetail.id}`
        );
      }}
    >
      <td className=" pr-2">
        {isValid(date) ? format(date, "MMM dd yyyy") : ""}
      </td>

      <td className=" pr-2">{itemDetail?.receipt_no}</td>

      <td className=" pr-2">{itemDetail?.customer?.name}</td>

      <td className=" pr-2">
        {itemDetail?.customer?.properties?.map((item: any, index: number) =>
          itemDetail?.customer?.properties?.length - 1 === index
            ? item.unit_code
            : item.unit_code + ", "
        )}
      </td>

      <td className=" pr-2 flex justify-end">
        <div>
          <TextNumberDisplay
            className="withPeso w-full text-end "
            value={itemDetail?.amount_paid}
          />
        </div>
      </td>

      <td className=" pr-2">{itemDetail?.mode_of_payment}</td>

      <td className=" pr-2">{itemDetail?.chart_of_account_account_name}</td>
    </tr>
  );
};

export async function getServerSideProps({ query }: any) {
  const search = query.search;
  const date_from = query.date_from;
  const date_to = query.date_to;
  const paginate = query.paginate;
  const page = query.page;
  const filters = query.filters;
  const status = query.status;
  const receipt_type = query.receipt_type;
  return {
    props: {
      search: search,
      date_from: date_from,
      date_to: date_to,
      paginate: paginate,
      page: page,
      filters: filters,
      status: status,
      receipt_type: receipt_type,
    },
  };
}
PrintList.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
