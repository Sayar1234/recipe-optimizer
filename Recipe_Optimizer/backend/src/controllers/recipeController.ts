import { Request, Response } from "express";
import Recipe from "../models/Recipe";

export const getAllRecipes = async (_req: Request, res: Response) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};

export const getRecipeById = async (req: Request, res: Response) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ error: "Not found" });
  res.json(recipe);
};

export const toggleBookmark = async (req: Request, res: Response) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).json({ error: "Not found" });
  recipe.bookmarked = !recipe.bookmarked;
  await recipe.save();
  res.json(recipe);
};

export const getBookmarkedRecipes = async (_req: Request, res: Response) => {
  const recipes = await Recipe.find({ bookmarked: true });
  res.json(recipes);
};

export const addRecipe = async (req: Request, res: Response) => {
  try {
    const { title, ingredients, instructions, category, calories } = req.body;
    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newRecipe = new Recipe({
      title,
      ingredients: ingredients.split(",").map((i: String) => i.trim()),
      instructions,
      category,
      calories,
      image: "",
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: "Error adding recipe" });
  }
};
