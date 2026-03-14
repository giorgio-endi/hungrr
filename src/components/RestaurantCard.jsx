function RestaurantCard({ restaurant, swipeDirection }) {
    const photos = restaurant?.photos || [];
  
    const photoUrls = photos.slice(0, 3).map((photo) => {
      return `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`;
    });
  
    function formatPriceLevel(priceLevel) {
      if (!priceLevel) return "N/A";
  
      if (priceLevel === "PRICE_LEVEL_INEXPENSIVE") return "$";
      if (priceLevel === "PRICE_LEVEL_MODERATE") return "$$";
      if (priceLevel === "PRICE_LEVEL_EXPENSIVE") return "$$$";
      if (priceLevel === "PRICE_LEVEL_VERY_EXPENSIVE") return "$$$$";
  
      return "N/A";
    }
  
    function formatType(type) {
      if (!type) return "N/A";
  
      return type
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
  
    const cardTransform =
      swipeDirection === "left"
        ? "translateX(-220px) rotate(-12deg)"
        : swipeDirection === "right"
        ? "translateX(220px) rotate(12deg)"
        : "translateX(0) rotate(0deg)";
  
    return (
      <div
        style={{
          margin: "0 auto 18px auto",
          width: "220px",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "18px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.10)",
          transform: cardTransform,
          opacity: swipeDirection ? 0.65 : 1,
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            marginBottom: "12px",
          }}
        >
          {photoUrls.length > 0 ? (
            <>
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  marginBottom: "8px",
                  backgroundColor: "#dff2ff",
                }}
              >
                <img
                  src={photoUrls[0]}
                  alt={restaurant?.displayName?.text}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
  
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                {photoUrls[1] && (
                  <div
                    style={{
                      flex: 1,
                      height: "70px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "#dff2ff",
                    }}
                  >
                    <img
                      src={photoUrls[1]}
                      alt={`${restaurant?.displayName?.text} 2`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )}
  
                {photoUrls[2] && (
                  <div
                    style={{
                      flex: 1,
                      height: "70px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "#dff2ff",
                    }}
                  >
                    <img
                      src={photoUrls[2]}
                      alt={`${restaurant?.displayName?.text} 3`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                height: "140px",
                borderRadius: "18px",
                backgroundColor: "#dff2ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "56px",
                overflow: "hidden",
              }}
            >
              🍜
            </div>
          )}
        </div>
  
        <h2
          style={{
            fontSize: "20px",
            color: "#020100",
            margin: "0 0 8px 0",
            lineHeight: "1.2",
          }}
        >
          {restaurant?.displayName?.text || "Unknown restaurant"}
        </h2>
  
        <p
          style={{
            fontSize: "13px",
            color: "#020100",
            margin: "0 0 6px 0",
            lineHeight: "1.5",
          }}
        >
          {restaurant?.formattedAddress || "No address"}
        </p>
  
        <p
          style={{
            fontSize: "13px",
            color: "#020100",
            margin: "0 0 6px 0",
          }}
        >
          Rating: {restaurant?.rating ?? "N/A"}
        </p>
  
        <p
          style={{
            fontSize: "13px",
            color: "#020100",
            margin: "0 0 6px 0",
          }}
        >
          Price: {formatPriceLevel(restaurant?.priceLevel)}
        </p>
  
        <p
          style={{
            fontSize: "13px",
            color: "#020100",
            margin: 0,
          }}
        >
          Type: {formatType(restaurant?.primaryType || restaurant?.types?.[0])}
        </p>
      </div>
    );
  }
  
  export default RestaurantCard;