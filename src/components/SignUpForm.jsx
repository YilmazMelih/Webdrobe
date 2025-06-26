import googleLogo from "../assets/google_logo.svg";
import { signInGoogle, signUpUser } from "../firebase.js";

export default function SignUpForm(props) {
    return (
        <div className="auth-form-div">
            <h3 className="auth-form-header">Sign Up</h3>
            <input id="username" placeholder="MyUsername" aria-label="username"></input>
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
            <button onClick={signUpUser}>Sign Up</button>

            <button onClick={signInGoogle}>
                <img src={googleLogo} />
                Continue with Google
            </button>
            <span>
                Have an account?{" "}
                <strong
                    className="auth-toggle"
                    onClick={() => {
                        props.func((prev) => {
                            return !prev;
                        });
                    }}
                >
                    Log In!
                </strong>
            </span>
        </div>
    );
}
