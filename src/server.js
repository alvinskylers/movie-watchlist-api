import express from "express";
import { config } from "dotenv";
import { connectDatabase, disconnectDatabase } from "./config/db.js";

//import routes
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js"

config();
connectDatabase();

const app = express();

//json body parser 
app.use(express.json());
app.use(express.urlencoded( {extended: true}));

//api routes
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

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