import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export type Recipe = {
  _id: string;
  title: string;
  category: string;
  calories: number;
  ingredients: string[];
  instructions: string;
  bookmarked: boolean;
};

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}`
        );
        setRecipe(res.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleBookmarkToggle = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}/bookmark`
      );
      // Update recipe's bookmark state
      if (recipe) {
        setRecipe({ ...recipe, bookmarked: res.data.bookmarked });
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!recipe) return <div className="p-4 text-red-500">Recipe not found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        <button
          onClick={handleBookmarkToggle}
          className={`px-4 py-2 rounded ${
            recipe.bookmarked ? "bg-yellow-400" : "bg-gray-300"
          }`}
        >
          {recipe.bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        {recipe.category} · {recipe.calories} kcal
      </p>
      <h2 className="text-xl font-semibold mt-4">Ingredients</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-4">Instructions</h2>
      <p className="whitespace-pre-line">{recipe.instructions}</p>
    </div>
  );
}
