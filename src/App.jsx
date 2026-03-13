import { useState } from "react";
import { createRoom } from "./firestore";

function App() {
  const [hovered, setHovered] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [activeTab, setActiveTab] = useState("decide");

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
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  });

  const navButtonStyle = (tabName) => ({
    flex: 1,
    border: "none",
    backgroundColor: activeTab === tabName ? "#4da8da" : "transparent",
    color: activeTab === tabName ? "white" : "#1f5f8b",
    fontSize: "14px",
    fontWeight: "600",
    padding: "12px 6px",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "0.2s",
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

  function renderContent() {
    if (activeTab === "decide") {
      return (
        <>
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
              marginBottom: "26px",
              fontWeight: "500",
            }}
          >
            Taste & Decide
          </p>

          <div
            style={{
              margin: "0 auto 28px auto",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              backgroundColor: "#5bb8eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "78px",
              boxShadow: "inset 0 0 0 8px rgba(255,255,255,0.08)",
            }}
          >
            🍽️
          </div>

          <p
            style={{
              fontSize: "20px",
              color: "#1f5f8b",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            What are you in the mood for?
          </p>

          <p
            style={{
              fontSize: "15px",
              color: "#335c74",
              marginBottom: "22px",
              lineHeight: "1.5",
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
            <p
              style={{
                marginTop: "20px",
                fontSize: "18px",
                color: "#1f5f8b",
                fontWeight: "500",
              }}
            >
              Room Code: {roomCode}
            </p>
          )}
        </>
      );
    }

    if (activeTab === "dating") {
      return (
        <>
          <h1
            style={{
              fontSize: "38px",
              color: "#1f5f8b",
              marginBottom: "6px",
              fontWeight: "700",
            }}
          >
            HUNGRR Match
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#24506d",
              marginBottom: "24px",
              fontWeight: "500",
            }}
          >
            Taste & Connect
          </p>

          <div
            style={{
              margin: "0 auto 24px auto",
              width: "220px",
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "22px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "18px",
                backgroundColor: "#dff2ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "58px",
                marginBottom: "16px",
              }}
            >
              🍕
            </div>

            <h2
              style={{
                fontSize: "24px",
                color: "#1f5f8b",
                margin: "0 0 8px 0",
              }}
            >
              Alex
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "#335c74",
                margin: "0 0 6px 0",
              }}
            >
              Loves sushi, ramen, and boba
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#335c74",
                margin: 0,
              }}
            >
              Looking for someone with similar cravings
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "10px",
            }}
          >
            <button
              style={{
                width: "100px",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                backgroundColor: "#7bbce4",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Dislike
            </button>

            <button
              style={{
                width: "100px",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                backgroundColor: "#2f7fb5",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Like
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <h1
          style={{
            fontSize: "40px",
            color: "#1f5f8b",
            marginBottom: "8px",
            fontWeight: "700",
          }}
        >
          Your Profile
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#24506d",
            marginBottom: "24px",
            fontWeight: "500",
          }}
        >
          Personalise your taste
        </p>

        <div
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            backgroundColor: "#5bb8eb",
            margin: "0 auto 24px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "72px",
            color: "white",
          }}
        >
          👤
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            width: "240px",
            margin: "0 auto",
            boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0 0 10px 0", color: "#1f5f8b" }}>
            <strong>Name:</strong> Hannah
          </p>
          <p style={{ margin: "0 0 10px 0", color: "#1f5f8b" }}>
            <strong>Favourite food:</strong> Sushi
          </p>
          <p style={{ margin: "0 0 10px 0", color: "#1f5f8b" }}>
            <strong>Craving style:</strong> Savory
          </p>
          <p style={{ margin: 0, color: "#1f5f8b" }}>
            <strong>Budget:</strong> $$ 
          </p>
        </div>
      </>
    );
  }

  return (
    <>
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
            padding: "70px 25px 95px 25px",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
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

          <div style={{ position: "relative", zIndex: 2 }}>{renderContent()}</div>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "20px",
              padding: "8px",
              display: "flex",
              gap: "8px",
              zIndex: 3,
              boxShadow: "0 6px 14px rgba(0,0,0,0.10)",
            }}
          >
            <button
              onClick={() => setActiveTab("decide")}
              style={navButtonStyle("decide")}
            >
              Decide
            </button>

            <button
              onClick={() => setActiveTab("dating")}
              style={navButtonStyle("dating")}
            >
              Dating
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              style={navButtonStyle("profile")}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;