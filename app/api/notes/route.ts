import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, tag } = body;

    const created = {
      id: Date.now().toString(),
      title: title ?? "",
      content: content ?? "",
      tag: tag ?? "Todo",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("API create note error:", err);
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
