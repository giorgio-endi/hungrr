function ChatScreen({
    selectedChat,
    messages,
    chatInput,
    setChatInput,
    handleSendMessage,
    goBack,
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

            <h2>{selectedChat?.name}</h2>

            <div>
                {chatMessages.map((msg, i) => (
                    <div key={i}>
                        <b>{msg.sender}</b>: {msg.text}
                    </div>
                ))}
            </div>

            <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type message..."
            />

            <button onClick={handleSendMessage}>Send</button>
        </>
    );
}

export default ChatScreen;