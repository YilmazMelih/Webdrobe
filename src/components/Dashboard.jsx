import shirtLogo from "../assets/icons/shirt.svg";
import plusLogo from "../assets/icons/plus.svg";
import wardrobeLogo from "../assets/icons/wardrobe.svg";
import settingsLogo from "../assets/icons/settings.svg";

import { useNavigate } from "react-router";

import { auth, getOutfits, getWardrobe } from "../firebase.js";
import { signOut } from "firebase/auth";

export default function Dashboard(props) {
    const navigate = useNavigate();

    return (
        <main>
            <h1>
                Hello,{" "}
                {auth.currentUser.displayName ? auth.currentUser.displayName.split(" ")[0] : ""}
            </h1>
            <button
                className="settings-btn"
                onClick={() => {
                    navigate("/settings");
                }}
            >
                <img src={settingsLogo} alt="settings" />
            </button>
            <div className="dashboard-container">
                <button
                    className="dashboard-btn"
                    aria-label="My Outfits"
                    onClick={async () => {
                        const querySnapshot = await getOutfits();
                        const outfitsData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        navigate("/outfits", { state: { outfitsData } });
                    }}
                >
                    <img
                        className="dashboard-btn-img"
                        src={shirtLogo}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </button>
                <button
                    className="dashboard-btn"
                    aria-label="Add Clothing"
                    onClick={() => navigate("/add")}
                >
                    <img
                        className="dashboard-btn-img"
                        src={plusLogo}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </button>
                <button
                    className="dashboard-btn"
                    aria-label="My Wardrobe"
                    onClick={async () => {
                        const querySnapshot = await getWardrobe();
                        const clothingData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        navigate("/wardrobe", { state: { clothingData } });
                    }}
                >
                    <img
                        className="dashboard-btn-img"
                        src={wardrobeLogo}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </button>
                <span className="dashboard-btn-label">My Outfits</span>
                <span className="dashboard-btn-label">Add Clothing</span>
                <span className="dashboard-btn-label">My Wardrobe</span>
            </div>
        </main>
    );
}
