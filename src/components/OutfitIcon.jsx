import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoesLogo from "../assets/icons/shoe.svg";

import { useNavigate } from "react-router-dom";
import { getItem } from "../firebase";

export default function OutfitIcon(props) {
    const navigate = useNavigate();

    return (
        <div className="outfit-icon-container">
            <button
                className="outfit-icon"
                aria-label={props.name}
                // onClick={async () => {
                //     if (props.adding) {
                //         const itemToAdd = { id: props.id, icon: props.icon };
                //         props.setOutfitItems((prev) =>
                //             prev.some((item) => item.id == props.id)
                //                 ? [...prev]
                //                 : [...prev, itemToAdd]
                //         );
                //         props.setAdding(false);
                //     } else {
                //         const docSnap = await getItem(props.id);
                //         const docData = { id: props.id, ...docSnap.data() };
                //         navigate("/edit", { state: { docData } });
                //     }
                // }}
            >
                <label className="radio-container">
                    <span className="radio-box">
                        <img
                            className={props.outfits[0].icon == 2 ? "shoe" : ""}
                            src={
                                props.outfits[0].icon == 0
                                    ? shirtLogo
                                    : props.outfits[0].icon == 1
                                    ? pantsLogo
                                    : shoesLogo
                            }
                        />
                    </span>
                </label>
                <label className="radio-container">
                    <span className="radio-box">
                        <img
                            className={props.outfits[1].icon == 2 ? "shoe" : ""}
                            src={
                                props.outfits[1].icon == 0
                                    ? shirtLogo
                                    : props.outfits[1].icon == 1
                                    ? pantsLogo
                                    : shoesLogo
                            }
                        />
                    </span>
                </label>
                {props.outfits[2] ? (
                    <label className="radio-container">
                        <span className="radio-box">
                            <img
                                className={props.outfits[2].icon == 2 ? "shoe" : ""}
                                src={
                                    props.outfits[2].icon == 0
                                        ? shirtLogo
                                        : props.outfits[2].icon == 1
                                        ? pantsLogo
                                        : shoesLogo
                                }
                            />
                        </span>
                    </label>
                ) : null}
                {props.outfits[3] ? (
                    <label className="radio-container">
                        <span className="radio-box">
                            <img
                                className={props.outfits[3].icon == 2 ? "shoe" : ""}
                                src={
                                    props.outfits[3].icon == 0
                                        ? shirtLogo
                                        : props.outfits[3].icon == 1
                                        ? pantsLogo
                                        : shoesLogo
                                }
                            />
                        </span>
                    </label>
                ) : null}
            </button>
            <span className="outfit-icon-label">{props.name}</span>
        </div>
    );
}
