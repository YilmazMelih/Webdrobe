import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";

export default function Dashboard(props) {
    return (
        <main>
            <h1>
                {auth.currentUser.displayName ? auth.currentUser.displayName.split(" ")[0] : ""}
            </h1>
            <button
                onClick={() => {
                    signOut(auth);
                    props.setSignedIn(false);
                }}
            >
                Sign Out
            </button>
        </main>
    );
}
