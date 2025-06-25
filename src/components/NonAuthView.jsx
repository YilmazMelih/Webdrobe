import LogInForm from "./LogInForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import { useState } from "react";

export default function NonAuthView(props) {
    const [loggingIn, setLoggingIn] = useState(true);

    return (
        <>
            <header className="header-nonauth">
                <h1>Webdrobe</h1>
                <h2>Outfit planning made easy!</h2>
            </header>
            <main>
                {loggingIn ? <LogInForm func={setLoggingIn} /> : <SignUpForm func={setLoggingIn} />}
            </main>
        </>
    );
}
