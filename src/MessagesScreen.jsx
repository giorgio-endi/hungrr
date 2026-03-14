import { FaUser } from "react-icons/fa";

import React from "react";

function MessagesScreen({ matches, messages, openChat, goBack }) {
  return (
    <>
      <div
        style={{
          marginTop: "40px",
          marginBottom: "25px",
        }}
      >
        <h1>Messages</h1>
      </div>

      {matches.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        matches.map((match) => {
          const lastMessage =
            messages[match.id]?.[messages[match.id].length - 1]?.text || "";

          return (
            <button
              key={match.id}
              onClick={() => openChat(match)}
              className="message-btn"
            >
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
                  <FaUser></FaUser>
                </div>
              )}

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  marginLeft: "8px",
                  textAlign: "left",
                }}
              >
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
                  {lastMessage || "Start chatting"}
                </p>
              </div>
            </button>
          );
        })
      )}

      {/* HOVER EFFECT */}
      <style>
        {`
          .message-btn {
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
          .message-btn:hover {
            background-color: #fdd0cd;
          }
          .message-btn:hover p {
            color: #000000;
          }
        `}
      </style>
    </>
  );
}

export default MessagesScreen;