import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoesLogo from "../assets/icons/shoe.svg";
import plusLogo from "../assets/icons/plus.svg";

import Wardrobe from "./Wardrobe";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getWardrobe, addOutfit } from "../firebase";

export default function CreateOutfit() {
    const navigate = useNavigate();
    const [adding, setAdding] = useState(false);
    const [clothingData, setClothingData] = useState(null);
    const [outfitItems, setOutfitItems] = useState([]);

    function handleForm(formData) {
        const name = formData.get("name");
        addOutfit(name, outfitItems);
        navigate("/dashboard");
    }

    async function handleAdd() {
        const querySnapshot = await getWardrobe();
        const clothingData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setClothingData(clothingData);
        setAdding(true);
    }

    function deleteItem(index) {
        setOutfitItems((prev) => prev.filter((item, i) => i != index));
    }

    const outfitEls = outfitItems.map((item, index) => {
        return (
            <label
                className="radio-container"
                data-value={index}
                onClick={(event) => deleteItem(event.currentTarget.dataset.value)}
                key={item.id}
            >
                <span className="radio-box neg">
                    <img
                        className={item.icon == 2 ? "shoe" : ""}
                        src={item.icon == 0 ? shirtLogo : item.icon == 1 ? pantsLogo : shoesLogo}
                    />
                </span>
            </label>
        );
    });

    return (
        <>
            {adding ? (
                <Wardrobe
                    clothingData={clothingData}
                    adding={true}
                    setAdding={setAdding}
                    setOutfitItems={setOutfitItems}
                />
            ) : (
                <main>
                    <h1>Create Outfit</h1>
                    <form className="add-clothing-form" action={handleForm}>
                        <label htmlFor="name">Name</label>
                        <input
                            className="add-clothing-form-input"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Coffee Date Outfit"
                            maxLength="28"
                            required={true}
                        />
                        <fieldset>
                            <legend htmlFor="icon">Items</legend>
                            {outfitEls}
                            <label className="radio-container">
                                <input
                                    type="button"
                                    name="icon"
                                    onClick={() => handleAdd()}
                                    required={true}
                                />
                                <span className="radio-box">
                                    <img src={plusLogo} alt="" />
                                </span>
                            </label>
                        </fieldset>
                        <button className="form-submit-btn" type="submit">
                            Add to outfits
                        </button>
                    </form>
                    <button onClick={() => navigate("/dashboard")} className="back-btn">
                        Back
                    </button>
                </main>
            )}
        </>
    );
}
