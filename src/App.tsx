import React from "react";
import "./App.css";
import { useConvertCSVtoJSON } from "./hooks/common";

function App() {
	const { convertedData } = useConvertCSVtoJSON("http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv");
	return <div className="App"></div>;
}

export default App;
