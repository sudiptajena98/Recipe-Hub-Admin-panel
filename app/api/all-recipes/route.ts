
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://gopher-devourer-sake.ngrok-free.dev/api/all-recipes",
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
