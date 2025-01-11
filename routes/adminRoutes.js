const { Router } = require("express");
const { createAdmin, loginAdmin } = require("../controller/adminController");



const route = Router();

route.post("/admin_signup", createAdmin);
route.post("/admin_signin", loginAdmin);

module.exports = route;
