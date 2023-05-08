const mongoose = require("mongoose");

// Импорт валидатора URL
const isUrl = require("validator/lib/isURL");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "не передано имя карточки"], // обязательное поле
      minlength: [2, "длина имени карточки должна быть не менее 2 символов"], // минимальная длина имени — 2 символа
      maxlength: [30, "длина имени карточки должна быть не более 30 символов"], // а максимальная — 30 символов
    },
    link: {
      type: String,
      validate: {
        // validator - функция проверки данных. link - значение свойства link
        validator: (link) =>
          isUrl(link, { protocols: ["http", "https"], require_protocol: true }), // если link не соответствует формату, вернётся false
        message: "ссылка не соответствует формату", // когда validator вернёт false, будет использовано это сообщение
      },
      required: [true, "не передана ссылка на изображение"], // обязательное поле
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
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

// создаём модель и экспортируем её
module.exports = mongoose.model("card", cardSchema);
