import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const response = await fetch(
      `https://gopher-devourer-sake.ngrok-free.dev/api/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Delete API error:", error);

    return NextResponse.json(
      { message: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
