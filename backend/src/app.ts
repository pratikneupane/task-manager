import app from "./";
import logger from "./utils/logger.util";

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  logger.info("Server started at " + PORT);
  logger.error("Error logged");
  logger.warn("Warn logged");
  logger.info("Info logged");
  logger.debug("Debug logged");
});
