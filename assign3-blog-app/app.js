const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book = require("./bookSchema");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const dbUrl =
  "mongodb+srv://cayyanraj:<password>@full-stack-lab.ptod1.mongodb.net/?retryWrites=true&w=majority&appName=full-stack-lab";
mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.render("books", { books });
  } catch (err) {
    res.status(500).send("Error fetching books");
  }
});

app.get("/add-book", (req, res) => {
  res.render("addBook");
});

app.post("/add-book", async (req, res) => {
  const { title, author, pages, genre, price } = req.body;
  const newBook = new Book({ title, author, pages, genre, price });

  try {
    await newBook.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error adding book");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
