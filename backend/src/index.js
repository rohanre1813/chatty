import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chatty-5mp8.vercel.app", // your frontend URL
    credentials: true,
  })
);

console.log("Mongo URI:", process.env.MONGO_URI);
console.log("PORT:", PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ❌ Remove or comment out any frontend serving code
// app.use(express.static(path.join(__dirname, "../frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("✅ Server is running on PORT:", PORT);
  });
});


// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import path from "path";

// import { connectDB } from "./lib/db.js";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./lib/socket.js";



// const PORT = process.env.PORT;
// const __dirname = path.resolve();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "https://chatty-5mp8.vercel.app",
//     credentials: true,
//   })
// );
// console.log("Mongo URI:", process.env.MONGO_URI);
// console.log("PORT:", process.env.PORT);

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// /*if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }*/

// connectDB().then(() => {
//   // Then start the server
//   server.listen(PORT, () => {
//     console.log("Server is running on PORT:", PORT);
//   });
//   });

