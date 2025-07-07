import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import ClothingIcon from "./ClothingIcon";

export default function Wardrobe() {
    const location = useLocation();
    const navigate = useNavigate();
    const clothingData = location.state?.clothingData;

    console.log(clothingData);
    useEffect(() => {
        if (!clothingData) {
            navigate("/");
        }
    }, [clothingData, navigate]);

    const clothesEls = clothingData.map((item) => {
        return <ClothingIcon name={item.name} icon={item.icon} key={item.id} />;
    });

    return (
        <main>
            <h1>My Wardrobe</h1>
            <div className="grid-wrapper">
                <div className="wardrobe">
                    {clothingData.length == 0 ? (
                        <span className="background-text">No Clothes Yet...</span>
                    ) : (
                        clothesEls
                    )}
                </div>
                <div className="fade"></div>
            </div>
            <button onClick={() => navigate("/dashboard")} className="back-btn">
                Back
            </button>
        </main>
    );
}
