import express, { Application, json } from "express";
import "express-async-errors";
import handleError from "./errors/handlerError";
import "dotenv/config";
import cors from "cors";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/authSessions.routes";

const app: Application = express();
app.use(json());
app.use(cors());

const API_DETAIL: string = process.env.API_DETAIL || "";

app.use(`${API_DETAIL}/auth`, authRoutes);
app.use(`${API_DETAIL}/users`, usersRoutes);

app.use(handleError);

export default app;
