"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
type Recipe = {
_id: string;
name: string;
thumbnail?: string;
short_description?: string;
ingredients?: string[];
instructions?: string[];
Prep_time_minutes?: number;
serving?: number;
rating?: number;
calories?: number;
protein?: number;
carbs?: number;
fats?: number;
};
export default function RecipeDetails() {
const { id } = useParams<{ id: string }>();
const [recipe, setRecipe] = useState<Recipe | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch(`https://gopher-devourer-sake.ngrok-free.dev/api/details/${id}`,
  { headers: {
          "ngrok-skip-browser-warning": "true",
        }}
)
.then((res) => {
if (!res.ok) {
throw new Error("Failed to fetch recipe details");
}
return res.json();
})
.then((data) => {
setRecipe(data.recipe_detail ?? data);
})
.catch((error) => {
console.error("Recipe details error:", error);
})
.finally(() => setLoading(false));
}, [id]);

if (loading) return <p>Loading recipe details...</p>;

if (!recipe) return <p>Recipe not found.</p>;

return ( <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow"> <Link
     href="/recipes"
     className="text-orange-600 hover:underline"
   >
← Back to Recipes </Link>
  {recipe.thumbnail && (
    <img
      src={recipe.thumbnail}
      alt={recipe.name}
      className="mt-6 h-72 w-full rounded-xl object-cover"
    />
  )}
  <h1 className="mt-6 text-3xl font-bold">{recipe.name}</h1>
  <p className="mt-3 text-gray-600">
    {recipe.short_description}
  </p>
  <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
    <p>⏱️ Prep time: {recipe.Prep_time_minutes ?? "N/A"} min</p>
    <p>⭐ Rating: {recipe.rating ?? "N/A"}</p>
    <p>🍽️ Servings: {recipe.serving ?? "N/A"}</p>
    <p>🔥 Calories: {recipe.calories ?? "N/A"}</p>
  </div>

  <h2 className="mt-8 text-xl font-bold">Ingredients</h2>
  {recipe.ingredients?.length ? (
    <ul className="mt-3 list-disc space-y-2 pl-6">
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
  ) : (
    <p className="mt-2 text-gray-500">No ingredients available.</p>
  )}

  <h2 className="mt-8 text-xl font-bold">Instructions</h2>
  {recipe.instructions?.length ? (
    <ol className="mt-3 list-decimal space-y-2 pl-6">
      {recipe.instructions.map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
    </ol>
  ) : (
    <p className="mt-2 text-gray-500">No instructions available.</p>
  )}
</div>
);
}
