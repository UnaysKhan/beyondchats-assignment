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

      <div className="max-w-4xl mx-auto space-y-6">
        {articles.map(article => (
          <Link
            key={article.id}
            to={`/blogs/${article.slug}`}
            className="block bg-white/90 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              {article.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              {article.status === "updated" ? "AI Enhanced" : "Original"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
