import { useEffect, useState } from "react";
import { searchRestaurants } from "../api/restaurants";
import RestaurantCard from "./RestaurantCard";

function RestaurantSwipeScreen({ roomData }) {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantIndex, setRestaurantIndex] = useState(0);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [restaurantsError, setRestaurantsError] = useState("");

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
        setRestaurantsError("Could not load restaurants");
      } finally {
        setRestaurantsLoading(false);
      }
    }

    loadRestaurants();
  }, [roomData]);

  const currentRestaurant = restaurants[restaurantIndex];

  function goNextRestaurant() {
    setRestaurantIndex((prev) => {
      if (prev < restaurants.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }

  return (
    <>
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
          marginBottom: "22px",
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
        <RestaurantCard restaurant={currentRestaurant} />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "10px",
        }}
      >
        <button
          onClick={goNextRestaurant}
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
          onClick={goNextRestaurant}
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

      <div style={{ height: "40px" }} />
    </>
  );
}

export default RestaurantSwipeScreen;