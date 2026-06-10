import { NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  clientId: z.string(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().min(1) })),
  paymentMethod: z.enum(["WAVE", "ORANGE_MONEY", "CASH_ON_DELIVERY"]),
  address: z.string().min(3)
});

export async function POST(request: Request) {
  const payload = orderSchema.parse(await request.json());
  return NextResponse.json({
    code: `KMK-${Date.now().toString().slice(-6)}`,
    status: "PENDING",
    ...payload
  }, { status: 201 });
}
