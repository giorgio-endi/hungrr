import { useState } from "react";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h2>Screen 1</h2>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "40px",
          maxWidth: "700px",
        }}
      >
        <p>HUNGRR</p>
        <button style={{ display: "block", marginBottom: "10px" }}>
          Create Room
        </button>
        <button>Join Room</button>
      </div>

  );
}

export default App;