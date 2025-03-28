import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Recipe } from "./RecipeDetails";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Recipe[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/recipes/bookmarks`)
      .then((res) => setBookmarks(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-700">
        Bookmarked Recipes
      </h1>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarks.map((recipe: Recipe) => (
            <Link
              key={recipe._id}
              to={`/recipe/${recipe._id}`}
              className="block bg-white rounded-xl shadow hover:shadow-md transition duration-200 border border-gray-100"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {recipe.category} · {recipe.calories} kcal
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
