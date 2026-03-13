import { useMemo, useState } from "react";
import {
  createRoom,
  joinRoom,
  subscribeToRoom,
  startSwiping,
} from "./firestore";

function App() {
  const [hovered, setHovered] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [activeTab, setActiveTab] = useState("decide");
  const [profileHover, setProfileHover] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [matchMessage, setMatchMessage] = useState("");
  const [swipeDirection, setSwipeDirection] = useState("");
  const [profileKey, setProfileKey] = useState(0);

  const [currentScreen, setCurrentScreen] = useState("main");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatInput, setChatInput] = useState("");

  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState({});

  // new Decide tab flow states
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [decideScreen, setDecideScreen] = useState("home");

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
      id: seed,
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

  const inputStyle = {
    width: "250px",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    marginTop: "12px",
    boxSizing: "border-box",
  };

  function generateRoomCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    return code;
  }

  function listenToRoom(code) {
    subscribeToRoom(code, (data) => {
      if (!data) return;

      setRoomData(data);

      if (data.status === "swiping") {
        setDecideScreen("swipe");
      } else {
        setDecideScreen("room");
      }
    });
  }

  async function handleCreateRoom() {
    if (username.trim() === "") {
      alert("Please enter your name first");
      return;
    }

    if (location.trim() === "") {
      alert("Please enter a location");
      return;
    }

    try {
      const code = generateRoomCode();
      const cleanName = username.trim();
      const cleanLocation = location.trim();

      await createRoom(code, cleanLocation, cleanName);
      await joinRoom(code, cleanName);

      setRoomCode(code);
      setJoinCode(code);
      setIsHost(true);

      listenToRoom(code);
      setDecideScreen("room");
      setActiveTab("decide");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  async function handleJoinRoom() {
    if (username.trim() === "" || joinCode.trim() === "") {
      alert("Please enter your name and room code");
      return;
    }

    try {
      const cleanCode = joinCode.trim().toUpperCase();
      const cleanName = username.trim();

      await joinRoom(cleanCode, cleanName);

      setRoomCode(cleanCode);
      setIsHost(false);

      listenToRoom(cleanCode);
      setDecideScreen("room");
      setActiveTab("decide");
    } catch (error) {
      console.error(error);
      alert("Could not join room");
    }
  }

  async function handleStartSwiping() {
    try {
      await startSwiping(roomCode);
    } catch (error) {
      console.error(error);
      alert("Could not start swiping");
    }
  }

  function loadNextDatingProfile() {
    setProfileKey((prev) => prev + 1);
    setSwipeDirection("");
  }

  function openChat(profile) {
    setSelectedChat(profile);
    setCurrentScreen("chat");

    if (!messages[profile.id]) {
      setMessages((prev) => ({
        ...prev,
        [profile.id]: [
          {
            sender: "them",
            text: `Hey! I saw we both like ${profile.food}.`,
          },
        ],
      }));
    }
  }

  function handleDislike() {
    setMatchMessage("Not a match");
    setSwipeDirection("left");

    setTimeout(() => {
      loadNextDatingProfile();
      setMatchMessage("");
    }, 800);
  }

  function handleLike() {
    const gotMatch = Math.random() < 0.4;
    setSwipeDirection("right");

    if (gotMatch) {
      setMatchCount((prev) => prev + 1);
      setMatchMessage(`It's a match with ${datingProfile.name}!`);

      setMatches((prev) => {
        const alreadyExists = prev.some((item) => item.id === datingProfile.id);
        if (alreadyExists) return prev;
        return [...prev, datingProfile];
      });

      setMessages((prev) => {
        if (prev[datingProfile.id]) return prev;
        return {
          ...prev,
          [datingProfile.id]: [
            {
              sender: "them",
              text: `Hi! I also love ${datingProfile.food}.`,
            },
          ],
        };
      });
    } else {
      setMatchMessage("Liked! No match this time.");
    }

    setTimeout(() => {
      loadNextDatingProfile();
      setMatchMessage("");
    }, 800);
  }

  function handleSendMessage() {
    if (!chatInput.trim() || !selectedChat) return;

    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [
        ...(prev[selectedChat.id] || []),
        { sender: "me", text: chatInput },
      ],
    }));

    setChatInput("");
  }

  const datingCardTransform =
    swipeDirection === "left"
      ? "translateX(-180px) rotate(-12deg)"
      : swipeDirection === "right"
        ? "translateX(180px) rotate(12deg)"
        : "translateX(0) rotate(0deg)";

  function renderTopRightIcons() {
    if (activeTab !== "dating") {
      return null;
    }

    return (
      <div
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setCurrentScreen("matches")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "relative",
            fontSize: "26px",
          }}
        >
          💙
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              minWidth: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#2f7fb5",
              color: "white",
              fontSize: "11px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {matchCount}
          </span>
        </button>

        <button
          onClick={() => setCurrentScreen("messages")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "relative",
            fontSize: "24px",
          }}
        >
          💬
        </button>
      </div>
    );
  }

  function renderMatchesScreen() {
    return (
      <>
        <h1
          style={{
            fontSize: "36px",
            color: "#1f5f8b",
            marginBottom: "8px",
            fontWeight: "700",
            marginTop: "10px",
          }}
        >
          Your Matches
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#24506d",
            marginBottom: "22px",
          }}
        >
          Tap a profile to start chatting.
        </p>

        {matches.length === 0 ? (
          <p style={{ color: "#1f5f8b", marginTop: "60px" }}>
            No matches yet.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              paddingBottom: "20px",
            }}
          >
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() => openChat(match)}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "18px",
                  padding: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  cursor: "pointer",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                  textAlign: "left",
                }}
              >
                <img
                  src={match.avatarUrl}
                  alt={match.name}
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "50%",
                    backgroundColor: "#dff2ff",
                  }}
                />
                <div>
                  <p
                    style={{
                      margin: "0 0 4px 0",
                      color: "#1f5f8b",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    {match.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "#335c74",
                      fontSize: "14px",
                    }}
                  >
                    Loves {match.food}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </>
    );
  }

  function renderMessagesScreen() {
    return (
      <>
        <h1
          style={{
            fontSize: "36px",
            color: "#1f5f8b",
            marginBottom: "8px",
            fontWeight: "700",
            marginTop: "10px",
          }}
        >
          Messages
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#24506d",
            marginBottom: "22px",
          }}
        >
          Open a conversation with your matches.
        </p>

        {matches.length === 0 ? (
          <p style={{ color: "#1f5f8b", marginTop: "60px" }}>
            No messages yet.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              paddingBottom: "20px",
            }}
          >
            {matches.map((match) => {
              const lastMessage =
                messages[match.id]?.[messages[match.id].length - 1]?.text || "";
              return (
                <button
                  key={match.id}
                  onClick={() => openChat(match)}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "18px",
                    padding: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    cursor: "pointer",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={match.avatarUrl}
                    alt={match.name}
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      backgroundColor: "#dff2ff",
                    }}
                  />
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        color: "#1f5f8b",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      {match.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        color: "#335c74",
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "180px",
                      }}
                    >
                      {lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </>
    );
  }

  function renderChatScreen() {
    const chatMessages = selectedChat ? messages[selectedChat.id] || [] : [];

    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "8px",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => setCurrentScreen("messages")}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "22px",
              cursor: "pointer",
              color: "#1f5f8b",
            }}
          >
            ←
          </button>

          {selectedChat && (
            <>
              <img
                src={selectedChat.avatarUrl}
                alt={selectedChat.name}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#dff2ff",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    margin: 0,
                    color: "#1f5f8b",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  {selectedChat.name}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "#335c74",
                    fontSize: "13px",
                  }}
                >
                  Favourite food: {selectedChat.food}
                </p>
              </div>
            </>
          )}
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "16px",
            minHeight: "340px",
            boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "me" ? "#4da8da" : "#e8f5fc",
                color: msg.sender === "me" ? "white" : "#1f5f8b",
                padding: "10px 14px",
                borderRadius: "16px",
                maxWidth: "80%",
                fontSize: "14px",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "14px",
              border: "none",
              outline: "none",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              backgroundColor: "#4da8da",
              color: "white",
              border: "none",
              borderRadius: "14px",
              padding: "12px 16px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Send
          </button>
        </div>
      </>
    );
  }

  function renderDecideHomeScreen() {
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
            marginBottom: "10px",
            lineHeight: "1.5",
          }}
        >
          Create or join a room and decide together what to eat.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter location (for host)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Enter room code (for guest)"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          style={inputStyle}
        />

        <button
          onClick={handleCreateRoom}
          onMouseEnter={() => setHovered("create")}
          onMouseLeave={() => setHovered(null)}
          style={mainButtonStyle("create")}
        >
          Create Room
        </button>

        <button
          onClick={handleJoinRoom}
          onMouseEnter={() => setHovered("join")}
          onMouseLeave={() => setHovered(null)}
          style={mainButtonStyle("join")}
        >
          Join Room
        </button>

        {roomCode !== "" && decideScreen === "home" && (
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

  function renderRoomLobbyScreen() {
    const users = roomData?.users || [];

    return (
      <>
        <h1
          style={{
            fontSize: "36px",
            color: "#1f5f8b",
            marginBottom: "8px",
            fontWeight: "700",
            marginTop: "10px",
          }}
        >
          Room Lobby
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#24506d",
            marginBottom: "22px",
          }}
        >
          Waiting for everyone to join.
        </p>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0 0 10px 0", color: "#1f5f8b" }}>
            <strong>Room Code:</strong> {roomData?.code || roomCode}
          </p>
          <p style={{ margin: "0 0 10px 0", color: "#1f5f8b" }}>
            <strong>Location:</strong> {roomData?.location}
          </p>
          <p style={{ margin: "0 0 10px 0", color: "#1f5f8b" }}>
            <strong>Host:</strong> {roomData?.host}
          </p>
          <p style={{ margin: "0 0 12px 0", color: "#1f5f8b" }}>
            <strong>Status:</strong> {roomData?.status}
          </p>

          <div>
            <p
              style={{
                margin: "0 0 8px 0",
                color: "#1f5f8b",
                fontWeight: "700",
              }}
            >
              Joined Users
            </p>

            {users.length === 0 ? (
              <p style={{ margin: 0, color: "#335c74" }}>No users yet</p>
            ) : (
              users.map((user, index) => (
                <p
                  key={index}
                  style={{ margin: "0 0 6px 0", color: "#335c74" }}
                >
                  • {user}
                </p>
              ))
            )}
          </div>
        </div>

        {isHost ? (
          <button
            onClick={handleStartSwiping}
            onMouseEnter={() => setHovered("start")}
            onMouseLeave={() => setHovered(null)}
            style={mainButtonStyle("start")}
          >
            Start Swiping
          </button>
        ) : (
          <p
            style={{
              marginTop: "24px",
              color: "#1f5f8b",
              fontWeight: "500",
            }}
          >
            Waiting for host to start...
          </p>
        )}
      </>
    );
  }

  function renderDecideSwipeScreen() {
    return (
      <>
        <h1
          style={{
            fontSize: "36px",
            color: "#1f5f8b",
            marginBottom: "8px",
            fontWeight: "700",
            marginTop: "10px",
          }}
        >
          Swipe Restaurants
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#24506d",
            marginBottom: "22px",
          }}
        >
          Room location: {roomData?.location}
        </p>

        <div
          style={{
            margin: "0 auto 24px auto",
            width: "240px",
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
              marginBottom: "16px",
              fontSize: "64px",
            }}
          >
            🍜
          </div>

          <h2
            style={{
              fontSize: "24px",
              color: "#1f5f8b",
              margin: "0 0 8px 0",
            }}
          >
            Restaurant cards go here
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "#335c74",
              margin: "0 0 6px 0",
            }}
          >
            Next step: load restaurants based on the room location.
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
              width: "110px",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              backgroundColor: "#4da8da",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Dislike
          </button>

          <button
            style={{
              width: "110px",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              backgroundColor: "#4da8da",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Like
          </button>
        </div>

        <div style={{ height: "40px" }} />
      </>
    );
  }

  function renderContent() {
    if (currentScreen === "matches") {
      return renderMatchesScreen();
    }

    if (currentScreen === "messages") {
      return renderMessagesScreen();
    }

    if (currentScreen === "chat") {
      return renderChatScreen();
    }

    if (activeTab === "decide") {
      if (decideScreen === "home") {
        return renderDecideHomeScreen();
      }

      if (decideScreen === "room") {
        return renderRoomLobbyScreen();
      }

      if (decideScreen === "swipe") {
        return renderDecideSwipeScreen();
      }

      return renderDecideHomeScreen();
    }

    if (activeTab === "dating") {
      return (
        <>
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

          {renderTopRightIcons()}

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
              onClick={() => {
                setActiveTab("decide");
              }}
              onMouseEnter={() => setHovered("nav-decide")}
              onMouseLeave={() => setHovered(null)}
              style={navButtonStyle("decide")}
            >
              Decide
            </button>

            <button
              onClick={() => {
                setActiveTab("dating");
                setCurrentScreen("main");
              }}
              onMouseEnter={() => setHovered("nav-dating")}
              onMouseLeave={() => setHovered(null)}
              style={navButtonStyle("dating")}
            >
              Dating
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                setCurrentScreen("main");
              }}
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