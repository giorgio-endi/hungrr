import { FaHeart } from "react-icons/fa"; 
import { MdMessage, MdArrowBack } from "react-icons/md";

function TopRightIcons({
    activeTab,
    matchCount,
    onOpenMatches,
    onOpenMessages,
    goBack,
    screen, // current screen from App.js
}) {
    // Only show back button on these screens
    const showBackButton = screen === "matches" || screen === "messages" || screen === "chat";

    // Don't render anything if not on dating tab
    if (activeTab !== "dating") {
        return null;
    }

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "90px",
                backgroundColor: "#f4f8f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // left back, right icons
                padding: "45px 12px 0px 12px",
                boxSizing: "border-box",
                zIndex: 3,
            }}
        >
            {/* LEFT SIDE: Back button */}
            <div>
                {showBackButton && (
                    <button
                        onClick={goBack}
                        style={{
                            background: "transparent",
                            border: "none",
                            fontSize: "22px",
                            cursor: "pointer",
                            color: "#020100",
                        }}
                    >
                        <MdArrowBack></MdArrowBack>
                    </button>
                )}
            </div>

            {/* RIGHT SIDE: Heart and Messages */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                    onClick={onOpenMatches}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                    }}
                >
                    <FaHeart size={30} color="#020100" />
                    <span
                        style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-10px",
                            minWidth: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#991c1a",
                            color: "white",
                            fontSize: "11px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "0 4px",
                        }}
                    >
                        {matchCount}
                    </span>
                </button>

                <button
                    onClick={onOpenMessages}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                    }}
                >
                    <MdMessage size={30} color="#020100" />
                </button>
            </div>
        </div>
    );
}

export default TopRightIcons;