import { useState } from "react";

const ArticleCard = ({ article }) => {
  const [view, setView] = useState(
    article.updatedContent ? "updated" : "original"
  );

  const contentToShow =
    view === "updated" && article.updatedContent
      ? article.updatedContent
      : article.originalContent;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {article.title}
      </h2>

      {/* Tabs */}
      {article.updatedContent && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView("original")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              view === "original"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

      {/* Content */}
      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: contentToShow }}
      />

      {/* Status Badge */}
      <div className="mt-6">
        {article.status === "updated" ? (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
            AI Enhanced
          </span>
        ) : (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600">
            Original
          </span>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
