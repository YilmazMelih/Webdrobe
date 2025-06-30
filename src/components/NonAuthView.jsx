import LogInForm from "./LogInForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import { useState } from "react";

export default function NonAuthView(props) {
    const [loggingInToggle, setLoggingInToggle] = useState(true);

    return (
        <>
            <header className="header-nonauth">
                <h1>Webdrobe</h1>
                <h2>Outfit planning made easy!</h2>
            </header>
            <main>
                {loggingInToggle ? (
                    <LogInForm
                        setSignedIn={props.setSignedIn}
                        setLoggingInToggle={setLoggingInToggle}
                    />
                ) : (
                    <SignUpForm
                        setSignedIn={props.setSignedIn}
                        setLoggingInToggle={setLoggingInToggle}
                    />
                )}
            </main>
        </>
    );
}
