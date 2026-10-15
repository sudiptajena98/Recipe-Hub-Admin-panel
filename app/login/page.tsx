"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function login() {
  const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const handleLogin = async () => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (data.success) {
    router.push("/dashboard");
  } else {
    setError(data.message);
  }
};
  return (
    <main className="min-h-screen flex bg-white">
      <div className="hidden md:block md:w-1/2">
        <img
          src="/recipe.jpeg"
          alt="Recipe"
          className="h-screen w-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 relative  p-8 flex items-center justify-center">
        <div className="w-full max-w-md ">
          <h1 className="text-gray-900 text-6xl text-right">RECIPE-HUB</h1>
          <h1 className="text-3xl font-bold text-gray-900 mt-20 ">
           👋 Welcome to  Admin Login
          </h1>
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 ">
              Email
            </label>
          <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
/>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none "
            />
          </div>
      <button
  onClick={handleLogin}
  className="mt-6 w-full rounded-lg bg-orange-600 py-3 font-semibold text-white"
>
  Login
</button>
        </div>
      </div>

    </main>
  );
}