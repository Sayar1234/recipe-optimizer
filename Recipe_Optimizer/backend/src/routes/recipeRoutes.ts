import express from "express";
import asyncHandler from "../utils/asyncHandler";
import Recipe from "../models/Recipe";
import {
  getAllRecipes,
  getRecipeById,
  toggleBookmark,
  addRecipe,
  getBookmarkedRecipes,
} from "../controllers/recipeController";
import upload from "../uploadMiddleware";

const router = express.Router();

router.get("/", asyncHandler(getAllRecipes));
router.get("/bookmarks", asyncHandler(getBookmarkedRecipes));
router.post("/", asyncHandler(addRecipe));
router.get(
  "/search",
  asyncHandler(async (req, res) => {
    const query = req.query.q?.toString().toLowerCase() || "";

    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { ingredients: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
    });

    res.json(recipes);
  })
);
router.get("/:id", asyncHandler(getRecipeById));
router.post("/add", upload.single("image"), asyncHandler(addRecipe));
router.post("/:id/bookmark", asyncHandler(toggleBookmark));

export default router;
