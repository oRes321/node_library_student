const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;

router.get('/my-page', (req, res) => {
  res.render('my_page', {
    title: 'My route',
    items: ['Element 1', 'Element 2', 'Element 3']
  });
});