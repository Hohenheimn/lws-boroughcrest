import React, { useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "react-query";
import BeatLoader from "react-spinners/BeatLoader";

import style from "../../styles/SearchSidebar.module.scss";
import api from "../../util/api";

export default function CheckPaymentSearch() {
  const [search, setSearch] = useState<string>("");
  let dataSearch;
  const router = useRouter();

  const {
    isLoading,
    data: RecentData,
    isError,
  } = useQuery(["recent-collection", router.query.id, search], () => {
    return api.get(
      `/finance/customer-facility/collection/recent-search/${router.query.id}?keywords=${search}&paginate=3&receipt_type=Provisional`,
      {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      }
    );
  });

  if (!isLoading) {
    dataSearch = RecentData?.data.data;
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <aside className={style.title}>
          <Link href="/finance/check-warehouse/check-receivables/check-payment-list">
            <a>
              <MdArrowForwardIos className={style.arrow} />
            </a>
          </Link>
          <h1>Check Payment List</h1>
        </aside>

        <aside className={style.searchBar}>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch((text) => (text = e.target.value));
              }}
            />
            <BsSearch />
          </div>
        </aside>
      </div>
      <div className=" overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-5">
            <BeatLoader
              color={"#8f384d"}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          dataSearch?.map((item: any, index: number) => (
            <Link
              key={index}
              href={`/finance/check-warehouse/check-receivables/check-payment-list/${item.id}`}
            >
              <a className={style.searchedItem}>
                <ul>
                  <li>
                    <h4>
                      {item.receipt_type} {item.com}
                    </h4>
                    <p>{item.receipt_date}</p>
                  </li>
                  <li>
                    <p>ID: {item.id}</p>
                    <p>{item.receipt_no}</p>
                  </li>
                </ul>
              </a>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
