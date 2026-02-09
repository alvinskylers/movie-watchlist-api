import express from "express";
const app = express();

const port = 2020;

app.listen(port, () => {
    console.log({ message: `express running on port: ${port}`})
});