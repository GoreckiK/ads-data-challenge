import React, { useEffect, useMemo, useState } from "react";
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
	const [dataSourcesFilters, setDataSourcesFilters] = useState(
		[] as string[]
	);
	const [campaignsFilters, setCampaignsFilters] = useState([] as string[]);

	const campaigns = useMemo(() => {
		const campaigns = convertedData.map((record) => record.Campaign);
		return Array.from(new Set(campaigns));
	}, [convertedData]);

	const dataSources = useMemo(() => {
		const dataSources = convertedData.map((record) => record.Datasource);
		return Array.from(new Set(dataSources));
	}, [convertedData]);

	useEffect(() => {
		const filteredData = convertedData.filter((record) => {
			if (!campaignsFilters.length && !dataSourcesFilters.length) {
				return convertedData;
			}
			let fulfillsCondition = [];
			if (campaignsFilters.length) {
				fulfillsCondition.push(
					campaignsFilters.includes(record.Campaign)
				);
			}
			if (dataSourcesFilters.length) {
				fulfillsCondition.push(
					dataSourcesFilters.includes(record.Datasource)
				);
			}
			return !fulfillsCondition.includes(false);
		});
		setConvData(filteredData);
	}, [campaignsFilters, convertedData, dataSourcesFilters]);

	useEffect(() => {
		setConvData(convertedData);
	}, [convertedData]);

	return (
		<div className="App">
			<Legend />
			<div className="chart-container">
				<Filters
					campaigns={campaigns}
					setFiltersState={setCampaignsFilters}
					dataSources={dataSources}
					setDataSources={setDataSourcesFilters}
				/>
				<Chart data={convData} />
			</div>
		</div>
	);
}

export default App;
