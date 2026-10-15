"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to logout from Recipe Hub Admin?"
    );

    if (confirmed) {
      router.push("/login");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-10 w-10 text-orange-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M18 15l3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-gray-800">
          Ready to Leave?
        </h1>

        <p className="mb-8 leading-7 text-gray-500">
          Thank you for managing Recipe Hub! Are you sure you want to
          logout from your admin account?
        </p>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:bg-orange-700 hover:shadow-lg active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M18 15l3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Logout
        </button>

        <p className="mt-5 text-sm text-gray-400">
          Your Recipe Hub journey is always welcome.
        </p>
      </div>
    </div>
  );
}