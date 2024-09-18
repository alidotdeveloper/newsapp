const express = require("express");
const user = require("../controllers/user-controller");
const verifyUser = require("../middleware/Verify-user");
const router = express.Router();


// routes
router.post("/register",  user.registerUser);
router.post("/login",  user.loginUser);
router.post("/logout", user.logoutUser);
router.post("/admin", user.adminLogin);


module.exports = router;
