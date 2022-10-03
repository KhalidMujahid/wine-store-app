const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

// importing Database
require("./config/database");

// setup template engine EJS
app.set("view engine", "ejs");
// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// route
app.use("/", require("./routes/router"));

app.listen(PORT, () => console.log("Server running on PORT ", PORT));
