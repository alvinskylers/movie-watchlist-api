import express from "express";
import { config } from "dotenv";

//import routes
import movieRouter from "./routes/movieRoutes.js"
import { connectDatabase } from "./config/db.js";

config();
connectDatabase();

const app = express();

//api routes
app.use('/movies', movieRouter);

const port = 2020;
app.listen(port, () => {
    console.log({ message: `express running on port: ${port}`})
});

//handles unhandled promises rejection
process.on("unhandledRejection", async (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDatabase();
        process.exit(1);
    });
});

//handles uncaught exceptions
process.on("uncaughtExeption", async (err) => {
    console.error("Uncaught Exeption:", err);
    await disconnectDatabase();
    process.exit(1);
});

//graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM recieved shutting down gracefully.");
    server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
    });
});