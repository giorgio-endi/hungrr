import { useState } from "react";
import { createRoom } from "./firestore";

function App() {
  const [hovered, setHovered] = useState(null);
  const [roomCode, setRoomCode] = useState("");

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

  function generateRoomCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    return code;
  }

  async function handleCreateRoom() {
    try {
      const code = generateRoomCode();
      await createRoom(code);
      setRoomCode(code);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

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
          onClick={handleCreateRoom}
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

        {roomCode !== "" && (
          <p style={{ marginTop: "24px", fontSize: "20px", color: "#2f6f9e" }}>
            Room Code: {roomCode}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;