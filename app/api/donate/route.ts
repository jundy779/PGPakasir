import { NextRequest, NextResponse } from "next/server";

const SLUG = process.env.NEXT_PUBLIC_PAKASIR_SLUG;
const REDIRECT = process.env.NEXT_PUBLIC_REDIRECT_URL;

export async function POST(req: NextRequest) {
  try {
    // Validasi environment variables
    if (!SLUG || !REDIRECT) {
      console.error("Missing environment variables:", { SLUG: !!SLUG, REDIRECT: !!REDIRECT });
      return NextResponse.json(
        { error: "Konfigurasi server tidak lengkap" },
        { status: 500 }
      );
    }

    const { amount, order_id } = await req.json();

    // Validasi input
    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Amount harus lebih besar dari 0" },
        { status: 400 }
      );
    }

    if (Number(amount) < 2000) {
      return NextResponse.json(
        { error: "Minimum donasi adalah Rp 2.000" },
        { status: 400 }
      );
    }

    if (!order_id || typeof order_id !== "string") {
      return NextResponse.json(
        { error: "Order ID tidak valid" },
        { status: 400 }
      );
    }

    const payUrl = `https://app.pakasir.com/pay/${SLUG}/${amount}?order_id=${encodeURIComponent(order_id)}&redirect=${encodeURIComponent(REDIRECT)}`;

    return NextResponse.json({ pay_url: payUrl });
  } catch (error) {
    console.error("Error in /api/donate:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}