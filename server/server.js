const express = require('express')
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT || 8080;
const app = express()

app.use(cors())
app.use(express.json())

const apiroute = require("./apiRoute")
app.use("/api", apiroute)

app.listen(port, () => {
    console.log(`The server is running on port: ${port}.`);
})