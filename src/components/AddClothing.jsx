import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoeLogo from "../assets/icons/shoe.svg";

import { useNavigate } from "react-router";
import { addItemToWardrobe } from "../firebase";

export default function AddClothing() {
    const navigate = useNavigate();

    function handleForm(formData) {
        const name = formData.get("name");
        const desc = formData.get("desc");
        const icon = formData.get("icon");
        addItemToWardrobe(name, desc, icon);
    }

    return (
        <main>
            <h1>Add Clothing</h1>
            <form className="add-clothing-form" action={handleForm}>
                <label htmlFor="name">Name</label>
                <input
                    className="add-clothing-form-input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Blue Sweater"
                    maxLength="20"
                    required={true}
                />
                <label htmlFor="desc">Description</label>
                <textarea
                    className="add-clothing-form-input"
                    id="desc"
                    name="desc"
                    type="text"
                    placeholder="Royal blue, cable-knit sweater"
                    maxLength="128"
                    cols={20}
                    rows={40}
                    required={true}
                />
                <fieldset>
                    <legend htmlFor="icon">Icon</legend>
                    <label className="radio-container">
                        <input type="radio" name="icon" value={0} required={true} />
                        <span className="radio-box">
                            <img
                                src={shirtLogo}
                                alt=""
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="icon" value={1} />
                        <span className="radio-box">
                            <img
                                src={pantsLogo}
                                alt=""
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </span>
                    </label>
                    <label className="radio-container">
                        <input type="radio" name="icon" value={2} />
                        <span className="radio-box">
                            <img
                                className="shoe"
                                src={shoeLogo}
                                alt=""
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
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
