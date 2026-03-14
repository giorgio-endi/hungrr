import { FaHeart } from "react-icons/fa"; 
import { MdMessage } from "react-icons/md";

function TopRightIcons({
    activeTab,
    matchCount,
    onOpenMatches,
    onOpenMessages,
}) {
    if (activeTab !== "dating") {
        return null;
    }

    return (
        <div
            style={{
                position: "absolute",
                top: "50px",
                right: "18px",
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <button
                onClick={onOpenMatches}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    fontSize: "26px",
                }}
            >
                <FaHeart size={30} color="020100" />
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
                    fontSize: "24px",
                }}
            >
                <MdMessage size={30} color="020100" />
            </button>
        </div>
    );
}

export default TopRightIcons;