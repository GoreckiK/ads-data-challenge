import { Dispatch, SetStateAction, useState } from "react";
import Chip from "./Chip";
import Dropdown from "../components/Dropdown";
import { idGenerator } from "../helpers/common";

interface IFiltersProps {
	campaigns: string[];
	dataSources: string[];
	setFiltersState: Dispatch<SetStateAction<string[]>>;
	setDataSources: Dispatch<SetStateAction<string[]>>;
}

const Filters: React.FC<IFiltersProps> = ({ campaigns, dataSources, setFiltersState, setDataSources }) => {
	const [isCampaignListVisible, setIsCampaignListVisible] = useState(false);
	const [isDataSourceListVisible, setIsDataSourceListVisible] =
		useState(false);
	const [pickedCampaigns, setPickedCampaigns] = useState([] as string[]);
	const [pickedDataSources, setPickedDataSources] = useState([] as string[]);
	const id = idGenerator();

	const onCampaignListItemClick = (campaign: string) => {
		setPickedCampaigns([...pickedCampaigns, campaign]);
	};

	const onDataSourceItemClick = (ds: string) => {
		setPickedDataSources([...pickedDataSources, ds]);
	}

	const onApplyButtonClick = () => {
		setIsCampaignListVisible(false);
		setIsDataSourceListVisible(false);
		setFiltersState(pickedCampaigns);
		setDataSources(pickedDataSources);
	};

	const onResetButtonClick = () => {
		setIsCampaignListVisible(false);
		setIsDataSourceListVisible(false);
		setPickedDataSources([]);
		setPickedCampaigns([]);
		setFiltersState([]);
		setDataSources([]);
	}


	const removeChip = (name: string) => {
		const chipIndex = pickedDataSources.indexOf(name);
		const chipsCopy = [...pickedDataSources];
		chipsCopy.splice(chipIndex, 1);
		setPickedDataSources(chipsCopy);
		setIsDataSourceListVisible(false);
	}
	return (
		<div className="filters">
			<h2>Filter dimension values</h2>
			<button onClick={onResetButtonClick}>Reset</button>
			<button onClick={onApplyButtonClick}>Apply</button>
			<h4>Datasource</h4>
			<Dropdown
				onClose={() => setIsDataSourceListVisible((state) => !state)}
				onItemClick={onDataSourceItemClick}
				isListVisible={isDataSourceListVisible}
				items={dataSources}
			>
				{pickedDataSources.length ?
				pickedDataSources.map((source) => {
					return <Chip name={source} onClose={removeChip} key={source + id.next().value }/>
				}) : "All"}
			</Dropdown>
			<h4>Campaign</h4>
			<Dropdown
				onClose={() => setIsCampaignListVisible((state) => !state)}
				onItemClick={onCampaignListItemClick}
				isListVisible={isCampaignListVisible}
				items={campaigns}
			>
				<p style={{margin: "unset"}}>{pickedCampaigns.length ? pickedCampaigns.length : "All"}</p>
			</Dropdown>
		</div>
	);
};

export default Filters;
