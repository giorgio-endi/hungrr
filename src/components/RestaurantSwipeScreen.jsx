import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { searchRestaurants } from "../api/restaurants";
import RestaurantCard from "./RestaurantCard";
import { saveVote } from "../firestore";

function RestaurantSwipeScreen({ roomData, goBack, currentUsername }) {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantIndex, setRestaurantIndex] = useState(0);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [restaurantsError, setRestaurantsError] = useState("");
  const [swipeDirection, setSwipeDirection] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    async function loadRestaurants() {
      if (!roomData?.location) return;
      try {
        setRestaurantsLoading(true);
        setRestaurantsError("");
        const results = await searchRestaurants(`${roomData.location} restaurants`);
        setRestaurants(results);
        setRestaurantIndex(0);
      } catch (error) {
        console.error(error);
        setRestaurantsError(error.message || "Could not load restaurants");
      } finally {
        setRestaurantsLoading(false);
      }
    }
    loadRestaurants();
  }, [roomData?.location]);

  const currentRestaurant = restaurants[restaurantIndex];

  function loadNextRestaurant() {
    setRestaurantIndex((prev) => (prev < restaurants.length - 1 ? prev + 1 : prev));
    setSwipeDirection("");
  }

  async function handleDislike() {
    if (!currentRestaurant) return;
    setSwipeDirection("left");
    try {
      await saveVote(roomData.code, currentRestaurant.id, currentUsername, "dislike", currentRestaurant);
      setTimeout(() => loadNextRestaurant(), 300);
    } catch (error) {
      console.error("Failed to save dislike:", error);
    }
  }

  async function handleLike() {
    if (!currentRestaurant) return;
    setSwipeDirection("right");
    try {
      await saveVote(roomData.code, currentRestaurant.id, currentUsername, "like", currentRestaurant);
      setTimeout(() => loadNextRestaurant(), 300);
    } catch (error) {
      console.error("Failed to save like:", error);
    }
  }

  const actionButtonStyle = (name) => ({
    width: "110px",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: hoveredButton === name ? "#f86261" : "#991c1a",
    color: "#f4f8f9",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s",
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
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
          onMouseEnter={() => setHoveredButton("back")}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            border: "none",
            background: "transparent",
            fontSize: "26px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: hoveredButton === "back" ? "#f86261" : "#020100",
            transition: "0.25s",
          }}
        >
          <MdArrowBack />
        </button>

        <h1 style={{ marginBottom: "10px", textAlign: "center" }}>Swipe Restaurants</h1>
        <p style={{ color: "#020100", margin: 0 }}>
          Room location: {roomData?.location}
        </p>
      </div>

      {}
      <div
        style={{
          position: "absolute",
          top: "120px",
          left: 0,
          right: 0,
          bottom: "120px",
          overflowY: "auto",
          display: "flex",
           overflowX: "hidden", 
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 0",
        }}
        className="custom-scrollbar"
      >
        {restaurantsLoading ? (
          <p style={{ color: "#1f5f8b" }}>Loading restaurants...</p>
        ) : restaurantsError ? (
          <p style={{ color: "#b00020" }}>{restaurantsError}</p>
        ) : restaurants.length === 0 ? (
          <p style={{ color: "#1f5f8b" }}>No restaurants found.</p>
        ) : (
          <RestaurantCard restaurant={currentRestaurant} swipeDirection={swipeDirection} />
        )}
      </div>

      
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          zIndex: 5,
        }}
      >
        <button
          onClick={handleDislike}
          onMouseEnter={() => setHoveredButton("dislike")}
          onMouseLeave={() => setHoveredButton(null)}
          style={actionButtonStyle("dislike")}
        >
          Dislike
        </button>

        <button
          onClick={handleLike}
          onMouseEnter={() => setHoveredButton("like")}
          onMouseLeave={() => setHoveredButton(null)}
          style={actionButtonStyle("like")}
        >
          Like
        </button>
      </div>

      
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

export default RestaurantSwipeScreen;