import googleLogo from "../assets/google_logo.svg";

export default function LogInForm(props) {
    return (
        <div className="auth-form-div">
            <h3 className="auth-form-header">Log In</h3>
            <input type="email" placeholder="myemail@gmail.com" aria-label="email"></input>
            <input type="password" placeholder="password123" aria-label="password"></input>
            <button>Log In</button>
            <button>
                {" "}
                <img src={googleLogo} />
                Continue with Google
            </button>
            <span>
                Don't have an acconut?{" "}
                <strong
                    className="auth-toggle"
                    onClick={() => {
                        props.func((prev) => {
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
