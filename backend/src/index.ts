import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import { corsOption } from "./middleware/cors.middleware";
import routes from "./routes/index.routes";
import errorHandler from "./middleware/errorHandler.middleware";
import { generateDocumentation } from "./utils/generateDocs.utils";
import { logRoutes } from "./utils/routeLogger.utils";

const app = express();

app.use(cors(corsOption));

app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.use(errorHandler);

if (process.env.NODE_ENV === "development") {
  logRoutes(app);
}

if (process.env.NODE_ENV === "development") {
  generateDocumentation(app);
}

export default app;
