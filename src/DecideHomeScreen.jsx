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
        color:"#000000",
        backgroundColor: "#fdd0cd"
    };

    const mainButtonStyle = (name) => ({
        width: "250px",
        padding: "18px",
        fontSize: "22px",
        borderRadius: "7px",
        border: "none",
        backgroundColor: hovered === name ? "#781715" : "#991c1a",
        fontFamily:"Ubuntu",
        color: "white",
        cursor: "pointer",
        marginTop: "18px",
        fontWeight: "600",
        transition: "0.25s",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    });

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
        <h1>
            Taste & Decide
        </h1>

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
                gap: "1px", 
                marginTop: "0px", 
                padding: "0px", 
                borderRadius: "16px",
            }}
        >
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
        </div>

            {roomCode !== "" && decideScreen === "home" && (
                <p style={{ marginTop: "20px", fontSize: "18px", color: "#1f5f8b" }}>
                    Room Code: {roomCode}
                </p>
            )}
        </>
    );
}

export default DecideHomeScreen;