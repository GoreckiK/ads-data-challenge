import {
	CartesianGrid,
	Label,
	Legend,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";
import { ConvertedToJson } from "../types/AdTypes";
import { kFormatter } from "../helpers/formatters";

interface IChartProps {
	data: ConvertedToJson[];
}

const Chart: React.FC<IChartProps> = ({ data }) => {
	const lessData = data.filter((entry, index) => index % 31 === 0);
	console.log(lessData);

	return (
		<LineChart
			width={1200}
			height={600}
			data={lessData.map((record) => {
				return {
					...record,
					Clicks: parseInt(record.Clicks),
					Impressions: parseInt(record.Impressions),
				};
			})}
			margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDashoffset={30} />
			<XAxis
				dataKey="Date"
				allowDataOverflow={false}
				type="category"
				minTickGap={120}
			></XAxis>
			<YAxis yAxisId="left" dataKey="Clicks" >
				<Label
					value="Clicks"
					position="insideLeft"
					offset={0}
					angle={-90}
				/>
			</YAxis>
			<YAxis
				yAxisId="right"
				orientation="right"
				dataKey="Impressions"
				tickFormatter={(value) => {
					return kFormatter(value);
				}}
                tickCount={6}
			>
				<Label
					value="Impressions"
					position="insideRight"
					offset={0}
					angle={90}
				/>
			</YAxis>
			<Legend />
			<Line
				yAxisId="left"
				type="monotone"
				dataKey="Clicks"
				stroke="#8884d8"
				activeDot={{ r: 18 }}
			/>
			<Line
				yAxisId="right"
				type="monotone"
				dataKey="Impressions"
				stroke="#82ca9d"
			/>
		</LineChart>
	);
};

export default Chart;
