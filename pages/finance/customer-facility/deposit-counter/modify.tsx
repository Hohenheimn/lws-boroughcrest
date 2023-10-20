import React from "react";
import { format, isValid, parse } from "date-fns";
import { BeatLoader } from "react-spinners";

import DepositForm from "../../../../components/FINANCE/CustomerFacility/DepositCounter/DepositForm";
import { ShowDeposit } from "../../../../components/FINANCE/CustomerFacility/DepositCounter/Query";
import NoPermissionComp from "../../../../components/Reusable/PermissionValidation/NoPermissionComp";
import { PageAccessValidation } from "../../../../components/Reusable/PermissionValidation/PageAccessValidation";

export default function modify({ id }: any) {
  const { isLoading, data, isError } = ShowDeposit(id);
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
        <h1>Something is wrong!</h1>
      </div>
    );
  }
  const defCashReceipt = data?.data.children.map((itemCash: any) => {
    const date = parse(itemCash.receipt_date, "yyyy-MM-dd", new Date());
    return {
      deposit_date: isValid(date) ? format(date, "MMM dd yyyy") : "",
      customer: itemCash.depositor.name,
      receipt_no: itemCash.receipt_no,
      amount: itemCash.amount_paid,
      id: itemCash.id,
      select: true,
    };
  });

  const deposit_date = parse(data?.data.deposit_date, "yyyy-MM-dd", new Date());

  //   const PagePermisson = PageAccessValidation("Deposit Counter");

  //   if (!PagePermisson && PagePermisson !== undefined) {
  //     return <NoPermissionComp />;
  //   }

  return (
    <>
      <DepositForm
        id={id}
        defDate={format(deposit_date, "MMM dd yyyy")}
        defReferenceNo={data?.data.reference_no}
        defBank={{
          id: data?.data.bank_account.id,
          value:
            data?.data.bank_account.bank_branch +
            " - " +
            data?.data.bank_account.bank_acc_no,
        }}
        defCashReceipt={defCashReceipt}
      />
    </>
  );
}
export async function getServerSideProps({ query }: any) {
  const id = query.deposit_id;
  return {
    props: {
      id: id,
    },
  };
}
