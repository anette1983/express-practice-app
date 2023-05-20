const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Simple express app" });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  res.render("response", { title: "Simple express app", email, password });
});
// додамо обробник маршруту логін
// приймаємо дві змінні та передаємо їх для рендеру шаблону response.ejs, щоб показати, що дані отримано.

module.exports = router;
