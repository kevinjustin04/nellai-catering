import { Handlers } from "$fresh/server.ts";
import { menuCollection } from "../../utils/db.ts";

export const handler: Handlers = {
  async GET() {
    const menuItems = await menuCollection.find().toArray();
    return new Response(JSON.stringify(menuItems), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
