import shirtLogo from "../assets/icons/shirt.svg";
import plusLogo from "../assets/icons/plus.svg";
import wardrobeLogo from "../assets/icons/wardrobe.svg";

import { useNavigate } from "react-router";

import { auth } from "../firebase.js";
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
                className="temp-signout-btn"
                onClick={() => {
                    signOut(auth);
                    props.setSignedIn(false);
                }}
            >
                Sign Out
            </button>
            <div className="dashboard-container">
                <button className="dashboard-btn" aria-label="My Outfits">
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
                <button className="dashboard-btn" aria-label="My Wardrobe">
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
