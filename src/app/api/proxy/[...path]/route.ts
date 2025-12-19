import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://api.discountshub.co";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathArray } = await context.params;
    const path = pathArray.join("/");
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

    console.log(`[API Proxy] GET ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Disable caching in development
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `[API Proxy] Error ${response.status}: ${response.statusText}`
      );
      return NextResponse.json(
        { error: `API Error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API Proxy] Error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathArray } = await context.params;
    const path = pathArray.join("/");
    const url = `${API_BASE_URL}/${path}`;
    const body = await request.json();

    console.log(`[API Proxy] POST ${url}`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `[API Proxy] Error ${response.status}: ${response.statusText}`
      );
      return NextResponse.json(
        { error: `API Error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API Proxy] Error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}
