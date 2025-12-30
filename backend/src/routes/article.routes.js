import express from "express";
import { scrapeAndSaveArticles } from "../services/scraper.service.js";
import {
  createArticle,
  getArticles,
  updateArticle,
  getArticleBySlug
} from "../controllers/article.controller.js";

const router = express.Router();

router.post("/scrape", scrapeAndSaveArticles);
router.post("/", createArticle);
router.get("/", getArticles);
router.get("/slug/:slug", getArticleBySlug);
router.put("/:id", updateArticle);

export default router;
