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
        backgroundColor: hovered === name ? "#2f7fb5" : "#4da8da",
        color: "white",
        cursor: "pointer",
        marginTop: "18px",
        fontWeight: "600",
    });

    return (
        <>
            <button
                onClick={goBack}
                style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px",
                    cursor: "pointer",
                    color: "#1f5f8b",
                    marginBottom: "10px",
                }}
            >
                ← Back
            </button>

            <h1 style={{ fontSize: "36px", color: "#1f5f8b", fontWeight: "700" }}>
                Room Lobby
            </h1>

            <p style={{ fontSize: "16px", color: "#24506d" }}>
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
        </>
    );
}

export default RoomLobbyScreen;