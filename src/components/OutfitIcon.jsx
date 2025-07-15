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
                onClick={async () => {
                    props.onClick(props.name, props.clothes, props.id);
                }}
            >
                <label className="radio-container">
                    <span className="radio-box">
                        <img
                            className={props.clothes[0].icon == 2 ? "shoe" : ""}
                            src={
                                props.clothes[0].icon == 0
                                    ? shirtLogo
                                    : props.clothes[0].icon == 1
                                    ? pantsLogo
                                    : shoesLogo
                            }
                        />
                    </span>
                </label>
                <label className="radio-container">
                    <span className="radio-box">
                        <img
                            className={props.clothes[1].icon == 2 ? "shoe" : ""}
                            src={
                                props.clothes[1].icon == 0
                                    ? shirtLogo
                                    : props.clothes[1].icon == 1
                                    ? pantsLogo
                                    : shoesLogo
                            }
                        />
                    </span>
                </label>
                {props.clothes[2] ? (
                    <label className="radio-container">
                        <span className="radio-box">
                            <img
                                className={props.clothes[2].icon == 2 ? "shoe" : ""}
                                src={
                                    props.clothes[2].icon == 0
                                        ? shirtLogo
                                        : props.clothes[2].icon == 1
                                        ? pantsLogo
                                        : shoesLogo
                                }
                            />
                        </span>
                    </label>
                ) : null}
                {props.clothes[3] ? (
                    <label className="radio-container">
                        <span className="radio-box">
                            <img
                                className={props.clothes[3].icon == 2 ? "shoe" : ""}
                                src={
                                    props.clothes[3].icon == 0
                                        ? shirtLogo
                                        : props.clothes[3].icon == 1
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
