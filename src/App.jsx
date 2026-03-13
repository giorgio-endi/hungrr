import { useMemo, useState } from "react";
import { createRoom } from "./firestore";

function App() {
  const [hovered, setHovered] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [activeTab, setActiveTab] = useState("decide");
  const [profileHover, setProfileHover] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [matchMessage, setMatchMessage] = useState("");
  const [swipeDirection, setSwipeDirection] = useState("");
  const [profileKey, setProfileKey] = useState(0);

  const datingProfile = useMemo(() => {
    const names = [
      "Alex",
      "Jamie",
      "Taylor",
      "Jordan",
      "Casey",
      "Morgan",
      "Avery",
      "Riley",
      "Cameron",
      "Drew",
      "Sam",
      "Quinn",
    ];

    const foodBios = [
      "Loves sushi, ramen, and boba.",
      "Always craving burgers and fries.",
      "Would never say no to hotpot.",
      "Dessert first kind of person.",
      "Big fan of tacos and late-night eats.",
      "Pasta, matcha, and cafe hopping.",
      "Spicy food is a personality trait.",
      "Brunch lover with a soft spot for pancakes.",
    ];

    const favouriteFoods = [
      "Sushi",
      "Ramen",
      "Hotpot",
      "Burgers",
      "Pasta",
      "Tacos",
      "Korean BBQ",
      "Desserts",
    ];

    const moods = ["Savory", "Sweet", "Spicy", "Comfort Food", "Adventurous"];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomBio = foodBios[Math.floor(Math.random() * foodBios.length)];
    const randomFood =
      favouriteFoods[Math.floor(Math.random() * favouriteFoods.length)];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    const seed = `${randomName}-${randomFood}-${profileKey}-${Math.floor(
      Math.random() * 10000
    )}`;
    const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
      seed
    )}`;

    return {
      name: randomName,
      bio: randomBio,
      food: randomFood,
      mood: randomMood,
      avatarUrl,
    };
  }, [profileKey]);

  const mainButtonStyle = (name) => ({
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
    backgroundColor:
      activeTab === tabName
        ? "#4da8da"
        : hovered === `nav-${tabName}`
        ? "#c9e7f7"
        : "transparent",
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

  function loadNextDatingProfile() {
    setProfileKey((prev) => prev + 1);
    setSwipeDirection("");
  }

  function handleDislike() {
    setMatchMessage("Not a match");
    setSwipeDirection("left");

    setTimeout(() => {
      loadNextDatingProfile();
      setMatchMessage("");
    }, 1000);
  }

  function handleLike() {
    const gotMatch = Math.random() < 0.4;
    setSwipeDirection("right");

    if (gotMatch) {
      setMatchCount((prev) => prev + 1);
      setMatchMessage(`It's a match with ${datingProfile.name}!`);
    } else {
      setMatchMessage("Liked! No match this time.");
    }

    setTimeout(() => {
      loadNextDatingProfile();
      setMatchMessage("");
    }, 1000);
  }

  const datingCardTransform =
    swipeDirection === "left"
      ? "translateX(-180px) rotate(-12deg)"
      : swipeDirection === "right"
      ? "translateX(180px) rotate(12deg)"
      : "translateX(0) rotate(0deg)";

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
            style={mainButtonStyle("create")}
          >
            Create Room
          </button>

          <button
            onMouseEnter={() => setHovered("join")}
            onMouseLeave={() => setHovered(null)}
            style={mainButtonStyle("join")}
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

          <div style={{ height: "20px" }} />
        </>
      );
    }

    if (activeTab === "dating") {
      return (
        <>
          <div
            style={{
              position: "absolute",
              top: "18px",
              right: "22px",
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "28px" }}>💙</span>
            <div
              style={{
                minWidth: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#2f7fb5",
                color: "white",
                fontSize: "13px",
                fontWeight: "700",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 6px",
              }}
            >
              {matchCount}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "46px",
                color: "#1f5f8b",
                marginBottom: "6px",
                fontWeight: "700",
                whiteSpace: "nowrap",
                textAlign: "center",
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
          </div>

          <div
            style={{
              margin: "0 auto 24px auto",
              width: "240px",
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "22px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
              transform: datingCardTransform,
              opacity: swipeDirection ? 0.65 : 1,
              transition: "transform 0.4s ease, opacity 0.4s ease",
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
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              <img
                src={datingProfile.avatarUrl}
                alt="Generated profile"
                style={{
                  width: "130px",
                  height: "130px",
                }}
              />
            </div>

            <h2
              style={{
                fontSize: "24px",
                color: "#1f5f8b",
                margin: "0 0 8px 0",
              }}
            >
              {datingProfile.name}
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "#335c74",
                margin: "0 0 6px 0",
              }}
            >
              {datingProfile.bio}
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#335c74",
                margin: "0 0 6px 0",
              }}
            >
              Favourite food: {datingProfile.food}
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#335c74",
                margin: 0,
              }}
            >
              Mood: {datingProfile.mood}
            </p>
          </div>

          {matchMessage && (
            <p
              style={{
                color: "#1f5f8b",
                fontWeight: "600",
                marginTop: "-6px",
                marginBottom: "14px",
              }}
            >
              {matchMessage}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={handleDislike}
              onMouseEnter={() => setProfileHover("dislike")}
              onMouseLeave={() => setProfileHover(null)}
              style={{
                width: "110px",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                backgroundColor:
                  profileHover === "dislike" ? "#2f7fb5" : "#4da8da",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              Dislike
            </button>

            <button
              onClick={handleLike}
              onMouseEnter={() => setProfileHover("like")}
              onMouseLeave={() => setProfileHover(null)}
              style={{
                width: "110px",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                backgroundColor:
                  profileHover === "like" ? "#2f7fb5" : "#4da8da",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              Like
            </button>
          </div>

          <div style={{ height: "40px" }} />
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
            overflow: "hidden",
          }}
        >
          👤
        </div>

        <button
          onMouseEnter={() => setProfileHover("add-picture")}
          onMouseLeave={() => setProfileHover(null)}
          style={{
            width: "230px",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            backgroundColor:
              profileHover === "add-picture" ? "#2f7fb5" : "#4da8da",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s",
            marginBottom: "22px",
          }}
        >
          Add a Profile Picture
        </button>

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
          <p style={{ margin: "0 0 10px 0", color: "#1f5f8b" }}>
            <strong>Budget:</strong> $$
          </p>
          <p style={{ margin: 0, color: "#1f5f8b" }}>
            <strong>Bio:</strong> Looking for someone with similar food taste.
          </p>
        </div>

        <div style={{ height: "40px" }} />
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
            width: "380px",
            height: "720px",
            backgroundColor: "#8ed6ff",
            border: "10px solid black",
            borderRadius: "40px",
            position: "relative",
            overflow: "hidden",
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
              zIndex: 1,
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
              zIndex: 1,
            }}
          />

          <div
            style={{
              height: "100%",
              overflowY: "auto",
              padding: "70px 25px 130px 25px",
              textAlign: "center",
              boxSizing: "border-box",
              position: "relative",
              zIndex: 2,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {renderContent()}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
              backgroundColor: "rgba(255,255,255,0.85)",
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
              onMouseEnter={() => setHovered("nav-decide")}
              onMouseLeave={() => setHovered(null)}
              style={navButtonStyle("decide")}
            >
              Decide
            </button>

            <button
              onClick={() => setActiveTab("dating")}
              onMouseEnter={() => setHovered("nav-dating")}
              onMouseLeave={() => setHovered(null)}
              style={navButtonStyle("dating")}
            >
              Dating
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              onMouseEnter={() => setHovered("nav-profile")}
              onMouseLeave={() => setHovered(null)}
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