import app from "./";
import logger from "./utils/logger.utils";
import connect from "./config/db.config";

const PORT = process.env.PORT || 9001;

/**
 * Starts the server and listens on the specified port.
 * Connects to the database before starting the server.
 */
connect().then((database) => {
  app.listen(PORT, () => {
    logger.info("Server started at " + PORT);
  });
});
