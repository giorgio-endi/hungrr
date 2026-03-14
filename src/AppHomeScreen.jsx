import { useState } from "react";
import { signInUser, signUpUser } from "./firestore";

function AppHomeScreen({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [hovered, setHovered] = useState(null); 

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "7px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    marginTop: "5px",
    marginBottom: "10px",
    boxSizing: "border-box",
    color: "#000000",
    backgroundColor: "#fdd0cd",
  };

  const mainButtonStyle = (name) => ({
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: hovered === name ? "#781715" : "#991c1a",
    color: "white",
    fontWeight: "600",
    fontSize: "18px",
    cursor: "pointer",
    marginBottom: "12px",
    transition: "0.25s",
  });

  async function handleSubmit() {
    setAuthError("");
    if (username.trim() === "" || password.trim() === "") {
      setAuthError("Please enter both username and password.");
      return;
    }
    try {
      let user;
      if (isSignUp) user = await signUpUser(username, password);
      else user = await signInUser(username, password);
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
        backgroundColor: "#991c1a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "380px",
          height: "720px",
          backgroundColor: "#f4f8f9",
          border: "10px solid black",
          borderRadius: "40px",
          padding: "50px 30px",
          textAlign: "center",
          boxSizing: "border-box",
          position: "relative",
        }}
      >

        <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "120px",
                        height: "28px",
                        backgroundColor: "black",
                        borderRadius: "20px",
                        zIndex: 10,
                    }}
                />
                
        <h1
          style={{
            fontSize: "48px",
            color: "#020100",
            marginTop: "40px",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          HUNGRR
        </h1>

        <p
          style={{
            color: "#020100",
            fontSize: "20px",
            marginBottom: "28px",
          }}
        >
          Swipe, Match, Eat!
        </p>

        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "#f4f8f9",
            margin: "0 auto 28px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "64px",
          }}
        >
          <img
            src="src/assets/logo.png"
            alt="Logo"
            style={{
              paddingTop: "20px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <h2 style={{ color: "#991c1a", marginBottom: "16px" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {authError && (
          <p style={{ color: "#8b1e1e", fontSize: "14px", marginBottom: "10px" }}>
            {authError}
          </p>
        )}

        <button
          onClick={handleSubmit}
          onMouseEnter={() => setHovered("create")}
          onMouseLeave={() => setHovered(null)}
          style={mainButtonStyle("create")}
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: "transparent",
            border: "none",
            color: "#991c1a",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default AppHomeScreen;