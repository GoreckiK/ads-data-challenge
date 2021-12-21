import React, { useEffect, useState } from "react";
import "./App.css";
import { useConvertCSVtoJSON } from "./hooks/common";
import Legend from "./components/Legend";
import Filters from "./components/Filters";
import Chart from "./components/Chart";
import { ConvertedToJson } from "./types/AdTypes";

function App() {
	const { convertedData } = useConvertCSVtoJSON(
		"http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv"
	);
	const [convData, setConvData] = useState([] as ConvertedToJson[]);

	useEffect(() => {
		setConvData(convertedData);
	}, [convertedData])
	
	return (
		<div className="App">
			<Legend />
			<div className="chart-container">
				<Filters data={convData} setData={setConvData} />
				<Chart data={convData} />
			</div>
		</div>
	);
}

export default App;
