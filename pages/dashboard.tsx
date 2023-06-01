import { GetServerSideProps } from "next";
import React from "react";
import { requiredAuthentication } from "../components/HOC/Authentication";

import PieChartComp from "../components/Dashboard/PieChartComp";
import BarChartComp from "../components/Dashboard/BarChartComp";

function Dashboard() {
    return (
        <div>
            <ul className="flex justify-between flex-wrap">
                <li className="w-[49%] ">
                    <h4 className=" mb-3">Occupancy Demographic</h4>
                    <div className="p-4 bg-white shadow-md rounded-lg w-full">
                        <PieChartComp />
                    </div>
                </li>
                <li className="w-[49%] ">
                    <h4 className=" mb-3">Utility Consumption</h4>
                    <div className="p-4 bg-white shadow-md rounded-lg w-full">
                        <div className="w-full">
                            <BarChartComp />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = requiredAuthentication(
    async (context) => {
        return {
            props: {},
        };
    }
);
