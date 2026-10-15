
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type RecipeForm = {
  name: string;
  ingredients: string;
  short_description: string;
  rating: string;
  Prep_time_minutes: string;
  serving: string;
  calorie: string;
  protein: string;
  carbs: string;
  fats: string;
  thumbnail: string;
  instruction: string;
};

const initialForm: RecipeForm = {
  name: "",
  ingredients: "",
  short_description: "",
  rating: "0",
  Prep_time_minutes: "",
  serving: "",
  calorie: "",
  protein: "",
  carbs: "",
  fats: "",
  thumbnail: "",
  instruction: "",
};

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<RecipeForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const response = await fetch(
          `https://gopher-devourer-sake.ngrok-free.dev/api/details/${id}`,
          {
            headers: {
      "ngrok-skip-browser-warning": "true",
    },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load recipe");
        }

        const data = await response.json();
        const recipe = data.recipe_detail ?? data.recipe ?? data;

        setForm({
          name: recipe.name ?? "",
          ingredients: (recipe.ingredients ?? []).join("\n"),
          short_description: recipe.short_description ?? "",
          rating: String(recipe.rating ?? 0),
          Prep_time_minutes: String(recipe.Prep_time_minutes ?? ""),
          serving: String(recipe.serving ?? ""),
          calorie: String(recipe.calorie ?? ""),
          protein: String(recipe.protein ?? ""),
          carbs: String(recipe.carbs ?? ""),
          fats: String(recipe.fats ?? ""),
          thumbnail: recipe.thumbnail ?? "",
          instruction: (recipe.instruction ?? []).join("\n"),
        });
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Failed to load recipe"
        );
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSave(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setSaving(true);

    const updatedRecipe = {
      name: form.name.trim(),
      ingredients: form.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      short_description: form.short_description.trim(),
      rating: Number(form.rating),
      Prep_time_minutes: Number(form.Prep_time_minutes),
      serving: Number(form.serving),
      calorie: Number(form.calorie),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fats: Number(form.fats),
      thumbnail: form.thumbnail.trim(),
      instruction: form.instruction
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch(
        `https://gopher-devourer-sake.ngrok-free.dev/api/update/${id}`,
        
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(updatedRecipe),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update recipe");
      }

      alert("Recipe updated successfully!");
      router.push("/recipes");
      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to update recipe"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-orange-500";

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow md:p-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Edit Recipe
      </h1>

      <p className="mb-8 text-gray-500">
        Update all recipe information below.
      </p>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="mb-2 block font-semibold">
            Recipe Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Short Description
          </label>
          <textarea
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            required
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Thumbnail URL
          </label>
          <input
            name="thumbnail"
            type="url"
            value={form.thumbnail}
            onChange={handleChange}
            required
            className={inputClass}
          />

          {form.thumbnail && (
            <img
              src={form.thumbnail}
              alt="Recipe thumbnail preview"
              className="mt-4 h-48 w-full rounded-lg object-cover"
            />
          )}
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Ingredients (one per line)
          </label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
            rows={5}
            placeholder={"Rice\nChicken\nSpices"}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Instructions (one step per line)
          </label>
          <textarea
            name="instruction"
            value={form.instruction}
            onChange={handleChange}
            required
            rows={6}
            placeholder={"Wash the rice\nCook the chicken\nServe hot"}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-2 block font-semibold">
              Rating
            </label>
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Prep Time (minutes)
            </label>
            <input
              name="Prep_time_minutes"
              type="number"
              min="1"
              value={form.Prep_time_minutes}
              onChange={handleChange}
              required
              className={inputClass}
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
              value={form.serving}
              onChange={handleChange}
              required
              className={inputClass}
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
              value={form.calorie}
              onChange={handleChange}
              required
              className={inputClass}
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
              value={form.protein}
              onChange={handleChange}
              required
              className={inputClass}
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
              value={form.carbs}
              onChange={handleChange}
              required
              className={inputClass}
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
              value={form.fats}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
          >
           Save change
          </button>

          <button
            type="button"
            onClick={() => router.push("/recipes")}
            className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}