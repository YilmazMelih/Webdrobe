import "./index.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { auth } from "./firebase.js";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

import NonAuthView from "./components/NonAuthView.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddClothing from "./components/AddClothing.jsx";
import Wardrobe from "./components/Wardrobe.jsx";
import EditClothing from "./components/EditClothing.jsx";
import AccountSettings from "./components/AccountSettings.jsx";
import CreateOutfit from "./components/CreateOutfit.jsx";
import Outfits from "./components/Outfits.jsx";

function App() {
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.displayName) {
                    user.reload().then(() => setUser(auth.currentUser));
                } else {
                    setUser(user);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe(); // cleanup listener on unmount
    }, [auth.currentUser]);

    if (loading) return <h1>Loading...</h1>;

    return (
        <BrowserRouter>
            <div className="app-container">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            !user || !signedIn ? (
                                <NonAuthView setSignedIn={setSignedIn} />
                            ) : (
                                <Navigate to="/dashboard" />
                            )
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            user ? (
                                <Dashboard setSignedIn={setSignedIn} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/add"
                        element={user ? <AddClothing /> : <Navigate to={"/login"} />}
                    />
                    <Route
                        path="/edit"
                        element={user ? <EditClothing /> : <Navigate to={"/login"} />}
                    />
                    <Route
                        path="/settings"
                        element={
                            user ? (
                                <AccountSettings setSignedIn={setSignedIn} />
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/wardrobe"
                        element={user ? <Wardrobe /> : <Navigate to={"/login"} />}
                    />
                    <Route
                        path="/create"
                        element={user ? <CreateOutfit /> : <Navigate to={"/login"} />}
                    />
                    <Route
                        path="/outfits"
                        element={user ? <Outfits /> : <Navigate to={"/login"} />}
                    />
                    <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
