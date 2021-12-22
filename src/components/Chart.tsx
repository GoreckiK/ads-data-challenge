import { Chart } from "react-chartjs-2";
import { ConvertedToJson } from "../types/Adverts";
import { kFormatter } from "../helpers/formatters";
import { Chart as Chart2, registerables } from "chart.js";
Chart2.register(...registerables);

interface IChartProps {
	data: ConvertedToJson[];
}

const ChartComponent: React.FC<IChartProps> = ({ data }) => {
	const preparedData = {
		labels: data.map((record) => record.Date),
		datasets: [
			{
				data: data.map((record) => record.Clicks),
				borderColor: "rgb(75, 192, 192)",
				label: "Clicks",
				yAxisID: "y",
				tension: 0.1,
				fill: false,
			},
			{
				data: data.map((record) => record.Impressions),
				borderColor: "rgb(175, 192, 292)",
				yAxisID: "y1",
				label: "Impressions",
				tension: 0.1,
				fill: false,
			},
		],
	};

	return (
		<div>
			<Chart
				width={1000}
				height={800}
				type="line"
				data={preparedData}
				options={{
					responsive: true,
					interaction: {
						mode: "index",
						intersect: false,
					},
					scales: {
						x: {
							ticks: {
								autoSkip: true,
								autoSkipPadding: 100,
							},
						},
						y: {
							type: "linear",
							display: true,
							position: "left",
						},
						y1: {
							type: "linear",
							display: true,
							position: "right",
							ticks: {
								callback: (value) => {
									return kFormatter(value);
								},
							},

							// grid line settings
							grid: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						},
					},
				}}
			></Chart>
		</div>
	);
};

export default ChartComponent;
