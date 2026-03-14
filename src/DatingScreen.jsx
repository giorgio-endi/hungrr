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
            ? "translateX(-180px) rotate(-12deg)"
            : swipeDirection === "right"
                ? "translateX(180px) rotate(12deg)"
                : "translateX(0)";

    return (
        <>
            <h1 style={{ fontSize: "46px", color: "#1f5f8b" }}>HUNGRR Match</h1>

            <p style={{ fontSize: "18px", color: "#24506d" }}>Taste & Connect</p>

            <div
                style={{
                    margin: "0 auto 24px auto",
                    width: "240px",
                    backgroundColor: "white",
                    borderRadius: "24px",
                    padding: "22px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
                    transform: datingCardTransform,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "180px",
                        borderRadius: "18px",
                        backgroundColor: "#dff2ff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px",
                    }}
                >
                    <img
                        src={datingProfile.avatarUrl}
                        alt="Generated profile"
                        style={{ width: "130px", height: "130px" }}
                    />
                </div>

                <h2>{datingProfile.name}</h2>

                <p>{datingProfile.bio}</p>
                <p>Favourite food: {datingProfile.food}</p>
                <p>Mood: {datingProfile.mood}</p>
            </div>

            {matchMessage && <p>{matchMessage}</p>}

            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                <button
                    onClick={handleDislike}
                    onMouseEnter={() => setProfileHover("dislike")}
                    onMouseLeave={() => setProfileHover(null)}
                >
                    Dislike
                </button>

                <button
                    onClick={handleLike}
                    onMouseEnter={() => setProfileHover("like")}
                    onMouseLeave={() => setProfileHover(null)}
                >
                    Like
                </button>
            </div>
        </>
    );
}

export default DatingScreen;