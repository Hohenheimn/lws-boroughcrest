import React, { useEffect, useState } from "react";
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
import { GetDashboardUtility } from "./Query";
import {
    BeatLoader,
    CircleLoader,
    ClimbingBoxLoader,
    DotLoader,
    GridLoader,
    RotateLoader,
    SyncLoader,
} from "react-spinners";

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

type DataSets = {
    label: string;
    data: number[];
    color: string;
};

export default function LineChartComp() {
    const { data, isLoading, isError } = GetDashboardUtility();

    const [isDataSets, setDataSets] = useState<DataSets[]>([]);

    useEffect(() => {
        if (data?.data !== undefined) {
            const arrayData: any = [];
            const keys = Object.keys(data?.data?.records);
            keys.forEach((key, index) => {
                let color = "#8f384d";
                if (index === 1) {
                    color = "#d4a8a8";
                }
                if (index === 2) {
                    color = "#c75543";
                }
                if (index === 3) {
                    color = "#2e4364";
                }
                if (index === 4) {
                    color = "#d57f5a";
                }
                if (index === 5) {
                    color = "#d6a278";
                }
                if (index === 6) {
                    color = "#444a66";
                }
                if (index === 7) {
                    color = "#8d8949";
                }
                if (index === 8) {
                    color = "#b2c1ad";
                }

                arrayData.push({
                    label: key,
                    data: data?.data.records[key],
                    color: color,
                });
            });
            setDataSets(arrayData);
        }
    }, [data?.data]);

    const [LineChart, setLineChart] = useState<any>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        if (data?.data !== undefined) {
            setLineChart({
                labels: data?.data?.months.map((itemMap: string) => itemMap),
                datasets: isDataSets.map((itemMap) => {
                    return {
                        label: itemMap.label,
                        data: itemMap?.data.map((item) => item),
                        borderColor:
                            itemMap.label === "Total"
                                ? "#939393"
                                : itemMap.color,
                        backgroundColor:
                            itemMap.label === "Total"
                                ? "#939393"
                                : itemMap.color,
                        order: itemMap.label === "Total" ? 2 : 1,
                        type: itemMap.label === "Total" ? "bar" : "line",
                    };
                }),
            });
        }
    }, [isDataSets]);

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
            {isLoading && (
                <div className="flex justify-center">
                    <BeatLoader size={30} color="#8f384d" />
                </div>
            )}
            {isError && (
                <div className="flex justify-center">
                    <h1>Something went wrong</h1>
                </div>
            )}
            {!isLoading && !isError && (
                <>
                    <Line data={LineChart} options={options} />
                    <div className=" hidden">
                        <Bar data={LineChart} />
                    </div>
                    <ul className=" w-full flex justify-around flex-wrap mt-5">
                        {isDataSets.map((item, index) => (
                            <li
                                key={index}
                                className=" text-RegularColor text-[12px] flex items-center"
                            >
                                <div
                                    className={` h-3 w-3 rounded-full mr-3`}
                                    style={{
                                        backgroundColor: `${
                                            item.label === "Total"
                                                ? "#939393"
                                                : item.color
                                        }`,
                                    }}
                                ></div>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
