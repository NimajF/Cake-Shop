import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;

  const dbUrl = process.env.MONGODB_URL || process.env.mongoUrl;

  const db = await connect(dbUrl);
  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
}

connection.on("connected", () => {
  console.log("Database connected");
});

connection.on("error", (err) => {
  console.log("Database error", err);
});
