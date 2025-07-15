import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoesLogo from "../assets/icons/shoe.svg";

import { useNavigate } from "react-router-dom";
import { getItem } from "../firebase";

export default function ClothingIcon(props) {
    const navigate = useNavigate();

    return (
        <div className="clothing-icon-container">
            <button
                disabled={props.disabled}
                className="clothing-icon"
                aria-label={props.name}
                onClick={async () => {
                    if (props.adding) {
                        const itemToAdd = { id: props.id, icon: props.icon };
                        props.setOutfitItems((prev) =>
                            prev.some((item) => item.id == props.id)
                                ? [...prev]
                                : [...prev, itemToAdd]
                        );
                        props.setAdding(false);
                    } else {
                        const docSnap = await getItem(props.id);
                        const docData = { id: props.id, ...docSnap.data() };
                        navigate("/edit", { state: { docData } });
                    }
                }}
            >
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
