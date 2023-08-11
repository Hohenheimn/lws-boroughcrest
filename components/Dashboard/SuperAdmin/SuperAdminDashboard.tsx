import React, { useState } from "react";
import { tr } from "date-fns/locale";
import { BarLoader } from "react-spinners";

import { GetUser } from "../../PROJECT/user/Query";
import Pagination from "../../Reusable/Pagination";
import TableErrorMessage from "../../Reusable/TableErrorMessage";
import SubscriberForm from "./SubscriberForm";

export type subscriber = {
  id?: number;
  name: string;
  corporate_admin: string;
  email: string;
  mobile: string;
  corporate_usage: string;
  accounts_usage: string;
  status: string;
  validity_duration: string;
  price?: number;
};

const sampleData: subscriber[] = [
  {
    id: 1,
    name: "Jomari",
    corporate_admin: "Jomari corporate",
    email: "jomtoui@gmail.com",
    mobile: "0941264897",
    corporate_usage: "23",
    accounts_usage: "512564",
    status: "Active",
    validity_duration: "8989",
  },
  {
    id: 2,
    name: "sample any",
    corporate_admin: "asadsasd corporate",
    email: "223@gmail.com",
    mobile: "0941264897",
    corporate_usage: "23",
    accounts_usage: "512564",
    status: "Inactive",
    validity_duration: "8989",
  },
  {
    id: 3,
    name: "asd",
    corporate_admin: "Jomaasdasasdari corporate",
    email: "jomtodasui@gmail.com",
    mobile: "094a2asd64897",
    corporate_usage: "asd23",
    accounts_usage: "5125asd64",
    status: "Expired",
    validity_duration: "sdsa",
  },
];

export default function SuperAdminDashboard() {
  const [page, setPage] = useState(1);

  const [isSearch, setSearch] = useState("");

  // const { data, isLoading, isError } = GetUser(isSearch, page, 10);

  // const subscribers = data?.data?.data;

  const [SelectedItem, setSelectedItem] = useState<subscriber | null>(null);

  return (
    <div className="h-full flex flex-col justify-center">
      <section>
        <div className=" flex justify-between items-center mb-5">
          <h1 className="pageTitle">Subscribers</h1>
          <button
            className="buttonRed"
            onClick={() => {
              setSelectedItem({
                name: "",
                corporate_admin: "",
                email: "",
                mobile: "",
                corporate_usage: "",
                accounts_usage: "",
                status: "",
                validity_duration: "",
              });
            }}
          >
            ADD SUBSCRIBER
          </button>
        </div>
        <div className="table_container">
          <table className="table_list prop">
            <thead>
              <tr>
                <th>ID</th>
                <th>CORPORATE ADMIN</th>
                <th>CORPORATE USAGE</th>
                <th>ACCOUNTS USAGE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {sampleData?.map((itemDetail: subscriber, index: number) => (
                <tr
                  className=" cursor-pointer"
                  key={index}
                  onClick={() => setSelectedItem(itemDetail)}
                >
                  <td>{itemDetail.id}</td>
                  <td>{itemDetail.corporate_admin}</td>
                  <td>{itemDetail.corporate_usage}</td>
                  <td>{itemDetail.accounts_usage}</td>
                  <td>{itemDetail.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {isLoading && (
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
          )} */}
          {/* {isError && <TableErrorMessage />} */}
        </div>

        {/* <Pagination
          setTablePage={setPage}
          TablePage={page}
          PageNumber={data?.data.last_page}
          CurrentPage={data?.data.current_page}
        /> */}
        {SelectedItem !== null && (
          <SubscriberForm
            onClose={() => setSelectedItem(null)}
            formData={SelectedItem}
          />
        )}
      </section>
    </div>
  );
}
