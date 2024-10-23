import mongoose from "mongoose";
import Logger from "../utils/logger.utils";

/**
 * Sets mongoose to allow strict queries.
 * @name strictQuery
 * @memberof mongoose
 * @type {boolean}
 * @default false
 */
mongoose.set("strictQuery", false);

const connect = async (): Promise<void> => {
  const url: string = process.env.MONGODB_URL || "mongodb://localhost:27017";
  
  try {
    await mongoose.connect(url);
    Logger.info("Database connected");
  } catch (err) {
    Logger.error("Error connecting to database", { error: err });
  }
};

export default connect;
