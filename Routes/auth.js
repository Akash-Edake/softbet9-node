
const {
  LoginController,
  changePasswordController,
  PanelLoginController,
  companyLogin,
} = require("../Controllers/authController");
const verify = require("../Middleware/verifyJWT");

const router = require("express").Router();

//LOGIN
router.post("/login", LoginController);
router.post("/login-panel", PanelLoginController);
router.post("/login-company", companyLogin);
router.put("/change-password/:user_id",verify, changePasswordController);

module.exports = router;
