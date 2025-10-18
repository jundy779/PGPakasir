import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Validasi amount & order_id di DB kalo perlu
  console.log("Webhook received:", body);

  // TODO: Simpan ke DB atau update status donasi

  return new Response("OK", { status: 200 });
}