import React from "react";
import { getCookie } from "cookies-next";
import { BarLoader } from "react-spinners";
import "tippy.js/dist/tippy.css";

import { GetPrintCustomerList } from "../../../components/ReactQuery/CustomerMethod";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import PrintTemplate from "../../../components/Reusable/PrintTemplate";
import type { customerItemDetail } from "../../../types/customerList";

type Props = {
  Keyword: string;
  PageNumber: string | number;
  RowNumber: number;
  Columns: string;
};

export default function Print({
  Keyword,
  PageNumber,
  RowNumber,
  Columns,
}: Props) {
  // Getting column from parameter
  const ColumnsArray = Columns.split(",");

  const { data, isLoading, isError } = GetPrintCustomerList();

  const PagePermisson = PageAccessValidation("Customer");

  if (!PagePermisson && PagePermisson !== undefined) {
    return <NoPermissionComp />;
  }

  return (
    <>
      <div className="flex items-center flex-col">
        <PrintTemplate title="Customer">
          <table className="w-full">
            <thead className="text-[#545454] text-[14px] text-start">
              <tr>
                <th className="text-start px-2 py-1">ID</th>
                <th className="text-start px-2 py-1">NAME</th>
                {ColumnsArray.map((item: any, index: number) => (
                  <th
                    key={index}
                    className="text-start px-2 py-1"
                    colSpan={item === "Property" ? 2 : 1}
                  >
                    {item === "Property" ? (
                      <div className="flex">
                        <div className="w-2/4">Property (Unit Code)</div>
                        <div className="w-2/4">Property (Tower)</div>
                      </div>
                    ) : (
                      item
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {!isLoading && !isError && (
                <>
                  {data?.data?.map((item: any, index: number) => (
                    <List
                      key={index}
                      itemDetail={item}
                      Columns={ColumnsArray}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </PrintTemplate>
        {isLoading && (
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
        )}
        <button></button>
      </div>
    </>
  );
}

interface ListProps extends customerItemDetail {
  Columns: any;
}

const List = ({ itemDetail, Columns }: ListProps) => {
  let Logo = "/Images/sampleProfile.png";
  if (itemDetail?.image_photo !== null) {
    Logo =
      "https://boroughcrest-api.lws.codes/get-img?image=" +
      itemDetail?.image_photo;
  }

  return (
    <tr>
      <td className=" px-2 py-2 border-b border-gray-300 text-[#2E4364] font-NHU-medium">
        <div className="flex items-center">
          <div>
            <p className="font-NHU-medium">{itemDetail?.id}</p>
          </div>
        </div>
      </td>
      <td className=" px-2 py-3 border-b border-gray-300 text-[#2E4364] font-NHU-medium">
        <p className="font-NHU-medium">{itemDetail?.name}</p>
      </td>
      {Columns.map((item: string, index: number) => (
        <td
          key={index}
          className=" px-2 break-words py-1 border-b border-gray-300 text-[#2E4364] font-NHU-medium max-w-[100px]"
          colSpan={item === "Property" ? 2 : 1}
        >
          {item === "Class" && (
            <p className="font-NHU-medium">{itemDetail?.class}</p>
          )}
          {item === "Mobile" && (
            <p className="font-NHU-medium">{itemDetail?.contact_no}</p>
          )}

          {item === "Status" && (
            <p className="font-NHU-medium">{itemDetail?.status}</p>
          )}
          {item === "Type" && (
            <p className="font-NHU-medium">{itemDetail?.type}</p>
          )}
          {item === "Email" && (
            <p className="font-NHU-medium">{itemDetail?.preferred_email}</p>
          )}

          {item === "Spouse" && (
            <p className="font-NHU-medium">
              {itemDetail?.individual_co_owner
                ? itemDetail?.individual_co_owner
                : "N/A"}
            </p>
          )}
          {item === "Citizenship" && (
            <p className="font-NHU-medium">
              {itemDetail?.individual_citizenship
                ? itemDetail?.individual_citizenship
                : "N/A"}
            </p>
          )}
          {item === "Birth Date" && (
            <p className="font-NHU-medium">
              {itemDetail?.individual_birth_date
                ? itemDetail?.individual_birth_date
                : "N/A"}
            </p>
          )}
          {item === "Contact Person" && (
            <p className="font-NHU-medium">
              {itemDetail?.company_contact_person
                ? itemDetail?.company_contact_person
                : "N/A"}
            </p>
          )}
          {item === "TIN" && (
            <p className="font-NHU-medium">{itemDetail?.tin}</p>
          )}
          {item === "Branch Code" && (
            <p className="font-NHU-medium">{itemDetail?.branch_code}</p>
          )}
          {item === "Property" && (
            <>
              {itemDetail?.properties.map((item: any, index: number) => (
                <div className="flex" key={index}>
                  <div className="w-2/4">
                    <div className="flex flex-wrap">
                      {item.map((item1: any, index: number) => (
                        <p
                          key={index}
                          className="text-[#2E4364] font-NHU-medium"
                        >
                          {item1.unit_code}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="w-2/4">
                    <div className="flex" key={index}>
                      <p key={index} className="text-[#2E4364] font-NHU-medium">
                        {item[0].tower.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </td>
      ))}
    </tr>
  );
};

export async function getServerSideProps({ query }: any) {
  const Keyword = query.keyword;
  const PageNumber = query.page;
  const RowNumber = query.limit;
  const Columns = query.columns;
  return {
    props: {
      PageNumber: PageNumber,
      RowNumber: RowNumber,
      Columns: Columns,
      Keyword: Keyword,
    },
  };
}
Print.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
