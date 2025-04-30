const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Віртуальне поле для повного імені автора
AuthorSchema.virtual("name").get(function () {
  // Щоб уникнути помилок у випадках, коли автор не має ні прізвища, ні імені
  // Ми хочемо переконатися, що ми обробляємо виняток, повертаючи порожній рядок для цього випадку
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Віртуальне поле для URL автора
AuthorSchema.virtual("url").get(function () {
  // Ми не використовуємо стрілочну функцію, оскільки нам знадобиться об'єкт this
  return `/catalog/author/${this._id}`;
});

// Експортуємо модель
module.exports = mongoose.model("Author", AuthorSchema);