import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
    Utility_Consumption_Electricity,
    Utility_Consumption_Internet,
    Utility_Consumption_Water,
} from "./SampleData";

ChartJS.register(
    BarElement,
    PointElement,
    LineElement,
    Title,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function LineChartComp() {
    const [data, setdata] = useState<any>({
        labels: Utility_Consumption_Electricity.map((item) => item.month),
        datasets: [
            {
                label: "Total",
                data: Utility_Consumption_Electricity.map(
                    (item) => item.amount
                ),
                borderColor: "#939393",
                backgroundColor: "#939393",
                type: "bar",
                order: 3,
                hoverScale: 1.5,
            },
            {
                label: "Electricity",
                data: Utility_Consumption_Electricity.map(
                    (item) => item.amount
                ),
                borderColor: "#8f384d",
                backgroundColor: "#8f384d",
                order: 2,
            },
            {
                label: "Water",
                data: Utility_Consumption_Water.map((item) => item.amount),
                borderColor: "#fa8b00",
                backgroundColor: "#fa8b00",
                order: 2,
            },
            {
                label: "Internet",
                data: Utility_Consumption_Internet.map((item) => item.amount),
                borderColor: "#2e4364",
                backgroundColor: "#2e4364",
                order: 2,
            },
        ],
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
                display: false,
            },
        },
        layout: {
            padding: 20,
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
            <ul className=" w-full flex justify-around flex-wrap mt-5">
                <li className=" text-RegularColor text-[12px] flex items-center">
                    <div className=" h-3 w-3 rounded-full bg-RegularColor mr-3"></div>
                    Total
                </li>
                <li className=" text-RegularColor text-[12px] flex items-center">
                    <div className=" h-3 w-3 rounded-full bg-[#8f384d] mr-3"></div>
                    Electricity
                </li>
                <li className=" text-RegularColor text-[12px] flex items-center">
                    <div className=" h-3 w-3 rounded-full bg-[#fa8b00] mr-3"></div>
                    Water
                </li>
                <li className=" text-RegularColor text-[12px] flex items-center">
                    <div className=" h-3 w-3 rounded-full bg-[#2e4364] mr-3"></div>
                    Internet
                </li>
            </ul>
        </div>
    );
}
