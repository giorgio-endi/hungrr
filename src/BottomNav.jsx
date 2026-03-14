import { FaRegLightbulb, FaHeart, FaUser } from "react-icons/fa";

function BottomNav({
    activeTab,
    hovered,
    setHovered,
    onDecide,
    onDating,
    onProfile,
}) {
    const iconTextColor = (tabName) => {
        if (activeTab === tabName) return "#f86261";
        if (hovered === `nav-${tabName}`) return "#fdd0cd";
        return "#f4f8f9";
    };

    const navButtonStyle = {
        flex: 1,
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: "6px 0px",
        borderRadius: "14px",
    };

    return (
        <div
            style={{
                position: "absolute",
                bottom: "0px",
                left: "0px",
                right: "0px",
                backgroundColor: "#020100",
                padding: "15px",
                display: "flex",
                gap: "18px",
            }}
        >
            <button
                onClick={onDecide}
                onMouseEnter={() => setHovered("nav-decide")}
                onMouseLeave={() => setHovered(null)}
                style={navButtonStyle}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        color: iconTextColor("decide"),
                    }}
                >
                    <FaRegLightbulb size={20} />
                    <span>Decide</span>
                </div>
            </button>

            <button
                onClick={onDating}
                onMouseEnter={() => setHovered("nav-dating")}
                onMouseLeave={() => setHovered(null)}
                style={navButtonStyle}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        color: iconTextColor("dating"),
                    }}
                >
                    <FaHeart size={20} />
                    <span>Connect</span>
                </div>
            </button>

            <button
                onClick={onProfile}
                onMouseEnter={() => setHovered("nav-profile")}
                onMouseLeave={() => setHovered(null)}
                style={navButtonStyle}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        color: iconTextColor("profile"),
                    }}
                >
                    <FaUser size={20} />
                    <span>Profile</span>
                </div>
            </button>
        </div>
    );
}

export default BottomNav;