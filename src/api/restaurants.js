const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

export async function searchRestaurants(query) {
  const url = "https://places.googleapis.com/v1/places:searchText";

  const body = {
    textQuery: query,
    includedType: "restaurant",
    strictTypeFiltering: true,
    maxResultCount: 10,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.rating,places.types,places.primaryType,places.priceLevel,places.photos",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log("Google response:", data);
  
  
  console.log("==== TYPES DEBUG ====");
  console.log(
  (data.places || []).map(place => ({
    name: place.displayName?.text,
    types: place.types
  }))
);

  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to fetch restaurants");
  }


  const banned = ["supermarket", "grocery_store"];
  const filteredPlaces = (data.places || []).filter(place =>
    !place.types?.some(type => banned.includes(type))
  );

  console.log("Filtered places:", filteredPlaces);
  return filteredPlaces;
}