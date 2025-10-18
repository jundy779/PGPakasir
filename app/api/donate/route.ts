import { NextRequest, NextResponse } from "next/server";

const SLUG = process.env.NEXT_PUBLIC_PAKASIR_SLUG!;
const REDIRECT = process.env.NEXT_PUBLIC_REDIRECT_URL!; 

export async function POST(req: NextRequest) {
  const { amount, order_id } = await req.json();

  if (!amount || Number(amount) <= 0)
    return NextResponse.json({ error: "Amount harus > 0" }, { status: 400 });

  const payUrl =
    `https://app.pakasir.com/pay/${SLUG}/${amount}?order_id=${order_id}&redirect=${encodeURIComponent(REDIRECT)}`;

  return NextResponse.json({ pay_url: payUrl });
}