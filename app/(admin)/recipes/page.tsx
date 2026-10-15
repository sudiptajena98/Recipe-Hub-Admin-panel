"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Recipe = {
  _id: string;
  name: string;
  thumbnail?: string;
  short_description?: string;
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all recipes
  useEffect(() => {
    fetch("/api/all-recipes")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Recipes error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Delete a recipe
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    try {
      const res = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      console.log("HTTP Status:", res.status);
      console.log("Backend response:", data);

      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Delete failed"
        );
      }

      setRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== id)
      );

      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete recipe. Check the browser Console.");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Recipes
        </h1>

        <Link
          href="/addrecipe"
          className="rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
        >
          + Add Recipe
        </Link>
      </div>

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-gray-500">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="overflow-hidden rounded-xl bg-white shadow"
            >
              {recipe.thumbnail && (
                <img
                  src={recipe.thumbnail}
                  alt={recipe.name}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {recipe.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {recipe.short_description}
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => {
                      window.location.href = `/recipes/${recipe._id}`;
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    View
                  </button>

                  <Link
                    href={`/recipes/${recipe._id}/edit`}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}