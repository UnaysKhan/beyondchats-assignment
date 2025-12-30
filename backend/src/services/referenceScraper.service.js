import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeReferenceArticle = async (url) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const $ = cheerio.load(data);

    $("script, style, nav, footer, header, iframe").remove();

    let content =
      $("article").text() ||
      $("main").text() ||
      $("body").text();

    content = content.replace(/\s+/g, " ").trim();

    return content.slice(0, 4000);

  } catch (error) {
    if (error.response?.status === 403) {
      console.warn(`⚠️ Skipped (403 blocked): ${url}`);
    } else {
      console.warn(`⚠️ Scrape failed: ${url}`);
    }
    return "";
  }
};
