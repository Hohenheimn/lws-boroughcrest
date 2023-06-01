import { GetServerSideProps } from "next";
import React from "react";
import { requiredAuthentication } from "../components/HOC/Authentication";

import HeaderDoughnutComp from "../components/Dashboard/HeaderDoughnutComp";
import LineChartComp from "../components/Dashboard/LineChartComp";

function Dashboard() {
    return (
        <div>
            <ul className="flex justify-between flex-wrap">
                <li className="w-[49%] ">
                    <h4 className=" mb-3">Occupancy Demographic</h4>
                    <div className="p-4 bg-white shadow-md rounded-lg w-full ">
                        <HeaderDoughnutComp />
                    </div>
                </li>
                <li className="w-[49%] flex flex-col">
                    <h4 className=" mb-3">Utility Consumption</h4>
                    <div className="p-10 flex items-center bg-white shadow-md rounded-lg w-full h-full">
                        <div className="w-full">
                            <LineChartComp />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;
