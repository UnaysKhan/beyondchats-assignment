import axios from "axios";
import * as cheerio from "cheerio";
import slugify from "slugify";
import { prisma } from "../config/db.js";

const BASE_URL = "https://beyondchats.com";

export const scrapeAndSaveArticles = async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/blogs/`);
    const $ = cheerio.load(data);

    // Collect blog links
    const articleLinks = $("a")
      .map((_, el) => $(el).attr("href"))
      .get()
      .filter(link => link && link.startsWith("/blogs/"))
      .slice(-5);

    const savedArticles = [];

    for (let link of articleLinks) {
      // ✅ Convert relative URL to absolute URL
      const fullUrl = `${BASE_URL}${link}`;

      const articlePage = await axios.get(fullUrl);
      const $$ = cheerio.load(articlePage.data);

      const title = $$("h1").first().text().trim();
      const content = $$("article").text().trim();

      if (!title || !content) continue;

      const article = await prisma.article.create({
        data: {
          title,
          slug: slugify(title, { lower: true }),
          originalContent: content,
          sourceUrl: fullUrl,
        },
      });

      savedArticles.push(article);
    }

    res.json({
      success: true,
      count: savedArticles.length,
      articles: savedArticles,
    });

  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Scraping failed" });
  }
};
