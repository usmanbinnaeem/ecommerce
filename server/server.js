const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");
//app
const app = express();

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`DB CONNECTION ERROR ${err}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());

//routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port ${port}`));
