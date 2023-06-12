import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    dataSet: number[];
};

export default function DoughnutChartComp({ dataSet }: Props) {
    const data = {
        labels: ["Developer", "Owner"],
        datasets: [
            {
                label: `Unit`,
                data: dataSet,
                backgroundColor: ["#d4a8a8", "#8f384d"],
                borderColor: ["#d4a8a8", "#8f384d"],
                borderWidth: 1,
                hoverOffset: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
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
        <>
            <div className="w-full flex justify-center">
                <div className="w-2/4">
                    <Doughnut data={data} options={options} />
                </div>
            </div>
            <ul className=" w-full flex flex-wrap justify-around mb-5">
                <li className=" text-RegularColor text-[12px] flex items-center">
                    <div className=" h-3 w-3 rounded-full bg-ThemeRed mr-3"></div>
                    Properties owned by Owner Class
                </li>
                <li className=" text-RegularColor text-[12px] flex items-center">
                    <div className=" h-3 w-3 rounded-full bg-[#d4a8a8] mr-3"></div>
                    Properties owned by Developer Class
                </li>
            </ul>
        </>
    );
}
