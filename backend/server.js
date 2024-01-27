const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
