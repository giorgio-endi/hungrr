function ProfileScreen({ profileHover, setProfileHover }) {
    return (
        <>
            <h1>Your Profile</h1>

            <div
                style={{
                    width: "220px",
                    height: "220px",
                    borderRadius: "50%",
                    backgroundColor: "#5bb8eb",
                    margin: "0 auto 24px auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "72px",
                    color: "white",
                }}
            >
                👤
            </div>

            <button
                onMouseEnter={() => setProfileHover("add-picture")}
                onMouseLeave={() => setProfileHover(null)}
            >
                Add Profile Picture
            </button>

            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "20px",
                    width: "240px",
                    margin: "0 auto",
                }}
            >
                <p>
                    <strong>Name:</strong> Hannah
                </p>
                <p>
                    <strong>Favourite food:</strong> Sushi
                </p>
                <p>
                    <strong>Craving style:</strong> Savory
                </p>
                <p>
                    <strong>Budget:</strong> $$
                </p>
                <p>
                    <strong>Bio:</strong> Looking for someone with similar food taste.
                </p>
            </div>
        </>
    );
}

export default ProfileScreen;