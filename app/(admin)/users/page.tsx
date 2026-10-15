
"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://gopher-devourer-sake.ngrok-free.dev/api/dashboard-stats",{
      headers: {
      "ngrok-skip-browser-warning": "true",
    },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Users
      </h1>

      <p className="mt-2 text-gray-500">
        View users registered with Clerk.
      </p>

      <div className="mt-6 max-w-sm rounded-xl bg-white p-6 shadow-md">
        <p className="text-sm text-gray-500">
          Total Users
        </p>

        <p className="mt-2 text-3xl font-bold text-orange-600">
          {loading ? "..." : totalUsers}
        </p>
      </div>

      {loading ? (
        <p className="mt-6">Loading users...</p>
      ) : error ? (
        <p className="mt-6 text-red-600">{error}</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-md">
          <table className="w-full text-left">
            <thead className="bg-orange-100 text-gray-700">
              <tr>
                <th className="p-4">No.</th>
                <th className="p-4">User Name</th>
                <th className="p-4">Email Address</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-200 hover:bg-orange-50"
                  >
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4 font-medium text-gray-800">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
