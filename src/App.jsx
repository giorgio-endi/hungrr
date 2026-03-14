import { useEffect, useMemo, useState } from "react";
import {
  createRoom,
  joinRoom,
  subscribeToRoom,
  startSwiping,
} from "./firestore";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile, signOutUser } from "./firestore";
import AppHomeScreen from "./AppHomeScreen";

import AppShell from "./AppShell";
import BottomNav from "./BottomNav";
import TopRightIcons from "./TopRightIcons";

import DecideHomeScreen from "./DecideHomeScreen";
import RoomLobbyScreen from "./RoomLobbyScreen";
import RestaurantSwipeScreen from "./components/RestaurantSwipeScreen";

import DatingScreen from "./DatingScreen";
import MatchesScreen from "./MatchesScreen";

import MessagesScreen from "./MessagesScreen";
import ChatScreen from "./ChatScreen";

import ProfileScreen from "./ProfileScreen";

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

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [decideScreen, setDecideScreen] = useState("home");

  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);


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

  function renderContent() {
    if (currentScreen === "matches") {
      return <MatchesScreen matches={matches} openChat={openChat} />;
    }

    if (currentScreen === "messages") {
      return (
        <MessagesScreen
          matches={matches}
          messages={messages}
          openChat={openChat}
        />
      );
    }

    if (currentScreen === "chat") {
      return (
        <ChatScreen
          selectedChat={selectedChat}
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          goBack={() => setCurrentScreen("messages")}
        />
      );
    }

    if (activeTab === "decide") {
      if (decideScreen === "home") {
        return (
          <DecideHomeScreen
            username={username}
            setUsername={setUsername}
            location={location}
            setLocation={setLocation}
            joinCode={joinCode}
            setJoinCode={setJoinCode}
            roomCode={roomCode}
            decideScreen={decideScreen}
            hovered={hovered}
            setHovered={setHovered}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
          />
        );
      }

      if (decideScreen === "room") {
        return (
          <RoomLobbyScreen
            roomData={roomData}
            roomCode={roomCode}
            isHost={isHost}
            hovered={hovered}
            setHovered={setHovered}
            onStartSwiping={handleStartSwiping}
          />
        );
      }

      if (decideScreen === "swipe") {
        return <RestaurantSwipeScreen roomData={roomData} />;
      }
    }

    if (activeTab === "dating") {
      return (
        <DatingScreen
          datingProfile={datingProfile}
          matchMessage={matchMessage}
          swipeDirection={swipeDirection}
          profileHover={profileHover}
          setProfileHover={setProfileHover}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      );
    }

    return <ProfileScreen currentUser={currentUser}
    userProfile={userProfile}
    setUserProfile={setUserProfile}
    profileHover={profileHover}
    setProfileHover={setProfileHover
    } />;
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>

      <AppShell>
        <TopRightIcons
          activeTab={activeTab}
          matchCount={matchCount}
          onOpenMatches={() => setCurrentScreen("matches")}
          onOpenMessages={() => setCurrentScreen("messages")}
        />

        {renderContent()}

        <BottomNav
          activeTab={activeTab}
          hovered={hovered}
          setHovered={setHovered}
          onDecide={() => {
            setActiveTab("decide");
            setCurrentScreen("main");
          }}
          onDating={() => {
            setActiveTab("dating");
            setCurrentScreen("main");
          }}
          onProfile={() => {
            setActiveTab("profile");
            setCurrentScreen("main");
          }}
        />
      </AppShell>
    </>
  );
}

export default App;