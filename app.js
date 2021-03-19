//connect libraries
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const logger = require("morgan");
const path = require("path");
const MongoStore = require("connect-mongo");
const dbConnect = require("./config/dbConnect");
const { dbConnectionURL } = require("./config/dbConfig");
const sessions = require("express-session");

const User = require("./models/user.model");

const app = express();
const PORT = process.env.PORT || 3000;

const secretKey =
  "650fb2a5add63ec294bf9895cf9e41105539a27fc9cd1b32a2f3c9d65ac8cf00709f3e279694d23b230e90c25febdfea79deec45df1f1beeb906aef384c4bde4";
dbConnect();

//bringing routes here
const pageRouter = require("./routes/pageRouter");
// const adminRouter = require("./routes/adminRouter");

//////////////////          middlewares
//const dbConnectionURL = "mongodb://localhost:27017/nutritionist";
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("cookieName", "sid"); // Устанавливаем в настройках сервера специальную переменную,
// которая говорит, какое имя будут носить cookie
hbs.registerPartials(path.join(process.env.PWD, "views", "partials"));

// SESSION SECTION
app.use(
  sessions({
    name: app.get("cookieName"),
    secret: secretKey,
    resave: false, // Не сохранять сессию, если мы ее не изменим
    saveUninitialized: false, // не сохранять пустую сессию
    store: MongoStore.create({
      // выбираем в качестве хранилища mongoDB
      mongoUrl: dbConnectionURL,
    }),
    cookie: {
      // настройки, необходимые для корректного работы cookie
      // secure: true,  // работает только на сервере с HTTPS
      httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
      maxAge: 3600 * 1e3, // устанавливаем время жизни cookie
    },
  })
);

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res, next) => {
  const userId = req.session?.user?.id;
  if (userId) {
    const currentUser = await User.findById(userId);
    if (currentUser) {
      res.locals.username = currentUser.username;
      res.locals.email = currentUser.email;
    }
  }

  next();
});
////////////////////////////////// finishing with middlewares

/////  go to ROUTES
app.use("/", pageRouter);
// app.use("/admin", adminRouter);

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
// app.use((req, res, next) => {
// 	const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
// 	next(error);
//  });

///start server
app.listen(PORT, () => {
  console.log("SERVER connected to port >> ", PORT);
});
