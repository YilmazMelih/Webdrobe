import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoesLogo from "../assets/icons/shoe.svg";

export default function ClothingIcon(props) {
    return (
        <div className="clothing-icon-container">
            <button className="clothing-icon" aria-label={props.name}>
                <img
                    className="clothing-icon-img"
                    src={props.icon == 0 ? shirtLogo : props.icon == 1 ? pantsLogo : shoesLogo}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                />
            </button>
            <span className="clothing-icon-label">{props.name}</span>
        </div>
    );
}
