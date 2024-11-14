import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    const days = [];
    const today = new Date();

    // Iterate over the next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Get day of the week: 5 = Friday, 6 = Saturday, 0 = Sunday
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
        days.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      }
    }

    return new Response(JSON.stringify(days), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
