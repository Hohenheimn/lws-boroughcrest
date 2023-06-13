import React from "react";
import {
    GetCustomerList,
    GetCustomerListDraft,
} from "../ReactQuery/CustomerMethod";
import {
    GetPropertyList,
    GetPropertyListDraft,
} from "../ReactQuery/PropertyMethod";
import { BeatLoader } from "react-spinners";
import { customer } from "../../types/customerList";
import { property } from "../../types/PropertyList";
import { useRouter } from "next/router";

export default function DraftDashboard() {
    const {
        data: customerData,
        isLoading: customerLoading,
        isError: customerError,
    } = GetCustomerListDraft();

    const {
        data: propertyData,
        isLoading: propertyLoading,
        isError: propertyError,
    } = GetPropertyListDraft();
    return (
        <div className="h-full">
            {(customerLoading || propertyLoading) && (
                <div className="flex justify-center w-full h-full">
                    <BeatLoader size={30} color="#8f384d" />
                </div>
            )}
            {(propertyError || customerError) && (
                <div className="flex justify-center">
                    <h1>Something went wrong</h1>
                </div>
            )}
            {customerData?.data.map((item: customer, index: number) => (
                <DraftCustomerList itemDetail={item} key={index} />
            ))}
            {propertyData?.data.map((item: property, index: number) => (
                <DraftPropertyList itemDetail={item} key={index} />
            ))}
        </div>
    );
}

type DraftCustomerProps = {
    itemDetail: customer;
};

const DraftCustomerList = ({ itemDetail }: DraftCustomerProps) => {
    const router = useRouter();
    const RedirectHandler = () => {
        router.push(`/admin/customer?draft=${itemDetail.id}`);
    };
    return (
        <ul
            onClick={RedirectHandler}
            className=" flex flex-wrap justify-between cursor-pointer text-[13px] w-full 1366px:text-[12px] p-3 px-5 1366px:px-3 bg-white shadow-lg rounded-lg text-RegularColor mb-3 hover:bg-[#f8f8f8]"
        >
            <li className="w-full mb-1">
                <h5 className=" text-[#5c6e91]">Customer</h5>
            </li>
            <li className="flex justify-between w-[49%] mb-1 1024px:w-full">
                <div className=" w-[49%] ">ID No.</div>
                <div className=" w-[49%]">{itemDetail.id}</div>
            </li>
            <li className="flex justify-between w-[49%] mb-1 1024px:w-full">
                <div className=" w-[49%]">Contact No.</div>
                <div className=" w-[49%]">{itemDetail.contact_no}</div>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%]">Name: </div>
                <div className=" w-[49%]">{itemDetail.name}</div>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%]">Email Address</div>
                <div className=" w-[49%] break-words">
                    {itemDetail.preferred_email}
                </div>
            </li>
        </ul>
    );
};

type DraftPropertyProps = {
    itemDetail: property;
};

const DraftPropertyList = ({ itemDetail }: DraftPropertyProps) => {
    const router = useRouter();
    const RedirectHandler = () => {
        router.push(`/admin/property?draft=${itemDetail.id}`);
    };
    return (
        <ul
            onClick={RedirectHandler}
            className=" flex flex-wrap justify-between cursor-pointer text-[13px] w-full 1366px:text-[12px] p-3 px-5 1366px:px-3 bg-white shadow-lg rounded-lg text-RegularColor mb-3 hover:bg-[#f8f8f8]"
        >
            <li className="w-full mb-1">
                <h5 className=" text-[#5c6e91]">Property: </h5>
            </li>
            <li className="flex justify-between w-[49%] mb-1 1024px:w-full">
                <div className=" w-[49%] ">ID No.: </div>
                <div className=" w-[49%]">{itemDetail?.id}</div>
            </li>
            <li className="flex justify-between w-[49%] mb-1 1024px:w-full">
                <div className=" w-[49%]">Class: </div>
                <div className=" w-[49%]">{itemDetail?.class}</div>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%]">Developer: </div>
                <div className=" w-[49%]">{itemDetail?.developer?.name}</div>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%]">Project: </div>
                <div className=" w-[49%] break-words">
                    {itemDetail?.project?.name}
                </div>
            </li>
        </ul>
    );
};
