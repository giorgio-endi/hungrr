import { useEffect, useMemo, useState } from "react";
import {
  createRoom,
  joinRoom,
  subscribeToRoom,
  startSwiping,
  getUserProfile,
  signOutUser,
  getUserMatches,
  createMatch,
  sendMessage,
  subscribeToMessages,
  subscribeToProfilesExceptCurrentUser,
} from "./firestore";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

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
import MatchedRestaurantScreen from "./MatchedRestaurantScreen";

function App() {
  const [hovered, setHovered] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [activeTab, setActiveTab] = useState("decide");
  const [profileHover, setProfileHover] = useState(null);
  const [matchCount, setMatchCount] = useState(0);
  const [matchMessage, setMatchMessage] = useState("");
  const [swipeDirection, setSwipeDirection] = useState("");

  const [currentScreen, setCurrentScreen] = useState("main");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatInput, setChatInput] = useState("");

  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeMatchId, setActiveMatchId] = useState(null);

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [decideScreen, setDecideScreen] = useState("home");

  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [allDatingProfiles, setAllDatingProfiles] = useState([]);
  const [datingIndex, setDatingIndex] = useState(0);

  const [roomUnsubscribe, setRoomUnsubscribe] = useState(null);

  function resetDecideFlow() {
    if (roomUnsubscribe) {
      roomUnsubscribe();
      setRoomUnsubscribe(null);
    }

    setRoomCode("");
    setJoinCode("");
    setLocation("");
    setRoomData(null);
    setIsHost(false);
    setDecideScreen("home");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);

          if (profile?.username) {
            setUsername(profile.username);
          } else {
            setUsername("");
          }
        } catch (error) {
          console.error("getUserProfile error:", error);
        }
      } else {
        setUserProfile(null);
        setUsername("");
        resetDecideFlow();
        setActiveTab("decide");
        setCurrentScreen("main");
        setSelectedChat(null);
        setChatInput("");
        setMessages({});
        setMatches([]);
        setMatchCount(0);
        setActiveMatchId(null);
        setMatchMessage("");
        setSwipeDirection("");
        setAllDatingProfiles([]);
        setDatingIndex(0);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function loadMatches() {
    if (!currentUser) {
      return;
    }

    try {
      const userMatches = await getUserMatches(currentUser.uid);
      setMatches(userMatches);
      setMatchCount(userMatches.length);
    } catch (error) {
      console.error("loadMatches error:", error);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const unsubscribeProfiles = subscribeToProfilesExceptCurrentUser(
      currentUser.uid,
      (profiles) => {
        setAllDatingProfiles(profiles);
        setDatingIndex(0);
      }
    );

    loadMatches();

    return () => {
      unsubscribeProfiles();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!activeMatchId) {
      return;
    }

    const unsubscribe = subscribeToMessages(activeMatchId, (msgs) => {
      setMessages((prev) => ({
        ...prev,
        [activeMatchId]: msgs,
      }));
    });

    return () => unsubscribe();
  }, [activeMatchId]);

  const matchedUserIds = useMemo(() => {
    return matches.map((match) => match.uid);
  }, [matches]);

  const availableDatingProfiles = useMemo(() => {
    return allDatingProfiles.filter(
      (profile) => !matchedUserIds.includes(profile.uid)
    );
  }, [allDatingProfiles, matchedUserIds]);

  const datingProfile =
    availableDatingProfiles.length > 0
      ? availableDatingProfiles[datingIndex % availableDatingProfiles.length]
      : null;

  function generateRoomCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 4; i += 1) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    return code;
  }

  function listenToRoom(code) {
    if (roomUnsubscribe) {
      roomUnsubscribe();
    }
  
    const unsubscribe = subscribeToRoom(code, (data) => {
      if (!data) {
        return;
      }
  
      setRoomData(data);
  
      if (data.status === "swiping") {
        setDecideScreen("swipe");
      } else if (data.status === "matched") {
        setDecideScreen("matched");
      } else {
        setDecideScreen("room");
      }
    });
  
    setRoomUnsubscribe(() => unsubscribe);
  }

  async function handleCreateRoom() {
    const effectiveUsername =
      username.trim() || userProfile?.username?.trim() || "";

    if (effectiveUsername === "") {
      alert("Please enter your name first");
      return;
    }

    if (location.trim() === "") {
      alert("Please enter a location");
      return;
    }

    try {
      const code = generateRoomCode();
      const cleanName = effectiveUsername;
      const cleanLocation = location.trim();

      await createRoom(code, cleanLocation, cleanName);

      setRoomCode(code);
      setJoinCode(code);
      setIsHost(true);

      listenToRoom(code);
      setDecideScreen("room");
      setActiveTab("decide");
      setCurrentScreen("main");
    } catch (error) {
      console.error("handleCreateRoom error:", error);
      alert(`Something went wrong: ${error.message}`);
    }
  }

  async function handleJoinRoom() {
    const effectiveUsername =
      username.trim() || userProfile?.username?.trim() || "";

    if (effectiveUsername === "" || joinCode.trim() === "") {
      alert("Please enter your name and room code");
      return;
    }

    try {
      const cleanCode = joinCode.trim().toUpperCase();
      const cleanName = effectiveUsername;

      await joinRoom(cleanCode, cleanName);

      setRoomCode(cleanCode);
      setIsHost(false);

      listenToRoom(cleanCode);
      setDecideScreen("room");
      setActiveTab("decide");
      setCurrentScreen("main");
    } catch (error) {
      console.error("handleJoinRoom error:", error);
      alert(`Could not join room: ${error.message}`);
    }
  }

  async function handleStartSwiping() {
    try {
      await startSwiping(roomCode);
    } catch (error) {
      console.error("handleStartSwiping error:", error);
      alert(`Could not start swiping: ${error.message}`);
    }
  }

  function goNextDatingProfile() {
    setDatingIndex((prev) => prev + 1);
    setSwipeDirection("");
  }

  function openChat(match) {
    setSelectedChat(match);
    setActiveMatchId(match.id);
    setCurrentScreen("chat");
  }

  function handleDislike() {
    setMatchMessage("Not a match");
    setSwipeDirection("left");

    setTimeout(() => {
      goNextDatingProfile();
      setMatchMessage("");
    }, 400);
  }

  async function handleLike() {
    if (!datingProfile || !currentUser || !userProfile) {
      return;
    }

    const gotMatch = Math.random() < 0.4;
    setSwipeDirection("right");

    if (gotMatch) {
      setMatchMessage(`It's a match with ${datingProfile.username}!`);

      try {
        await createMatch(
          {
            uid: currentUser.uid,
            username: userProfile.username || "",
            photoURL: userProfile.photoURL || "",
            favouriteFood: userProfile.favouriteFood || "",
            cravingStyle: userProfile.cravingStyle || "",
            bio: userProfile.bio || "",
          },
          {
            uid: datingProfile.uid,
            username: datingProfile.username || "",
            photoURL: datingProfile.photoURL || "",
            favouriteFood: datingProfile.favouriteFood || "",
            cravingStyle: datingProfile.cravingStyle || "",
            bio: datingProfile.bio || "",
          }
        );

        await loadMatches();
      } catch (error) {
        console.error("handleLike error:", error);
      }
    } else {
      setMatchMessage("Liked! No match this time.");
    }

    setTimeout(() => {
      goNextDatingProfile();
      setMatchMessage("");
    }, 400);
  }

  async function handleSendMessage() {
    if (!chatInput.trim() || !activeMatchId || !currentUser) {
      return;
    }

    try {
      await sendMessage(activeMatchId, currentUser.uid, chatInput.trim());
      setChatInput("");
    } catch (error) {
      console.error("handleSendMessage error:", error);
      alert(`Could not send message: ${error.message}`);
    }
  }

  function renderContent() {
    if (currentScreen === "matches") {
      return (
        <MatchesScreen
          matches={matches}
          openChat={openChat}
          goBack={() => setCurrentScreen("main")}
        />
      );
    }

    if (currentScreen === "messages") {
      return (
        <MessagesScreen
          matches={matches}
          messages={messages}
          openChat={openChat}
          goBack={() => setCurrentScreen("main")}
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
          currentUser={currentUser}
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
            goBack={resetDecideFlow}
          />
        );
      }

      if (decideScreen === "swipe") {
        return (
          <RestaurantSwipeScreen
            roomData={roomData}
            goBack={resetDecideFlow}
            currentUsername={username}
          />
        );
      }
    }
    if (decideScreen === "matched") {
      return (
        <MatchedRestaurantScreen
          roomData={roomData}
          goBack={resetDecideFlow}
        />
      );
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

    return (
      <ProfileScreen
        currentUser={currentUser}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />
    );
  }

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0d1b2a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Poppins', sans-serif",
          color: "white",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return <AppHomeScreen onAuthSuccess={setCurrentUser} />;
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}
      </style>

      <AppShell
        topRight={
          <TopRightIcons
            activeTab={activeTab}
            matchCount={matchCount}
            onOpenMatches={() => setCurrentScreen("matches")}
            onOpenMessages={() => setCurrentScreen("messages")}
          />
        }
        content={renderContent()}
        bottomNav={
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
        }
      />
    </>
  );
}

export default App;