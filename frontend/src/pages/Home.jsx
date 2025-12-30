import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get("/articles").then(res => setArticles(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-6 py-12">
      <h1 className="text-5xl font-extrabold text-white text-center mb-14">
        BeyondChats Blogs
      </h1>

      {/* GRID CONTAINER */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(article => (
          <Link
            key={article.id}
            to={`/blogs/${article.slug}`}
            className="block bg-white/90 rounded-2xl p-6 shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {article.title}
            </h2>

            <p className="text-sm font-medium text-indigo-600">
              {article.status === "updated" ? "AI Enhanced" : "Original"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
