import express from "express";
import "express-async-errors";
import handleError from "./errors/handlerError";
import "dotenv/config";
import cors from "cors";
import usersRoutes from "./routes/users.routes";

const app = express();
app.use(express.json());
app.use(cors());

const API_DETAIL = process.env.API_DETAIL || "/api/v1";

app.use(`${API_DETAIL}/users`, usersRoutes);

app.use(handleError);

export default app;
