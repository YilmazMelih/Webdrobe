import { useState } from "react";
import "./index.css";
import NonAuthView from "./components/NonAuthView.jsx";

function App() {
    return (
        <div className="app-container">
            <NonAuthView />
        </div>
    );
}

export default App;
