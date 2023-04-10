const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
dotenv.config();
// Mongo DB connection

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// rest obj
const app = express();

// midleware
app.use(
  cors({
    origin: "http://localhost:3000, https://dershane-frontend.vercel.app",
  })
);
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/student", require("./routes/studentRoutes"));
app.use("/api/v1/reports", require("./routes/reportsRoutes"));

//listening

const port = 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`.bgYellow.red);
});
