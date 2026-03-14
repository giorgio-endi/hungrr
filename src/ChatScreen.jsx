function ChatScreen({
  selectedChat,
  messages,
  chatInput,
  setChatInput,
  handleSendMessage,
  goBack,
  currentUser,
}) {
  const chatMessages = selectedChat ? messages[selectedChat.id] || [] : [];

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

      <h2>{selectedChat?.username}</h2>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "12px",
          minHeight: "260px",
          marginBottom: "12px",
        }}
      >
        {chatMessages.length === 0 ? (
          <p style={{ color: "#335c74" }}>No messages yet.</p>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent:
                  msg.senderUid === currentUser?.uid ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    msg.senderUid === currentUser?.uid ? "#4da8da" : "#e8f5fc",
                  color:
                    msg.senderUid === currentUser?.uid ? "white" : "#1f5f8b",
                  padding: "10px 12px",
                  borderRadius: "14px",
                  maxWidth: "75%",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: "#4da8da",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}

export default ChatScreen;
