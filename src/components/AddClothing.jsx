import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoeLogo from "../assets/icons/shoe.svg";

import { useNavigate } from "react-router";

export default function AddClothing() {
    const navigate = useNavigate();

    return (
        <main>
            <h1>Add Clothing</h1>
            <form className="add-clothing-form" action={() => {}}>
                <label htmlFor="name">Name</label>
                <input
                    className="add-clothing-form-input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Blue Sweater"
                    maxLength="16"
                />
                <label htmlFor="desc">Description</label>
                <textarea
                    className="add-clothing-form-input"
                    id="desc"
                    name="name"
                    type="text"
                    placeholder="Royal blue, cable-knit sweater"
                    maxLength="128"
                    cols={20}
                    rows={40}
                />
                <fieldset>
                    <legend htmlFor="icon">Icon</legend>
                    <label className="radio-container">
                        <input type="radio" name="icon" value={0} />
                        <span className="radio-box">
                            <img src={shirtLogo} alt="" />
                        </span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="icon" value={1} />
                        <span className="radio-box">
                            <img src={pantsLogo} alt="" />
                        </span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="icon" value={2} />
                        <span className="radio-box">
                            <img className="shoe" src={shoeLogo} alt="" />
                        </span>
                    </label>
                </fieldset>
                <button className="form-submit-btn" type="submit">
                    Add to wardrobe
                </button>
            </form>
            <button onClick={() => navigate("/dashboard")} className="back-btn">
                Back
            </button>
        </main>
    );
}
