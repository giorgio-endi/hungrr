function MatchesScreen({ matches, openChat, goBack }) {
  return (
    <>

      <div style = {{
        marginTop: "40px",
        marginBottom: "25px"
      }}>
        <h1>Your Matches</h1>
      </div>

      {matches.length === 0 ? (
        <p>No matches yet.</p>
      ) : (
        matches.map((match) => (
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
                {match.favouriteFood || "No favourite food yet"}
              </p>
            </div>
          </button>
        ))
      )}
    </>
  );
}

export default MatchesScreen;
