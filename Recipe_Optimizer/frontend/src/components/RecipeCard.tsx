import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  // image: string;
}

export default function RecipeCard({ id, title }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-green-700 truncate">
          {title}
        </h3>
        <Link
          to={`/recipe/${id}`}
          className="text-sm text-green-600 hover:underline"
        >
          View Full Recipe
        </Link>
      </div>
    </div>
  );
}
