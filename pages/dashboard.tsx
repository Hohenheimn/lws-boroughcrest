import { GetServerSideProps } from "next";
import React from "react";
import { requiredAuthentication } from "../components/HOC/Authentication";

import HeaderDoughnutComp from "../components/Dashboard/HeaderDoughnutComp";
import LineChartComp from "../components/Dashboard/LineChartComp";
import AnnoucementBoard from "../components/Dashboard/AnnoucementBoard";
import RequestComp from "../components/Dashboard/RequestComp";
import DraftDashboard from "../components/Dashboard/DraftDashboard";
import AnnouncementList from "../components/ADMIN/Announcement/AnnouncementList";

function Dashboard() {
    return (
        <div>
            <ul className="flex justify-between flex-wrap">
                <li className="w-[49%] mb-10 640px:w-full">
                    <h4 className=" mb-3">Occupancy Demographic</h4>
                    <div className="p-4 bg-white shadow-md rounded-lg w-full ">
                        <HeaderDoughnutComp />
                    </div>
                </li>
                <li className="w-[49%] mb-10 flex flex-col  640px:w-full">
                    <h4 className=" mb-3">Utility Consumption</h4>
                    <div className="p-10 1024px:p-5 flex items-center bg-white shadow-md rounded-lg w-full h-full">
                        <div className="w-full">
                            <LineChartComp />
                        </div>
                    </div>
                </li>
                <li className="w-[49%] flex flex-col h-[800px] 640px:w-full 640px:mb-10 640px:h-[500px]">
                    <h4 className=" mb-3">Announcement Board</h4>
                    <div className="p-4 bg-white shadow-md rounded-lg w-full h-full overflow-auto">
                        {/* <AnnouncementList type="dashboard" /> */}
                    </div>
                </li>
                <li className="w-[49%] flex flex-col h-[800px] 640px:w-full">
                    <div className="h-[50%] flex flex-col pb-2">
                        <h4 className=" mb-3">Request</h4>
                        <div className="p-4 bg-white shadow-md rounded-lg w-full h-full overflow-auto">
                            <RequestComp />
                        </div>
                    </div>
                    <div className="h-[50%] flex flex-col pt-2">
                        <h4 className=" mb-3">Draft</h4>
                        <div className="p-4 bg-white shadow-md rounded-lg w-full  h-full overflow-auto">
                            <DraftDashboard />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;
