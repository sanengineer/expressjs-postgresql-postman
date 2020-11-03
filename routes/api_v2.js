const express = require("express");

const passport = require("passport");
const router = express.Router();
const controller = require("../controller/controller_api");
const restric = require("../middleware/restric");

router.post("/signup", controller.SignUp);

router.post("/signin", controller.SignIn);

router.get("/product", restric, controller.GetProduct);

router.post("/product", restric, controller.PostProduct);

module.exports = router;
