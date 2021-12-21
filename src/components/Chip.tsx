import React from "react";
import {ReactComponent as CloseIcon} from "../assets/x.svg";

interface IChip {
    name: string;
    onClose: (name: string) => void;
}

const Chip:React.FC<IChip> = ({name, onClose}) => {
    return (
        <div className="chip">
            <CloseIcon onClick={() => onClose(name)}/>
            <p>{name}</p>
        </div>
    )
}

export default Chip;