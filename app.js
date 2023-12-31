const express = require("express");
const app = express();
const sql = require("mssql");
const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");
require("dotenv").config();
const port = process.env.PORT || 3400; // Use 3000 as the default if PORT is not defined

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://musical-snickerdoodle-08c739.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.get("/ayush", (req, res) => {
  res.send("ayush");
});

app.post("/abouts", async (req, res) => {
  try {
    const nayiRecord = await User.findOne({ where: { id: req.body.id } });
    if (!nayiRecord) {
      res.status(404).json({ error: "Record not found" });
      return;
    }
    const name = nayiRecord.id;
    res.json({ name });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.sync();

app.get("/api/user", async (req, res) => {
  try {
    const newUser = await User.create({
      username: "exampleUser",
      email: "user@example.com",
    });
    console.log("New user created:", newUser.toJSON());
    res.send("Data Added Successfully.........");
  } catch (error) {
    console.error("Error creating user:", error);
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
