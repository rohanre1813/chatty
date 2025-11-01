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

// -------------------------------
// Configuration
// -------------------------------
const PORT = process.env.PORT || 10000;
const __dirname = path.resolve();

// -------------------------------
// Middleware
// -------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://chatty-5mp8.vercel.app", // ✅ frontend on Vercel
      "http://localhost:5173",          // ✅ for local development
    ],
    credentials: true,
  })
);

// -------------------------------
// Debug Info (optional)
console.log("Mongo URI:", process.env.MONGO_URI);
console.log("PORT:", PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

// -------------------------------
// Routes
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// -------------------------------
// Serve Frontend in Production
// -------------------------------
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// -------------------------------
// Start Server after DB Connection
// -------------------------------
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server is running on PORT: ${PORT}`);
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

