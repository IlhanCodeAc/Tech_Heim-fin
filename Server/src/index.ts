import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import path from "path";
import { createServer } from "node:http";

import locationRoutes from "./routes/location";
import categoryRoutes from "./routes/category";
import graphicscardRoutes from "./routes/graphicscard";
import capacityRoutes from "./routes/capacity";
import displayRoutes from "./routes/display";
import brandRoutes from "./routes/brand";
import ramRoutes from "./routes/ram";
import processorRoutes from "./routes/processor";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import reviewRoutes from "./routes/review";
import conversationRoutes from "./routes/conversation";

import { connectSocket } from "./socket";
import "./auth/local-strategy";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://ilhanma:<db_password>@techheim.kbe1z.mongodb.net/?retryWrites=true&w=majority&appName=TechHeim";

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
    secret: process.env.SESSION_SECRET || "default_secret", 
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
app.use("/graphicscard", graphicscardRoutes);
app.use("/capacity", capacityRoutes);
app.use("/ram", ramRoutes);
app.use("/display", displayRoutes);
app.use("/brand", brandRoutes);
app.use("/processor", processorRoutes);
app.use("/category", categoryRoutes);
app.use("/location", locationRoutes);
app.use("/product", productRoutes);
app.use("/review", reviewRoutes);
app.use("/conversation", conversationRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function connecToDb() {
  await mongoose.connect(
    `mongodb+srv://ilhanma:5245344aa@techheim.kbe1z.mongodb.net/?retryWrites=true&w=majority&appName=TechHeim`
  );
}
connecToDb()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
