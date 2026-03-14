function RestaurantCard({ restaurant }) {
    const photoName = restaurant?.photos?.[0]?.name;
    const photoUrl = photoName
      ? `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`
      : null;
  
    return (
      <div
        style={{
          margin: "0 auto 18px auto",
          width: "220px",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "18px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "140px",
            borderRadius: "18px",
            backgroundColor: "#dff2ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "12px",
            fontSize: "56px",
            overflow: "hidden",
          }}
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={restaurant?.displayName?.text}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            "🍜"
          )}
        </div>
  
        <h2
          style={{
            fontSize: "20px",
            color: "#1f5f8b",
            margin: "0 0 8px 0",
            lineHeight: "1.2",
          }}
        >
          {restaurant?.displayName?.text || "Unknown restaurant"}
        </h2>
  
        <p
          style={{
            fontSize: "13px",
            color: "#335c74",
            margin: "0 0 6px 0",
            lineHeight: "1.5",
          }}
        >
          {restaurant?.formattedAddress || "No address"}
        </p>
  
        <p
          style={{
            fontSize: "13px",
            color: "#335c74",
            margin: "0 0 6px 0",
          }}
        >
          Rating: {restaurant?.rating ?? "N/A"}
        </p>
  
        <p
          style={{
            fontSize: "13px",
            color: "#335c74",
            margin: "0 0 6px 0",
          }}
        >
          Price: {restaurant?.priceLevel || "N/A"}
        </p>
  
        <p
          style={{
            fontSize: "13px",
            color: "#335c74",
            margin: 0,
          }}
        >
          Type: {restaurant?.primaryType || restaurant?.types?.[0] || "N/A"}
        </p>
      </div>
    );
  }
  
  export default RestaurantCard;