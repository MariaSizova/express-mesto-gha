const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    name: {
      // Требования к имени в схеме:
      type: String, // имя — это строка
      required: [true, "не передано имя карточки"],
      minlength: [2, "длина имени карточки должна быть не менее 2 символов"],
      maxlength: [30, "длина имени карточки должна быть не более 30 символов"],
    },
    link: {
      // Требования к ссылке на картинку в схеме:
      type: String,
      required: [true, "не передана ссылка на изображение"],
    },
    owner: {
      // у карточки есть ссылка на модель автора карточки — опишем требования к ссылке в схеме:
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      // у карточки есть ссылка на модель автора карточки — опишем требования к ссылке в схеме:
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false } // отключаем поле "__v"
);

module.exports = mongoose.model("card", cardSchema);
