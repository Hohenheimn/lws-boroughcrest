import React from "react";
import { BeatLoader } from "react-spinners";

import PaymentRegisterDetail from "../PaymentRegisterDetail";
import { GetCollectionDetail } from "../ReceivePayment/Query";

type Props = {
  id: any;
};

export default function PrintCollectionDetail({ id }: Props) {
  const { isLoading, data, isError } = GetCollectionDetail(id);

  if (isLoading) {
    return (
      <div className="pageDetail">
        <BeatLoader
          color={"#8f384d"}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pageDetail">
        <h1>Something is wrong</h1>
      </div>
    );
  }
  return (
    <div>
      <PaymentRegisterDetail
        CollectionDetail={data?.data}
        DisplayForPrint={true}
      />
    </div>
  );
}
