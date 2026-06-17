import { useState } from "react";
import "../styles/auth.css";
import { LoginForm } from "../components/loginForm";
import { SignupForm } from "../components/signupForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-box">

     {/* left  panel */}
        <div className="auth-left">
          <h1>Campus Marketplace</h1>
          <p>Buy, sell and discover items within your campus community.</p>

          <ul>
            <li>✔ Secure login system</li>
            <li>✔ Wishlist & Listings</li>
            <li>✔ Fast trading experience</li>
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">

          {/* Toggle */}
          <div className="auth-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          {isLogin ? <LoginForm/> : <SignupForm/>}

        </div>
      </div>
    </div>
  );
}