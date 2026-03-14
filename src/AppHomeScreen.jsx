// for hannah
import { useState } from "react";
import { signInUser, signUpUser } from "./firestore";

function AppHomeScreen({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  async function handleSubmit() {
    setAuthError("");

    if (username.trim() === "" || password.trim() === "") {
      setAuthError("Please enter both username and password.");
      return;
    }

    try {
      let user;

      if (isSignUp) {
        user = await signUpUser(username, password);
      } else {
        user = await signInUser(username, password);
      }

      onAuthSuccess(user);
    } catch (error) {
      console.error(error);
      setAuthError(error.message || "Authentication failed.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d1b2a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "380px",
          backgroundColor: "#8ed6ff",
          border: "10px solid black",
          borderRadius: "40px",
          padding: "50px 30px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#1f5f8b",
            marginBottom: "8px",
            fontWeight: "700",
          }}
        >
          HUNGRR
        </h1>

        <p
          style={{
            color: "#24506d",
            fontSize: "20px",
            marginBottom: "28px",
          }}
        >
          Taste & Decide
        </p>

        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: "#5bb8eb",
            margin: "0 auto 28px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "64px",
          }}
        >
          🍽️
        </div>

        <h2 style={{ color: "#1f5f8b", marginBottom: "16px" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <input
          type="text"
          placeholder="Unique username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            marginBottom: "16px",
            boxSizing: "border-box",
          }}
        />

        {authError && (
          <p style={{ color: "#8b1e1e", fontSize: "14px", marginBottom: "10px" }}>
            {authError}
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "#4da8da",
            color: "white",
            fontWeight: "600",
            fontSize: "18px",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: "transparent",
            border: "none",
            color: "#1f5f8b",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Need an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default AppHomeScreen;
