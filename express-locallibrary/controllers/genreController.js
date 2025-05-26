const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.genre_create_post = [
  body("name")
    .trim()
    .isLength({ min: 3 }).withMessage("Назва жанру має містити мінімум 3 символи.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Створити жанр",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      const existing_genre = await Genre.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (existing_genre) {
        res.redirect(existing_genre.url);
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }
  }),
];

exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();
  res.render("genre_list", {
    title: "List of genres",
    genre_list: allGenres,
  });
});
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);

  if (genre === null) {
    const err = new Error("Жанр не знайдено");
    err.status = 404;
    return next(err);
  }

  res.render("genre_detail", {
    title: "Деталі жанру",
    genre: genre,
    genre_books: booksInGenre,
  });
});

exports.genre_create_get = (req, res) => {
  res.render("genre_form", { title: "Створити жанр" });
};

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
