import winston from "winston";
import { LogEntry } from "../types/logger.types";

/**
 * Defines a custom log format for Winston logger that includes the timestamp, log level, message, and any additional metadata.
 *
 * The format includes the following:
 * - Timestamp in the format "Do MMM, YYYY hh:mm:ss a Z"
 * - Log level
 * - Log message
 * - Any additional metadata as a JSON object, indented with a tab
 * - The stack trace if an error is logged
 *
 * This custom format is used in the Console transport of the Winston logger.
 */
const myFormat = winston.format.printf(
  ({ message, level, timestamp, splat, stack, ...meta }: LogEntry) => {
    let obj: Record<string, unknown> | undefined;

    for (const key in meta) {
      if (!obj) {
        obj = {};
      }
      obj[key] = meta[key];
    }

    return `${timestamp || new Date().toISOString()} [${level}]: ${message} ${
      obj ? "\n\t" + JSON.stringify(obj) : ""
    } ${stack ? "\n" + stack : ""}`;
  }
);
/**
 * Configures a Winston logger instance with the following settings:
 * - Log level is set to the value of the `LOG_LEVEL` environment variable, or "info" if not set.
 * - Logs are written to a file named "logs/log.log" in JSON format, with timestamps and error stack traces.
 * - Logs are also written to the console, with colorized output, timestamps in the format "Do MMM, YYYY hh:mm:ss a Z", and a custom log format that includes the timestamp, log level, message, and any additional metadata.
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new winston.transports.File({
      filename: "logs/log.log",
      format: winston.format.combine(
        winston.format.errors({
          stack: true,
        }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.errors({
          stack: true,
        }),
        winston.format.timestamp({
          format: "Do MMM, YYYY hh:mm:ss a Z",
        }),
        myFormat
      ),
    }),
  ],
});

// Log startup message
logger.info(
  `Logger started with Log Level: ${process.env.LOG_LEVEL || "info"}`
);

interface Logger {
  error: winston.LeveledLogMethod;
  warn: winston.LeveledLogMethod;
  info: winston.LeveledLogMethod;
  http: winston.LeveledLogMethod;
  verbose: winston.LeveledLogMethod;
  debug: winston.LeveledLogMethod;
  silly: winston.LeveledLogMethod;
}

export default logger as Logger;
