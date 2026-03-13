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
    <>
      {/* Import Poppins font */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>

      <div
        style={{
          backgroundColor: "#0d1b2a",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          style={{
            width: "330px",
            height: "650px",
            backgroundColor: "#8ed6ff",
            border: "10px solid black",
            borderRadius: "40px",
            position: "relative",
            overflow: "hidden",
            padding: "70px 25px 30px 25px",
            textAlign: "center",
          }}
        >
          {/* Blue circles */}
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "-40px",
              width: "160px",
              height: "160px",
              backgroundColor: "#4da8da",
              borderRadius: "50%",
              opacity: 0.4,
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              right: "-40px",
              width: "160px",
              height: "160px",
              backgroundColor: "#2f7fb5",
              borderRadius: "50%",
              opacity: 0.4,
            }}
          />

          {/* Header */}
          <h1
            style={{
              fontSize: "42px",
              color: "#1f5f8b",
              marginBottom: "5px",
              fontWeight: "700",
            }}
          >
            HUNGRR
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#24506d",
              marginBottom: "30px",
              fontWeight: "500",
            }}
          >
            Taste & Decide
          </p>

          {/* Food icon */}
          <div
            style={{
              margin: "0 auto 30px auto",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              backgroundColor: "#5bb8eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "80px",
            }}
          >
            🍜
          </div>

          <p
            style={{
              fontSize: "20px",
              color: "#1f5f8b",
              fontWeight: "600",
            }}
          >
            What are you in the mood for?
          </p>

          <p
            style={{
              fontSize: "15px",
              color: "#335c74",
              marginBottom: "25px",
            }}
          >
            Create or join a room and decide together what to eat.
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
            <p style={{ marginTop: "20px", fontSize: "18px", color: "#1f5f8b" }}>
              Room Code: {roomCode}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;