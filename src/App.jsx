import "./index.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import NonAuthView from "./components/NonAuthView.jsx";
import Dashboard from "./components/Dashboard.jsx";

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

    if (loading) return <h1>Loading...</h1>;

    return (
        <BrowserRouter>
            <div className="app-container">
                <Routes>
                    <Route
                        path="/login"
                        element={!user ? <NonAuthView /> : <Navigate to="/dashboard" />}
                    />

                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard /> : <Navigate to="/login" />}
                    />

                    <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
