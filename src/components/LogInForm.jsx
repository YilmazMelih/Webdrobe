import googleLogo from "../assets/google_logo.svg";

import { signInGoogle, logInUser } from "../firebase.js";

export default function LogInForm(props) {
    return (
        <div className="auth-form-div">
            <h3 className="auth-form-header">Log In</h3>

            <input
                id="email"
                type="email"
                placeholder="myemail@gmail.com"
                aria-label="email"
            ></input>
            <input
                id="password"
                type="password"
                placeholder="password123"
                aria-label="password"
            ></input>
            <button onClick={() => logInUser(props.setSignedIn)}>Log In</button>
            <button onClick={() => signInGoogle(props.setSignedIn)}>
                {" "}
                <img src={googleLogo} />
                Continue with Google
            </button>
            <dialog id="errorDialog">
                <p id="errorText">Invalid email or password</p>
            </dialog>
            <span>
                Don't have an acconut?{" "}
                <strong
                    className="auth-toggle"
                    onClick={() => {
                        props.setLoggingInToggle((prev) => {
                            return !prev;
                        });
                    }}
                >
                    Sign Up!
                </strong>
            </span>
        </div>
    );
}
