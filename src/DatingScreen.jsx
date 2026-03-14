function DatingScreen({
  datingProfile,
  matchMessage,
  swipeDirection,
  profileHover,
  setProfileHover,
  handleLike,
  handleDislike,
}) {
  const datingCardTransform =
    swipeDirection === "left"
      ? "translateX(-220px) rotate(-14deg) scale(0.96)"
      : swipeDirection === "right"
      ? "translateX(220px) rotate(14deg) scale(0.96)"
      : "translateX(0) rotate(0deg) scale(1)";

  const actionButtonStyle = (type) => ({
    minWidth: "120px",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "none",
    backgroundColor: profileHover === type ? "#781715" : "#991c1a",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0 6px 14px rgba(0,0,0,0.10)",
  });

  if (!datingProfile) {
    return (
      <>
        <h1
          style={{
            fontSize: "42px",
            color: "#020100",
            fontWeight: "700",
            marginBottom: "6px",
          }}
        >
          HUNGRR Match
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#24506d",
            marginBottom: "22px",
          }}
        >
          No more users to swipe right now.
        </p>
      </>
    );
  }

  return (
    <>

      <h1
        style={{
          fontSize: "25px",
          color: "#002010",
          marginBottom: "22px",
          marginTop: "30px",
        }}
      >
        Find Your Munch Buddy!
      </h1>

      <div
        style={{
          margin: "auto ",
          width: "255px",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "10px",
          boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
          transform: datingCardTransform,
          transition: "transform 0.35s ease, opacity 0.35s ease",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "150px",
            borderRadius: "18px",
            backgroundColor: "#f4f8f9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
            overflow: "hidden",
          }}
        >
          {datingProfile.photoURL ? (
            <img
              src={datingProfile.photoURL}
              alt="Profile"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <span style={{ fontSize: "72px" }}>👤</span>
          )}
        </div>

        <h2
          style={{
            fontSize: "28px",
            color: "#991c1a",
            marginBottom: "8px",
          }}
        >
          {datingProfile.username}
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#24506d",
            marginBottom: "10px",
            lineHeight: "1.5",
          }}
        >
          {datingProfile.bio || "No bio yet."}
        </p>

        <div
          style={{
            backgroundColor: "#dff2ff",
            borderRadius: "16px",
            padding: "14px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              margin: "0 0 8px 0",
              color: "#020100",
              fontSize: "14px",
            }}
          >
            <strong>Favourite food:</strong> {datingProfile.favouriteFood || "—"}
          </p>

          <p
            style={{
              margin: 0,
              color: "#020100",
              fontSize: "14px",
            }}
          >
            <strong>Mood:</strong> {datingProfile.cravingStyle || "—"}
          </p>
        </div>
      </div>

      <div style={{ minHeight: "28px", marginBottom: "14px" }}>
        {matchMessage && (
          <p
            style={{
              color: "#991c1a",
              fontWeight: "600",
              fontSize: "16px",
              margin: 0,
            }}
          >
            {matchMessage}
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <button
          onClick={handleDislike}
          onMouseEnter={() => setProfileHover("dislike")}
          onMouseLeave={() => setProfileHover(null)}
          style={actionButtonStyle("dislike")}
        >
          Dislike
        </button>

        <button
          onClick={handleLike}
          onMouseEnter={() => setProfileHover("like")}
          onMouseLeave={() => setProfileHover(null)}
          style={actionButtonStyle("like")}
        >
          Like
        </button>
      </div>
    </>
  );
}

export default DatingScreen;
