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

    function* idGenerator() {
        let id = 1;
        while (true) {
            yield id ++;
        }
    }

    const generator = idGenerator();

	return (
		<div className="dropdown" onClick={onClose}>
			{children}
			{isListVisible && (
				<ul className="dropdown-list">
					{items.map((item) => {
						return (
							<li
								className="dropdown-item"
								onClick={() => onItemClick(item)}
								key={item + generator.next()}
							>
								{item}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
