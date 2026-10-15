
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddRecipePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const splitList = (value: FormDataEntryValue | null) =>
      String(value ?? "")
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    const recipe = {
      name: String(form.get("name") ?? "").trim(),
      ingredients: splitList(form.get("ingredients")),
      short_description: String(
        form.get("short_description") ?? ""
      ).trim(),
      rating: Number(form.get("rating") || 0),
      Prep_time_minutes: Number(form.get("Prep_time_minutes")),
      serving: Number(form.get("serving")),
      calorie: Number(form.get("calorie")),
      protein: Number(form.get("protein")),
      carbs: Number(form.get("carbs")),
      fats: Number(form.get("fats")),
      thumbnail: String(form.get("thumbnail") ?? "").trim(),
      instruction: splitList(form.get("instruction")),
    };
    try {
      const response = await fetch(
        "https://gopher-devourer-sake.ngrok-free.dev/api/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create recipe");
      }
      alert("Recipe added successfully!");
      router.push("/recipes");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500";
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Add New Recipe
      </h1>

      <p className="mb-8 text-gray-500">
        Enter the details of your new recipe.
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-6 shadow"
      >
        <div>
          <label className="mb-2 block font-semibold">
            Recipe Name
          </label>
          <input
            name="name"
            required
            className={inputClass}
            placeholder="Chicken Biryani"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Short Description
          </label>
          <textarea
            name="short_description"
            required
            className={inputClass}
            rows={3}
            placeholder="Describe your recipe..."
          />
        </div>
        <div>
          <label className="mb-2 block font-semibold">
            Ingredients
          </label>
          <textarea
            name="ingredients"
            required
            className={inputClass}
            rows={4}
            placeholder={"Basmati rice\nChicken\nSpices"}
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter each ingredient on a new line or separate them with commas.
          </p>
        </div>
        <div>
          <label className="mb-2 block font-semibold">
            Instructions
          </label>
          <textarea
            name="instruction"
            required
            className={inputClass}
            rows={5}
            placeholder={"Wash the rice\nCook the chicken\nMix and serve"}
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter each cooking step on a new line.
          </p>
        </div>
        <div>
          <label className="mb-2 block font-semibold">
            Recipe Image URL
          </label>
          <input
            name="thumbnail"
            type="url"
            required
            className={inputClass}
            placeholder="https://example.com/recipe.jpg"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold">
              Preparation Time (minutes)
            </label>
            <input
              name="Prep_time_minutes"
              type="number"
              min="1"
              required
              className={inputClass}
              placeholder="45"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Servings
            </label>
            <input
              name="serving"
              type="number"
              min="1"
              required
              className={inputClass}
              placeholder="4"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Calories
            </label>
            <input
              name="calorie"
              type="number"
              min="0"
              required
              className={inputClass}
              placeholder="550"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Protein (g)
            </label>
            <input
              name="protein"
              type="number"
              min="0"
              required
              className={inputClass}
              placeholder="32"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Carbohydrates (g)
            </label>
            <input
              name="carbs"
              type="number"
              min="0"
              required
              className={inputClass}
              placeholder="65"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Fats (g)
            </label>
            <input
              name="fats"
              type="number"
              min="0"
              required
              className={inputClass}
              placeholder="18"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Rating (0–5)
            </label>
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              defaultValue="0"
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Recipe"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/recipes")}
            className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}