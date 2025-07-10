import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function AccountSettings(props) {
    const navigate = useNavigate();
    <button onClick={() => navigate("/dashboard")} className="back-btn">
        Back
    </button>;
    return (
        <main>
            <h1>Account Settings</h1>
            <div className="auth-form-div">
                <button
                    onClick={() => {
                        signOut(auth);
                        props.setSignedIn(false);
                    }}
                >
                    {" "}
                    Sign Out
                </button>
            </div>
            <button onClick={() => navigate("/dashboard")} className="back-btn">
                Back
            </button>
        </main>
    );
}
