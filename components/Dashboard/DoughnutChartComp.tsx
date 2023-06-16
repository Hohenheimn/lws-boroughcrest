import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    dataSet: {
        label: string;
        dataSet: number;
        color: string;
    }[];
};

export default function DoughnutChartComp({ dataSet }: Props) {
    const [data, setData] = useState<any>({
        labels: dataSet.map((item) => item.label),
        datasets: [
            {
                label: `Unit`,
                data: dataSet.map((item) => item.dataSet),
                backgroundColor: ["#d4a8a8", "#8f384d"],
                borderColor: ["#d4a8a8", "#8f384d"],
                borderWidth: 1,
                hoverOffset: 20,
            },
        ],
    });

    useEffect(() => {
        setData({
            labels: dataSet.map((item) => item.label),
            datasets: [
                {
                    label: "",
                    data: dataSet.map((item) => item.dataSet),
                    backgroundColor: dataSet.map((item) => item.color),
                    borderColor: dataSet.map((item) => item.color),
                    borderWidth: 1,
                    hoverOffset: 20,
                },
            ],
        });
    }, [dataSet]);

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
            <ul className=" w-full flex flex-wrap justify-around mb-0">
                {dataSet.map((item, index) => (
                    <li
                        key={index}
                        className=" text-RegularColor text-[12px] flex items-center mb-1"
                    >
                        <div
                            className=" h-3 w-3 rounded-full mr-3"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        Properties owned by {item.label} Class
                    </li>
                ))}
            </ul>
        </>
    );
}
