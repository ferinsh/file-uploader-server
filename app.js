const express = require("express");
const dotenv = require("dotenv");

dotenv.config()

const readFilesRouter = require("./routes/readFilesRouter")
const createFilesRouter = require("./routes/createFileRouter")

const app = express();

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
})

app.use("/createFiles", createFilesRouter)
app.use("/readFiles", readFilesRouter)

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));