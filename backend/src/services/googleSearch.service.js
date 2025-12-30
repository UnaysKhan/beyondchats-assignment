import axios from "axios";

const SERP_API_URL = "https://serpapi.com/search.json";

export const searchGoogle = async (query) => {
  try {
    const response = await axios.get(SERP_API_URL, {
      params: {
        q: query,                // search query (article title)
        engine: "google",        // use Google search
        api_key: process.env.SERPAPI_KEY,
        num: 5                   // get top 5 results
      }
    });

    const results = response.data.organic_results || [];

    // Extract only blog/article links
    const links = results
      .map(item => item.link)
      .filter(
        link =>
          link &&
          !link.includes("youtube.com") &&
          !link.includes("linkedin.com") &&
          !link.includes("facebook.com")
      )
      .slice(0, 2); // first 2 valid links

    return links;

  } catch (error) {
    console.error("Google search error:", error.message);
    return [];
  }
};
