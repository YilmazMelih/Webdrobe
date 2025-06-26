import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

export default function Dashboard() {
    return (
        <button
            onClick={() => {
                signOut(auth);
            }}
        >
            Sign Out
        </button>
    );
}
