function MessagesScreen({ matches, messages, openChat, goBack }) {
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


      <div style = {{
        marginBottom: "25px"
      }}>
        <h1>Messages</h1>
      </div>


      {matches.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        matches.map((match) => {
          const lastMessage =
            messages[match.id]?.[messages[match.id].length - 1]?.text || "";


          return (
            <button
              key={match.id}
              onClick={() => openChat(match)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                backgroundColor: "white",
                border: "none",
                borderRadius: "16px",
                padding: "12px",
                marginBottom: "12px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {match.photoURL ? (
                <img
                  src={match.photoURL}
                  alt={match.username}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#dff2ff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  👤
                </div>
              )}


              <div>
                <p style={{ margin: 0, fontWeight: "700", color: "#1f5f8b" }}>
                  {match.username}
                </p>
                <p style={{ margin: 0, color: "#335c74", fontSize: "14px" }}>
                  {lastMessage || "Start chatting"}
                </p>
              </div>
            </button>
          );
        })
      )}
    </>
  );
}


export default MessagesScreen;

