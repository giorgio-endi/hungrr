import { useState } from "react";

function App() {
  const [selectedMood, setSelectedMood] = useState("");

  const moods = ["Spicy", "Salty", "Sweet", "Savory"];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff8f3",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#ff6b35", fontSize: "48px", marginBottom: "10px" }}>
        HUNGRR 🍴
      </h1>

      <p style={{ fontSize: "20px", color: "#444", marginBottom: "30px" }}>
        What are you in the mood for right now?
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            style={{
              padding: "15px 25px",
              fontSize: "18px",
              borderRadius: "12px",
              border: selectedMood === mood ? "3px solid #ff6b35" : "1px solid #ddd",
              backgroundColor: selectedMood === mood ? "#ffe2d6" : "white",
              cursor: "pointer",
              minWidth: "130px",
            }}
          >
            {mood}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "16px",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ color: "#333" }}>You chose: {selectedMood}</h2>
          <p style={{ color: "#666", fontSize: "18px" }}>
            Nice — we can now suggest dishes and restaurants that match your craving.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;