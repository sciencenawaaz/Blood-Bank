const express = require("express");

const { getAllBlood, createBlood, updateBlood, deleteBlood, getBloodDetails } = require("../controllers/bloodControler");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();


//Publically Available
router.route("/bloodinfo").get(getAllBlood);

//Hospital Routes
router
    .route("/hospital/bloodinfo/new")
    .post(isAuthenticatedUser,authorizeRoles("hospital"),createBlood);

router
    .route("/hospital/bloodinfo/:id")
    .put(isAuthenticatedUser,authorizeRoles("hospital"),updateBlood)
    .delete(isAuthenticatedUser,authorizeRoles("hospital"),deleteBlood)
   

router.route("/bloodinfo/:id").get(isAuthenticatedUser,authorizeRoles("hospital"),getBloodDetails);


module.exports = router;