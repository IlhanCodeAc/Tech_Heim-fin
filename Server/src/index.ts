import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import path from "path";
import { createServer } from "node:http";

import reservationRoutes from "./routes/reservation";
import locationRoutes from "./routes/location";
import categoryRoutes from "./routes/category";
import authRoutes from "./routes/auth";
import rentRoutes from "./routes/rent";
import reviewRoutes from "./routes/review";
import conversationRoutes from "./routes/conversation";

import { connectSocket } from "./socket";
import "./auth/local-strategy";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
connectSocket(server);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/location", locationRoutes);
app.use("/rent", rentRoutes);
app.use("/reservation", reservationRoutes);
app.use("/review", reviewRoutes);
app.use("/conversation", conversationRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function connecToDb() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kqwzu.mongodb.net/rent-a-car?retryWrites=true&w=majority&appName=Cluster0`
  );
}
connecToDb()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
