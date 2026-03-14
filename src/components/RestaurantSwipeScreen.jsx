import { useEffect, useState } from "react";
import { searchRestaurants } from "../api/restaurants";
import RestaurantCard from "./RestaurantCard";
import { saveVote } from "../firestore";

function RestaurantSwipeScreen({ roomData, goBack, currentUsername }) {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantIndex, setRestaurantIndex] = useState(0);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [restaurantsError, setRestaurantsError] = useState("");
  const [swipeDirection, setSwipeDirection] = useState("");

  useEffect(() => {
    async function loadRestaurants() {
      if (!roomData?.location) return;

      try {
        setRestaurantsLoading(true);
        setRestaurantsError("");

        const results = await searchRestaurants(
          `${roomData.location} restaurants`
        );

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
    setRestaurantIndex((prev) => {
      if (prev < restaurants.length - 1) {
        return prev + 1;
      }
      return prev;
    });
    setSwipeDirection("");

  }

  async function handleDislike() {
  if (!currentRestaurant) return;

  setSwipeDirection("left");

  try {
    await saveVote(
      roomData.code,
      currentRestaurant.id,
      currentUsername,
      "dislike",
      currentRestaurant
    );

    setTimeout(() => {
      loadNextRestaurant();
    }, 300);
  } catch (error) {
    console.error("Failed to save dislike:", error);
  }
}

async function handleLike() {
  if (!currentRestaurant) return;

  setSwipeDirection("right");

  try {
    await saveVote(
      roomData.code,
      currentRestaurant.id,
      currentUsername,
      "like",
      currentRestaurant
    );

    setTimeout(() => {
      loadNextRestaurant();
    }, 300);
  } catch (error) {
    console.error("Failed to save like:", error);
  }
}

  return (
    <>
      <button
        onClick={goBack}
        style={{
          border: "none",
          background: "transparent",
          fontSize: "22px",
          cursor: "pointer",
          color: "#1f5f8b",
          marginBottom: "10px",
        }}
      >
        ← Back
      </button>

      <h1
        style={{
          fontSize: "36px",
          color: "#1f5f8b",
          marginBottom: "8px",
          fontWeight: "700",
          marginTop: "10px",
        }}
      >
        Swipe Restaurants
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: "#24506d",
          marginBottom: "18px",
        }}
      >
        Room location: {roomData?.location}
      </p>

      {restaurantsLoading ? (
        <p style={{ color: "#1f5f8b" }}>Loading restaurants...</p>
      ) : restaurantsError ? (
        <p style={{ color: "#b00020" }}>{restaurantsError}</p>
      ) : restaurants.length === 0 ? (
        <p style={{ color: "#1f5f8b" }}>No restaurants found.</p>
      ) : (
        <RestaurantCard
          restaurant={currentRestaurant}
          swipeDirection={swipeDirection}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "10px",
          marginBottom: "120px",
        }}
      >
        <button
          onClick={handleDislike}
          style={{
            width: "110px",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "#4da8da",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Dislike
        </button>

        <button
          onClick={handleLike}
          style={{
            width: "110px",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "#4da8da",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Like
        </button>
      </div>

      <div style={{ height: "120px" }} />
    </>
  );
}

export default RestaurantSwipeScreen;