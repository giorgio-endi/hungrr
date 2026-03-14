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
                top: 0,
                left: 0,
                width: "100%",       
                height: "90px",     
                backgroundColor: "#f4f8f9", 
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "45px 12px 0px 0px",
                boxSizing: "border-box",
                zIndex: 3,
            }}
        >
            <button
                onClick={onOpenMatches}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    marginRight: "12px",
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
    );
}

export default TopRightIcons;