const { connect } = require("mongoose");

connect("mongodb://localhost/Jovice-system")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
