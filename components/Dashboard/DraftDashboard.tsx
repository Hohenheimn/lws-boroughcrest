import React from "react";

export default function DraftDashboard() {
    return (
        <div>
            <DraftList />
            <DraftList />
            <DraftList />
            <DraftList />
        </div>
    );
}

const DraftList = () => {
    return (
        <ul className=" flex flex-wrap justify-between cursor-pointer text-[13px] w-full 1366px:text-[12px] p-3 px-5 1366px:px-3 bg-white shadow-lg rounded-lg text-RegularColor mb-3 hover:bg-[#f8f8f8]">
            <li className="w-full mb-1">
                <h5 className=" text-[#5c6e91]">Customer</h5>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%] ">ID No.</div>
                <div className=" w-[49%]">001</div>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%]">Contact No.</div>
                <div className=" w-[49%]">090000001</div>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%]">Name: </div>
                <div className=" w-[49%]">Juan Dela Cruz</div>
            </li>
            <li className="flex justify-between w-[49%] 1024px:w-full">
                <div className=" w-[49%]">Email Address</div>
                <div className=" w-[49%]">janeposter@gmai.com</div>
            </li>
        </ul>
    );
};
