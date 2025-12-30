import dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is NOT loaded in script");
  process.exit(1);
}

console.log("✅ GEMINI_API_KEY loaded for Phase 2");


import axios from "axios";
import { searchGoogle } from "../src/services/googleSearch.service.js";
import { scrapeReferenceArticle } from "../src/services/referenceScraper.service.js";
import { rewriteWithGemini } from "../src/services/geminiRewrite.service.js";

const BACKEND_URL = "http://localhost:5000";

const updateArticles = async () => {
  try {
    console.log("🚀 Starting Phase 2 article updater...\n");

    // 1️⃣ Fetch all articles
    const { data: articles } = await axios.get(`${BACKEND_URL}/articles`);

    for (const article of articles) {
      if (article.status === "updated") {
        console.log(`⏭️ Skipping already updated: ${article.title}`);
        continue;
      }

      console.log(`\n✏️ Updating article: ${article.title}`);

      // 2️⃣ Google search
      const referenceLinks = await searchGoogle(article.title);

      if (referenceLinks.length === 0) {
        console.warn("⚠️ No reference links found, skipping");
        continue;
      }

      // 3️⃣ Scrape reference articles
      const referenceContents = [];

      for (const link of referenceLinks) {
        const content = await scrapeReferenceArticle(link);
        if (content) referenceContents.push(content);
      }

      if (referenceContents.length === 0) {
        console.warn("⚠️ No reference content scraped, skipping");
        continue;
      }

      // 4️⃣ Gemini rewrite
      const updatedHtml = await rewriteWithGemini({
        title: article.title,
        originalContent: article.originalContent,
        referenceContents,
      });

      if (!updatedHtml) {
        console.warn("⚠️ Gemini failed, skipping");
        continue;
      }

      // 5️⃣ Update article via API
      await axios.put(`${BACKEND_URL}/articles/${article.id}`, {
        updatedContent: updatedHtml,
        references: referenceLinks,
      });

      console.log("✅ Article updated successfully");
    }

    console.log("\n🎉 Phase 2 completed successfully");

  } catch (error) {
    console.error("❌ Phase 2 updater failed:", error.message);
  }
};

updateArticles();
