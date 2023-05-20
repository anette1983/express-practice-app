// Спочатку підключено всі сторонні пакети, які потрібні для функціонування програми. Після ми підключаємо роути, надалі ми їх змінимо та внесемо додатковий функціонал.
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Після створюється екземпляр програми та підключаємо шаблони:

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// блок підключення проміжного ПЗ
// порядок проміжного ПЗ має значення
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Підключається логер, обробка JSON і даних форм, і в кінці модуль для роботи з cookie.

// встановлюємо обробку статичних ресурсів
app.use(express.static(path.join(__dirname, "public")));

// Після йде підключення роутерів до програми

app.use("/", indexRouter);
app.use("/users", usersRouter);

// обробка помилок. Спочатку відбувається обробка неіснуючого роуту чи помилка 404
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// По суті відсутність обробника на роутер, що запитується у сервера, це не помилка і ми створюємо помилку та прокидаємо її далі для обробки.
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
// Тут і відбувається обробка помилки. Ми прокидаємо змінні message та error у шаблон error.ejs і виконуємо його рендер

module.exports = app;

// Програма виконує рендер одного шаблону. Сам рендер виконується у файлі роутингу routes/index.js
// додамо розмітку форми, щоб ми могли прийняти дані. у Файл index.ejs
// стилі у файл public/stylesheets/style.css
// Нам потрібний обробник для шляху /login на який приходитимуть дані від форми. додамо його  у файл роутингу .
// і новий шаблон response.ejs куди ми виводитимемо дані форми.
// при введенні даних вони тепер відобр на сторінці після сабміту
// Тепер у файл роутингу user.js додамо наступний об'єкт з контактами
// тепер за адресою /users бачимо наш масив юзерів
// додамо обробник для отримання унікального користувача за його ідентифікатором
//  /users/2 ми отримуємо дані Рудої Соні
// Такий підхід передачі даних ми використовуватимемо найчастіше для редагування та видалення конкретної сутності за її унікальним ідентифікатором.
