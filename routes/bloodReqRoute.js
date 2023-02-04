const express = require("express");

const { newOrder,myOrders, getAllOrders, deleteOrder } = require("../controllers/bloodReqControler");

const router = express.Router();

const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,authorizeRoles("user"),newOrder);

router.route("/order/me").get(isAuthenticatedUser,myOrders);

router.route("/hospital/orders").get(isAuthenticatedUser,authorizeRoles("hospital"),getAllOrders);

router
     .route("/hospital/orders/:id")
     .delete(isAuthenticatedUser,authorizeRoles("hospital"),deleteOrder);


module.exports = router;