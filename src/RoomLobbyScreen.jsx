import { MdArrowBack } from "react-icons/md";

function RoomLobbyScreen({
  roomData,
  roomCode,
  isHost,
  hovered,
  setHovered,
  onStartSwiping,
  goBack,
}) {
  const users = roomData?.users || [];

  const mainButtonStyle = (name) => ({
    width: "250px",
    padding: "18px",
    fontSize: "22px",
    borderRadius: "16px",
    border: "none",
    backgroundColor: hovered === name ? "#781715" : "#991c1a",
    color: "white",
    cursor: "pointer",
    marginTop: "18px",
    fontWeight: "600",
  });

  return (
    <div style={{ position: "relative", paddingTop: "60px" }}>
      {/* BACK ICON FLOATING ABOVE */}
      <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          border: "none",
          background: "transparent",
          fontSize: "30px",
          cursor: "pointer",
          color: "#020100",
          zIndex: 20, // above everything
        }}
      >
        <MdArrowBack />
      </button>

      <h1 style={{marginBottom: "10px"}}>
        Room Lobby
      </h1>

      <p style={{marginBottom: "45px"}}>
        Waiting for everyone to join.
      </p>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
          textAlign: "left",
          marginTop: "20px",
          marginBottom: "20pz",
        }}
      >
        <p>
          <strong>Room Code:</strong> {roomData?.code || roomCode}
        </p>
        <p>
          <strong>Location:</strong> {roomData?.location}
        </p>
        <p>
          <strong>Host:</strong> {roomData?.host}
        </p>
        <p>
          <strong>Status:</strong> {roomData?.status}
        </p>

        <p style={{ fontWeight: "700" }}>Joined Users</p>

        {users.length === 0 ? (
          <p>No users yet</p>
        ) : (
          users.map((user, i) => <p key={i}>• {user}</p>)
        )}
      </div>

      {isHost ? (
        <button
          onClick={onStartSwiping}
          onMouseEnter={() => setHovered("start")}
          onMouseLeave={() => setHovered(null)}
          style={mainButtonStyle("start")}
        >
          Start Swiping
        </button>
      ) : (
        <p style={{ marginTop: "24px", color: "#1f5f8b" }}>
          Waiting for host to start...
        </p>
      )}
    </div>
  );
}

export default RoomLobbyScreen;