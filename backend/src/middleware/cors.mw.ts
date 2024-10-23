/**
 * CORS configuration options for allowing specified origins, methods, and credentials.
 */
export const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], 
  credentials: true,
};
