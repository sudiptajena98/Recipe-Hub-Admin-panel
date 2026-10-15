
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalFavourites: 0,
  });

  const [recipes, setRecipes] = useState<any[]>([]);
  useEffect(() => {
    fetch(
  "https://gopher-devourer-sake.ngrok-free.dev/api/dashboard-stats",
  {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }
)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dashboard data:", data);
        setStats(data);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
      });
   fetch(
  "https://gopher-devourer-sake.ngrok-free.dev/api/all-recipes",
  {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }
)
      .then((res) => res.json())
      .then((data) => {
        console.log("All recipes:", data);
        setRecipes( data );
      })
      .catch((error) => {
        console.error("Recipes error:", error);
      });
  }, []);

  return (
        <section className="flex-1 p-8">
          <h2 className="mb-6 text-3xl font-bold">
            Dashboard Overview
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-gray-500">
                Total Recipes
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {stats.totalRecipes}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-gray-500">
                Total Users
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {stats.totalUsers}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="text-gray-500">
                Favorites
              </h3>

              <p className="mt-2 text-3xl font-bold">
                {stats.totalFavourites}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-6 text-2xl font-bold">
              All Recipes
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="overflow-hidden rounded-xl bg-white shadow"
                >
                  <img
                    src={recipe.thumbnail}
                    alt={recipe.name}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800">
                      {recipe.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {recipe.short_description}
                    </p>

                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                      <span>
                        ⏱ {recipe.Prep_time_minutes} min
                      </span>

                      <span>
                        ⭐ {recipe.rating}
                      </span>

                      <span>
                        🔥 {recipe.calorie} cal
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
}

