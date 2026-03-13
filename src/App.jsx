import { useState } from "react";

function App() {
  const [createHover, setCreateHover] = useState(false);
  const [joinHover, setJoinHover] = useState(false);

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
          padding: "60px 70px",
          borderRadius: "30px",
          textAlign: "center",
          width: "500px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            color: "#2f6f9e",
            margin: "0 0 28px 0",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          HUNGRR
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "#34495e",
            marginBottom: "45px",
            marginTop: "0",
            fontWeight: "500",
          }}
        >
          What are you in the mood for?
        </p>

        <button
          onMouseEnter={() => setCreateHover(true)}
          onMouseLeave={() => setCreateHover(false)}
          style={{
            width: "250px",
            padding: "18px",
            fontSize: "22px",
            borderRadius: "16px",
            border: "none",
            backgroundColor: createHover ? "#2f7fb5" : "#4da8da",
            color: "white",
            cursor: "pointer",
            marginBottom: "20px",
            fontWeight: "600",
            transition: "0.25s",
          }}
        >
          Create Room
        </button>

        <br />

        <button
          onMouseEnter={() => setJoinHover(true)}
          onMouseLeave={() => setJoinHover(false)}
          style={{
            width: "250px",
            padding: "18px",
            fontSize: "22px",
            borderRadius: "16px",
            border: "2px solid #4da8da",
            backgroundColor: joinHover ? "#4da8da" : "white",
            color: joinHover ? "white" : "#2f6f9e",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.25s",
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default App;