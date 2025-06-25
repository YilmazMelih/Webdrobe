import googleLogo from "../assets/google_logo.svg";

export default function SignUpForm(props) {
    return (
        <div className="auth-form-div">
            <h3 className="auth-form-header">Sign Up</h3>
            <input type="email" placeholder="myemail@gmail.com" aria-label="email"></input>
            <input type="password" placeholder="password123" aria-label="password"></input>
            <button>Sign Up</button>

            <button>
                {" "}
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
