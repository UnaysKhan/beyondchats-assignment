import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

export default function BlogDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [view, setView] = useState("updated"); // default

  useEffect(() => {
    api.get(`/articles/slug/${slug}`).then(res => {
      setArticle(res.data);
      if (!res.data.updatedContent) {
        setView("original");
      }
    });
  }, [slug]);

  if (!article) {
    return (
      <p className="text-center mt-20 text-lg">Loading...</p>
    );
  }

  const content =
    view === "updated" && article.updatedContent
      ? article.updatedContent
      : article.originalContent;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="text-blue-600 font-medium mb-6 inline-block"
        >
          ← Back to blogs
        </Link>

        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
          {article.title}
        </h1>

        {/* TOGGLE BUTTONS */}
        {article.updatedContent && (
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setView("original")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                view === "original"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Original
            </button>

            <button
              onClick={() => setView("updated")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                view === "updated"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              AI Updated
            </button>
          </div>
        )}

        {/* CONTENT */}
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* REFERENCES */}
        {view === "updated" && article.references?.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold mb-3">
              References
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {article.references.map((ref, i) => (
                <li key={i}>
                  <a
                    href={ref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
