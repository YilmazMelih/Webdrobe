import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import OutfitIcon from "./OutfitIcon";
import ViewOutfit from "./ViewOutfit";

import { getOutfit } from "../firebase";

export default function Outfits(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [outfitData, setOutfitData] = useState(location.state?.outfitsData);
    const [view, setView] = useState(false);
    const [clothingData, setClothingData] = useState([]);
    const [outfitName, setOutfitName] = useState("");
    const [outfitID, setOutfitID] = useState("");

    useEffect(() => {
        if (!outfitData) {
            navigate("/");
        }
    }, [outfitData, navigate]);

    async function viewOutfit(name, clothes, id) {
        const idArr = clothes.map((item) => item.id);
        const clothesData = await getOutfit(idArr);
        setClothingData(clothesData);
        setOutfitName(name);
        setOutfitID(id);

        setView(true);
    }

    const outfitEls = outfitData
        ? outfitData.map((item) => {
              return (
                  <OutfitIcon
                      name={item.name}
                      clothes={item.items}
                      id={item.id}
                      key={item.id}
                      disabled={true}
                      onClick={viewOutfit}
                  />
              );
          })
        : null;

    return view ? (
        <ViewOutfit
            name={outfitName}
            clothingData={clothingData}
            id={outfitID}
            setView={setView}
            setOutfitData={setOutfitData}
        />
    ) : (
        <main>
            <h1>My Outfits</h1>
            <div className="grid-wrapper">
                {outfitData ? (
                    outfitData.length == 0 ? (
                        <div className="flex-centered">
                            <span className="background-text">No Outfits Yet...</span>
                            <button className="add-btn" onClick={() => navigate("/create")}>
                                Create Outfit
                            </button>
                        </div>
                    ) : (
                        <div className="outfits">{outfitEls}</div>
                    )
                ) : null}
                <div className="fade"></div>
            </div>
            <button
                onClick={() => {
                    navigate("/dashboard");
                }}
                className="back-btn"
            >
                Back
            </button>
            {outfitData && outfitData.length != 0 ? (
                <button className="create-btn" onClick={() => navigate("/create")}>
                    Create Outfit
                </button>
            ) : null}
        </main>
    );
}
