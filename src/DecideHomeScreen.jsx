import React from "react";

function DecideHomeScreen({
  username,
  setUsername,
  location,
  setLocation,
  joinCode,
  setJoinCode,
  roomCode,
  decideScreen,
  hovered,
  setHovered,
  onCreateRoom,
  onJoinRoom,
}) {
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

  const formBoxStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "18px",
    padding: "0px",
    width: "100%",
    maxWidth: "260px",
    margin: "17px auto",
    textAlign: "left",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#020100",
    marginTop: "10px",
  };

  return (
    <>

    <div style={{marginTop: "20px"}}>
         <h1>Find Your Restaurant!</h1>
    </div>

      <div style={formBoxStyle}>
        <p style={labelStyle}>Name</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <p style={labelStyle}>Location</p>
        <input
          type="text"
          placeholder="Enter location (for host)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        <p style={labelStyle}>Room code</p>
        <input
          type="text"
          placeholder="Enter room code (for guest)"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
          style={inputStyle}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginTop: "0px",
        }}
      >
        <button
          onClick={onCreateRoom}
          onMouseEnter={() => setHovered("create")}
          onMouseLeave={() => setHovered(null)}
          className="hover-darken create-btn"
        >
          Create Room
        </button>

        <button
          onClick={onJoinRoom}
          onMouseEnter={() => setHovered("join")}
          onMouseLeave={() => setHovered(null)}
          className="hover-darken join-btn"
        >
          Join Room
        </button>
      </div>

      {roomCode !== "" && decideScreen === "home" && (
        <p style={{ marginTop: "20px", fontSize: "18px", color: "#1f5f8b" }}>
          Room Code: {roomCode}
        </p>
      )}

      {/* BUTTON HOVER CSS */}
      <style>
        {`
          .hover-darken {
            width: 260px;
            padding: 15px;
            border-radius: 7px;
            border: none;
            font-family: "Ubuntu", sans-serif;
            font-size: 22px;
            font-weight: 600;
            cursor: pointer;
            color: white;
            transition: all 0.25s ease;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          }
          .create-btn {
            background-color: #991c1a;
          }
          .create-btn:hover {
            background-color: #781715;
            color: #fff;
          }
          .join-btn {
            background-color: #991c1a;
          }
          .join-btn:hover {
            background-color: #781715;
            color: #fff;
          }
        `}
      </style>
    </>
  );
}

export default DecideHomeScreen;