function MatchesScreen({ matches, openChat, goBack }) {
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

            <h1>Your Matches</h1>

            {matches.length === 0 ? (
                <p>No matches yet.</p>
            ) : (
                matches.map((match) => (
                    <button key={match.id} onClick={() => openChat(match)}>
                        <img src={match.avatarUrl} width="50" />
                        <p>{match.name}</p>
                    </button>
                ))
            )}
        </>
    );
}

export default MatchesScreen;