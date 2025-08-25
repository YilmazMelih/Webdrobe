import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import ClothingIcon from "./ClothingIcon";

export default function Wardrobe(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const clothingData = props.clothingData ?? location.state?.clothingData;
    const adding = props.adding;

    useEffect(() => {
        if (!clothingData) {
            navigate("/");
        }
    }, [clothingData, navigate]);

    const clothesEls = clothingData
        ? clothingData.map((item) => {
              return (
                  <ClothingIcon
                      adding={adding}
                      setAdding={props.setAdding}
                      setOutfitItems={props.setOutfitItems}
                      name={item.name}
                      icon={item.icon}
                      id={item.id}
                      key={item.id}
                  />
              );
          })
        : null;

    return (
        <main>
            <h1>{adding ? "Select Item" : "My Wardrobe"}</h1>
            <div className="grid-wrapper">
                {clothingData ? (
                    clothingData.length == 0 ? (
                        <div className="flex-centered">
                            <span className="background-text">No Clothes Yet...</span>
                            <button className="add-btn" onClick={() => navigate("/add")}>
                                Add Clothing
                            </button>
                        </div>
                    ) : (
                        <div className="wardrobe">clothesEls</div>
                    )
                ) : null}
                <div className="fade"></div>
            </div>
            <button
                onClick={() => {
                    adding ? props.setAdding(false) : navigate("/dashboard");
                }}
                className="back-btn"
            >
                Back
            </button>
        </main>
    );
}
