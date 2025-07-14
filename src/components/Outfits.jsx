import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import OutfitIcon from "./OutfitIcon";

export default function Outfits(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const outfitData = location.state?.outfitsData;

    useEffect(() => {
        if (!outfitData) {
            navigate("/");
        }
    }, [outfitData, navigate]);

    console.log(outfitData);

    const outfitEls = outfitData
        ? outfitData.map((item) => {
              return <OutfitIcon name={item.name} outfits={item.items} key={item.id} />;
          })
        : null;

    return (
        <main>
            <h1>My Outfits</h1>
            <div className="grid-wrapper">
                <div className="outfits">
                    {outfitData ? (
                        outfitData.length == 0 ? (
                            <>
                                <span className="background-text">No Outfits Yet...</span>
                                <button className="add-btn" onClick={() => navigate("/create")}>
                                    Create Outfit
                                </button>
                            </>
                        ) : (
                            outfitEls
                        )
                    ) : null}
                </div>
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
            {outfitData.length != 0 ? (
                <button className="create-btn" onClick={() => navigate("/create")}>
                    Create Outfit
                </button>
            ) : null}
        </main>
    );
}
