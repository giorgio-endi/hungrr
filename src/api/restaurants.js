const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

export async function searchRestaurants(query) {
  const url = "https://places.googleapis.com/v1/places:searchText";

  const body = {
    textQuery: query,
    includedType: "restaurant",
    maxResultCount: 10,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.rating",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log("Google response:", data);

  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to fetch restaurants");
  }

  return data.places || [];
}