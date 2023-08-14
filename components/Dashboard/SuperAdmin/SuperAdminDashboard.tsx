import React, { useState } from "react";
import { format, isValid, parse } from "date-fns";
import { tr } from "date-fns/locale";

import { BarLoader } from "react-spinners";

import { GetUser } from "../../PROJECT/user/Query";
import { TextNumberDisplay } from "../../Reusable/NumberFormat";
import Pagination from "../../Reusable/Pagination";
import TableErrorMessage from "../../Reusable/TableErrorMessage";
import { SubscriberList } from "./Query";
import SubscriberForm from "./SubscriberForm";

export type subscriber = {
  id?: number;
  name: string;
  corporate_admin?: string;
  email: string;
  corporate_usage?: string;
  accounts_usage?: string;
  subscriber_id?: string;
  contact_no?: string;
  status: string;
  validity_duration: string;
  price?: number;
};

export default function SuperAdminDashboard() {
  const [page, setPage] = useState(1);

  const [isSearch, setSearch] = useState("");

  const { data, isLoading, isError } = SubscriberList(isSearch, page, 14);

  const subscribers = data?.data?.data;

  const [SelectedItem, setSelectedItem] = useState<subscriber | null>(null);

  return (
    // <div className="h-full flex flex-col justify-center">
    <div>
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
                contact_no: "",
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
                <th>NAME</th>
                <th>EMAIL</th>
                <th>CONTACT NO.</th>
                <th>VALIDITY DURATION</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {subscribers?.map((itemDetail: subscriber, index: number) => (
                <List
                  subscriber={itemDetail}
                  key={index}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </tbody>
          </table>
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
          {isError && <TableErrorMessage />}
        </div>

        <Pagination
          setTablePage={setPage}
          TablePage={page}
          PageNumber={data?.data.meta.last_page}
          CurrentPage={data?.data.meta.current_page}
        />
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

type ListProps = {
  subscriber: subscriber;
  setSelectedItem: Function;
};

const List = ({ subscriber, setSelectedItem }: ListProps) => {
  const validity_duration_date = parse(
    subscriber.validity_duration,
    "yyyy-MM-dd",
    new Date()
  );
  // isValid(date) ? format(date, "MMM dd yyyy") : ""
  return (
    <tr className=" cursor-pointer" onClick={() => setSelectedItem(subscriber)}>
      <td>{subscriber.id}</td>
      <td>{subscriber.name}</td>
      <td>{subscriber.email}</td>
      <td>{subscriber.contact_no}</td>
      <td>
        {isValid(validity_duration_date)
          ? format(validity_duration_date, "MMM dd yyyy")
          : ""}
      </td>
      <td>{subscriber.status}</td>
    </tr>
  );
};
