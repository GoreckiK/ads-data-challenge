import { idGenerator } from "../helpers/common";

interface IDropdownProps {
	onItemClick: (item: string) => void;
	onClose: () => void;
	items: string[];
	isListVisible: boolean;
}

const Dropdown: React.FC<IDropdownProps> = ({
	onItemClick,
	items,
	isListVisible,
	children,
	onClose,
}) => {
	const id = idGenerator();

	return (
		<div className="dropdown-wrapper">
			<div className="dropdown" onClick={onClose}>
				{children}
				{isListVisible && (
					<ul className="dropdown-list">
						{items.map((item) => {
							return (
								<li
									className="dropdown-item"
									onClick={() => onItemClick(item)}
									key={item + id.next().value}
								>
									{item}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Dropdown;
