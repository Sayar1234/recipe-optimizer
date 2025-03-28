import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Recipe } from "./RecipeDetails";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/recipes`).then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "vegetarian":
        return "bg-green-100 text-green-800";
      case "non-vegetarian":
        return "bg-red-100 text-red-800";
      case "vegan":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 text-center py-14 px-6 mb-12 rounded-b-3xl shadow-inner">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">Deliciously Personalized</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover healthy, custom-fit recipes tailored just for your taste and diet.
        </p>
      </div>

      {/* Recipes Grid */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 px-6">🍽️ All Recipes</h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 pb-16">
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            to={`/recipe/${recipe._id}`}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group p-5 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-green-700 transition">
                {recipe.title}
              </h2>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Ingredients:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 max-h-24 overflow-y-auto">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Instructions:</p>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  {recipe.instructions}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeClass(
                  recipe.category
                )}`}
              >
                {recipe.category}
              </span>
              <span>{recipe.calories} kcal</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
