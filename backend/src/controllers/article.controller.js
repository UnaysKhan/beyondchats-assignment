import slugify from "slugify";
import { prisma } from "../config/db.js";

export const createArticle = async (req, res) => {
  try {
    const { title, originalContent, sourceUrl } = req.body;

    if (!title || !originalContent || !sourceUrl) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        originalContent,
        sourceUrl,
      },
    });

    res.status(201).json(article);
  } catch (error) {
    console.error("Create article error:", error);
    res.status(500).json({ message: "Failed to create article" });
  }
};


export const getArticles = async (_, res) => {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(articles);
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { updatedContent, references } = req.body;

  const article = await prisma.article.update({
    where: { id },
    data: {
      updatedContent,
      references,
      status: "updated"
    }
  });

  res.json(article);
};

export const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Get article by slug error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
