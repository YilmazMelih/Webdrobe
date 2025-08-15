import shirtLogo from "../assets/icons/shirt.svg";
import pantsLogo from "../assets/icons/pants.svg";
import shoesLogo from "../assets/icons/shoe.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOutfit, getOutfits } from "../firebase";
import ClothingIcon from "./ClothingIcon";

export default function ViewOutfit(props) {
    const clothingData = props.clothingData;
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const navigate = useNavigate();

    const clothesEls = clothingData.map((item) => {
        return (
            <ClothingIcon
                name={item.name}
                icon={item.icon}
                id={item.id}
                key={item.id}
                disabled={true}
            />
        );
    });

    return (
        <main>
            <h1>{props.name}</h1>
            <div className="grid-wrapper">
                <div className="wardrobe">{clothesEls}</div>
                <div className="fade"></div>
            </div>
            <button
                onClick={() => {
                    props.setView(false);
                }}
                className="back-btn"
            >
                Back
            </button>
            <button
                onClick={async () => {
                    if (!deleteConfirm) {
                        setDeleteConfirm(true);
                    } else {
                        await deleteOutfit(props.id);
                        const querySnapshot = await getOutfits();
                        const outfitsData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        props.setOutfitData(outfitsData);
                        props.setView(false);
                    }
                }}
                className="delete-btn"
            >
                {deleteConfirm ? "Are you sure?" : "Delete Outfit"}
            </button>
        </main>
    );
}
