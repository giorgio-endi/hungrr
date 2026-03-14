import RestaurantCard from "./components/RestaurantCard";

function MatchedRestaurantScreen({ roomData, goBack }) {
  const matchedRestaurant = roomData?.matchedRestaurant;

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
          fontSize: "34px",
          color: "#1f5f8b",
          marginBottom: "8px",
          fontWeight: "700",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        GRR, it’s a feast!
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: "#24506d",
          marginBottom: "18px",
          textAlign: "center",
        }}
      >
        You all matched on this restaurant
      </p>

      {matchedRestaurant ? (
        <RestaurantCard
          restaurant={matchedRestaurant}
          swipeDirection=""
        />
      ) : (
        <p style={{ color: "#1f5f8b", textAlign: "center" }}>
          Matched restaurant could not be loaded.
        </p>
      )}
    </>
  );
}

export default MatchedRestaurantScreen;