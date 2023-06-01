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
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
    Utility_Consumption_Electricity,
    Utility_Consumption_Internet,
    Utility_Consumption_Water,
} from "./SampleData";

ChartJS.register(
    PointElement,
    LineElement,
    Title,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function BarChartComp() {
    const [data, setdata] = useState({
        labels: Utility_Consumption_Electricity.map((item) => item.month),
        datasets: [
            {
                label: "Electricity",
                data: Utility_Consumption_Electricity.map(
                    (item) => item.amount
                ),
                borderColor: "#8f384d",
                backgroundColor: "#8f384d",
            },
            {
                label: "Water",
                data: Utility_Consumption_Water.map((item) => item.amount),
                borderColor: "#fa8b00",
                backgroundColor: "#fa8b00",
            },
            {
                label: "Internet",
                data: Utility_Consumption_Internet.map((item) => item.amount),

                borderColor: "#2e4364",
                backgroundColor: "#2e4364",
            },
        ],
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}
