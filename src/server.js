import express from "express";
const app = express();

import movieRouter from "./routes/movieRoutes.js"

app.use('/movies', movieRouter);

const port = 2020;
app.listen(port, () => {
    console.log({ message: `express running on port: ${port}`})
});