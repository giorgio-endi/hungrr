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
                    backgroundColor: "#f4f8f9",
                    border: "10px solid black",
                    borderRadius: "40px",
                    position: "relative",
                    overflow: "hidden",
                    boxSizing: "border-box",
                }}
            >
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
                        left: "0px",
                        right: "0px",
                        bottom: "0px",
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