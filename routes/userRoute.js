const express = require("express");
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    logout,   
 } = require("../controllers/userControler");

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(isAuthenticatedUser,logout);

module.exports = router;