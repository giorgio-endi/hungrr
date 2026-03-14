function BottomNav({
    activeTab,
    hovered,
    setHovered,
    onDecide,
    onDating,
    onProfile,
}) {
    const navButtonStyle = (tabName) => ({
        flex: 1,
        border: "none",
        backgroundColor:
            activeTab === tabName
                ? "#4da8da"
                : hovered === `nav-${tabName}`
                    ? "#fdd0cd"
                    : "transparent",
        color: activeTab === tabName ? "white" : "#f4f8f9",
        fontSize: "14px",
        fontWeight: "600",
        padding: "12px 6px",
        borderRadius: "14px",
        cursor: "pointer",
        transition: "0.2s",
    });

    return (
        <div
            style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                right: "16px",
                backgroundColor: "#020100",
                borderRadius: "20px",
                padding: "8px",
                display: "flex",
                gap: "8px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.10)",
            }}
        >
            <button
                onClick={onDecide}
                onMouseEnter={() => setHovered("nav-decide")}
                onMouseLeave={() => setHovered(null)}
                style={navButtonStyle("decide")}
            >
                Decide
            </button>

            <button
                onClick={onDating}
                onMouseEnter={() => setHovered("nav-dating")}
                onMouseLeave={() => setHovered(null)}
                style={navButtonStyle("dating")}
            >
                Dating
            </button>

            <button
                onClick={onProfile}
                onMouseEnter={() => setHovered("nav-profile")}
                onMouseLeave={() => setHovered(null)}
                style={navButtonStyle("profile")}
            >
                Profile
            </button>
        </div>
    );
}

export default BottomNav;