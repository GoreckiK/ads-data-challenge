import { ConvertedToJson } from './../types/AdTypes';
import { useEffect, useState } from "react";

const useConvertCSVtoJSON = (url: string) => {
	const [convertedData, setConvertedData] = useState([] as ConvertedToJson[]);

	useEffect(() => {
		const convertData = () => {
			fetch(url).then(async (res) => {
				try {
					const data = await res.text();
					const lines = data.split("\n");
					const headers = lines.shift()?.split(",");
					const convertedData = lines.map((el) => {
						const splitEl = el.split(",");
						return headers!.reduce((acc, curr, index) => {
							acc[curr] = splitEl[index];
							return acc;
						}, {} as ConvertedToJson);
					});
					setConvertedData(convertedData);
				} catch (error) {
					console.error(error);
				}
			});
		};
		convertData();
	}, [url]);

	return { convertedData };
};

export { useConvertCSVtoJSON };
