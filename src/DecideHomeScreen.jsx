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
        width: "250px",
        padding: "14px",
        borderRadius: "14px",
        border: "none",
        outline: "none",
        fontSize: "15px",
        marginTop: "12px",
        boxSizing: "border-box",
    };

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

    return (
        <>
            <h1 style={{ fontSize: "42px", color: "#1f5f8b", fontWeight: "700" }}>
                HUNGRR
            </h1>

            <p style={{ fontSize: "20px", color: "#24506d", marginBottom: "26px" }}>
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
                }}
            >
                🍽️
            </div>

            <p style={{ fontSize: "20px", color: "#1f5f8b", fontWeight: "600" }}>
                What are you in the mood for?
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
                onClick={onCreateRoom}
                onMouseEnter={() => setHovered("create")}
                onMouseLeave={() => setHovered(null)}
                style={mainButtonStyle("create")}
            >
                Create Room
            </button>

            <button
                onClick={onJoinRoom}
                onMouseEnter={() => setHovered("join")}
                onMouseLeave={() => setHovered(null)}
                style={mainButtonStyle("join")}
            >
                Join Room
            </button>

            {roomCode !== "" && decideScreen === "home" && (
                <p style={{ marginTop: "20px", fontSize: "18px", color: "#1f5f8b" }}>
                    Room Code: {roomCode}
                </p>
            )}
        </>
    );
}

export default DecideHomeScreen;