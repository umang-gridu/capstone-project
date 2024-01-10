import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Imports
import userRouter from "./routes/user.routes.js";
import userFileRouter from "./routes/userFile.routes.js";

// Routes Delarations
app.use("/", userFileRouter);
app.use("/api/users", userRouter);

export { app };
