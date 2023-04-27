const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      // Требования к имени
      type: String,
      required: [true, "не передано имя пользователя"],
      minlength: [
        2,
        "длина имени пользователя должна быть не менее 2 символов",
      ],
      maxlength: [
        30,
        "длина имени пользователя должна быть не более 30 символов",
      ],
    },
    // Требования к информации о себе
    about: {
      type: String,
      required: [true, "не передана информация о себе"],
      minlength: [2, "длина информации о себе должна быть не менее 2 символов"],
      maxlength: [
        30,
        "длина информации о себе должна быть не более 30 символов",
      ],
    },
    // Требования к аватару
    avatar: {
      type: String,
      required: [true, "не передана ссылка на аватар пользователя"],
    },
  },
  { versionKey: false } // отключаем поле "__v"
);

module.exports = mongoose.model("user", userSchema);
