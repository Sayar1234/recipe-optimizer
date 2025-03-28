import { MongoClient } from "mongodb";
import fs from "fs";

const uri =
  "mongodb+srv://sayarchakraborty2022:irut2DnRPKgiOxLT@recipecluster.e4uphvh.mongodb.net/?retryWrites=true&w=majority&appName=RecipeCluster";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("recipe_optimizer");
    const collection = db.collection("recipes");

    const rawData = fs.readFileSync("./updated_recipes.json", "utf8");
    const recipes = JSON.parse(rawData);

    await collection.insertMany(recipes);
    console.log("✅ Recipes imported successfully!");
  } catch (err) {
    console.error("❌ Failed to import recipes:", err);
  } finally {
    await client.close();
  }
}

run();
