import { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

interface RecipeSummary {
  _id: string;
  title: string;
  // image: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RecipeSummary[]>([]);

  const handleSearch = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/recipes/search?q=${query}`
    );
    setResults(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Search Recipes</h2>

      <div className="flex flex-col sm:flex-row gap-3 items-center mb-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search by ingredients or dish name"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-sm transition duration-200 w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {results.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              id={recipe._id}
              title={recipe.title}
              // image={recipe.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No recipes found. Try searching above.</p>
      )}
    </div>
  );
}
