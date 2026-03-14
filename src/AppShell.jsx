function AppShell({ children }) {
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

                <div
                    style={{
                        height: "100%",
                        overflowY: "auto",
                        padding: "70px 25px 130px 25px",
                        textAlign: "center",
                        boxSizing: "border-box",
                        position: "relative",
                        zIndex: 2,
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AppShell;