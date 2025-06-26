import { useState, useEffect } from "react";
import "./index.css";
import NonAuthView from "./components/NonAuthView.jsx";
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe(); // cleanup listener on unmount
    }, []);

    return (
        <div className="app-container">
            {loading ? (
                "Loading..."
            ) : user ? (
                <button
                    onClick={() => {
                        signOut(auth);
                    }}
                >
                    Sign Out
                </button>
            ) : (
                <NonAuthView />
            )}
        </div>
    );
}

export default App;
