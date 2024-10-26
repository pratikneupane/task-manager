import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import { corsOption } from "./middleware/cors.middleware";
import routes from "./routes/index.routes"

const app = express();

app.use(cors(corsOption));

app.use(cookieParser());

app.use(express.json());

app.use(routes);

export default app;
