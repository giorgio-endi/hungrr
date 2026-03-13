import { useState } from "react";

function App() {
  const [hovered, setHovered] = useState(null);

  const buttonStyle = (name) => ({
    width: "250px",
    padding: "18px",
    fontSize: "22px",
    borderRadius: "16px",
    border: "none",
    backgroundColor: hovered === name ? "#2f7fb5" : "#4da8da",
    color: "white",
    cursor: "pointer",
    marginTop: "18px",
    fontWeight: "600",
    transition: "0.25s",
  });

  return (
    <div
      style={{
        backgroundColor: "#dff2ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#f7f7f7",
          padding: "60px",
          borderRadius: "30px",
          textAlign: "center",
          width: "420px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            color: "#2f6f9e",
            marginBottom: "25px",
            marginTop: "0",
            letterSpacing: "1px",
          }}
        >
          HUNGRR
        </h1>

        <p
          style={{
            fontSize: "26px",
            color: "#34495e",
            marginBottom: "35px",
            marginTop: "0",
          }}
        >
          What are you in the mood for?
        </p>

        <button
          onMouseEnter={() => setHovered("create")}
          onMouseLeave={() => setHovered(null)}
          style={buttonStyle("create")}
        >
          Create Room
        </button>

        <button
          onMouseEnter={() => setHovered("join")}
          onMouseLeave={() => setHovered(null)}
          style={buttonStyle("join")}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default App;