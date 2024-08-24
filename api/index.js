const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoute = require("./routes/User.route")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("**database connected**"))
.catch((err) => console.log('**Error connecting the database**', err));

app.use("/api/user", userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))