function AppShell({ topRight, content, bottomNav }) {
    return (
        <div
            style={{
                backgroundColor: "#0d1b2a",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <div
                style={{
                    width: "380px",
                    height: "720px",
                    backgroundColor: "#8ed6ff",
                    border: "10px solid black",
                    borderRadius: "40px",
                    position: "relative",
                    overflow: "hidden",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "-40px",
                        left: "-40px",
                        width: "160px",
                        height: "160px",
                        backgroundColor: "#4da8da",
                        borderRadius: "50%",
                        opacity: 0.4,
                        zIndex: 1,
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        bottom: "-40px",
                        right: "-40px",
                        width: "160px",
                        height: "160px",
                        backgroundColor: "#2f7fb5",
                        borderRadius: "50%",
                        opacity: 0.4,
                        zIndex: 1,
                    }}
                />

                {topRight}

                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "78px",
                        overflowY: "auto",
                        padding: "70px 25px 25px 25px",
                        textAlign: "center",
                        boxSizing: "border-box",
                        zIndex: 2,
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {content}
                </div>

                <div
                    style={{
                        position: "absolute",
                        left: "16px",
                        right: "16px",
                        bottom: "16px",
                        zIndex: 4,
                    }}
                >
                    {bottomNav}
                </div>
            </div>
        </div>
    );
}

export default AppShell;