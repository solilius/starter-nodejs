require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// ################ ROUTERS ################# //

const login = require("./routes/login");

// ################## API ################### //

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index/index.html");
});

app.use("/login", login);
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.use((err, req, res, next) => {
  console.error("Handled", err);
  res.status(500).send("Something went wrong");
});

// ############# Start Server ############### //

mongoose.connect(process.env.DB_URI).then(
  () => {
    app.listen(port, err => {
      err ? console.error(err) : console.log("Server is up, Port: " + port);
    });
  },
  err => {
    console.error("err", err);
  }
);