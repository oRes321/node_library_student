const express = require("express");
const router = express.Router();
const Author = require("../models/author"); 
const Book = require("../models/book");


router.get("/books", async function (req, res, next) {
  const title = req.query["title"]; // Отримуємо параметр ?title=...
  const query = {};

  if (title) {
    query.title = RegExp(title, "i"); // регістронезалежний пошук
  }

  try {
    // Знаходимо книги, підставляємо автора
    const books = await Book.find(query).populate("author");

    let result = "";
    if (books.length > 0) {
      result =
        "<ul>" +
        books
          .map((book) => {
            const authorName = book.author
              ? `${book.author.first_name} ${book.author.family_name}`
              : "Unknown author";
            return `<li>${book.title} by ${authorName}</li>`;
          })
          .join("") +
        "</ul>";
    } else {
      result = "<h1>No books found</h1>";
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


router.get("/author", async function (req, res, next) {
  const query = { first_name: "Ben" };
  const author = await Author.findOne(query);

  res.send(
    author == null
      ? "<h1>Not found</h1>"
      : `<h1>${author.first_name} ${author.family_name}</h1>`
  );
});



router.get("/author", async function (req, res, next) {
  const firstName = req.query["first_name"];
  const query = { first_name: firstName };
  const author = await Author.findOne(query);

  res.send(
    author == null
      ? "<h1>Not found</h1>"
      : `<h1>${author.first_name} ${author.family_name}</h1>`
  );
});




router.get("/author", async function (req, res, next) {
  const firstName = req.query["first_name"];
  const query = { first_name: RegExp(firstName, "i") };
  const author = await Author.findOne(query);

  res.send(
    author == null
      ? "<h1>Not found</h1>"
      : `<h1>${author.first_name} ${author.family_name}</h1>`
  );
});



router.get("/author", async function (req, res, next) {
  const firstName = req.query["first_name"];
  const query = { first_name: RegExp(firstName, "i") };
  const authors = await Author.find(query);

  let result = "";
  if (authors.length > 0) {
    result = `<ul>${authors.map((author) => `<li>${author.name}</li>`).join("")}</ul>`;
  } else {
    result = "<h1>Not found</h1>";
  }

  res.send(result);
});



router.get("/author", async function (req, res, next) {
  const firstName = req.query["first_name"];
  const familyName = req.query["family_name"];

  let query = {};
  if (firstName) query.first_name = RegExp(firstName, "i");
  if (familyName) query.family_name = RegExp(familyName, "i");

  const authors = await Author.find(query);

  let result = "";
  if (authors.length > 0) {
    result = `<ul>${authors.map((author) => `<li>${author.name}</li>`).join("")}</ul>`;
  } else {
    result = "<h1>Not found</h1>";
  }

  res.send(result);
});


module.exports = router;
