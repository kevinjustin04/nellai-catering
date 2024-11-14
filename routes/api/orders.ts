// routes/api/orders.ts
import { Handlers } from "$fresh/server.ts";
import { ordersCollection } from "../../utils/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const orderData = await req.json();
    const insertId = await ordersCollection.insertOne(orderData);

    return new Response(
      JSON.stringify({ success: true, orderId: insertId }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
