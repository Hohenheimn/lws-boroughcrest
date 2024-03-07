import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { useQuery } from "react-query";

import { RequestDetailType } from "../../../components/ADMIN/Request/Card";
import { GetRequest } from "../../../components/ADMIN/Request/Query";
import Pagination from "../../../components/Reusable/Pagination";
import NoPermissionComp from "../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../components/Reusable/PermissionValidation/PageAccessValidation";
import TableLoadingNError from "../../../components/Reusable/TableLoadingNError";
import api from "../../../util/api";

export default function ClosedRequest() {
  const [isSearchTable, setSearchTable] = useState("");

  const [TablePage, setTablePage] = useState(1);

  const { data, isLoading, isError } = GetRequest(
    "Closed",
    isSearchTable,
    10,
    TablePage
  );

  const PagePermisson_NewRequest = PageAccessValidation(
    "Customer Request View (New Request)"
  );

  const PagePermisson_InProcess = PageAccessValidation(
    "Customer Request View (In Process)"
  );

  const PagePermisson_InReview = PageAccessValidation(
    "Customer Request View (In Review)"
  );

  const PagePermisson_Closed = PageAccessValidation(
    "Customer Request View (Closed)"
  );

  if (
    !PagePermisson_NewRequest &&
    PagePermisson_NewRequest !== undefined &&
    !PagePermisson_InProcess &&
    PagePermisson_InProcess !== undefined &&
    !PagePermisson_InReview &&
    PagePermisson_InReview !== undefined &&
    !PagePermisson_Closed &&
    PagePermisson_Closed !== undefined
  ) {
    return <NoPermissionComp />;
  }

  return (
    <div>
      <h1 className="pageTitle">Request</h1>
      <div className="flex items-center flex-wrap">
        <div className="flex items-center shadow-lg px-2 h-10  1550px:h-8 bg-white flex-1 max-w-[500px] 640px:max-w-[unset] 480px:w-full rounded-lg">
          <input
            type="text"
            className="flex-1 outline-none text-[14px] shadow-none"
            placeholder="Search"
            value={isSearchTable}
            onChange={(e) => setSearchTable(e.target.value)}
          />
          <BsSearch className=" mr-2 text-gray-500 text-[18px]" />
        </div>
        <Link href="/admin/request/">
          <a>
            <button className="buttonRed ml-5 375px:ml-0 375px:mt-3 375px:mr-5">
              BACK TO BOARD
            </button>
          </a>
        </Link>
      </div>
      <div className="table_container mt-10 1366px:mt-5">
        <table className="table_list corp">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ticket Number</th>
              <th>Requestor</th>
              <th>Property</th>
              <th>Request</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.data.map((item: any, index: number) => (
              <List key={index} itemDetail={item} />
            ))}
          </tbody>
        </table>
        <TableLoadingNError isLoading={isLoading} isError={isError} />
      </div>
      <Pagination
        setTablePage={setTablePage}
        tablePage={TablePage}
        totalPage={data?.data.meta.last_page}
      />
    </div>
  );
}

type ListProps = {
  itemDetail: RequestDetailType;
};

const List = ({ itemDetail }: ListProps) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    if (itemDetail?.status === "New Request") {
      setColor("#8f384d");
    }
    if (itemDetail?.status === "In Process") {
      setColor("#5c6e91");
    }
    if (itemDetail?.status === "In Review") {
      setColor("#dd9866");
    }
    if (itemDetail?.status === "Closed") {
      setColor("#41b6ff");
    }
  }, [itemDetail?.status]);
  return (
    <tr>
      <td>
        <div>
          <h2>{itemDetail.date}</h2>
        </div>
      </td>
      <td>
        <div>
          <h2>{itemDetail.ticket_no}</h2>
        </div>
      </td>
      <td>
        <div>
          <h2>{itemDetail.customer_name}</h2>
        </div>
      </td>

      <td>
        <div>
          <h2>{itemDetail.property_unit_code}</h2>
        </div>
      </td>

      <td>
        <div>
          <h2>{itemDetail.request}</h2>
        </div>
      </td>

      <td>
        <div>
          <h2 style={{ color: color }}>{itemDetail.status}</h2>
        </div>
      </td>
    </tr>
  );
};
