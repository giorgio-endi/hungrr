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
            <button onClick={goBack}>← Back</button>

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