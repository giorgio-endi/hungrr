import { useRef } from "react";
import RestaurantCard from "./components/RestaurantCard";
import { MdArrowBack } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function MatchedRestaurantScreen({ roomData, goBack }) {
  const scrollRef = useRef(null);
  const matchedRestaurant = roomData?.matchedRestaurant;

  // Scroll with arrows (optional)
  const scrollUp = () => scrollRef.current?.scrollBy({ top: -80, behavior: "smooth" });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 80, behavior: "smooth" });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/*Top fixed area*/}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "160px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f8f9",
          zIndex: 5,
          paddingTop: "12px",
        }}
      >
        <button
          onClick={goBack}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            border: "none",
            background: "transparent",
            fontSize: "30px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#020100",
            transition: "0.25s",
          }}
        >
          <MdArrowBack />
        </button>

        <h1
          style={{
            fontSize: "34px",
            color: "#020100",
            marginBottom: "12px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          GRR, it’s a feast!
        </h1>

        <p
          style={{
            color: "#020100",
            margin: 0,
            textAlign: "center",
          }}
        >
          You all matched on this restaurant
        </p>
      </div>

      {/* Scrollable swipe area  */}
      <div
        style={{
          position: "absolute",
          top: "160px", // start below top fixed area
          left: 0,
          right: 0,
          bottom: "20px", // space for bottom if needed
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 0",
        }}
        ref={scrollRef}
        className="custom-scrollbar"
      >
        {matchedRestaurant ? (
          <RestaurantCard restaurant={matchedRestaurant} swipeDirection="" />
        ) : (
          <p style={{ color: "#1f5f8b", textAlign: "center" }}>
            Matched restaurant could not be loaded.
          </p>
        )}
      </div>

      {/* Custom minimalistic scrollbar styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #fdd0cd;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #991c1a;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #f86261;
          }
          /* Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #991c1a #fdd0cd;
          }
        `}
      </style>
    </div>
  );
}

export default MatchedRestaurantScreen;