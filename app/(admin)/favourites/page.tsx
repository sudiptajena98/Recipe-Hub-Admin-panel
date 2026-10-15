
"use client";
import { useEffect, useState } from "react";
type Favourite = {
  _id: string;
  userId: string;
  recipeId: string;
  title: string;
  image?: string;
  cookTime?: string | number;
  serving?: string | number;
  description?: string;
};

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFavourite, setSelectedFavourite] =
    useState<Favourite | null>(null);

  useEffect(() => {
    fetch("https://gopher-devourer-sake.ngrok-free.dev/api/all-favourites",
      {headers: {
      "ngrok-skip-browser-warning": "true",
    },}
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch favourites");
        }
        return res.json();
      })
      .then((data) => setFavourites(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (item: Favourite) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${item.title} from this user's favourites?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://gopher-devourer-sake.ngrok-free.dev/api/delete-favourites/${encodeURIComponent(item.userId)}/${encodeURIComponent(item.recipeId)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete favourite");
      }

      setFavourites((prev) =>
        prev.filter((favourite) => favourite._id !== item._id)
      );

      if (selectedFavourite?._id === item._id) {
        setSelectedFavourite(null);
      }
    } catch (error) {
      console.error(error);
      window.alert("Could not delete favourite. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading user favourites...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">User Favourites</h1>

      <p className="mt-2 text-gray-600">
        Total favourite records: {favourites.length}
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Recipe</th>
              <th className="p-4">User ID</th>
              <th className="p-4">Recipe ID</th>
              <th className="p-4">Cook Time</th>
              <th className="p-4">Servings</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {favourites.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    )}
                    <span className="font-medium">{item.title}</span>
                  </div>
                </td>

                <td className="p-4">{item.userId}</td>
                <td className="p-4">{item.recipeId}</td>
                <td className="p-4">{item.cookTime || "N/A"}</td>
                <td className="p-4">{item.serving || "N/A"}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedFavourite(item)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {favourites.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No user favourites found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedFavourite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold">
              Favourite Details
            </h2>

            {selectedFavourite.image && (
              <img
                src={selectedFavourite.image}
                alt={selectedFavourite.title}
                className="mt-4 h-56 w-full rounded-lg object-cover"
              />
            )}

            <div className="mt-4 space-y-2">
              <p>
                <strong>Recipe:</strong> {selectedFavourite.title}
              </p>
              <p>
                <strong>User ID:</strong> {selectedFavourite.userId}
              </p>
              <p>
                <strong>Recipe ID:</strong> {selectedFavourite.recipeId}
              </p>
              <p>
                <strong>Cook Time:</strong>{" "}
                {selectedFavourite.cookTime || "N/A"}
              </p>
              <p>
                <strong>Servings:</strong>{" "}
                {selectedFavourite.serving || "N/A"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedFavourite.description || "N/A"}
              </p>
            </div>

            <button
              onClick={() => setSelectedFavourite(null)}
              className="mt-6 rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}