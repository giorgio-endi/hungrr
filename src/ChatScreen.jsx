import { useEffect, useRef } from "react";

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
  const scrollRef = useRef(null);

  // auto scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* USERNAME BAR */}
      <div
        style={{
          padding: "12px",
          fontFamily: "Ubuntu",
          fontSize: "18px",
          color: "#020100",
          backgroundColor: "#f4f8f9",
          position: "sticky",
          top: 10,
          zIndex: 1,
        }}
      >
        {selectedChat?.username}
      </div>

      {/* CHAT MESSAGES (scrollable, no scrollbar) */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        className="no-scrollbar"
      >
        {chatMessages.length === 0 ? (
          <p style={{ color: "#020100" }}>No messages yet..</p>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent:
                  msg.senderUid === currentUser?.uid ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    msg.senderUid === currentUser?.uid ? "#f86261" : "#fdd0cd",
                  color: msg.senderUid === currentUser?.uid ? "white" : "white",
                  padding: "10px 12px",
                  borderRadius: "16px",
                  maxWidth: "75%",
                  textAlign: "left",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* INPUT BAR */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "12px",
          backgroundColor: "#f4f8f9",
        }}
      >
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "7px",
            border: "none",
            outline: "none",
            backgroundColor: "white",
            color: "#020100",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: "#991c1a",
            color: "white",
            border: "none",
            borderRadius: "7px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>

      {/* HIDE SCROLLBAR FOR WEBKIT */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}

export default ChatScreen;