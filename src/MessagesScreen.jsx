function MessagesScreen({ matches, messages, openChat }) {
    return (
        <>
            <h1>Messages</h1>

            {matches.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                matches.map((match) => {
                    const lastMessage =
                        messages[match.id]?.[messages[match.id].length - 1]?.text || "";

                    return (
                        <button key={match.id} onClick={() => openChat(match)}>
                            <img src={match.avatarUrl} width="50" />
                            <p>{match.name}</p>
                            <p>{lastMessage}</p>
                        </button>
                    );
                })
            )}
        </>
    );
}

export default MessagesScreen;