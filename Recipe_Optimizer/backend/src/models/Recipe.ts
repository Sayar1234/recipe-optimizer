import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  category: String,
  calories: Number,
  image: String,
  bookmarked: { type: Boolean, default: false },
});

export default mongoose.model("Recipe", recipeSchema);