import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    calories: "",
    ingredients: "",
    instructions: "",
  });

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
        formData
      );
      if (response.status === 201) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // auto-dismiss toast

        // Optionally clear form (can be removed if not needed)
        setFormData({
          title: "",
          category: "",
          calories: "",
          ingredients: "",
          instructions: "",
        });

        // Delay navigation to show the toast (optional)
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      console.error("Failed to add recipe:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Add a New Recipe
      </h1>

      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50">
          ✅ Recipe added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            placeholder="e.g., Spaghetti Bolognese"
            className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              placeholder="e.g., Dinner"
              className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories
            </label>
            <input
              name="calories"
              type="number"
              value={formData.calories}
              placeholder="e.g., 450"
              className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            placeholder="e.g., tomatoes, garlic, pasta (comma separated)"
            className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            placeholder="Write step-by-step cooking instructions..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-200"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
