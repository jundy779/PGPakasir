import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi body structure
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // Validasi field yang diperlukan
    const { amount, order_id, status, project } = body;

    if (!amount || !order_id || !status) {
      console.warn("Webhook missing required fields:", { amount, order_id, status });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Validasi webhook signature dari Pakasir jika tersedia
    // const signature = req.headers.get("x-pakasir-signature");
    // if (!verifySignature(body, signature)) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // Validasi project slug jika perlu
    const expectedSlug = process.env.NEXT_PUBLIC_PAKASIR_SLUG;
    if (expectedSlug && project && project !== expectedSlug) {
      console.warn(`Webhook project mismatch: expected ${expectedSlug}, got ${project}`);
    }

    console.log("Webhook received:", {
      amount,
      order_id,
      status,
      payment_method: body.payment_method,
      completed_at: body.completed_at,
    });

    // TODO: Simpan ke DB atau update status donasi
    // Contoh:
    // await db.donations.update({
    //   where: { order_id },
    //   data: { status, completed_at: new Date(body.completed_at) }
    // });

    // TODO: Kirim notifikasi (email, Telegram, dll)
    // if (status === "completed") {
    //   await sendNotification({ amount, order_id, name: body.name, message: body.message });
    // }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}