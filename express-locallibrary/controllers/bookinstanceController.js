const { body, validationResult } = require('express-validator');
const BookInstance = require("../models/bookinstance");
const Book = require('../models/book');
const asyncHandler = require("express-async-handler");

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find()
    .populate('book')
    .exec();

  res.render("bookinstance_list", {
    title: "List of book copies",
    bookinstance_list: allBookInstances,
  });
});

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
});

exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").exec();

  res.render("bookinstance_form", {
    title: "Створити екземпляр книги",
    book_list: allBooks,
  });
});
exports.bookinstance_create_post = [
  body("book", "Книга обов’язкова").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Видавництво обов’язкове").trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("due_back", "Недійсна дата").optional({ checkFalsy: true }).isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, "title").exec();
      return res.render("bookinstance_form", {
        title: "Створити екземпляр книги",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
    } else {
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }
  }),
];


exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
});

exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
