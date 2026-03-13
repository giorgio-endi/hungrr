function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#dff4ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "50px 40px",
          borderRadius: "24px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          textAlign: "center",
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            color: "#1e6fa8",
            marginBottom: "10px",
            letterSpacing: "1px",
          }}
        >
          HUNGRR
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "#2f4858",
            marginBottom: "40px",
            fontWeight: "500",
          }}
        >
          What are you in the mood for?
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "220px",
              padding: "16px",
              fontSize: "20px",
              borderRadius: "14px",
              border: "none",
              backgroundColor: "#4da8da",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Create Room
          </button>

          <button
            style={{
              width: "220px",
              padding: "16px",
              fontSize: "20px",
              borderRadius: "14px",
              border: "2px solid #4da8da",
              backgroundColor: "white",
              color: "#1e6fa8",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;