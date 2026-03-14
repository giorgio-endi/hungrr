import { FaUser } from "react-icons/fa";

function MatchesScreen({ matches, openChat, goBack }) {
  return (
    <>
      <div
        style={{
          marginTop: "40px",
          marginBottom: "25px",
        }}
      >
        <h1>Your Matches</h1>
      </div>

      {matches.length === 0 ? (
        <p>No matches yet.</p>
      ) : (
        matches.map((match) => (
          <button key={match.id} onClick={() => openChat(match)} className="match-btn">
            {match.photoURL ? (
              <img
                src={match.photoURL}
                alt={match.username}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#020100",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaUser />
              </div>
            )}

            <div style={{ marginLeft: "8px", textAlign: "left", flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: "700",
                  color: "#020100",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {match.username}
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#020100",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {match.favouriteFood || "No favourite food yet"}
              </p>
            </div>
          </button>
        ))
      )}

      {/* HOVER EFFECT */}
      <style>
        {`
          .match-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            background-color: white;
            border: none;
            border-radius: 16px;
            padding: 12px;
            margin-bottom: 12px;
            cursor: pointer;
            text-align: left;
            transition: all 0.25s ease;
          }
          .match-btn:hover {
            background-color: #fdd0cd;
          }
          .match-btn:hover p {
            color: #000000;
          }
        `}
      </style>
    </>
  );
}

export default MatchesScreen;