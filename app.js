require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Импорт миддлвэров
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler");
const limiter = require("./middlewares/limiter");

// Импорт роутера
const router = require("./routes/index");

const { PORT, DB } = require("./utils/config");

// Создаём приложение на express
const app = express(); // Cоздаём приложение методом express

// подключаемся к серверу mongo
mongoose.connect(DB, {
  useNewUrlParser: true,
});

// Миддлвэры для безопасности
app.use(limiter);
app.use(helmet());

// Миддлвэры для парсинга
app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Роутер
app.use(router);

// Миддлвэры для обработки ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизолванная обработка ошибок

app.listen(PORT);
