import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.33.0/mod.ts";

const client = new MongoClient();
await client.connect("mongodb://localhost:27017"); // Replace with MongoDB Atlas URI if using cloud

const db: Database = client.database("nellaiCatering"); // Replace with your desired database name

// Collections
export const menuCollection = db.collection("menu");
export const ordersCollection = db.collection("orders");
